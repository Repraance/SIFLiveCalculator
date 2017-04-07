<template>
    <!-- 模态框（Modal） -->
    <div class="modal fade" id="cardSelectModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 class="modal-title" id="myModalLabel">Choose Card</h4>
                </div>
                <div class="modal-body" style="padding: 6px 3px 3px 6px">
                    <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                            <div class="row" style="margin-left: 0px; margin-right: 0px; margin-bottom: 0px">
                                <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4" style="padding-left: 0px; padding-right: 0px">
                                    <div class="well well-sm" style="margin-bottom: 8px; margin-left: 3px; margin-right: 3px">
                                        <div>

                                            <input id="cardMuse" class="checkbox-custom" type="checkbox" onclick="updateCardListFilter(this)">
                                            <label for="cardMuse" class="checkbox-custom-label">μ's</label>
                                        </div>
                                        <hr>
                                        <div>
                                            <div>
                                                <input id="cardPrintemps" class="checkbox-custom" type="checkbox" onclick="updateCardListFilter(this)">
                                                <label for="cardPrintemps" class="checkbox-custom-label">Printemps</label>
                                            </div>
                                            <div>
                                                <input id="cardlilywhite" class="checkbox-custom" type="checkbox" onclick="updateCardListFilter(this)">
                                                <label for="cardlilywhite" class="checkbox-custom-label">lilywhite</label>
                                            </div>
                                            <div>
                                                <input id="cardBiBi" class="checkbox-custom" type="checkbox" onclick="updateCardListFilter(this)">
                                                <label for="cardBiBi" class="checkbox-custom-label">BiBi</label>
                                            </div>
                                            <hr>
                                            <div>
                                                <input id="cardHonoka" class="checkbox-custom" type="checkbox" onclick="updateCardListFilter(this)">
                                                <label for="cardHonoka" class="checkbox-custom-label"><span style="color: orange">高坂穂乃果</span></label>
                                            </div>
                                            <div>
                                                <input id="cardEli" class="checkbox-custom" type="checkbox" onclick="updateCardListFilter(this)">
                                                <label for="cardEli" class="checkbox-custom-label"><span style="color: aqua">絢瀬絵里</span></label>
                                            </div>
                                            <div>
                                                <input id="cardKotori" class="checkbox-custom" type="checkbox" onclick="updateCardListFilter(this)">
                                                <label for="cardKotori" class="checkbox-custom-label"><span style="color: silver">南ことり</span></label>
                                            </div>
                                            <div>
                                                <input id="cardUmi" class="checkbox-custom" type="checkbox" onclick="updateCardListFilter(this)">
                                                <label for="cardUmi" class="checkbox-custom-label"><span style="color: blue">園田海未</span></label>
                                            </div>
                                            <div>
                                                <input id="cardRin" class="checkbox-custom" type="checkbox" onclick="updateCardListFilter(this)">
                                                <label for="cardRin" class="checkbox-custom-label"><span style="color: yellow">星空凛</span></label>
                                            </div>
                                            <div>
                                                <input id="cardMaki" class="checkbox-custom" type="checkbox" onclick="updateCardListFilter(this)">
                                                <label for="cardMaki" class="checkbox-custom-label"><span style="color: red">西木野真姫</span></label>
                                            </div>
                                            <div>
                                                <input id="cardNozomi" class="checkbox-custom" type="checkbox" onclick="updateCardListFilter(this)">
                                                <label for="cardNozomi" class="checkbox-custom-label"><span style="color: purple">東條希</span></label>
                                            </div>
                                            <div>
                                                <input id="cardHanayo" class="checkbox-custom" type="checkbox" onclick="updateCardListFilter(this)">
                                                <label for="cardHanayo" class="checkbox-custom-label"><span style="color: green">小泉花陽</span></label>
                                            </div>
                                            <div>
                                                <input id="cardNico" class="checkbox-custom" type="checkbox" onclick="updateCardListFilter(this)">
                                                <label for="cardNico" class="checkbox-custom-label"><span style="color: pink">矢澤にこ</span></label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4" style="padding-left: 0px; padding-right: 0px">
                                    <div class="well well-sm" style="margin-bottom: 8px; margin-left: 3px; margin-right: 3px">
                                        <div>
                                            <input id="cardAqours" class="checkbox-custom" type="checkbox" onclick="updateCardListFilter(this)">
                                            <label for="cardAqours" class="checkbox-custom-label">Aqours</label>
                                        </div>
                                        <hr>
                                        <div>
                                            <div>
                                                <input id="cardCYaRon" class="checkbox-custom" type="checkbox" onclick="updateCardListFilter(this)">
                                                <label for="cardCYaRon" class="checkbox-custom-label">CYaRon</label>
                                            </div>
                                            <div>
                                                <input id="cardAZALEA" class="checkbox-custom" type="checkbox" onclick="updateCardListFilter(this)">
                                                <label for="cardAZALEA" class="checkbox-custom-label">AZALEA</label>
                                            </div>
                                            <div>
                                                <input id="cardGuiltyKiss" class="checkbox-custom" type="checkbox" onclick="updateCardListFilter(this)">
                                                <label for="cardGuiltyKiss" class="checkbox-custom-label">Guilty Kiss</label>
                                            </div>
                                            <hr>
                                            <div>
                                                <input id="cardChika" class="checkbox-custom" type="checkbox" onclick="updateCardListFilter(this)">
                                                <label for="cardChika" class="checkbox-custom-label"><span style="color: #f08300">高海千歌</span></label>
                                            </div>
                                            <div>
                                                <input id="cardRiko" class="checkbox-custom" type="checkbox" onclick="updateCardListFilter(this)">
                                                <label for="cardRiko" class="checkbox-custom-label"><span style="color: #ff7575">桜内梨子</span></label>
                                            </div>
                                            <div>
                                                <input id="cardKanan" class="checkbox-custom" type="checkbox" onclick="updateCardListFilter(this)">
                                                <label for="cardKanan" class="checkbox-custom-label"><span style="color: #1bd5a8">松浦果南</span></label>
                                            </div>
                                            <div>
                                                <input id="cardDia" class="checkbox-custom" type="checkbox" onclick="updateCardListFilter(this)">
                                                <label for="cardDia" class="checkbox-custom-label"><span style="color: #ff2a2a">黒澤ダイヤ</span></label>
                                            </div>
                                            <div>
                                                <input id="cardYou" class="checkbox-custom" type="checkbox" onclick="updateCardListFilter(this)">
                                                <label for="cardYou" class="checkbox-custom-label"><span style="color: #68d1ff">渡辺曜</span></label>
                                            </div>

                                            <div>
                                                <input id="cardYoshiko" class="checkbox-custom" type="checkbox" onclick="updateCardListFilter(this)">
                                                <label for="cardYoshiko" class="checkbox-custom-label"><span style="color: #c3c3c3">津島善子</span></label>
                                            </div>
                                            <div>
                                                <input id="cardHanamaru" class="checkbox-custom" type="checkbox" onclick="updateCardListFilter(this)">
                                                <label for="cardHanamaru" class="checkbox-custom-label"><span style="color: #e2c800">国木田花丸</span></label>
                                            </div>
                                            <div>
                                                <input id="cardMari" class="checkbox-custom" type="checkbox" onclick="updateCardListFilter(this)">
                                                <label for="cardMari" class="checkbox-custom-label"><span style="color: #b761ff">小原鞠莉</span></label>
                                            </div>
                                            <div>
                                                <input id="cardRuby" class="checkbox-custom" type="checkbox" onclick="updateCardListFilter(this)">
                                                <label for="cardRuby" class="checkbox-custom-label"><span style="color: #f273c4">黒澤ルビィ</span></label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4" style="padding-left: 0px; padding-right: 0px">
                                    <div class="well well-sm" style="margin-bottom: 8px; margin-left: 3px; margin-right: 3px">
                                        <div>
                                            <input id="card1stYear" class="checkbox-custom" type="checkbox" onclick="updateCardListFilter(this)">
                                            <label for="card1stYear" class="checkbox-custom-label">1st Year</label>
                                        </div>
                                        <div>
                                            <input id="card2ndYear" class="checkbox-custom" type="checkbox" onclick="updateCardListFilter(this)">
                                            <label for="card2ndYear" class="checkbox-custom-label">2nd Year</label>
                                        </div>
                                        <div>
                                            <input id="card3rdYear" class="checkbox-custom" type="checkbox" onclick="updateCardListFilter(this)">
                                            <label for="card3rdYear" class="checkbox-custom-label">3rd Year</label>
                                        </div>
                                        <hr>
                                        <!--
                                        <div>
                                            <input id="cardN" class="checkbox-custom" type="checkbox" onclick="">
                                            <label for="cardN" class="checkbox-custom-label">N</label>
                                        </div>
                                        -->
                                        <div>
                                            <input id="cardR" class="checkbox-custom" type="checkbox" onclick="updateCardListFilter()">
                                            <label for="cardR" class="checkbox-custom-label">R</label>
                                        </div>
                                        <div>
                                            <input id="cardSR" class="checkbox-custom" type="checkbox" onclick="updateCardListFilter()" checked>
                                            <label for="cardSR" class="checkbox-custom-label">SR</label>
                                        </div>
                                        <div>
                                            <input id="cardSSR" class="checkbox-custom" type="checkbox" onclick="updateCardListFilter()" checked>
                                            <label for="cardSSR" class="checkbox-custom-label">SSR</label>
                                        </div>
                                        <div>
                                            <input id="cardUR" class="checkbox-custom" type="checkbox" onclick="updateCardListFilter()" checked>
                                            <label for="cardUR" class="checkbox-custom-label">UR</label>
                                        </div>
                                        <hr>
                                        <div>
                                            <input id="cardSmile" class="checkbox-custom" type="checkbox" onclick="updateCardListFilter()" checked>
                                            <label for="cardSmile" class="checkbox-custom-label"><span style="color: #E91E63">Smile</span></label>
                                        </div>
                                        <div>
                                            <input id="cardPure" class="checkbox-custom" type="checkbox" onclick="updateCardListFilter()" checked>
                                            <label for="cardPure" class="checkbox-custom-label"><span style="color: #4CAF50">Pure</span></label>
                                        </div>
                                        <div>
                                            <input id="cardCool" class="checkbox-custom" type="checkbox" onclick="updateCardListFilter()" checked>
                                            <label for="cardCool" class="checkbox-custom-label"><span style="color: #2196F3">Cool</span></label>
                                        </div>
                                        <hr>
                                        <div>
                                            <input id="cardRankUp" class="checkbox-custom" type="checkbox" onclick="changeCardSelect()" checked>
                                            <label for="cardRankUp" class="checkbox-custom-label">RankUp</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                            <div>
                                <div style="margin-bottom: 10px">
                                    <select name="card-list" id="card-list" class="form-control" required="required" onchange="changeCardSelect()"></select>
                                </div>
                                <table class="table card-list" style="max-width: 100%">
                                    <tbody>
                                        <tr>
                                            <td rowspan="3" style="width: 20%; text-align: center">
                                                <img id="avatar-card-list" src="assets/image/placeHolder.png">
                                            </td>
                                            <th style="width: 10%">
                                                <span style="color: #E91E63">Smile</span>
                                            </th>
                                            <td style="width: 30%" id="smile-card-list">N/A</td>
                                        </tr>
                                        <tr>
                                            <th>
                                                <span style="color: #4CAF50">Pure</span>
                                            </th>
                                            <td id="pure-card-list">N/A</td>
                                        </tr>
                                        <tr>
                                            <th>
                                                <span style="color: #2196F3">Cool</span>
                                            </th>
                                            <td id="cool-card-list">N/A</td>
                                        </tr>
                                        <tr>
                                            <th style="text-align: center">Center Skill</th>
                                            <th colspan="2">Description</th>
                                        </tr>
                                        <tr>
                                            <td style="text-align: center;padding: 8px" id="center-skill-card-list">N/A</td>
                                            <td colspan="2" style="padding: 8px" id="center-skill-description-card-list">N/A</td>
                                        </tr>
                                        <tr>
                                            <th style="text-align: center">Skill Lv</th>
                                            <th colspan="2">Description</th>
                                        </tr>

                                        <tr>
                                            <th style="text-align: center">
                                                <input type="number" class="form-control" id="skill-lv-card-list" value="1" min="1" max="8" step="1" onchange="changeSkillLv(this)">
                                            </th>
                                            <td colspan="2" id="skill-description-card-list">N/A</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Dismiss</button>
                    <button type="button" class="btn btn-primary" onclick="saveCard()">Save</button>
                </div>
            </div>
            <!-- /.modal-content -->
        </div>
        <!-- /.modal -->
    </div>
</template>

<script>
    export default {
        data() {
            return {
                unitInfo: null
            }
        },
        mounted: function() {
            this.$events.$on('getUnitInfo', unitInfo => {
                this.unitInfo = unitInfo;
                console.log('CardSelecting component received unitInfo. ', 'unitInfo.length: ', this.unitInfo.length);
            });
        }
    }
</script>

<style scoped>
    hr {
        margin: 10px;
    }
</style>