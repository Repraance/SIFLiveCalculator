<template>
    <div>
        <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
            <div class="well well-sm">
                <div style="margin-bottom: 10px; margin-top: 10px">
                    <div style="margin-bottom: 4px; text-align: right">
                        <span style="font-size: 18px; float: left">First Live</span>
                        <mu-radio label="Score Up" :disabled="liveSettingInfo.bonusType == 1 " nativeValue="0" v-model.number="liveSettingInfo.mfScoreUpIndex"></mu-radio>
                        <mu-radio label="Skill Up" :disabled="liveSettingInfo.bonusType == 1 " nativeValue="0" v-model.number="liveSettingInfo.mfSkillUpIndex"></mu-radio>
                    </div>
                    <select class="form-control" v-model.number="liveSelected[0]" :style="{ color:colorIndex[filterAttribute] }">
                        <option v-for="live in filteredLives" :value="live.index" :style="{ color:live.color }">
                            {{ live.name + ' [' +live.difficulty_text + '] [' + live.s_rank_combo + '] [' + '★' + live.stage_level + ']'}}
                        </option>
                    </select>
                </div>
                <div style="margin-bottom: 10px">
                    <div style="margin-bottom: 4px; text-align: right">
                        <span style="font-size: 18px; float: left">Second Live</span>
                        <mu-radio label="Score Up" :disabled="liveSettingInfo.bonusType != 2" nativeValue="1" v-model.number="liveSettingInfo.mfScoreUpIndex"></mu-radio>
                        <mu-radio label="Skill Up" :disabled="liveSettingInfo.bonusType != 2" nativeValue="1" v-model.number="liveSettingInfo.mfSkillUpIndex"></mu-radio>
                    </div>

                    <select class="form-control" v-model.number="liveSelected[1]" :style="{ color:colorIndex[filterAttribute] }" :disabled="liveSettingInfo.bonusType != 2">
                        <option v-for="live in filteredLives" :value="live.index" :style="{ color:live.color }">
                            {{ live.name + ' [' +live.difficulty_text + '] [' + live.s_rank_combo + '] [' + '★' + live.stage_level + ']'}}
                        </option>
                    </select>

                </div>
                <div style="margin-bottom: 10px">
                    <div style="margin-bottom: 4px; text-align: right">
                        <span style="font-size: 18px; float: left">Third Live</span>
                        <mu-radio label="Score Up" :disabled="liveSettingInfo.bonusType != 2" nativeValue="2" v-model.number="liveSettingInfo.mfScoreUpIndex"></mu-radio>
                        <mu-radio label="Skill Up" :disabled="liveSettingInfo.bonusType != 2" nativeValue="2" v-model.number="liveSettingInfo.mfSkillUpIndex"></mu-radio>
                    </div>

                    <select class="form-control" v-model.number="liveSelected[2]" :style="{ color:colorIndex[filterAttribute] }" :disabled="liveSettingInfo.bonusType != 2">
                        <option v-for="live in filteredLives" :value="live.index" :style="{ color:live.color }">
                            {{ live.name + ' [' +live.difficulty_text + '] [' + live.s_rank_combo + '] [' + '★' + live.stage_level + ']'}}
                        </option>
                    </select>

                </div>

                <h4 class="text-center"><b>Total Combo: {{ totalCombo }}</b></h4>

                <div class="well well-sm" style="margin-bottom: 0px">
                    <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-5 col-lg-5">
                            <div class="input-group">
                                <span class="input-group-addon" id="perfect-rate-addon">Perfect Rate</span>
                                <input type="number" class="form-control" aria-describedby="perfect-rate-addon" v-model.number="liveSettingInfo.perfectRate" min="0" max="1" step="0.01">
                            </div>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-7 col-lg-7">
                            <div class="input-group">
                                <span class="input-group-addon" id="max-combo-addon">
                                    <mu-checkbox label="Not Full Combo" v-model="liveSettingInfo.notFC"></mu-checkbox>
                                </span>
                                <input type="number" class="form-control" placeholder="Max Combo" v-model.number="liveSettingInfo.maxCombo" aria-describedby="max-combo-addon" :disabled="!liveSettingInfo.notFC" :max="totalCombo" min="1">
                            </div>
                        </div>
                    </div>
                    <div class="well well-sm" style="margin-bottom:9px;padding-bottom:2px">
                        <div style="line-height: 0">
                            <mu-radio label="Challenge Festival" nativeValue="1" v-model.number="liveSettingInfo.bonusType"></mu-radio>
                            <mu-radio title="And you could choose random guest bonus above the live list" label="Medley Festival" nativeValue="2" v-model.number="liveSettingInfo.bonusType"></mu-radio>
                        </div>
                        <div style="padding:5px">
                            ※ Global score up and skill up will be automatically applied as either of the above is selected. Random guest bonus for single live is unavailable under Challenge Festival.
                        </div>
                    </div>
                    <button class="btn btn-danger btn-block" v-on:click="resetAllBonus">Reset All Bonus</button>
                </div>
            </div>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
            <div class="well well-sm" style="padding-top: 0px; padding-bottom: 0px;">
                <h3>Filter</h3>
                <div class="well well-sm" style="padding-top: 0px">

                    <h4>Artist</h4>
                    <div class="filter-form" style="width:80px">
                        <mu-radio label="μ's" nativeValue="1" v-model.number="filterMemberCategory"></mu-radio>
                    </div>
                    <div class="filter-form" style="width:100px">
                        <mu-checkbox label="Printemps" nativeValue="6" v-model="filterMemberTag" :disabled="filterMemberCategory != 1"></mu-checkbox>
                    </div>
                    <div class="filter-form" style="width:100px">
                        <mu-checkbox label="lily white" nativeValue="7" v-model="filterMemberTag" :disabled="filterMemberCategory != 1"></mu-checkbox>
                    </div>
                    <div class="filter-form" style="width:100px">
                        <mu-checkbox label="BiBi" nativeValue="8" v-model="filterMemberTag" :disabled="filterMemberCategory != 1"></mu-checkbox>
                    </div>
                    <br>
                    <div class="filter-form" style="width:80px">
                        <mu-radio label="Aqours" nativeValue="2" v-model.number="filterMemberCategory"></mu-radio>
                    </div>
                    <div class="filter-form" style="width:100px">
                        <mu-checkbox label="CYaRon！" nativeValue="9" v-model="filterMemberTag" :disabled="filterMemberCategory != 2"></mu-checkbox>
                    </div>
                    <div class="filter-form" style="width:100px">
                        <mu-checkbox label="AZALEA" nativeValue="10" v-model="filterMemberTag" :disabled="filterMemberCategory != 2"></mu-checkbox>
                    </div>
                    <div class="filter-form" style="width:100px">
                        <mu-checkbox label="Guilty Kiss" nativeValue="11" v-model="filterMemberTag" :disabled="filterMemberCategory != 2"></mu-checkbox>
                    </div>
                    <br>
                    <div class="filter-form" style="width:80px">
                    </div>
                    <div class="filter-form" style="width:100px">
                        <mu-checkbox label="Solo" nativeValue="101" v-model="filterMemberTag"></mu-checkbox>
                    </div>
                    <div class="filter-form" style="width:100px">
                        <mu-checkbox label="Rival" nativeValue="102" v-model="filterMemberTag"></mu-checkbox>
                    </div>
                    <div class="filter-form" style="width:100px">
                        <mu-checkbox label="Others" nativeValue="103" v-model="filterMemberTag"></mu-checkbox>
                    </div>
                </div>
                <div class="well well-sm" style="padding-top: 0px">
                    <h4>Attribute</h4>
                    <mu-radio label="Smile" nativeValue="1" v-model.number="filterAttribute" style="color: #E91E63"></mu-radio>
                    <mu-radio label="Pure" nativeValue="2" v-model.number="filterAttribute" style="color: #4CAF50"></mu-radio>
                    <mu-radio label="Cool" nativeValue="3" v-model.number="filterAttribute" style="color: #2196F3"></mu-radio>
                </div>

                <div class="well well-sm" style="padding-top: 0px">
                    <h4>Difficulty</h4>
                    <mu-radio label="EASY" nativeValue="1" v-model.number="filterDifficulty"></mu-radio>
                    <mu-radio label="NORMAL" nativeValue="2" v-model.number="filterDifficulty"></mu-radio>
                    <mu-radio label="HARD" nativeValue="3" v-model.number="filterDifficulty"></mu-radio>
                    <mu-radio label="EXPERT" nativeValue="4" v-model.number="filterDifficulty"></mu-radio>
                    <mu-radio label="MASTER" nativeValue="6" v-model.number="filterDifficulty"></mu-radio>
                </div>
                <h3>Sort</h3>
                <div class="well well-sm">
                    <mu-radio label="Release Date" nativeValue="1" v-model="sortType"></mu-radio>
                    <mu-radio label="Name" nativeValue="2" v-model.number="sortType"></mu-radio>
                    <mu-radio label="Note Count" nativeValue="3" v-model.number="sortType"></mu-radio>
                    <mu-radio label="Difficulty Level" nativeValue="4" v-model.number="sortType"></mu-radio>
                    <hr>
                    <mu-radio label="Ascending" nativeValue="1" v-model.number="sortOrder"></mu-radio>
                    <mu-radio label="Descending" nativeValue="-1" v-model.number="sortOrder"></mu-radio>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {
        colorIndex,
        attributeIndex,
        rarityIndex,
        memberTagIndex,
        japaneseAttributeIndex
    } from '../lib/indexes.js';

    export default {
        data: function() {
            return {
                colorIndex: {
                    1: '#E91E63',
                    2: '#4CAF50',
                    3: '#2196F3'
                },
                filterMemberCategory: 1,
                filterMemberTag: [],
                filterAttribute: null,
                filterDifficulty: 4,
                sortType: 1,
                sortOrder: 1,
                filteredLives: [],
                liveSettingInfo: {
                    'lives': [{
                        'liveInfo': null,
                        'liveNotes': null
                    }, {
                        'liveInfo': null,
                        'liveNotes': null
                    }, {
                        'liveInfo': null,
                        'liveNotes': null
                    }],
                    'perfectRate': 0.9,
                    'notFC': false,
                    'maxCombo': 0,
                    'bonusType': 0,
                    'mfScoreUpIndex': null,
                    'mfSkillUpIndex': null
                },
                liveSelected: [null, null, null],
                liveSettings: null,
                totalCombo: 0
            }
        },
        computed: {
            livesFilter: function() {
                return {
                    'memberCategory': this.filterMemberCategory,
                    'memberTag': this.filterMemberTag,
                    'attribute': this.filterAttribute,
                    'difficulty': this.filterDifficulty,
                    'sortType': this.sortType,
                    'sortOrder': this.sortOrder
                }
            }
        },
        watch: {
            'liveSettingInfo.mfScoreUpIndex': function() {
                if (this.liveSettingInfo.mfScoreUpIndex == this.liveSettingInfo.mfSkillUpIndex) {
                    this.liveSettingInfo.mfSkillUpIndex = null;
                }
            },
            'liveSettingInfo.mfSkillUpIndex': function() {
                if (this.liveSettingInfo.mfSkillUpIndex == this.liveSettingInfo.mfScoreUpIndex) {
                    this.liveSettingInfo.mfScoreUpIndex = null;
                }
            },
            totalCombo: function() {
                this.liveSettingInfo.maxCombo = this.totalCombo;
            },
            liveSelected: function() {
                let combo = 0;
                for (let i = 0; i < 3; i++) {
                    if (this.liveSelected[i]) {
                        this.liveSettingInfo.lives[i].liveInfo = this.liveSettings[this.liveSelected[i]];
                        combo += this.liveSettingInfo.lives[i].liveInfo.s_rank_combo;
                    } else {
                        this.liveSettingInfo.lives[i].liveInfo = null;
                    }
                }
                this.totalCombo = combo;
            },
            liveSettingInfo: {
                handler: function(val) {
                    if (val.bonusType != 2) {
                        if (this.liveSelected[0])
                            this.totalCombo = this.liveSettingInfo.lives[0].liveInfo.s_rank_combo;
                    } else {
                        let combo = 0;
                        for (let i = 0; i < 3; i++) {
                            if (this.liveSelected[i])
                                combo += this.liveSettingInfo.lives[i].liveInfo.s_rank_combo;
                        }
                        this.totalCombo = combo;
                    }
                    this.$events.$emit('getLiveSettingInfo', val);
                },
                deep: true
            },
            livesFilter: {
                deep: true,
                handler: function(val) {
                    let setNull = [true, true, true];
                    let filterMemberTag = val.memberTag.map((item) => Number(item));
                    this.filteredLives = [];
                    for (let i = 0; i < this.liveSettings.length; i++) {
                        let live = this.liveSettings[i];
                        if (val.memberCategory == live.member_category && val.attribute == live.attribute_icon_id && val.difficulty == live.difficulty) {
                            if (val.memberTag.length > 0) {
                                let liveMemberTag = live.member_tag_id;
                                if (liveMemberTag >= 6 && liveMemberTag <= 11) {
                                    // Subunit
                                    if (filterMemberTag.indexOf(liveMemberTag) == -1)
                                        continue;
                                } else if (liveMemberTag == 12 || liveMemberTag == 13) {
                                    // Rival
                                    if (filterMemberTag.indexOf(102) == -1)
                                        continue;
                                } else if (liveMemberTag >= 14 && liveMemberTag <= 22) {
                                    // Solo
                                    if (filterMemberTag.indexOf(101) == -1)
                                        continue;
                                } else {
                                    // Others
                                    if (filterMemberTag.indexOf(103) == -1)
                                        continue;
                                }
                            }
                            let option = JSON.parse(JSON.stringify(live));
                            option.index = i;
                            option.color = colorIndex[option.attribute_icon_id];
                            this.filteredLives.push(option);

                            for (let j = 0; j < 3; j++) {
                                if (setNull[j] && i == this.liveSelected[j])
                                    setNull[j] = false;
                            }
                        }
                    }

                    let sortOrder = val.sortOrder;
                    switch (val.sortType) {
                        case 2:
                            this.filteredLives = this.filteredLives.sort((x, y) => {
                                if (x.name_kana > y.name_kana)
                                    return sortOrder * 1;
                                else {
                                    return sortOrder * -1;
                                }
                            });
                            break;
                        case 3:
                            this.filteredLives = this.filteredLives.sort((x, y) => {
                                if (x.s_rank_combo > y.s_rank_combo)
                                    return sortOrder * 1;
                                else {
                                    return sortOrder * -1;
                                }
                            });
                            break;
                        case 4:
                            this.filteredLives = this.filteredLives.sort((x, y) => {
                                if (x.stage_level > y.stage_level)
                                    return sortOrder * 1;
                                else if (x.stage_level < y.stage_level)
                                    return sortOrder * -1;
                                else {
                                    if (x.live_track_id > y.live_track_id)
                                        return sortOrder * 1;
                                    else
                                        return sortOrder * -1;
                                }
                            });
                            break;
                        default:
                            break;
                    }

                    for (let i = 0; i < 3; i++) {
                        if (setNull[i])
                            this.liveSelected[i] = null;
                    }
                }
            }
        },
        methods: {
            rejectBonus: function(event) {
                if (this.mfScoreUpIndex == this.mfSkillUpIndex) {
                    var id = event.target.id;
                    if (id[1] == 'c')
                        this.mfSkillUpIndex = null;
                    else
                        this.mfScoreUpIndex = null;
                }
            },

            resetLiveSelected: function() {
                this.liveSelected1 = null;
                this.liveSelected2 = null;
                this.liveSelected3 = null;
            },

            getLiveSettings: function() {
                this.$http.get('assets/json/maps/live_setting.json').then(
                    (response) => {
                        this.liveSettings = response.body;

                        // Sort live settings 
                        this.liveSettings = this.liveSettings.sort((x, y) => {
                            if (x.live_track_id !== y.live_track_id) {
                                return x.live_track_id - y.live_track_id;
                            } else {
                                return x.difficulty - y.difficulty;
                            }
                        })

                        var liveIndex = 0;
                        this.liveSettings = this.liveSettings.filter((item, index, array) => {
                            if (item.difficulty != 5) {
                                item.liveIndex = liveIndex;
                                liveIndex++;
                                return true;
                            }
                        });

                        this.filterAttribute = 1;
                    },
                    (response) => {
                        alert('Failed fetching liveSettings :(');
                    }
                );
            },

            getLiveNotes: function(notesSettingName) {
                this.$http.get('assets/json/maps/latest' + notesSettingName).then(
                    (response) => {

                    }
                )
            },

            resetAllBonus: function() {
                this.liveSettingInfo.mfScoreUpIndex = null;
                this.liveSettingInfo.mfSkillUpIndex = null;
                this.liveSettingInfo.bonusType = 0;
                this.liveSelected2 = null;
                this.liveSelected3 = null;
            }
        },
        mounted: function() {
            this.getLiveSettings();
        }
    }
</script>

<style scoped>
    h3 {
        padding-left: 2px;
        margin-top: 10px;
    }
    
    hr {
        margin-top: 1px;
        margin-bottom: 5px;
    }
    
    .well-sm {
        margin-bottom: 10px;
    }
    
    .event-checkbox {
        margin-left: 20px;
        margin-right: 20px;
    }
    
    .input-group-addon {
        padding: 0 12px;
        line-height: 0;
    }
    
    .filter-form {
        display: inline-block;
    }
</style>