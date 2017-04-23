import { attributeIndex } from './indexes.js';

export default class {
    constructor() {
        this.team = null;
        this.liveSettingInfo = null;
    }

    setTeam(team) {
        this.team = team;
    }

    setLiveSettingInfo(liveSettingInfo) {
        this.liveSettingInfo = liveSettingInfo;
        this.liveSettingInfo.inheritValues = {
            'combo': 0,
            'score': 0
        }
    }

    checkLiveSettingInfo() {
        let liveSettingInfo = this.liveSettingInfo;
        if (liveSettingInfo && liveSettingInfo.lives[0].liveInfo)
            return true;
        else {
            alert('Live not set');
            return false;
        }
    }

    checkTeam() {
        let team = this.team;
        if (team) {
            for (let i = 0; i < 9; i++) {
                if (!team.memberInfo[i].cardid) {
                    alert('Unavailabe team!');
                    return false;
                }
            }
            return true;
        } else {
            alert('Unavailabe team!');
            return false;
        }
    }

    calculate() {
        if (this.checkTeam() && this.checkLiveSettingInfo()) {
            if (!this.liveSettingInfo.bonusType) {
                // No bonus type
                let scoreUp = this.liveSettingInfo.mfScoreUpIndex == 1 ? 1.1 : false;
                let skillUp = this.liveSettingInfo.mfSkillUpIndex == 1 ? 1.1 : false;
                return this.calculateExpectedScore(this.liveSettingInfo.lives[0], scoreUp, skillUp);

            } else if (this.liveSettingInfo.bonusType == 1)
            // Challenge Festival
                return this.calculateExpectedScore(this.liveSettingInfo.lives[0], 1.1, 1.1);
            else {
                // Medley Festival
                let result = 0;
                let scoreUp = [1.1, 1.1, 1.1];
                let skillUp = [1.1, 1.1, 1.1];
                if (this.liveSettingInfo.mfScoreUpIndex != null)
                    scoreUp[this.liveSettingInfo.mfScoreUpIndex] *= 1.1;
                if (this.liveSettingInfo.mfSkillUpIndex != null)
                    skillUp[this.liveSettingInfo.mfSkillUpIndex] *= 1.1;
                for (let i = 0; i < 3; i++) {
                    if (this.liveSettingInfo.lives[i].liveInfo)
                        result += this.calculateExpectedScore(this.liveSettingInfo.lives[i], scoreUp[i], skillUp[i]);
                }
                return result;
            }
        }
    }

