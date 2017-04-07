<template>
    <div>
        <div class="col-xs-12 col-sm-12 col-md-8 col-lg-8">
            <div class="well well-sm mb10">
                <table class="table team-list" style="margin-top: 0px">
                    <caption>
                        <div class="form-inline text-right">
                            <p style="float: left; margin-left: 10px; margin-right: 10px; margin-bottom: 4px"><b>Team Info</b></p>
                            <div class="input-group" style="margin-bottom: 4px">
                                <input type="text" class="form-control" :placeholder="fileName" aria-describedby="file-input-addon" disabled>
                                <label class="btn btn-default btn-file input-group-addon" id="file-input-addon">
                                        <span class="glyphicon glyphicon-folder-open"></span>
                                        Choose File
                                        <input type="file" style="display: none" accept=".sd" v-on:change="selectFile">
                                    </label>
                            </div>
                            <button class="btn btn-default" style="margin-bottom: 4px" v-on:click="loadFile">Load File</button>
                            <button class="btn btn-default" style="margin-bottom: 4px">Save File</button>

                        </div>
                    </caption>

                    <tbody>
                        <tr id="weight">
                            <th style="width: 12%">Weight</th>
                            <td v-for="i in [0, 1, 2, 3, 4, 5, 6, 7, 8]">
                                <input type="text" class="form-control input-sm" v-model:number="notesWeight[i]">
                            </td>
                        </tr>

                        <tr id="avatar">
                            <th>Avatar<br><span style="font-weight: normal;font-size: 10px">Click to<br>change</span></th>
                            <td v-for="i in [0, 1, 2, 3, 4, 5, 6, 7, 8]">
                                <img v-bind:src="avatarSrc[i]" v-bind:id="'avatar-' + i" class="img-responsive" @click="openCardSelectModal">
                            </td>
                        </tr>
                        <tr>
                            <th>Rankup</th>
                            <td v-for="i in [0, 1, 2, 3, 4, 5, 6, 7, 8]">
                                <input v-bind:id="'rankup-' + i" class="checkbox-custom" type="checkbox" v-model.number="team.memberInfo[i].mezame" @click="changeAttribute">
                                <label v-bind:for="'rankup-' + i" class="checkbox-custom-label">Yes</label>
                            </td>
                        </tr>
                        <tr id="smile-value">
                            <th style="color: #E91E63">Smile</th>
                            <td v-for="i in [0, 1, 2, 3, 4, 5, 6, 7, 8]">
                                <input type="text" class="form-control input-sm" v-model.number="team.memberInfo[i].smile" style="color: #E91E63" readonly>
                            </td>
                        </tr>
                        <tr id="pure-value">
                            <th style="color: #4CAF50">Pure</th>
                            <td v-for="i in [0, 1, 2, 3, 4, 5, 6, 7, 8]">
                                <input type="text" class="form-control input-sm" v-model.number="team.memberInfo[i].pure" style="color: #4CAF50" readonly>
                            </td>
                        </tr>
                        <tr id="cool-value">
                            <th style="color: #2196F3">Cool</th>
                            <td v-for="i in [0, 1, 2, 3, 4, 5, 6, 7, 8]">
                                <input type="text" class="form-control input-sm" v-model.number="team.memberInfo[i].cool" style="color: #2196F3" readonly>
                            </td>
                        </tr>
                        <tr id="skill-lv">
                            <th>Skill Lv</th>
                            <td v-for="i in [0, 1, 2, 3, 4, 5, 6, 7, 8]">
                                <input type="number" class="form-control input-sm" min="1" max="8" step="1" v-model.number="team.memberInfo[i].skilllevel">
                            </td>
                        </tr>
                        <tr id="fixed-value">
                            <th>Fixed</th>
                            <td v-for="i in [0, 1, 2, 3, 4, 5, 6, 7, 8]">
                                <select name="fixed-value" class="form-control input-sm" v-model.number="team.memberInfo[i].gemnum">
                                        <option value="0">0</option>
                                        <option value="200">200</option>
                                        <option value="450">450</option>
                                        <option value="650">650</option>
                                    </select>
                            </td>
                        </tr>
                        <tr id="single-percent">
                            <th>Single</th>
                            <td v-for="i in [0, 1, 2, 3, 4, 5, 6, 7, 8]">
                                <select name="single-percent" class="form-control input-sm" v-model.number="team.memberInfo[i].gemsinglepercent">
                                        <option value="0">0</option>
                                        <option value="0.1">10%</option>
                                        <option value="0.16">16%</option>
                                        <option value="0.26">26%</option>
                                    </select>
                            </td>
                        </tr>
                        <tr id="total-percent">
                            <th>Total</th>
                            <td v-for="i in [0, 1, 2, 3, 4, 5, 6, 7, 8]">
                                <select name="total-percent" class="form-control input-sm" v-model.number="team.memberInfo[i].gemallpercent">
                                        <option value="0">0</option>
                                        <option value="0.018">1.8%</option>
                                        <option value="0.024">2.4%</option>
                                        <option value="0.042">4.2%</option>
                                    </select>
                            </td>
                        </tr>
                        <tr>
                            <th>Skill</th>
                            <td v-for="i in [0, 1, 2, 3, 4, 5, 6, 7, 8]">
                                <input v-bind:id="'charm-heal-' + i" class="checkbox-custom" type="checkbox" v-model.number="team.memberInfo[i].gemskill">
                                <label v-bind:for="'charm-heal-' + i" class="checkbox-custom-label">Yes</label>
                            </td>
                        </tr>
                        <tr>
                            <th>Trick</th>
                            <td v-for="i in [0, 1, 2, 3, 4, 5, 6, 7, 8]">
                                <input v-bind:id="'trick-' + i" class="checkbox-custom" type="checkbox" v-model.number="team.memberInfo[i].gemacc">
                                <label v-bind:for="'trick-' + i" class="checkbox-custom-label">Yes</label>
                            </td>
                        </tr>
                        <tr id="slots">
                            <th>Slots</th>
                            <td v-for="i in [0, 1, 2, 3, 4, 5, 6, 7, 8]">
                                <input type="text" class="form-control input-sm" v-model="slots[i]">
                            </td>
                        </tr>
                        <!--
                            <tr id="strength">
                                <th>Strength</th>
                                <td v-for="i in [0, 1, 2, 3, 4, 5, 6, 7, 8]">
                                    <input type="text" class="form-control input-sm">
                                </td>
                            </tr>
                            <tr id="attr-strength">
                                <th>-- Attr</th>
                                <td v-for="i in [0, 1, 2, 3, 4, 5, 6, 7, 8]">
                                    <input type="text" class="form-control input-sm">
                                </td>
                            </tr>
                            <tr id="skill-strength">
                                <th>-- Skill</th>
                                <td v-for="i in [0, 1, 2, 3, 4, 5, 6, 7, 8]">
                                    <input type="text" class="form-control input-sm">
                                </td>
                            </tr>
                            <tr id="real-strength">
                                <th>-- Real</th>
                                <td v-for="i in [0, 1, 2, 3, 4, 5, 6, 7, 8]">
                                    <input type="text" class="form-control input-sm">
                                </td>
                            </tr>
                            -->
                        <tr id="center-skill">
                            <th>Center Skill</th>
                            <td colspan="9">
                                {{ centerSkill }}
                            </td>
                        </tr>
                        <tr id="team-attr">
                            <th>Team Attribute</th>
                            <td colspan="3">
                                <div class="attr-box-smile">
                                    {{ team.teamAttribute.smile_string }}
                                </div>
                            </td>
                            <td colspan="3">
                                <div class="attr-box-pure">
                                    {{ team.teamAttribute.pure_string }}
                                </div>
                            </td>
                            <td colspan="3">
                                <div class="attr-box-cool">
                                    {{ team.teamAttribute.cool_string }}
                                </div>
                            </td>
                        </tr>

                    </tbody>
                </table>
            </div>
        </div>
        <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4">
            <div class="well well-sm">
                <div class="well well-sm" style="margin-bottom: 10px">
                    <input id="guest" class="checkbox-custom" type="checkbox" v-model="team.guestInfo.guestEnabled">
                    <label for="guest" class="checkbox-custom-label">Add guest</label>
                </div>
                <div class="well well-sm" style="margin-bottom: 10px;padding-top: 0px">
                    <h4>Guest Center Skill</h4>
                    <h5>Team {{ teamDefaultAttribute }} attribute up by 9% or 12% of</h5>

                    <div v-for="(option, index) in guestOptions" v-if="index >= 11" style="display: inline">
                        <input :value="option[1]" class="radio-custom" type="radio" :id="'guest' + option[0]" v-model="team.guestInfo.effectType" :disabled="!team.guestInfo.guestEnabled">
                        <label :for="'guest' + option[0]" class="radio-custom-label" :style="{color: option[2]}">{{ option[0] }}</label>
                    </div>

                </div>
                <div class="well well-sm" style="margin-bottom: 10px;padding-top: 0px">
                    <h4>Guest Center Extra Skill</h4>
                    <h5>Team {{ teamDefaultAttribute }} attribute up by 3% of</h5>
                    <div v-for="(option, index) in guestOptions" v-if="index >= 9 && index <= 10" style="display: inline">
                        <input :value="option[1]" class="radio-custom" type="radio" :id="'guest' + option[0]" v-model="team.guestInfo.extraEffectType" :disabled="!team.guestInfo.guestEnabled">
                        <label :for="'guest' + option[0]" class="radio-custom-label">{{ option[0] }}</label>
                    </div>
                    <hr>
                    <h5>Team {{ teamDefaultAttribute }} attribute up by 6% of</h5>
                    <div v-for="(option, index) in guestOptions" v-if="index < 9" style="display: inline">
                        <input :value="option[1]" class="radio-custom" type="radio" :id="'guest' + option[0]" v-model="team.guestInfo.extraEffectType" :disabled="!team.guestInfo.guestEnabled">
                        <label :for="'guest' + option[0]" class="radio-custom-label">{{ option[0] }}</label>
                        <div style="height: 2px" v-if="(index + 1) % 3 == 0"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import cardSelect from './CardSelect.vue';
    import guest from './Guest.vue';

    import {
        attributeIndex,
        memberTagIndex,
        japaneseAttributeIndex
    } from '../lib/indexes.js';

    import {
        teamInfoSample,
        noteWeightSample
    } from '../lib/samples.js';

    import _ from 'lodash';

    import {
        changeAttributeWithRankup
    } from '../lib/misc.js';

    import Team from '../lib/team.js';

    export default {
        name: 'team-list',
        data: function() {
            return {
                file: null,
                unitInfo: null,
                notesWeight: [],
                centerSkill: 'N / A',
                teamDefaultAttribute: 'default',
                team: new Team(),
                guestEnabled: false,
                guestOptions: [
                    ['1st Year', 1],
                    ['2nd Year', 2],
                    ['3rd Year', 3],
                    ['Printemps', 6],
                    ['lily white', 7],
                    ['BiBi', 8],
                    ['CYaRon！', 9],
                    ['AZALEA', 10],
                    ['Guilty Kiss', 11],
                    ["μ's", 4],
                    ['Aqours', 5],
                    ['Smile', 1, '#E91E63'],
                    ['Pure', 2, '#4CAF50'],
                    ['Cool', 3, '#2196F3']
                ]
            }
        },
        components: {
            'card-select': cardSelect,
            'guest': guest
        },
        methods: {
            selectFile: function(event) {
                this.file = event.target.files[0];
                console.log(this.file);
            },
            appendOriginalCardInfo: function(member) {
                for (let i = 0; i < this.unitInfo.length; i++) {
                    if (this.unitInfo[i].unit_number == member.cardid) {
                        member.originalCardInfo = this.unitInfo[i];
                        member.attribute_id = member.originalCardInfo.attribute_id;
                        member.attribute = attributeIndex[member.attribute_id];
                    }
                }
            },
            loadFile: function() {
                if (this.file) {
                    let reader = new FileReader();
                    reader.readAsText(this.file, 'UTF-8');
                    reader.onload = (event) => {
                        let data = event.target.result;
                        let rawTeamInfo = JSON.parse(decodeURI(data));
                        for (let i = 0; i < 9; i++) {
                            for (let key in rawTeamInfo[i]) {
                                this.team.memberInfo[i][key] = Number(rawTeamInfo[i][key]);
                            }
                            this.appendOriginalCardInfo(this.team.memberInfo[i]);
                        }
                        console.log(this.team.memberInfo);
                    }
                }
            },
            openCardSelectModal: function() {
                // jQuery
                $('#cardSelectModal').modal('toggle');
            },
            getUnitInfo: function() {
                this.$http.get('assets/json/unit.json').then(
                    (response) => {
                        this.unitInfo = response.body;
                        this.$events.$emit('getUnitInfo', this.unitInfo);
                    });
            },
            addNotesWeight: function(n1, n2) {
                for (let i = 0; i < 9; i++) {
                    n1[i] += n2[i];
                }
            },
            changeNotesWeight: function(weight) {
                this.notesWeight = weight;
            },
            changeAttribute: function(event) {
                let index = Number(event.target.id.slice(-1));
                if (this.team.memberInfo[index].cardid) {
                    changeAttributeWithRankup(this.team.memberInfo[index]);
                }
            },
            changeCenterSkill: function() {
                let centerSkillDescription = 'N / A'
                if (this.team.memberInfo[4].cardid) {
                    let leaderSkillInfo = this.team.memberInfo[4].originalCardInfo.leader_skill_info;
                    let leaderExtraSkillInfo = this.team.memberInfo[4].originalCardInfo.leader_extra_skill_info;
                    if (leaderSkillInfo)
                        centerSkillDescription = leaderSkillInfo.name + '：' + leaderSkillInfo.description;
                    if (leaderExtraSkillInfo) {
                        let memberTagId = leaderExtraSkillInfo.member_tag_id;
                        let effectValue = leaderExtraSkillInfo.effect_value;
                        let effectType = leaderExtraSkillInfo.leader_skill_effect_type;
                        let extraCenterSkillDescription = memberTagIndex[memberTagId] + 'のメンバーはさらに' + japaneseAttributeIndex[effectType] + 'Pが' + effectValue + '%UPする'
                        centerSkillDescription += ' + ' + extraCenterSkillDescription;
                    }
                    this.teamDefaultAttribute = this.team.memberInfo[4].attribute;
                } else {
                    this.teamDefaultAttribute = 'default';
                }
                this.centerSkill = centerSkillDescription;
            }
        },
        computed: {
            fileName: function() {
                if (this.file)
                    return this.file.name;
                else
                    return null;
            },
            slots: function() {
                let slot = [];
                for (let i = 0; i < 9; i++) {
                    let member = this.team.memberInfo[i];
                    let currentSlot = 0;
                    switch (member.gemnum) {
                        case 0:
                            break;
                        case 200:
                            currentSlot += 1;
                            break;
                        case 450:
                            currentSlot += 2;
                            break;
                        case 650:
                            currentSlot += 3;
                            break;
                    }
                    switch (member.gemsinglepercent) {
                        case 0:
                            break;
                        case 0.1:
                            currentSlot += 2;
                            break;
                        case 0.16:
                            currentSlot += 3;
                            break;
                        case 0.26:
                            currentSlot += 5;
                            break;
                    }
                    switch (member.gemallpercent) {
                        case 0:
                            break;
                        case 0.018:
                            currentSlot += 3;
                            break;
                        case 0.024:
                            currentSlot += 4;
                            break;
                        case 0.042:
                            currentSlot += 7;
                            break;
                    }
                    if (member.gemskill)
                        currentSlot += 4;
                    if (member.gemacc)
                        currentSlot += 4;
                    slot.push(currentSlot);
                }
                return slot;
            },
            avatarSrc: function() {
                let src = [];
                for (let i = 0; i < 9; i++) {
                    if (this.team.memberInfo[i].cardid) {
                        if (this.team.memberInfo[i].mezame) {
                            src.push('assets/image/card/icon/' + 'rankup/' + String(this.team.memberInfo[i].cardid) + '.png');
                        } else {
                            src.push('assets/image/card/icon/' + 'normal/' + String(this.team.memberInfo[i].cardid) + '.png');
                        }
                    } else {
                        src.push('assets/image/placeHolder.png');
                    }
                }
                return src;
            }
        },
        watch: {
            team: {
                handler: function(val) {
                    this.changeCenterSkill();
                    val.calculateTeamAttribute();
                    console.log(this.team.teamAttribute);
                    this.$events.$emit('getTeam', val);
                },
                deep: true
            }
        },
        mounted: function() {
            this.getUnitInfo();
            this.$events.$on('getLiveSettingInfo', liveSettingInfo => {
                let notesWeight = [0, 0, 0, 0, 0, 0, 0, 0, 0];
                if (liveSettingInfo.live1.liveInfo)
                    this.addNotesWeight(notesWeight, liveSettingInfo.live1.liveInfo.notes_weight);
                if (liveSettingInfo.live2.liveInfo)
                    this.addNotesWeight(notesWeight, liveSettingInfo.live2.liveInfo.notes_weight);
                if (liveSettingInfo.live3.liveInfo)
                    this.addNotesWeight(notesWeight, liveSettingInfo.live3.liveInfo.notes_weight);
                this.changeNotesWeight(notesWeight);
            });
        }
    }
