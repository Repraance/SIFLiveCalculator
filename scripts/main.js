$(document).ready(function() {
    loadMapsJSON();
    initLiveList();
    updateLiveLists();
    loadJSONs();
    $('#liveList2Frame').hide();
    $('#liveList3Frame').hide();
    disableEnableGuest();
})

var mapsJson;
var unit_m;
var liveList = new Array();
var teamInfo;
var colorIndex = {
    1: '#E91E63',
    2: '#4CAF50',
    3: '#2196F3'
}

var attributeIndex = {
    1: 'smile',
    2: 'pure',
    3: 'cool'
}

var unit_leader_skill_extra_m_url = 'https://raw.githubusercontent.com/Repraance/SIFCardManager/master/data/json/unit_leader_skill_extra_m.json';
var unit_leader_skill_m_url = 'https://raw.githubusercontent.com/Repraance/SIFCardManager/master/data/json/unit_leader_skill_m.json';
var unit_m_url = 'https://raw.githubusercontent.com/Repraance/SIFCardManager/master/data/json/unit_m.json';
var unit_skill_level_m_url = 'https://raw.githubusercontent.com/Repraance/SIFCardManager/master/data/json/unit_skill_level_m.json';
var unit_skill_m_url = 'https://raw.githubusercontent.com/Repraance/SIFCardManager/master/data/json/unit_skill_m.json';
var unit_type_member_tag_m_url = 'https://raw.githubusercontent.com/Repraance/SIFCardManager/master/data/json/unit_type_member_tag_m.json';

function loadMapsJSON() {
    $.ajaxSettings.async = false;
    $.getJSON('https://raw.githubusercontent.com/iebb/SIFMaps/master/maps.min.json',
        function(json) {
            mapsJson = json;
        })
}

function loadJSONs() {
    $.ajaxSettings.async = true;
    $.getJSON(unit_leader_skill_extra_m_url,
        function(json) {
            unit_leader_skill_extra_m = json;
        })

    $.getJSON(unit_leader_skill_m_url,
        function(json) {
            unit_leader_skill_m = json;
        })

    $.getJSON(unit_m_url,
        function(json) {
            unit_m = json;
        })

    $.getJSON(unit_skill_level_m_url,
        function(json) {
            unit_skill_level_m = json;
        })

    $.getJSON(unit_skill_m_url,
        function(json) {
            unit_skill_m = json;
        })

    $.getJSON(unit_type_member_tag_m_url,
        function(json) {
            unit_type_member_tag_m = json;
        })
}


function initLiveList() {
    // Sort live by live_track_id and difficulty
    mapsJson = mapsJson.sort(function(x, y) {
        if (x.live_track_id !== y.live_track_id) {
            return x.live_track_id - y.live_track_id;
        } else {
            return x.difficulty - y.difficulty;
        }
    });
    // Generate liveList
    for (var i = 0; i < mapsJson.length; i++) {
        var currentLive = mapsJson[i];
        if (currentLive.difficulty === 5) {
            continue;
        }
        var liveTag = new Object();
        liveTag.name = currentLive.name;
        liveTag.attribute_icon_id = currentLive.attribute_icon_id;
        liveTag.member_category = currentLive.member_category;
        liveTag.difficulty_text = currentLive.difficulty_text;
        liveTag.live_setting_id = currentLive.live_setting_id;
        liveList.push(liveTag);
    }
}

function updateLiveLists() {
    if (document.getElementById('liveList1')) {
        updateLiveList('liveList1');
    }
    if (document.getElementById('liveList2')) {
        updateLiveList('liveList2');
    }
    if (document.getElementById('liveList3')) {
        updateLiveList('liveList3');
    }
}

