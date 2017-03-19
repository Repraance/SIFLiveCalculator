# coding=utf-8

import os
import urllib.request
from collections import OrderedDict
import sqlite3
import json


def get_db():
    live_url = 'http://cdn-raw.loveliv.es/db/live/live.db_'
    unit_url = 'http://cdn-raw.loveliv.es/db/unit/unit.db_'

    opener = urllib.request.build_opener()
    opener.addheaders = [('User-agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)')]
    urllib.request.install_opener(opener)

    urllib.request.urlretrieve(live_url, 'live.db_')
    print('live.db_ successfully downloaded!')

    urllib.request.urlretrieve(unit_url, 'unit.db_')
    print('unit.db_ successfully downloaded!')


def generate_unit_json():
    unit_m_field = ('unit_number', 'unit_type_id', 'eponym', 'name', 'rarity', 'attribute_id', 'default_unit_skill_id',
                'default_leader_skill_id', 'before_love_max', 'after_love_max',
                'before_level_max', 'after_level_max',
                'default_removable_skill_capacity', 'max_removable_skill_capacity',
                'disable_rank_up', 'unit_level_up_pattern_id',
                'hp_max', 'smile_max', 'pure_max', 'cool_max',
                'hp_diff', 'smile_diff', 'pure_diff', 'cool_diff')

    sql_live_unit_m = '''
        SELECT unit_number, unit_type_id, eponym, name, rarity, attribute_id, default_unit_skill_id,
        default_leader_skill_id, before_love_max, after_love_max, before_level_max, after_level_max,
        default_removable_skill_capacity, max_removable_skill_capacity, disable_rank_up, unit_m.unit_level_up_pattern_id,
        hp_max, smile_max, pure_max, cool_max, hp_diff, smile_diff, pure_diff, cool_diff
        FROM unit_m, unit_level_up_pattern_m
        WHERE  unit_level_up_pattern_m.unit_level_up_pattern_id = unit_m.unit_level_up_pattern_id AND
            unit_level_up_pattern_m.unit_level = unit_m.before_level_max
    '''

    sql_leader_skill = '''
        SELECT name, description, leader_skill_effect_type, effect_value
        FROM unit_leader_skill_m
        WHERE unit_leader_skill_id = ?
    '''
    leader_skill_field = ('name', 'description', 'leader_skill_effect_type', 'effect_value')


    sql_leader_extra_skill = '''
        SELECT member_tag_id, leader_skill_effect_type, effect_value
        FROM unit_leader_skill_extra_m
        WHERE unit_leader_skill_id = ?
    '''
    leader_extra_skill_field = ('member_tag_id', 'leader_skill_effect_type', 'effect_value')

    sql_skill = '''
        SELECT name, skill_effect_type, discharge_type, trigger_type,
            description, effect_value, discharge_time, trigger_value, activation_rate
        FROM unit_skill_m, unit_skill_level_m
        WHERE unit_skill_m.unit_skill_id = ? AND unit_skill_m.unit_skill_id = unit_skill_level_m.unit_skill_id
    '''

    skill_field = ('name', 'skill_effect_type', 'discharge_type', 'trigger_type',
                'description', 'effect_value', 'discharge_time', 'trigger_value', 'activation_rate')


    sql_member_tag = '''
        SELECT member_tag_id
        FROM unit_type_member_tag_m
        WHERE unit_type_id = ?
    '''

    unit = list()
    conn = sqlite3.connect('unit.db_')
    curs = conn.cursor()

    curs.execute(sql_live_unit_m)
    result = curs.fetchall()
    for record in result:
        unit.append(OrderedDict(zip(unit_m_field, record)))

    for live in unit:
        # Get attribute before rank up
        live['smile'] = live['smile_max'] - live.pop('smile_diff')
        live['pure'] = live['pure_max'] - live.pop('pure_diff')
        live['cool'] = live['cool_max'] - live.pop('cool_diff')
        live['hp'] = live['hp_max'] - live.pop('hp_diff')

        # Get leader skill info
        curs.execute(sql_leader_skill, (live['default_leader_skill_id'], ))
        result_leader_skill = curs.fetchall()
        if result_leader_skill:
            leader_skill = OrderedDict(zip(leader_skill_field, result_leader_skill[0]))
            if leader_skill['leader_skill_effect_type'] > 3:
                leader_skill['leader_skill_effect_type'] = int(leader_skill['leader_skill_effect_type'] / 10) % 10
            live['leader_skill_info'] = leader_skill
        else:
            live['leader_skill_info'] = None

        # Get leader extra skill info
        curs.execute(sql_leader_extra_skill, (live['default_leader_skill_id'], ))
        result_leader_extra_skill = curs.fetchall()
        if result_leader_extra_skill:
            leader_extra_skill = OrderedDict(zip(leader_extra_skill_field, result_leader_extra_skill[0]))
            live['leader_extra_skill_info'] = leader_extra_skill
        else:
            live['leader_extra_skill_info'] = None

        # Get skill info
        curs.execute(sql_skill, (live['default_unit_skill_id'], ))
        result_skill = curs.fetchall()
        if result_skill:
            skill_info = list()
            for level in result_skill:
                skill_info.append(OrderedDict(zip(skill_field, level)))
            if len(skill_info) > 1:
                for i in range(1, 8):
                    del skill_info[i]['name']
                    del skill_info[i]['description']
            live['skill_info'] = skill_info
        else:
            live['skill_info'] = None

        # Get member tag
        curs.execute(sql_member_tag, (live['unit_type_id'], ))
        result_member_tag = curs.fetchall()
        if result_member_tag:
            live['member_tag'] = list(map(lambda x: x[0], result_member_tag))
        else:
            live['member_tag'] = None

    curs.close()
    print('Unit count: ', len(unit))

    with open('../../dist/assets/json/unit.json', 'w') as fp:
        json.dump(unit, fp)
        print('unit.json successfully generated.')