    calculateExpectedScore(live, scoreUp = false, skillUp = false) {
        let attributeScore = 0;
        let skillScore = 0;
        let totalScore = 0;

        let perfectRate = this.liveSettingInfo.perfectRate;

        let liveAttributeId = live.liveInfo.attribute_icon_id;
        let liveMemberCategory = live.liveInfo.member_category;
        let liveNotes = live.liveNotes;
        let totalNoteCount = live.liveInfo.s_rank_combo;

        let teamTotalAttribute = this.team.teamAttribute[attributeIndex[liveAttributeId]];

        let memberInfo = new Array(9);
        for (let i = 0; i < 9; i++) {
            let typeFactor = 1;
            if (this.team.memberInfo[i].attribute_id == liveAttributeId) {
                typeFactor *= 1.1;
            }
            if (this.team.memberInfo[i].originalCardInfo.member_tag[1] == liveMemberCategory + 3) {
                typeFactor *= 1.1;
            }

            memberInfo[i] = new Object();
            memberInfo[i].typeFactor = typeFactor;

            let skillInfo = this.team.memberInfo[i].originalCardInfo.skill_info;
            if (skillInfo) {
                memberInfo[i].skillInfo = JSON.parse(JSON.stringify(skillInfo[this.team.memberInfo[i].skilllevel - 1]));
                if (this.team.memberInfo[i].gemskill) {
                    if (memberInfo[i].skillInfo.skill_effect_type == 11) {
                        memberInfo[i].skillInfo.effect_value *= 2.5;
                    } else if (memberInfo[i].skillInfo.skill_effect_type == 9) {
                        memberInfo[i].skillInfo.effect_value *= 480;
                        memberInfo[i].skillInfo.skill_effect_type = 11;
                    }
                }
                if (skillUp)
                    memberInfo[i].skillInfo.activation_rate *= skillUp;
            }
        }
        console.log(memberInfo)

        let basicScore = teamTotalAttribute * 0.0125;
        if (scoreUp) {
            basicScore *= scoreUp;
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

        let currentCombo = this.liveSettingInfo.inheritValues.combo;
        let resultCombo = 0;
        let holdCount = 0;
        let starCount = 0;

        for (let i = 0; i < liveNotes.length; i++) {
            let note = liveNotes[i];
            let position = 9 - liveNotes[i].position;
            let typeFactor = memberInfo[position].typeFactor;
            let ComboFactor = getComboFactor(currentCombo);

            if (this.liveSettingInfo.notFC && this.liveSettingInfo.maxCombo == currentCombo) {
                currentCombo = 0;
                continue;
            }

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

            // 5 indicates hold ending
            if (note.effect == 5) {
                let ppScore = Math.floor(basicScore * typeFactor * ComboFactor * 1 * 1.25);
                let pgScore = Math.floor(basicScore * typeFactor * ComboFactor * 0.88 * 1.25);
                let ggScore = Math.floor(basicScore * typeFactor * ComboFactor * Math.pow(0.88, 2) * 1.25);
                let noteExpectedScore = Math.pow(perfectRate, 2) * ppScore + 2 * perfectRate * (1 - perfectRate) * pgScore + Math.pow(1 - perfectRate, 2) * ggScore;
                attributeScore += noteExpectedScore;
                currentCombo++;
                holdCount++;
            }
        }
        resultCombo = currentCombo;
        this.liveSettingInfo.inheritValues.combo = resultCombo;

        let missCount = 0;
        if (this.liveSettingInfo.notFC)
            missCount = Math.floor(totalNoteCount / this.liveSettingInfo.maxCombo);

        console.log('missCount', missCount);

        // A hold note has a start and a ending.
        // Only when twice is perfect, the perfect lock could be triggered,
        // in this way the total perfect rate would be a little smaller
        let holdPerfectRate = Math.pow(perfectRate, 2);
        let holdNoteProportioin = holdCount / totalNoteCount;
        let totalPerfectRate = holdNoteProportioin * holdPerfectRate + (1 - holdNoteProportioin) * perfectRate;

        // perfect count is not certain itself, so it doesn't floored here
        let perfectCount = totalNoteCount * totalPerfectRate;

        // Calculate skill score
        for (let i = 0; i < 9; i++) {
            let skillInfo = memberInfo[i].skillInfo;
            if (skillInfo) {
                let skillExpectedScore = 0;


                // 'skill_effect_type': 11 indicates score up skill
                if (skillInfo.skill_effect_type == 11) {
                    let totalTriggerValue = 0;
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
                console.log('skillExpectedScore', skillExpectedScore);
            }
        }
        totalScore = attributeScore + skillScore;

        let totalScoringUpRate = 0;
        // Burst scoring up cards expected scoring bonus (e.g. スコア15000達成ごとに13%の確率でスコアが1120増える)
        for (let i = 0; i < 9; i++) {
            let skillInfo = memberInfo[i].skillInfo;
            if (skillInfo.skill_effect_type == 11 && skillInfo.trigger_type == 5) {
                let scoringUpRate = skillInfo.effect_value / skillInfo.trigger_value * skillInfo.activation_rate / 100;
                totalScoringUpRate += scoringUpRate;
            }
        }
        totalScore /= (1 - totalScoringUpRate);
        return totalScore;
    }

}