function updateLiveList(id) {
    var aqoursChecked = document.getElementById('aqours').checked;
    var museChecked = document.getElementById('muse').checked;
    var smileChecked = document.getElementById('smile').checked;
    var pureChecked = document.getElementById('pure').checked;
    var coolChecked = document.getElementById('cool').checked;
    var easyChecked = document.getElementById('easy').checked;
    var normalChecked = document.getElementById('normal').checked;
    var hardChecked = document.getElementById('hard').checked;
    var expertChecked = document.getElementById('expert').checked;
    var masterChecked = document.getElementById('master').checked;

    var lives = document.getElementById(id);
    var selectedLive = lives.options[lives.selectedIndex];
    if (selectedLive !== undefined) {
        var selectedLiveName = lives.options[lives.selectedIndex].text;
        var selectedLiveId = lives.options[lives.selectedIndex].value;
    }
    lives.options.length = 0;

    for (var i = 0; i < liveList.length; i++) {
        var currentLive = liveList[i];
        switch (currentLive.member_category) {
            case 1:
                if (!museChecked) {
                    continue;
                }
                break;
            case 2:
                if (!aqoursChecked) {
                    continue;
                }
                break;
        }

        switch (currentLive.attribute_icon_id) {
            case 1:
                if (!smileChecked) {
                    continue;
                }
                break;
            case 2:
                if (!pureChecked) {
                    continue;
                }
                break;
            case 3:
                if (!coolChecked) {
                    continue;
                }
                break;
        }

        switch (currentLive.difficulty_text) {
            case 'EASY':
                if (!easyChecked) {
                    continue;
                }
                break;
            case 'NORMAL':
                if (!normalChecked) {
                    continue;
                }
                break;
            case 'HARD':
                if (!hardChecked) {
                    continue;
                }
                break;
            case 'EXPERT':
                if (!expertChecked) {
                    continue;
                }
                break;
            case 'MASTER':
                if (!masterChecked) {
                    continue;
                }
                break;
        }
        lives.options.add(new Option(currentLive.name + ' [' + currentLive.difficulty_text + ']', currentLive.live_setting_id));
        lives[lives.options.length - 1].style.color = colorIndex[currentLive.attribute_icon_id];
        if (currentLive.live_setting_id == selectedLiveId) {
            lives[lives.options.length - 1].selected = true;
            lives[lives.options.length - 1]
        }
    }
    changeSelectColors();
}

function changeSelectColors() {
    if (document.getElementById('liveList1')) {
        changeSelectColor('liveList1');
    }
    if (document.getElementById('liveList2')) {
        changeSelectColor('liveList2');
    }
    if (document.getElementById('liveList3')) {
        changeSelectColor('liveList3');
    }
}

function changeSelectColor(id) {
    var lives = document.getElementById(id);
    var selectedLive = lives.options[lives.selectedIndex];
    if (selectedLive !== undefined) {
        lives.style.color = selectedLive.style.color;
    }
}

function loadFile() {
    var resultFile = document.getElementById('openFile').files[0];
    if (resultFile) {
        var reader = new FileReader();
        reader.readAsText(resultFile, 'UTF-8');
        reader.onload = function(e) {
            var data = this.result;
            teamInfo = JSON.parse(decodeURI(data));
            setTeamInfo();
        };
    } else {
        alert('No file chosen!');
    }
}

// Return records in JSON that contains {key: value}
function findJSON(json, key, value) {
    var returns = new Array();
    if (key instanceof Array) {
        if (key.length == value.length) {
            for (var i = 0; i < json.length; i++) {
                for (var j = 0; j < key.length; j++) {
                    if (json[i][key[j]] != value[j]) {
                        break;
                    } else {
                        if (j == key.length - 1) {
                            returns.push(json[i]);
                        }
                    }
                }
            }
        }
    } else {
        for (var i = 0; i < json.length; i++) {
            if (json[i][key] == value) {
                returns.push(json[i]);
            }
        }
    }
    return returns;
}

