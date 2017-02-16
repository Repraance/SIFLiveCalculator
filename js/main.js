$(document).ready(function() {
    loadMapsJSON();
    initLiveList();
    updateLiveLists();
    loadJSONs();
    $("#liveList2Frame").hide();
    $("#liveList3Frame").hide();
})

var mapsJson;
var unit_m;
var liveList = new Array();
var teamInfo;
var colorIndex = {
    1: "#E91E63",
    2: "#4CAF50",
    3: "#2196F3"
}

var unit_leader_skill_extra_m_url = "https://raw.githubusercontent.com/Repraance/SIFCardManager/master/data/json/unit_leader_skill_extra_m.json";
var unit_leader_skill_m_url = "https://raw.githubusercontent.com/Repraance/SIFCardManager/master/data/json/unit_leader_skill_m.json";
var unit_m_url = "https://raw.githubusercontent.com/Repraance/SIFCardManager/master/data/json/unit_m.json";
var unit_skill_level_m_url = "https://raw.githubusercontent.com/Repraance/SIFCardManager/master/data/json/unit_skill_level_m.json";
var unit_skill_m_url = "https://raw.githubusercontent.com/Repraance/SIFCardManager/master/data/json/unit_skill_m.json";
var unit_type_member_tag_m_url = "https://raw.githubusercontent.com/Repraance/SIFCardManager/master/data/json/unit_type_member_tag_m.json";

function loadMapsJSON() {
    $.ajaxSettings.async = false;
    $.getJSON("https://raw.githubusercontent.com/iebb/SIFMaps/master/maps.min.json",
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
    if (document.getElementById("liveList1")) {
        updateLiveList("liveList1");
    }
    if (document.getElementById("liveList2")) {
        updateLiveList("liveList2");
    }
    if (document.getElementById("liveList3")) {
        updateLiveList("liveList3");
    }
}

function updateLiveList(id) {
    var aqoursChecked = document.getElementById("aqours").checked;
    var museChecked = document.getElementById("muse").checked;
    var smileChecked = document.getElementById("smile").checked;
    var pureChecked = document.getElementById("pure").checked;
    var coolChecked = document.getElementById("cool").checked;
    var easyChecked = document.getElementById("easy").checked;
    var normalChecked = document.getElementById("normal").checked;
    var hardChecked = document.getElementById("hard").checked;
    var expertChecked = document.getElementById("expert").checked;
    var masterChecked = document.getElementById("master").checked;

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
            case "EASY":
                if (!easyChecked) {
                    continue;
                }
                break;
            case "NORMAL":
                if (!normalChecked) {
                    continue;
                }
                break;
            case "HARD":
                if (!hardChecked) {
                    continue;
                }
                break;
            case "EXPERT":
                if (!expertChecked) {
                    continue;
                }
                break;
            case "MASTER":
                if (!masterChecked) {
                    continue;
                }
                break;
        }
        lives.options.add(new Option(currentLive.name + " [" + currentLive.difficulty_text + "]", currentLive.live_setting_id));
        lives[lives.options.length - 1].style.color = colorIndex[currentLive.attribute_icon_id];
        if (currentLive.live_setting_id == selectedLiveId) {
            lives[lives.options.length - 1].selected = true;
            lives[lives.options.length - 1]
        }
    }
    changeSelectColors();
}

function changeSelectColors() {
    if (document.getElementById("liveList1")) {
        changeSelectColor("liveList1");
    }
    if (document.getElementById("liveList2")) {
        changeSelectColor("liveList2");
    }
    if (document.getElementById("liveList3")) {
        changeSelectColor("liveList3");
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
    var resultFile = document.getElementById("openFile").files[0];
    if (resultFile) {
        var reader = new FileReader();
        reader.readAsText(resultFile, "UTF-8");
        reader.onload = function(e) {
            var data = this.result;
            teamInfo = JSON.parse(data);
            setTeamInfo();
        };
    } else {
        alert("No file chosen!");
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
        "leaderSkillInfo": undefined,
        "leaderSkillExtraInfo": undefined
    });
    leader_skill_id = findJSON(unit_m, "unit_number", leader_unit_id)[0].default_leader_skill_id;
    if (leader_skill_id != undefined) {
        leaderSkillInfo = findJSON(unit_leader_skill_m, "unit_leader_skill_id", leader_skill_id)[0];

        if (leaderSkillInfo != undefined) {
            leaderSkillExtraInfo = findJSON(unit_leader_skill_extra_m, "unit_leader_skill_id", leader_skill_id)[0];
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
        var cardInfo = findJSON(unit_m, "unit_number", teamInfo[i].cardid)[0];
        $.extend(teamInfo[i], cardInfo);

        // Get skill info
        var skill_info = findJSON(unit_skill_m, "unit_skill_id", teamInfo[i].default_unit_skill_id)[0];
        $.extend(skill_info, findJSON(unit_skill_level_m, ["unit_skill_id", "skill_level"], [teamInfo[i].default_unit_skill_id, teamInfo[i].skilllevel])[0]);
        teamInfo[i].skill_info = skill_info;

        // Get member tag 
        var member_tag = new Array();
        var member_tag_temp = findJSON(unit_type_member_tag_m, "unit_type_id", teamInfo[i].unit_type_id);
        if (member_tag_temp.length > 1) {
            for (var j = 0; j < member_tag_temp.length; j++) {
                member_tag.push(member_tag_temp[j].member_tag_id);
            }
        }
        teamInfo[i].member_tag = member_tag;
    }
    console.log(teamInfo);

}

function calculate() {
    var lives = document.getElementById("liveList");
    var selectedLive = lives.options[lives.selectedIndex];
    if (selectedLive == undefined) {
        alert("No live chosen!");
        return -1;
    } else if (teamInfo == undefined) {
        // alert("No team info loaded!")
        // return -2;
    }

    var liveId = selectedLive.value;
    var liveInfo;
    var liveNotes;
    var sliderCount = 0;
    for (var i = 0; i < mapsJson.length; i++) {
        // name attribute_icon_id member_category difficulty_text live_setting_id
        if (mapsJson[i].live_setting_id == liveId) {
            liveInfo = mapsJson[i];
            $.ajaxSettings.async = false;
            $.getJSON("https://raw.githubusercontent.com/iebb/SIFMaps/master/latest/" + liveInfo.notes_setting_asset,
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
            liveNotes.push(sliderEnding);
        }
    }

    var noteIndex = 0;
    for (var i = 0; i < 120000; i++) {
        while (liveNotes[noteIndex].timing_sec == i) {
            if (noteIndex == liveNotes.length - 1) {
                break;
            }
            noteIndex++;
            console.log(i);
        }
    }
    console.log(sliderCount);

}

function addLiveList() {
    // liveList3 is hidden
    if ($("#liveList3").is(":hidden")) {

        // liveList2 exists
        if (!$("#liveList2").is(":hidden")) {

            // show liveList3
            $("#liveList3Frame").show();
            $("#addLiveList").hide();
            updateLiveLists();

            // Only liveList1 exists    
        } else {
            $("#liveList2Frame").show();
            $("#removeLiveList").show();
            updateLiveLists();
        }
    }
}

function removeLiveList() {
    if (!$("#liveList3").is(":hidden")) {
        $("#liveList3Frame").hide();
        $("#addLiveList").show();
    } else if (!$("#liveList2").is(":hidden")) {
        $("#liveList2Frame").hide();
        $("#removeLiveList").hide();
    }
}