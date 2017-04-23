<template>
    <div>
        <div style="margin-bottom: 10px">
            <button type="button" class="btn btn-large btn-block btn-primary" @click="calculate">Calculate</button>
        </div>
        <div class="well well-sm">
            <p><b id="result">Expected score: {{ expectedScore }}</b></p>
        </div>
    </div>
</template>

<script>
    import LiveCalculator from '../lib/liveCalculator.js'
    export default {
        data() {
            return {
                liveSettingInfo: null,
                team: null,
                unitInfo: null,
                liveCalculator: new LiveCalculator(),
                expectedScore: null
            }
        },
        methods: {
            calculate: function() {
                this.liveCalculator.setTeam(this.team);
                this.liveCalculator.setLiveSettingInfo(this.liveSettingInfo);
                this.expectedScore = this.liveCalculator.calculate().toFixed(2);
            },
            getLiveNotes: function(live) {
                if (live.liveInfo) {
                    let notesSettingAsset = live.liveInfo.notes_setting_asset;
                    this.$http.get('assets/json/maps/latest/' + notesSettingAsset).then(
                        (response) => {
                            live.liveNotes = response.body;
                            let NotesCount = live.liveNotes.length;
                            for (let i = 0; i < NotesCount; i++) {
                                live.liveNotes[i].timing_sec = parseInt(live.liveNotes[i].timing_sec * 1000);
                                // hold
                                if (live.liveNotes[i].effect == 3) {
                                    live.liveNotes[i].effect_value = parseInt(live.liveNotes[i].effect_value * 1000);
                                    let holdEnding = JSON.parse(JSON.stringify(live.liveNotes[i]));
                                    holdEnding.effect_value = live.liveNotes[i].timing_sec;
                                    holdEnding.timing_sec = live.liveNotes[i].timing_sec + live.liveNotes[i].effect_value + 1;
                                    holdEnding.effect = 5;
                                    live.liveNotes.push(holdEnding);
                                }
                            }
                            live.liveNotes.sort(function(x, y) {
                                return x.timing_sec - y.timing_sec;
                            })
                            console.log(live);
                        });
                }
            }
        },
        mounted: function() {
            this.$events.$on('getLiveSettingInfo', liveSettingInfo => {
                this.liveSettingInfo = JSON.parse(JSON.stringify(liveSettingInfo));
                this.getLiveNotes(this.liveSettingInfo.lives[0]);
                if (liveSettingInfo.bonusType == 2) {
                    this.getLiveNotes(this.liveSettingInfo.lives[1]);
                    this.getLiveNotes(this.liveSettingInfo.lives[2]);
                }
            });
            this.$events.$on('getTeam', team => {
                this.team = team;
                console.log('Calculating component received team', this.team);
            });
        }

    }
</script>