function setTeamInfo() {
    // Get the leader skill info
    // and save it into teamInfo[9]
    var leader = teamInfo[4];
    var leaderSkillInfo;
    var leaderSkillExtraInfo;
    var leader_unit_id = leader.cardid;
    var leader_skill_id;

    teamInfo.push({
        'leaderSkillInfo': undefined,
        'leaderSkillExtraInfo': undefined
    });


    leader_skill_id = findJSON(unit_m, 'unit_number', leader_unit_id)[0].default_leader_skill_id;
    if (leader_skill_id != undefined) {
        leaderSkillInfo = findJSON(unit_leader_skill_m, 'unit_leader_skill_id', leader_skill_id)[0];

        if (leaderSkillInfo != undefined) {
            leaderSkillExtraInfo = findJSON(unit_leader_skill_extra_m, 'unit_leader_skill_id', leader_skill_id)[0];
            teamInfo[9].leaderSkillInfo = leaderSkillInfo;
            teamInfo[9].leaderSkillExtraInfo = leaderSkillExtraInfo;
        }
    }

    // Get Aura/Veil school idol skills info (effect on the whole team)
    // and save it into teamInfo[9]
    teamInfo[9].gemallpercent = new Array();
    for (var i = 0; i < 9; i++) {
        teamInfo[9].gemallpercent.push(teamInfo[i].gemallpercent);
    }

    // Get member info
    for (var i = 0; i < 9; i++) {
        var unit_id = teamInfo[i].cardid;
        var cardInfo = findJSON(unit_m, 'unit_number', teamInfo[i].cardid)[0];
        $.extend(teamInfo[i], cardInfo);

        // Get skill info
        let skill_info = findJSON(unit_skill_m, 'unit_skill_id', teamInfo[i].default_unit_skill_id)[0];
        let skill_level_info = findJSON(unit_skill_level_m, ['unit_skill_id', 'skill_level'], [teamInfo[i].default_unit_skill_id, teamInfo[i].skilllevel])[0];
        let skill_info_all = $.extend({}, skill_level_info, skill_info);
        console.log(skill_level_info);
        teamInfo[i].skill_info = skill_info_all;
        if (teamInfo[i].gemskill) {
            teamInfo[i].skill_info.effect_value *= 2.5;

        }
        // Get member tag 
        var member_tag = new Array();
        var member_tag_temp = findJSON(unit_type_member_tag_m, 'unit_type_id', teamInfo[i].unit_type_id);
        if (member_tag_temp.length > 1) {
            for (var j = 0; j < member_tag_temp.length; j++) {
                member_tag.push(member_tag_temp[j].member_tag_id);
            }
        }
        teamInfo[i].member_tag = member_tag;
    }
    console.log(teamInfo);

}

function disableEnableGuest() {
    if ($('#guest').is(':checked')) {
        $("#guestLeaderSkill").children().attr("disabled", false);
        $("#guestLeaderExtraSkill").children().each(function(index) {
            $(this).children().attr("disabled", false);
        });
    } else {
        $("#guestLeaderSkill").children().attr("disabled", true);
        $("#guestLeaderExtraSkill").children().each(function(index) {
            $(this).children().attr("disabled", true);
        });
    }
}

function getGuestInfo() {
    var guestEffectType = $("input[name='guestEffectType']:checked").val();
    var guestExtraEffectType = $("input[name='guestExtraEffectType']:checked").val();

}

