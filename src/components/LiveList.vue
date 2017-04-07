<template>
    <div>
        <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
            <div class="well well-sm">
                <div style="margin-bottom: 10px; margin-top: 10px">
                    <div style="margin-bottom: 4px; text-align: right">
                        <span style="font-size: 18px; float: left">First Live</span>
                        <input id="score1" class="radio-custom" type="radio" :disabled="liveSettingInfo.bonusType == 1 " value="1" v-model.number="liveSettingInfo.mfScoreUpIndex">
                        <label for="score1" class="radio-custom-label">Score Up</label>
                        <input id="skill1" class="radio-custom" type="radio" :disabled="liveSettingInfo.bonusType == 1" value="1" v-model.number="liveSettingInfo.mfSkillUpIndex">
                        <label for="skill1" class="radio-custom-label">Skill Up</label>
                    </div>
                    <select id="liveList1" class="form-control" v-model.number="liveSelected1" v-bind:style="{color: liveSelectedColor1}">
                            <option v-for="(live, index) in liveSettings" v-if="live.member_category == livesFilterArtist && live.difficulty == livesFilterDifficulty && live.attribute_icon_id == livesFilterAttribute" v-bind:value="index" v-bind:style="{color: colorIndex[live.attribute_icon_id]}">
                                {{ live.name + ' [' +live.difficulty_text + '] [' + live.s_rank_combo + ']' }}
                            </option>
                        </select>
                </div>
                <div style="margin-bottom: 10px">
                    <div style="margin-bottom: 4px; text-align: right">
                        <span style="font-size: 18px; float: left">Second Live</span>
                        <input id="score2" class="radio-custom" type="radio" :disabled="liveSettingInfo.bonusType != 2" value="2" v-model.number="liveSettingInfo.mfScoreUpIndex">
                        <label for="score2" class="radio-custom-label">Score Up</label>
                        <input id="skill2" class="radio-custom" type="radio" :disabled="liveSettingInfo.bonusType != 2" value="2" v-model.number="liveSettingInfo.mfSkillUpIndex">
                        <label for="skill2" class="radio-custom-label">Skill Up</label>
                    </div>

                    <select id="liveList2" class="form-control" :disabled="liveSettingInfo.bonusType != 2" v-model.number="liveSelected2" v-bind:style="{color: liveSelectedColor2}">
                            <option v-for="(live, index) in liveSettings" v-if="live.member_category == livesFilterArtist && live.difficulty == livesFilterDifficulty && live.attribute_icon_id == livesFilterAttribute" v-bind:value="index" v-bind:style="{color: colorIndex[live.attribute_icon_id]}">
                                {{ live.name + ' [' +live.difficulty_text + '] [' + live.s_rank_combo + ']' }}
                            </option>
                        </select>

                </div>
                <div style="margin-bottom: 10px">
                    <div style="margin-bottom: 4px; text-align: right">
                        <span style="font-size: 18px; float: left">Third Live</span>
                        <input id="score3" class="radio-custom" type="radio" :disabled="liveSettingInfo.bonusType != 2" value="3" v-model.number="liveSettingInfo.mfScoreUpIndex">
                        <label for="score3" class="radio-custom-label">Score Up</label>
                        <input id="skill3" class="radio-custom" type="radio" :disabled="liveSettingInfo.bonusType != 2" value="3" v-model.number="liveSettingInfo.mfSkillUpIndex">
                        <label for="skill3" class="radio-custom-label">Skill Up</label>
                    </div>

                    <select id="liveList3" class="form-control" :disabled="liveSettingInfo.bonusType != 2" v-model.number="liveSelected3" v-bind:style="{color: liveSelectedColor3}">
                            <option v-for="(live, index) in liveSettings" v-if="live.member_category == livesFilterArtist && live.difficulty == livesFilterDifficulty && live.attribute_icon_id == livesFilterAttribute" v-bind:value="index" v-bind:style="{color: colorIndex[live.attribute_icon_id]}">
                                {{ live.name + ' [' +live.difficulty_text + '] [' + live.s_rank_combo + ']' }}
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
                                        <input id="no-fc" class="checkbox-custom" type="checkbox" v-model="liveSettingInfo.notFC">
                                        <label for="no-fc" class="checkbox-custom-label">Not full combo</label>
                                    </span>
                                <input type="number" class="form-control" placeholder="Max Combo" v-model.number="liveSettingInfo.maxCombo" aria-describedby="max-combo-addon" :disabled="!liveSettingInfo.notFC" :max="totalCombo" min="0">
                            </div>
                        </div>
                    </div>
                    <div style="margin-bottom: 10px; text-align: center">
                        <input id="cf" class="radio-custom" type="radio" value="1" v-model.number="liveSettingInfo.bonusType">
                        <label for="cf" class="radio-custom-label">Challenge Festival (1 Live with Score Up and Skill Up)</label>
                    </div>
                    <div style="margin-bottom: 10px; text-align: center">
                        <input id="mf" class="radio-custom" type="radio" value="2" v-model.number="liveSettingInfo.bonusType">
                        <label for="mf" class="radio-custom-label" title="And you could choose random guest bonus above the live list">Medley Festival (3 Lives with Score Up, Skill Up and Optional Random Guest Bonus)</label>
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
                    <input id="muse" name="artist" class="radio-custom" type="radio" value="1" v-model="livesFilterArtist">
                    <label for="muse" class="radio-custom-label">μ's</label>

                    <input id="aqours" name="artist" class="radio-custom" value="2" type="radio" v-model="livesFilterArtist">
                    <label for="aqours" class="radio-custom-label">Aqours</label>
                </div>
                <div class="well well-sm" style="padding-top: 0px">
                    <h4>Attribute</h4>
                    <input id="smile" name="attribute" class="radio-custom" type="radio" value="1" v-model="livesFilterAttribute">
                    <label for="smile" class="radio-custom-label"><span style="color: #E91E63">Smile</span></label>

                    <input id="pure" name="attribute" class="radio-custom" type="radio" value="2" v-model="livesFilterAttribute">
                    <label for="pure" class="radio-custom-label"><span style="color: #4CAF50">Pure</span></label>

                    <input id="cool" name="attribute" class="radio-custom" type="radio" value="3" v-model="livesFilterAttribute">
                    <label for="cool" class="radio-custom-label"><span style="color: #2196F3">Cool</span></label>
                </div>

                <div class="well well-sm" style="padding-top: 0px; margin-bottom: 22px">
                    <h4>Difficulty</h4>
                    <input id="easy" name="difficulty" class="radio-custom" type="radio" value="1" v-model="livesFilterDifficulty">
                    <label for="easy" class="radio-custom-label">EASY</label>

                    <input id="normal" name="difficulty" class="radio-custom" type="radio" value="2" v-model="livesFilterDifficulty">
                    <label for="normal" class="radio-custom-label">NORMAL</label>

                    <input id="hard" name="difficulty" class="radio-custom" type="radio" value="3" v-model="livesFilterDifficulty">
                    <label for="hard" class="radio-custom-label">HARD</label>

                    <input id="expert" name="difficulty" class="radio-custom" type="radio" value="4" v-model="livesFilterDifficulty">
                    <label for="expert" class="radio-custom-label">EXPERT</label>

                    <input id="master" name="difficulty" class="radio-custom" type="radio" value="6" v-model="livesFilterDifficulty">
                    <label for="master" class="radio-custom-label">MASTER</label>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data: function() {
            return {
                colorIndex: {
                    1: '#E91E63',
                    2: '#4CAF50',
                    3: '#2196F3'
                },
                liveSettingInfo: {
                    'live1': {
                        'liveInfo': null,
                        'liveNotes': null
                    },
                    'live2': {
                        'liveInfo': null,
                        'liveNotes': null
                    },
                    'live3': {
                        'liveInfo': null,
                        'liveNotes': null
                    },
                    'perfectRate': 0.9,
                    'notFC': false,
                    'maxCombo': 0,
                    'bonusType': 0,
                    'mfScoreUpIndex': null,
                    'mfSkillUpIndex': null
                },
                liveSettings: null,
                liveSelected1: null,
                liveSelected2: null,
                liveSelected3: null,
                livesFilterArtist: 1,
                livesFilterAttribute: 1,
                livesFilterDifficulty: 4
            }
        },
        computed: {
            liveSelectedColor1: function() {
                if (this.liveSelected1) {
                    return this.colorIndex[this.liveSettings[this.liveSelected1].attribute_icon_id];
                }
            },
            liveSelectedColor2: function() {
                if (this.liveSelected2) {
                    return this.colorIndex[this.liveSettings[this.liveSelected2].attribute_icon_id];
                }
            },
            liveSelectedColor3: function() {
                if (this.liveSelected3) {
                    return this.colorIndex[this.liveSettings[this.liveSelected3].attribute_icon_id];
                }
            },
            totalCombo: function() {
                let combo = 0;
                if (this.liveSelected1)
                    combo += this.liveSettings[this.liveSelected1].s_rank_combo;
                if (this.liveSettingInfo.bonusType) {
                    if (this.liveSelected2)
                        combo += this.liveSettings[this.liveSelected2].s_rank_combo;
                    if (this.liveSelected3)
                        combo += this.liveSettings[this.liveSelected3].s_rank_combo;
                }
                return combo;
            }
        },
        watch: {
            livesFilterArtist: function() {
                this.resetLiveSelected();
            },
            livesFilterAttribute: function() {
                this.resetLiveSelected();
            },
            livesFilterDifficulty: function() {
                this.resetLiveSelected();
            },
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
                this.maxCombo = this.totalCombo;
            },
            liveSelected1: function() {
                if (this.liveSelected1) {
                    this.liveSettingInfo.live1.liveInfo = this.liveSettings[this.liveSelected1];
                } else {
                    this.liveSettingInfo.live1.liveInfo = null;
                    console.log('not selected')
                }
            },
            liveSelected2: function() {
                if (this.liveSelected2) {
                    this.liveSettingInfo.live2.liveInfo = this.liveSettings[this.liveSelected2];
                } else {
                    this.liveSettingInfo.live2.liveInfo = null;
                }
            },
            liveSelected3: function() {
                if (this.liveSelected3) {
                    this.liveSettingInfo.live3.liveInfo = this.liveSettings[this.liveSelected3];
                } else {
                    this.liveSettingInfo.live3.liveInfo = null;
                }
            },
            liveSettingInfo: {
                handler: function(val) {
                    if (val.mfSkillUpIndex == val.mfScoreUpIndex) {
                        val.mfScoreUpIndex = null;
                    }
                    if (val.mfScoreUpIndex == val.mfSkillUpIndex) {
                        val.mfSkillUpIndex = null;
                    }
                    console.log(val);
                    this.$events.$emit('getLiveSettingInfo', val);
                },
                deep: true
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


                    },
                    (response) => {
                        alert('aaaa');
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