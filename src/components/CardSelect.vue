<template>
    <div ref="modal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                    <h4 class="modal-title" id="myModalLabel">Modal title</h4>
                </div>
                <div class="modal-body">
                    <div class="row gutters-5">
                        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                            <div class="row gutters-5">
                                <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                    <div class="well well-sm">
                                        <div>
                                            <mu-checkbox label="μ's" v-model="muse" />
                                        </div>
                                        <hr>
                                        <div>
                                            <mu-checkbox label="Printemps" v-model="printemps" />
                                        </div>
                                        <div>
                                            <mu-checkbox label="lily white" v-model="lilywhite" />
                                        </div>
                                        <div>
                                            <mu-checkbox label="BiBi" v-model="bibi" />
                                        </div>
                                        <hr>
                                        <div v-for="(option, index) in options" v-if="index < 9">
                                            <mu-checkbox :label="option" v-model="selectedOptions[option]" />
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                    <div class="well well-sm">
                                        <div>
                                            <mu-checkbox label="Aqours" v-model="aqours" />
                                        </div>
                                        <hr>
                                        <div>
                                            <mu-checkbox label="CYaRon！" v-model="cyaron" />
                                        </div>
                                        <div>
                                            <mu-checkbox label="AZALEA" v-model="azalea" />
                                        </div>
                                        <div>
                                            <mu-checkbox label="Guilty Kiss" v-model="guiltyKiss" />
                                        </div>
                                        <hr>
                                        <div v-for="(option, index) in options" v-if="index >= 9 && index < 18">
                                            <mu-checkbox :label="option" v-model="selectedOptions[option]" />
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                    <div class="well well-sm">
                                        <div>
                                            <mu-checkbox label="1st Year" v-model="year1st" />
                                        </div>
                                        <div>
                                            <mu-checkbox label="2nd Year" v-model="year2nd" />
                                        </div>
                                        <div>
                                            <mu-checkbox label="3rd Year" v-model="year3rd" />
                                        </div>
                                        <hr>
                                        <div v-for="(option, index) in options" v-if="index >= 18 && index < 23">
                                            <mu-checkbox :label="option" v-model="selectedOptions[option]" />
                                        </div>
                                        <hr>
                                        <div v-for="(option, index) in options" v-if="index >= 23 && index <26">
                                            <mu-checkbox :label="option[0]" v-model="selectedOptions[option[1]]" />
                                        </div>
                                        <hr>
                                        <div>
                                            <mu-checkbox label="Rankup" v-model="rankup" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                            <div class="well well-sm" style="padding-left:2%;padding-right:2%">
                                <div style="margin-bottom:10px">
                                    <select class="form-control" v-model.number="selectedCardIndex">
                                        <option v-for="option in cardList" :value="option.index" :style="{color:option.color}">
                                            {{ option.text }}
                                        </option>
                                    </select>
                                </div>
                                <table class="table card-list">
                                    <tbody>
                                        <tr>
                                            <td rowspan="3" style="width:30%;border:none">
                                                <img :src="avatarSrc">
                                            </td>
                                            <td style="border:none">
                                                <div class="attr-box-smile" :class="{ 'main-attr': selectedCard.attribute_id == 1}">{{ selectedCard.smile }}</div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="border:none">
                                                <div class="attr-box-pure" :class="{ 'main-attr': selectedCard.attribute_id == 2}">{{ selectedCard.pure }}</div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="border:none">
                                                <div class="attr-box-cool" :class="{ 'main-attr': selectedCard.attribute_id == 3}">{{ selectedCard.cool }}</div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>Center Skill</th>
                                            <th>Description</th>
                                        </tr>
                                        <tr>
                                            <td>{{ selectedCard.centerSkillName }}</td>
                                            <td>{{ selectedCard.centerSkillDescription }}</td>
                                        </tr>
                                        <tr>
                                            <th>Skill Lv</th>
                                            <th>Description</th>
                                        </tr>
                                        <tr>
                                            <td>
                                                <input type="number" class="form-control input-sm" min="1" max="8" step="1" v-model.number="skillLv">
                                            </td>
                                            <td>{{ selectedCard.skillDescription }}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" @click="close">Dismiss</button>
                    <button type="button" class="btn btn-primary" @click="save">Save</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    const defaultSelectedCard = {
        'cardid': null,
        'attribute': null,
        'attribute_id': null,
        'originalCardInfo': null,
        'smile': '　',
        'pure': '　',
        'cool': '　',
        'centerSkillName': 'N/A',
        'centerSkillDescription': 'N/A',
        'skilllevel': 1,
        'skillDescription': 'N/A',
        'mezame': null
    }

    const cardListPlaceHolder = {
        'text': 'No card matches',
        'color': '#474a4f',
        'index': -1
    }

    import {
        colorIndex,
        attributeIndex,
        rarityIndex,
        memberTagIndex,
        japaneseAttributeIndex
    } from '../lib/indexes.js';

    import bsn from '../lib/external/bootstrap-native.min';

    function prefix0(num) {
        let numStr = '0000' + num;
        return numStr.substring(numStr.length - 4);
    }

    export default {
        data: function() {
            return {
                modal: null,
                unitInfo: null,
                cardList: [],
                open: false,
                options: ['高坂穂乃果',
                    '絢瀬絵里',
                    '南ことり',
                    '園田海未',
                    '星空凛',
                    '西木野真姫',
                    '東條希',
                    '小泉花陽',
                    '矢澤にこ',
                    '高海千歌',
                    '桜内梨子',
                    '松浦果南',
                    '黒澤ダイヤ',
                    '渡辺曜',
                    '津島善子',
                    '国木田花丸',
                    '小原鞠莉',
                    '黒澤ルビィ',
                    'N',
                    'R',
                    'SR',
                    'SSR',
                    'UR', ['Smile', 'smile'],
                    ['Pure', 'pure'],
                    ['Cool', 'cool'],
                    ['Rankup', 'rankup']
                ],
                selectedOptions: {
                    '高坂穂乃果': false,
                    '絢瀬絵里': false,
                    '南ことり': false,
                    '園田海未': false,
                    '星空凛': false,
                    '西木野真姫': false,
                    '東條希': false,
                    '小泉花陽': false,
                    '矢澤にこ': false,
                    '高海千歌': false,
                    '桜内梨子': false,
                    '松浦果南': false,
                    '黒澤ダイヤ': false,
                    '渡辺曜': false,
                    '津島善子': false,
                    '国木田花丸': false,
                    '小原鞠莉': false,
                    '黒澤ルビィ': false,
                    'N': false,
                    'R': false,
                    'SR': true,
                    'SSR': true,
                    'UR': true,
                    'smile': true,
                    'pure': true,
                    'cool': true
                },
                rankup: false,
                skillLv: 1,
                selectedCardIndex: null,
                selectedCard: defaultSelectedCard,
                avatarSrc: 'assets/image/placeHolder.png'
            }
        },
        watch: {
            selectedOptions: {
                handler: function(val) {
                    //console.log(val);
                    this.cardList = [];
                    this.unitInfo.forEach((card, index) => {
                        if (this.selectedOptions[card.name] && this.selectedOptions[rarityIndex[card.rarity]] && this.selectedOptions[attributeIndex[card.attribute_id]]) {
                            let option = {};
                            let cardText = prefix0(card.unit_number) + ' [' + rarityIndex[card.rarity] + ']  ' + card.name;
                            if (card.eponym)
                                cardText += '『' + card.eponym + '』';
                            option.text = cardText;
                            option.color = colorIndex[card.attribute_id];
                            option.index = index;
                            this.cardList.push(option);
                        }
                    })
                },
                deep: true
            },
            selectedCardIndex: function() {
                this.selectedCard = defaultSelectedCard;
                if (this.unitInfo) {
                    if (this.selectedCardIndex != null) {
                        let originalCardInfo = this.unitInfo[this.selectedCardIndex];
                        this.selectedCard.originalCardInfo = originalCardInfo;
                        this.selectedCard.cardid = originalCardInfo.unit_number;
                        this.selectedCard.attribute_id = originalCardInfo.attribute_id;
                        this.selectedCard.attribute = attributeIndex[this.selectedCard.attribute_id];

                        let leaderSkillInfo = originalCardInfo.leader_skill_info;
                        let leaderExtraSkillInfo = originalCardInfo.leader_extra_skill_info;
                        if (leaderSkillInfo) {
                            this.selectedCard.centerSkillName = leaderSkillInfo.name;
                            this.selectedCard.centerSkillDescription = leaderSkillInfo.description;
                        }
                        if (leaderExtraSkillInfo) {
                            let memberTagId = leaderExtraSkillInfo.member_tag_id;
                            let effectValue = leaderExtraSkillInfo.effect_value;
                            let effectType = leaderExtraSkillInfo.leader_skill_effect_type;
                            let extraCenterSkillDescription = memberTagIndex[memberTagId] + 'のメンバーはさらに' + japaneseAttributeIndex[effectType] + 'Pが' + effectValue + '%UPする'
                            this.selectedCard.centerSkillDescription += ' + ' + extraCenterSkillDescription;
                        }
                        this.changeSkillLv();
                        this.changeRankup();
                    }
                }
            },
            skillLv: function() {
                this.selectedCard.skilllevel = this.skillLv;
                if (this.unitInfo) {
                    if (this.selectedCardIndex != null)
                        this.changeSkillLv();
                }
            },
            rankup: function() {
                this.selectedCard.skilllevel = this.skillLv;
                if (this.unitInfo) {
                    if (this.selectedCardIndex != null)
                        this.changeRankup();
                }
            }
        },

        methods: {
            save: function() {
                this.$events.$emit('saveCard', this.selectedCard);
                this.modal.toggle();
            },
            close: function() {
                this.modal.toggle();
            },
            changeSkillLv: function() {
                let skillInfo = this.selectedCard.originalCardInfo.skill_info;
                let skillLv = this.selectedCard.skilllevel - 1;
                if (skillInfo) {
                    let s1 = skillInfo[skillLv].trigger_value;
                    let s2 = skillInfo[skillLv].activation_rate;
                    let s3 = skillInfo[skillLv].effect_value ? Number(skillInfo[skillLv].effect_value) : Number(skillInfo[skillLv].discharge_time);
                    this.selectedCard.skillDescription = skillInfo[0].description.replace(/\d+(\D+)\d+(\D+)\d*\.*\d*/, String(s1) + '$1' + String(s2) + '$2' + String(s3));
                }
            },
            changeRankup: function() {
                let originalCardInfo = this.selectedCard.originalCardInfo;
                if (this.rankup) {
                    this.selectedCard.mezame = 1;
                    this.selectedCard.smile = originalCardInfo.smile_max;
                    this.selectedCard.pure = originalCardInfo.pure_max;
                    this.selectedCard.cool = originalCardInfo.cool_max;
                    this.selectedCard[this.selectedCard.attribute] += originalCardInfo.after_love_max;
                    this.avatarSrc = 'assets/image/card/icon/' + 'rankup/' + String(this.selectedCard.cardid) + '.png'
                } else {
                    this.selectedCard.mezame = 0;
                    this.selectedCard.smile = originalCardInfo.smile;
                    this.selectedCard.pure = originalCardInfo.pure;
                    this.selectedCard.cool = originalCardInfo.cool;
                    this.selectedCard[this.selectedCard.attribute] += originalCardInfo.before_love_max;
                    this.avatarSrc = 'assets/image/card/icon/' + 'normal/' + String(this.selectedCard.cardid) + '.png'
                }
            }
        },
        computed: {
            printemps: {
                get: function() {
                    return this.selectedOptions['高坂穂乃果'] && this.selectedOptions['南ことり'] && this.selectedOptions['小泉花陽'];
                },
                set: function(val) {
                    if (val)
                        this.selectedOptions['高坂穂乃果'] = this.selectedOptions['南ことり'] = this.selectedOptions['小泉花陽'] = true;
                    else if (this.selectedOptions['高坂穂乃果'] && this.selectedOptions['南ことり'] && this.selectedOptions['小泉花陽'])
                        this.selectedOptions['高坂穂乃果'] = this.selectedOptions['南ことり'] = this.selectedOptions['小泉花陽'] = false;
                }
            },
            lilywhite: {
                get: function() {
                    return this.selectedOptions['園田海未'] && this.selectedOptions['星空凛'] && this.selectedOptions['東條希'];
                },
                set: function(val) {
                    if (val)
                        this.selectedOptions['園田海未'] = this.selectedOptions['星空凛'] = this.selectedOptions['東條希'] = true;
                    else if (this.selectedOptions['園田海未'] && this.selectedOptions['星空凛'] && this.selectedOptions['東條希'])
                        this.selectedOptions['園田海未'] = this.selectedOptions['星空凛'] = this.selectedOptions['東條希'] = false;
                }
            },
            bibi: {
                get: function() {
                    return this.selectedOptions['絢瀬絵里'] && this.selectedOptions['西木野真姫'] && this.selectedOptions['矢澤にこ'];
                },
                set: function(val) {
                    if (val)
                        this.selectedOptions['絢瀬絵里'] = this.selectedOptions['西木野真姫'] = this.selectedOptions['矢澤にこ'] = true;
                    else if (this.selectedOptions['絢瀬絵里'] && this.selectedOptions['西木野真姫'] && this.selectedOptions['矢澤にこ'])
                        this.selectedOptions['絢瀬絵里'] = this.selectedOptions['西木野真姫'] = this.selectedOptions['矢澤にこ'] = false;
                }
            },
            muse: {
                get: function() {
                    return this.printemps && this.lilywhite && this.bibi;
                },
                set: function(val) {
                    if (val)
                        this.printemps = this.lilywhite = this.bibi = true;
                    else if (this.printemps && this.lilywhite && this.bibi)
                        this.printemps = this.lilywhite = this.bibi = false;
                }
            },
            cyaron: {
                get: function() {
                    return this.selectedOptions['高海千歌'] && this.selectedOptions['渡辺曜'] && this.selectedOptions['黒澤ルビィ'];
                },
                set: function(val) {
                    if (val)
                        this.selectedOptions['高海千歌'] = this.selectedOptions['渡辺曜'] = this.selectedOptions['黒澤ルビィ'] = true;
                    else if (this.selectedOptions['高海千歌'] && this.selectedOptions['渡辺曜'] && this.selectedOptions['黒澤ルビィ'])
                        this.selectedOptions['高海千歌'] = this.selectedOptions['渡辺曜'] = this.selectedOptions['黒澤ルビィ'] = false;
                }
            },
            azalea: {
                get: function() {
                    return this.selectedOptions['松浦果南'] && this.selectedOptions['黒澤ダイヤ'] && this.selectedOptions['国木田花丸'];
                },
                set: function(val) {
                    if (val)
                        this.selectedOptions['松浦果南'] = this.selectedOptions['黒澤ダイヤ'] = this.selectedOptions['国木田花丸'] = true;
                    else if (this.selectedOptions['松浦果南'] && this.selectedOptions['黒澤ダイヤ'] && this.selectedOptions['国木田花丸'])
                        this.selectedOptions['松浦果南'] = this.selectedOptions['黒澤ダイヤ'] = this.selectedOptions['国木田花丸'] = false;
                }
            },
            guiltyKiss: {
                get: function() {
                    return this.selectedOptions['桜内梨子'] && this.selectedOptions['津島善子'] && this.selectedOptions['小原鞠莉'];
                },
                set: function(val) {
                    if (val)
                        this.selectedOptions['桜内梨子'] = this.selectedOptions['津島善子'] = this.selectedOptions['小原鞠莉'] = true;
                    else if (this.selectedOptions['桜内梨子'] && this.selectedOptions['津島善子'] && this.selectedOptions['小原鞠莉'])
                        this.selectedOptions['桜内梨子'] = this.selectedOptions['津島善子'] = this.selectedOptions['小原鞠莉'] = false;
                }
            },
            aqours: {
                get: function() {
                    return this.cyaron && this.azalea && this.guiltyKiss;
                },
                set: function(val) {
                    if (val)
                        this.cyaron = this.azalea = this.guiltyKiss = true;
                    else if (this.cyaron && this.azalea && this.guiltyKiss)
                        this.cyaron = this.azalea = this.guiltyKiss = false;
                }
            },
            year1st: {
                get: function() {
                    return this.selectedOptions['星空凛'] && this.selectedOptions['西木野真姫'] && this.selectedOptions['小泉花陽'] &&
                        this.selectedOptions['津島善子'] && this.selectedOptions['国木田花丸'] && this.selectedOptions['黒澤ルビィ'];
                },
                set: function(val) {
                    if (val)
                        this.selectedOptions['星空凛'] = this.selectedOptions['西木野真姫'] = this.selectedOptions['小泉花陽'] =
                        this.selectedOptions['津島善子'] = this.selectedOptions['国木田花丸'] = this.selectedOptions['黒澤ルビィ'] = true;
                    else if (this.selectedOptions['星空凛'] && this.selectedOptions['西木野真姫'] && this.selectedOptions['小泉花陽'] &&
                        this.selectedOptions['津島善子'] && this.selectedOptions['国木田花丸'] && this.selectedOptions['黒澤ルビィ'])
                        this.selectedOptions['星空凛'] = this.selectedOptions['西木野真姫'] = this.selectedOptions['小泉花陽'] =
                        this.selectedOptions['津島善子'] = this.selectedOptions['国木田花丸'] = this.selectedOptions['黒澤ルビィ'] = false;
                }
            },
            year2nd: {
                get: function() {
                    return this.selectedOptions['高坂穂乃果'] && this.selectedOptions['南ことり'] && this.selectedOptions['園田海未'] &&
                        this.selectedOptions['高海千歌'] && this.selectedOptions['桜内梨子'] && this.selectedOptions['渡辺曜'];
                },
                set: function(val) {
                    if (val)
                        this.selectedOptions['高坂穂乃果'] = this.selectedOptions['南ことり'] = this.selectedOptions['園田海未'] =
                        this.selectedOptions['高海千歌'] = this.selectedOptions['桜内梨子'] = this.selectedOptions['渡辺曜'] = true;
                    else if (this.selectedOptions['高坂穂乃果'] && this.selectedOptions['南ことり'] && this.selectedOptions['園田海未'] &&
                        this.selectedOptions['高海千歌'] && this.selectedOptions['桜内梨子'] && this.selectedOptions['渡辺曜'])
                        this.selectedOptions['高坂穂乃果'] = this.selectedOptions['南ことり'] = this.selectedOptions['園田海未'] =
                        this.selectedOptions['高海千歌'] = this.selectedOptions['桜内梨子'] = this.selectedOptions['渡辺曜'] = false;
                }
            },
            year3rd: {
                get: function() {
                    return this.selectedOptions['絢瀬絵里'] && this.selectedOptions['東條希'] && this.selectedOptions['矢澤にこ'] &&
                        this.selectedOptions['松浦果南'] && this.selectedOptions['黒澤ダイヤ'] && this.selectedOptions['小原鞠莉'];
                },
                set: function(val) {
                    if (val)
                        this.selectedOptions['絢瀬絵里'] = this.selectedOptions['東條希'] = this.selectedOptions['矢澤にこ'] =
                        this.selectedOptions['松浦果南'] = this.selectedOptions['黒澤ダイヤ'] = this.selectedOptions['小原鞠莉'] = true;
                    else if (this.selectedOptions['絢瀬絵里'] && this.selectedOptions['東條希'] && this.selectedOptions['矢澤にこ'] &&
                        this.selectedOptions['松浦果南'] && this.selectedOptions['黒澤ダイヤ'] && this.selectedOptions['小原鞠莉'])
                        this.selectedOptions['絢瀬絵里'] = this.selectedOptions['東條希'] = this.selectedOptions['矢澤にこ'] =
                        this.selectedOptions['松浦果南'] = this.selectedOptions['黒澤ダイヤ'] = this.selectedOptions['小原鞠莉'] = false;
                }
            }
        },
        mounted: function() {
            this.modal = new bsn.Modal(this.$refs.modal);
            this.$events.$on('openCardSelect', () => {
                this.modal.toggle();
            });
            this.$events.$on('getUnitInfo', unitInfo => {
                this.unitInfo = unitInfo;
                console.log('CardSelecting component received unitInfo. ', 'unitInfo.length: ', this.unitInfo.length);
            });
        }
    }
</script>

<style scoped>
    .well {
        margin-bottom: 0;
    }
    
    .main-attr {
        font-weight: bold
    }
    
    .input-sm {
        font-size: 14px;
    }
    
    .paper {
        padding: 5px;
        line-height: 0;
    }
    
    .paper-avatar {
        width: 86px;
        height: 86px;
        vertical-align: middle;
        margin: auto;
    }
    
    .mu-text-field {
        margin: 0;
        width: 100%;
        min-height: 0;
    }
    
    .mu-text-field-content {
        padding: 0;
    }
    
    .modal-footer {
        text-align: right;
    }
    
    hr {
        margin: 5px;
        color: rgba(0, 0, 0, .12);
        background-color: rgba(0, 0, 0, .12);
    }
    
    td,
    th {
        padding: 4px!important;
        text-align: center;
        vertical-align: middle;
    }
</style>