function calculateTotalAttribute(attribute_id) {
    var total = 0;
    var attributeType = attributeIndex[attribute_id];
    var leaderAttributeId = teamInfo[4].attribute_id;

    // Get guest info
    if ($('#guest').is(':checked')) {
        var guestEffectTypeId = parseInt($("input[name='guestEffectType']:checked").val());
        var guestExtraEffectTypeId = parseInt($("input[name='guestExtraEffectType']:checked").val());
    }
    // If target attribute agrees with the team leader attribute
    if (leaderAttributeId == attribute_id) {
        for (var i = 0; i < 9; i++) {
            var member = teamInfo[i];
            var bareAttribute = parseInt(member[attributeType]);
            // bonus from school idol skills effect on single member
            var gemSingleBonus = parseInt(member.gemnum);
            if (parseFloat(member.gemsinglepercent) > 0.16) {
                gemSingleBonus += Math.ceil(bareAttribute * 0.1);
                gemSingleBonus += Math.ceil(bareAttribute * 0.16);
            } else {
                gemSingleBonus += Math.ceil(bareAttribute * parseFloat(member.gemsinglepercent));
            }
            //bonus from school idol skills effect on sthe whole team
            var gemAllBonus = 0;
            for (var j = 0; j < teamInfo[9].gemallpercent.length; j++) {
                if (parseFloat(teamInfo[9].gemallpercent[j]) > 0.024) {
                    gemAllBonus += Math.ceil(bareAttribute * 0.018);
                    gemAllBonus += Math.ceil(bareAttribute * 0.024);
                } else {
                    gemAllBonus += Math.ceil(bareAttribute * parseFloat(teamInfo[9].gemallpercent[j]));
                }
            }
            // bonus from all school idol skills
            var gemBonusAttribute = bareAttribute + gemSingleBonus + gemAllBonus;

            // bonus from leader skill
            var leaderSkillBonus = 0;
            var leaderSkillInfo = teamInfo[9].leaderSkillInfo;
            if (leaderSkillInfo != undefined) {
                var effectTypeId = leaderSkillInfo.leader_skill_effect_type;
                var effectType = attributeIndex[effectTypeId];
                // If old leader skill e.g.クールPが9%UPする
                if (effectTypeId == leaderAttributeId) {
                    leaderSkillBonus = Math.ceil(gemBonusAttribute * leaderSkillInfo.effect_value / 100);
                    // If new leader skill e.g.スマイルPの12%分クールPがUPする
                } else {
                    leaderSkillBonus = Math.ceil(parseInt(member[effectType]) * leaderSkillInfo.effect_value / 100);
                }
            }

            // bonus from extra leader skill
            var leaderSkillExtraBonus = 0;
            var leaderSkillExtraInfo = teamInfo[9].leaderSkillExtraInfo;
            if (leaderSkillExtraInfo != undefined) {
                if (member.member_tag.indexOf(leaderSkillExtraInfo.member_tag_id) > -1) {
                    leaderSkillExtraBonus = Math.ceil(gemBonusAttribute * leaderSkillExtraInfo.effect_value / 100);
                }
            }

            // bonus from guest
            var guestleaderSkillBonus = 0;
            var guestLeaderSkillExtraBonus = 0;

            if ($('#guest').is(':checked')) {
                // bonus from guest's leader skill
                if (!(isNaN(guestEffectTypeId))) {
                    var guestEffectType = attributeIndex[guestEffectTypeId];
                    // If old leader skill e.g.クールPが9%UPする
                    if (guestEffectTypeId == leaderAttributeId) {
                        guestleaderSkillBonus = Math.ceil(gemBonusAttribute * 0.09);
                        // If new leader skill e.g.スマイルPの12%分クールPがUPする
                    } else {
                        guestleaderSkillBonus = Math.ceil(parseInt(member[guestEffectType]) * 0.12);
                    }
                }
                // bonus from guest's extra leader skill
                if (!(isNaN(guestExtraEffectTypeId))) {
                    if (member.member_tag.indexOf(guestExtraEffectTypeId) > -1) {
                        if (guestExtraEffectTypeId == 4 || guestExtraEffectTypeId == 5) {
                            guestLeaderSkillExtraBonus = Math.ceil(gemBonusAttribute * 0.03);
                        } else {
                            guestLeaderSkillExtraBonus = Math.ceil(gemBonusAttribute * 0.06);
                        }
                    }
                }
            }
            var memberTotal = gemBonusAttribute + leaderSkillBonus + leaderSkillExtraBonus + guestleaderSkillBonus + guestLeaderSkillExtraBonus;
            total += memberTotal;
        }
    } else {
        for (var i = 0; i < 9; i++) {
            total += parseInt(teamInfo[i][attributeType]);
        }
    }
    return total;
}

function getLiveById(liveId) {
    var liveInfo;
    var liveNotes;
    var sliderCount = 0;
    for (var i = 0; i < mapsJson.length; i++) {
        // name attribute_icon_id member_category difficulty_text live_setting_id
        if (mapsJson[i].live_setting_id == liveId) {
            liveInfo = mapsJson[i];
            $.ajaxSettings.async = false;
            $.getJSON('https://raw.githubusercontent.com/iebb/SIFMaps/master/latest/' + liveInfo.notes_setting_asset,
                function(json) {
                    liveNotes = json;
                })
            break;
        }
    }

    var liveNoteCount = liveNotes.length;
    for (var i = 0; i < liveNoteCount; i++) {
        liveNotes[i].timing_sec = parseInt(liveNotes[i].timing_sec * 1000);
        // slider
        if (liveNotes[i].effect == 3) {
            sliderCount++;
            liveNotes[i].effect_value = parseInt(liveNotes[i].effect_value * 1000);
            var sliderEnding = JSON.parse(JSON.stringify(liveNotes[i]));
            sliderEnding.effect_value = liveNotes[i].timing_sec;
            sliderEnding.timing_sec = liveNotes[i].timing_sec + liveNotes[i].effect_value + 1;
            sliderEnding.effect = 5;
            liveNotes.push(sliderEnding);
        }
    }

    liveNotes.sort(function(x, y) {
        return x.timing_sec - y.timing_sec;
    })

    var attributeId = liveInfo.attribute_icon_id;
    var memberCategory = liveInfo.member_category;

    return {
        'attributeId': attributeId,
        'memberCategory': memberCategory,
        'liveNotes': liveNotes,
        'totalNoteCount': liveNoteCount
    };
}