def generate_live_setting_json():
    live_setting_m_field = ('live_setting_id', 'live_track_id',
                        'name', 'name_kana', 'title_asset', 'member_category', 'member_tag_id',
                        'difficulty', 'stage_level', 'attribute_icon_id',
                        'live_icon_asset', 'notes_setting_asset', 'asset_background_id', 'notes_speed',
                        's_rank_score', 'a_rank_score', 'b_rank_score', 'c_rank_score',
                        's_rank_combo', 'a_rank_combo', 'b_rank_combo', 'c_rank_combo')

    sql_live_setting_m = '''
        SELECT live_setting_id, live_setting_m.live_track_id,
            name, name_kana, title_asset, member_category, member_tag_id,
            difficulty, stage_level, attribute_icon_id,
            live_icon_asset, notes_setting_asset, asset_background_id, notes_speed,
            s_rank_score, a_rank_score, b_rank_score, c_rank_score,
            s_rank_combo, a_rank_combo, b_rank_combo, c_rank_combo
        FROM live_setting_m, live_track_m
        WHERE live_setting_m.live_track_id = live_track_m.live_track_id
    '''

    difficulty_index = {
        1: 'EASY',
        2: 'NORMAL',
        3: 'HARD',
        4: 'EXPERT',
        5: 'TECHNICAL',
        6: 'MASTER'
    }

    live_setting_raw = list()
    conn = sqlite3.connect('live.db_')
    curs = conn.cursor()

    curs.execute(sql_live_setting_m)
    result = curs.fetchall()
    for record in result:
        live_setting_raw.append(OrderedDict(zip(live_setting_m_field, record)))

    notes_setting = list()
    live_setting = list()
    for live in live_setting_raw:
        live['difficulty_text'] = difficulty_index[live['difficulty']]
        if live['difficulty'] == 5:
            live_setting.append(live)
        else:
            # Remove redundant lives
            if live['notes_setting_asset'] not in notes_setting:
                notes_setting.append(live['notes_setting_asset'])
                live_setting.append(live)

    get_live_maps(live_setting)
    print('Live count: ', len(live_setting))

    with open('../../dist/assets/json/maps/live_setting.json', 'w') as fp:
        json.dump(live_setting, fp)
        print('live_setting.json successfully generated.')


def get_live_maps(all_live_setting):
    url_common = 'https://rawfile.loveliv.es/livejson/'
    path_common = '../../dist/assets/json/maps/latest/'
    for live in all_live_setting:
        file_name = live['notes_setting_asset']
        if not os.path.exists(path_common + file_name):
            url = url_common + file_name
            urllib.request.urlretrieve(url, path_common + file_name)
            print(file_name + ' successfully downloaded.')
        with open(path_common + file_name) as fp:
            notes = json.load(fp)
            live['notes_weight'] = get_notes_weight(notes)
            print(file_name + ' notes weight successfully generated')


def get_notes_weight(notes_setting):
    weight = [0] * 9
    for note in notes_setting:
        position = 9 - note['position']
        if note['effect'] == 3:
            weight[position] += 1.25
        else:
            weight[position] += 1
    return weight

if __name__ == '__main__':
    get_db()
    generate_unit_json()
    generate_live_setting_json()
