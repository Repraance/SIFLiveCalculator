$(document).ready(function() {
    loadMapsJSON();
    initLiveList();
    updateLiveList();
    loadJSONs();
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
    $.getJSON("https://raw.githubusercontent.com/iebb/SIFMaps/master/maps.json",
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
    //Sort live by live_track_id and difficulty
    mapsJson = mapsJson.sort(function(x, y) {
        if (x.live_track_id !== y.live_track_id) {
            return x.live_track_id - y.live_track_id;
        } else {
            return x.difficulty - y.difficulty;
        }
    });
    //Generate liveList
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

function updateLiveList() {
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

    var lives = document.getElementById('liveList');
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
    changeSelectColor();
}

function changeSelectColor() {
    var lives = document.getElementById('liveList');
    var selectedLive = lives.options[lives.selectedIndex];
    if (selectedLive !== undefined) {
        lives.style.color = selectedLive.style.color;
    }
}

function loadFile() {
    var resultFile = document.getElementById("openFile").files[0];
    if (resultFile) {
        var reader = new FileReader();

        reader.readAsText(resultFile, 'UTF-8');
        reader.onload = function(e) {
            var data = this.result;
            teamInfo = JSON.parse(data);
            console.log(teamInfo);
            document.getElementById("result").innerHTML = teamInfo[0].smile;
        };
    } else {
        alert("No file chosen!");
    }
}

function calculate() {
    var lives = document.getElementById('liveList');
    var selectedLive = lives.options[lives.selectedIndex];
    if (selectedLive == undefined) {
        alert("No live chosen!");
    } else if (teamInfo == undefined) {
        alert("No team info loaded!")
    }
    console.log(unit_leader_skill_extra_m[0]);
    console.log(unit_leader_skill_m[0]);
    console.log(unit_skill_level_m[0]);
    console.log(unit_skill_m[0]);
    console.log(unit_type_member_tag_m[0]);
    console.log(unit_m[0]);
}