function mergeMaps(map1, map2) {
    var endingTime = map1[map1.length - 1].timing_sec;
    for (var i = 0; i < map2.length; i++) {
        map2[i].timing_sec += endingTime;
    }
    return map1.concat(map2);
}

function calculate() {
    if (teamInfo == undefined) {
        alert('No team info loaded!')
        return;
    }

    var liveId1 = $('#liveList1').val();
    var liveId2 = $('#liveList2').val();
    var liveId3 = $('#liveList3').val();

    if (liveId1 == null) {
        alert('No live chosen!');
        return;
    }

    var live1 = getLiveById(liveId1);
    var liveInfo = live1;

    if (!$('#liveList2').is(':hidden')) {
        var live2 = getLiveById(liveId2);
        liveInfo.liveNotes = mergeMaps(liveInfo.liveNotes, live2.liveNotes);
        liveInfo.totalNoteCount += live2.totalNoteCount;
    }

    if (!$('#liveList3').is(':hidden')) {
        var live3 = getLiveById(liveId3);
        liveInfo.liveNotes = mergeMaps(liveInfo.liveNotes, live3.liveNotes);
        liveInfo.totalNoteCount += live3.totalNoteCount;
    }
    var score = calculateExpectedScore(liveInfo, 0.9);
    $('#result').html(score);
}