</script>

<style scoped>
    hr {
        margin: 10px;
    }
    
    h5 {
        font-size: 15px;
        margin-bottom: 5px;
    }
    
    .guest-option-box {
        margin-top: 4px;
    }
    
    #file-input-addon {
        border-left-color: rgb(204, 204, 204);
        border-left-style: solid;
        border-left-width: 1px;
    }
    
    .input-sm {
        font-size: 14px;
        height: 24px;
    }
    
    table {
        table-layout: fixed;
    }
    
    th,
    td {
        text-align: center;
        vertical-align: middle!important;
        border-top: none !important;
        padding: 4px 1px 1px 1px!important;
    }
    
    .form-control[readonly] {
        background-color: #fafafa;
    }
    
    .attr-box-smile {
        width: 80%;
        margin: auto;
        border: 1px solid #E91E63;
        border-radius: 10px;
        background-color: #E91E63;
        color: white;
        box-shadow: 0 0 2px red;
    }
    
    .attr-box-pure {
        width: 80%;
        margin: auto;
        border: 1px solid #4CAF50;
        border-radius: 10px;
        background-color: #4CAF50;
        color: white;
        box-shadow: 0 0 2px green;
    }
    
    .attr-box-cool {
        width: 80%;
        margin: auto;
        border: 1px solid #2196F3;
        border-radius: 10px;
        background-color: #2196F3;
        color: white;
        box-shadow: 0 0 2px blue;
    }
    
    _::-webkit-full-page-media,
    _:future,
     :root .safari_only .table,
    .input-sm {
        font-size: 11px;
    }
</style>