<template>
    <div>
        <div class="row">
            <div class="col-xs-12 col-sm-12 col-md-8 col-lg-8">
                <div class="well well-sm mb10">

                    <table class="table team-list" style="margin-top: 0px">
                        <caption>
                            <div class="form-inline text-right">
                                <p style="float: left; margin-left: 10px; margin-right: 10px; margin-bottom: 4px"><b>Team Info</b></p>
                                <!--<input id="openFile" type="file" class="filestyle" accept=".sd" v-on:change="selectFile">-->
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
                                <th>Weight</th>
                                <td v-for="i in [0, 1, 2, 3, 4, 5, 6, 7, 8]">
                                    <input type="text" class="form-control input-sm" v-model="noteWeight[i]">
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
                                    <input v-bind:id="'rankup-' + i" class="checkbox-custom" type="checkbox" v-model.number="teamInfo[i].mezame">
                                    <label v-bind:for="'rankup-' + i" class="checkbox-custom-label">Yes</label>
                                </td>
                            </tr>
                            <tr id="smile-value">
                                <th><span style="color: #E91E63">Smile</span></th>
                                <td v-for="i in [0, 1, 2, 3, 4, 5, 6, 7, 8]">
                                    <input type="text" class="form-control input-sm" v-model.number="teamInfo[i].smile">
                                </td>
                            </tr>
                            <tr id="pure-value">
                                <th><span style="color: #4CAF50">Pure</span></th>
                                <td v-for="i in [0, 1, 2, 3, 4, 5, 6, 7, 8]">
                                    <input type="text" class="form-control input-sm" v-model.number="teamInfo[i].pure">
                                </td>
                            </tr>
                            <tr id="cool-value">
                                <th><span style="color: #2196F3">Cool</span></th>
                                <td v-for="i in [0, 1, 2, 3, 4, 5, 6, 7, 8]">
                                    <input type="text" class="form-control input-sm" v-model.number="teamInfo[i].cool">
                                </td>
                            </tr>
                            <tr id="skill-lv">
                                <th>Skill Lv</th>
                                <td v-for="i in [0, 1, 2, 3, 4, 5, 6, 7, 8]">
                                    <input type="number" class="form-control input-sm" min="1" max="8" step="1" v-model.number="teamInfo[i].skilllevel">
                                </td>
                            </tr>
                            <tr id="fixed-value">
                                <th>Fixed value</th>
                                <td v-for="i in [0, 1, 2, 3, 4, 5, 6, 7, 8]">
                                    <select name="fixed-value" class="form-control input-sm" v-model.number="teamInfo[i].gemnum">
                                <option value="0">0</option>
                                <option value="200">200</option>
                                <option value="450">450</option>
                                <option value="650">650</option>
                            </select>
                                </td>
                            </tr>
                            <tr id="single-percent">
                                <th>Single percent</th>
                                <td v-for="i in [0, 1, 2, 3, 4, 5, 6, 7, 8]">
                                    <select name="single-percent" class="form-control input-sm" v-model.number="teamInfo[i].gemsinglepercent">
                                <option value="0">0</option>
                                <option value="0.1">10%</option>
                                <option value="0.16">16%</option>
                                <option value="0.26">26%</option>
                            </select>
                                </td>
                            </tr>
                            <tr id="total-percent">
                                <th>Total percent</th>
                                <td v-for="i in [0, 1, 2, 3, 4, 5, 6, 7, 8]">
                                    <select name="total-percent" class="form-control input-sm" v-model.number="teamInfo[i].gemallpercent">
                                <option value="0">0</option>
                                <option value="0.018">1.8%</option>
                                <option value="0.024">2.4%</option>
                                <option value="0.042">4.2%</option>
                            </select>
                                </td>
                            </tr>
                            <tr>
                                <th>Charm / Heal</th>
                                <td v-for="i in [0, 1, 2, 3, 4, 5, 6, 7, 8]">
                                    <input v-bind:id="'charm-heal-' + i" class="checkbox-custom" type="checkbox" v-model.number="teamInfo[i].gemskill">
                                    <label v-bind:for="'charm-heal-' + i" class="checkbox-custom-label">Yes</label>
                                </td>
                            </tr>
                            <tr>
                                <th>Trick</th>
                                <td v-for="i in [0, 1, 2, 3, 4, 5, 6, 7, 8]">
                                    <input v-bind:id="'trick-' + i" class="checkbox-custom" type="checkbox" v-model.number="teamInfo[i].gemacc">
                                    <label v-bind:for="'trick-' + i" class="checkbox-custom-label">Yes</label>
                                </td>
                            </tr>
                            <tr id="slots">
                                <th>Slots</th>
                                <td v-for="i in [0, 1, 2, 3, 4, 5, 6, 7, 8]">
                                    <input type="text" class="form-control input-sm" v-model="slots[i]">
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4">
                <guest :defaultAttribute="teamInfo[0].skilllevel"></guest>
            </div>
        </div>
        
    </div>
</template>

<script>
    import cardSelect from './CardSelect.vue';
    import guest from './Guest.vue';

    let teamInfoSample = new Array(10);
    for (let i = 0; i < 9; i++) {
        teamInfoSample[i] = {
            "smile": 0,
            "pure": 0,
            "cool": 0,
            "cardid": 0,
            "skilllevel": 1,
            "mezame": 0,
            "gemnum": 0,
            "gemsinglepercent": 0,
            "gemallpercent": 0,
            "gemskill": 0,
            "gemacc": 0
        }
        teamInfoSample[9] = new Object();
    }

    export default {
        name: 'team-list',
        data: function() {
            return {
                file: null,
                teamInfo: teamInfoSample,
                unitInfo: null
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
            loadFile: function() {
                if (this.file) {
                    let reader = new FileReader();
                    reader.readAsText(this.file, 'UTF-8');
                    reader.onload = (event) => {
                        let data = event.target.result;
                        let rawTeamInfo = JSON.parse(decodeURI(data));
                        for (let i = 0; i < 9; i++) {
                            for (let key in rawTeamInfo[i]) {
                                rawTeamInfo[i][key] = Number(rawTeamInfo[i][key]);
                            }
                        }
                        this.teamInfo = rawTeamInfo;
                    }
                }
            },
            openCardSelectModal: function() {
                $('#cardSelectModal').modal('toggle');
            },
            getUnitInfo: function() {
                this.$http.get('assets/json/unit.json').then(
                    (response) => {
                        this.unitInfo = response.body;
                    });
            }
        },
        props: ['noteWeight'],
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
                    let member = this.teamInfo[i];
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
                    if (this.teamInfo[i].cardid) {
                        if (this.teamInfo[i].mezame) {
                            src.push('assets/image/card/icon/' + 'rankup/' + String(this.teamInfo[i].cardid) + '.png');
                        } else {
                            src.push('assets/image/card/icon/' + 'normal/' + String(this.teamInfo[i].cardid) + '.png');
                        }
                    } else {
                        src.push('assets/image/placeHolder.png');
                    }
                }
                return src;
            }
        },
        mounted: function() {
            this.getUnitInfo();
        }
    }
</script>

<style>
    #file-input-addon {
        border-left-color: rgb(204, 204, 204);
        border-left-style: solid;
        border-left-width: 1px;
    }
</style>