function calculateExpectedScore(liveInfo, perfectRate, maxCombo = 0, scoreUp = false, skillUp = false) {
    var attributeScore = 0;
    var skillScore = 0;
    var totalScore = 0;

    var liveAttributeId = liveInfo.attributeId;
    var liveMemberCategory = liveInfo.memberCategory;
    var liveNotes = liveInfo.liveNotes;
    var totalNoteCount = liveInfo.totalNoteCount;

    var teamTotalAttribute = calculateTotalAttribute(liveAttributeId);
    console.log(liveAttributeId, teamTotalAttribute);

    var currentCombo = 0;
    var resultCombo;
    var sliderCount = 0;
    var starCount = 0;

    for (let i = 0; i < 9; i++) {
        let typeFactor = 1;
        if (teamInfo[i].attribute_id == liveAttributeId) {
            typeFactor *= 1.1;
        }
        if (teamInfo[i].member_tag[0] == liveMemberCategory + 3) {
            typeFactor *= 1.1;
        }
        teamInfo[i].typeFactor = typeFactor;
    }

    if (skillUp) {
        for (let i = 0; i < 9; i++) {
            let skillInfo = teamInfo[i].skill_info;
            if (!skillInfo) {
                if (skillInfo.activation_rate < 100) {
                    skillInfo.activation_rate_rev = skillInfo.activation_rate * 1.1;
                }
            }
        }
    }

    var basicScore = teamTotalAttribute * 0.0125;
    if (scoreUp) {
        basicScore *= 1.1;
    }

    function getComboFactor(combo) {
        if (combo >= 0 && combo <= 50) {
            return 1;
        } else if (combo <= 100) {
            return 1.1;
        } else if (combo <= 200) {
            return 1.15;
        } else if (combo <= 400) {
            return 1.2;
        } else if (combo <= 600) {
            return 1.25;
        } else if (combo <= 800) {
            return 1.3;
        } else {
            return 1.35;
        }
    }


    for (let i = 0; i < liveNotes.length; i++) {
        let note = liveNotes[i];
        let position = 9 - liveNotes[i].position;
        let typeFactor = teamInfo[position].typeFactor;
        let ComboFactor = getComboFactor(currentCombo);

        // 1 2 4 indicates single note
        if (note.effect == 1 || note.effect == 2 || note.effect == 4) {
            let perfectScore = Math.floor(basicScore * typeFactor * ComboFactor * 1);
            let greatScore = Math.floor(basicScore * typeFactor * ComboFactor * 0.88);
            let noteExpectedScore = perfectRate * perfectScore + (1 - perfectRate) * greatScore;

            attributeScore += noteExpectedScore;
            currentCombo++;
            // 4 indicates star single note
            if (note.effect == 4) {
                starCount++;
            }
        }

        // 5 indicates slider ending
        if (note.effect == 5) {
            let ppScore = Math.floor(basicScore * typeFactor * ComboFactor * 1 * 1.25);
            let pgScore = Math.floor(basicScore * typeFactor * ComboFactor * 0.88 * 1.25);
            let ggScore = Math.floor(basicScore * typeFactor * ComboFactor * Math.pow(0.88, 2) * 1.25);
            let noteExpectedScore = Math.pow(perfectRate, 2) * ppScore + 2 * perfectRate * (1 - perfectRate) * pgScore + Math.pow(1 - perfectRate, 2) * ggScore;
            attributeScore += noteExpectedScore;
            currentCombo++;
            sliderCount++;
        }
    }
    resultCombo = currentCombo;

    // A slider note has a start and a ending.
    // Only when twice is perfect, the perfect lock could be triggered,
    // in this way the total perfect rate would be a little smaller
    var sliderPerfectRate = Math.pow(perfectRate, 2);
    var sliderNoteProportioin = sliderCount / totalNoteCount;
    var totalPerfectRate = sliderNoteProportioin * sliderPerfectRate + (1 - sliderNoteProportioin) * perfectRate;

    // perfect count is not certain itself, so it doesn't floored here
    var perfectCount = totalNoteCount * totalPerfectRate;

    // Calculate skill score
    for (let i = 0; i < 9; i++) {
        let skillInfo = teamInfo[i].skill_info;
        if (skillInfo) {
            let skillExpectedScore = 0;


            // 'skill_effect_type': 11 indicates score up skill
            if (skillInfo.skill_effect_type == 11) {
                switch (skillInfo.trigger_type) {

                    case 3: // 'trigger_type': 3 indicates icon
                        skillExpectedScore = Math.floor(totalNoteCount / skillInfo.trigger_value) *
                            skillInfo.activation_rate / 100 * skillInfo.effect_value;
                        break;

                    case 4: // 'trigger_type': 4 indicates combo
                        skillExpectedScore = Math.floor(totalNoteCount / skillInfo.trigger_value) *
                            skillInfo.activation_rate / 100 * skillInfo.effect_value;
                        break;

                    case 6: // 'trigger_type': 6 indicates Perfect
                        skillExpectedScore = Math.floor(perfectCount / skillInfo.trigger_value) *
                            skillInfo.activation_rate / 100 * skillInfo.effect_value;
                        break;

                    case 12: // 'trigger_type': 12 indicates star icon
                        skillExpectedScore = Math.floor(starCount / skillInfo.trigger_value) *
                            skillInfo.activation_rate / 100 * skillInfo.effect_value;
                        break;

                    case 1: // 'trigger_type': 1 indicates time
                        skillExpectedScore = Math.floor(liveNotes[liveNotes.length - 1].timing_sec / 1000 / skillInfo.trigger_value) *
                            skillInfo.activation_rate / 100 * skillInfo.effect_value;
                        break;
                    default:
                        break;
                }
            }
            skillScore += skillExpectedScore;
            console.log(skillExpectedScore);
        }
    }
    totalScore = attributeScore + skillScore;

    var totalScoringUpRate = 0;
    // Burst scoring up cards expected scoring bonus (e.g. スコア15000達成ごとに13%の確率でスコアが1120増える)
    for (let i = 0; i < 9; i++) {
        let skillInfo = teamInfo[i].skill_info;
        if (skillInfo.skill_effect_type == 11 && skillInfo.trigger_type == 5) {
            let scoringUpRate = skillInfo.effect_value / skillInfo.trigger_value * skillInfo.activation_rate / 100;
            totalScoringUpRate += scoringUpRate;
        }
    }
    totalScore /= (1 - totalScoringUpRate);
    return totalScore;
}


function calculateScoreDistribution(liveInfo) {
    var noteIndex = 0;
    for (var i = 0; i < 120000; i++) {
        while (liveNotes[noteIndex].timing_sec == i) {
            if (noteIndex == liveNotes.length - 1) {
                break;
            }
            noteIndex++;
            //console.log(i);
        }
    }
    // TODO
}

function addLiveList() {
    // liveList3 is hidden
    if ($('#liveList3').is(':hidden')) {

        // liveList2 exists
        if (!$('#liveList2').is(':hidden')) {

            // show liveList3
            $('#liveList3Frame').show();
            $('#addLiveList').hide();
            updateLiveLists();

            // Only liveList1 exists    
        } else {
            $('#liveList2Frame').show();
            $('#removeLiveList').show();
            updateLiveLists();
        }
    }
}

function removeLiveList() {
    if (!$('#liveList3').is(':hidden')) {
        $('#liveList3Frame').hide();
        $('#addLiveList').show();
    } else if (!$('#liveList2').is(':hidden')) {
        $('#liveList2Frame').hide();
        $('#removeLiveList').hide();
    }
}