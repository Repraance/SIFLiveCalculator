import { attributeIndex } from './indexes.js';

export default class Team {
    constructor() {
        this.memberInfo = new Array();
        for (let i = 0; i < 9; i++) {
            this.memberInfo[i] = {
                'smile': 0,
                'pure': 0,
                'cool': 0,
                'cardid': 0,
                'skilllevel': 1,
                'mezame': 0,
                'gemnum': 0,
                'gemsinglepercent': 0,
                'gemallpercent': 0,
                'gemskill': 0,
                'gemacc': 0,
                'originalCardInfo': null
            };
        }
        this.teamAttribute = {
            'smile': 0,
            'pure': 0,
            'cool': 0,
            'smile_string': '　',
            'pure_string': '　',
            'cool_string': '　',
        };
        this.guestInfo = {
            'guestEnabled': false,
            'effectType': null,
            'extraEffectType': null
        };
    }

    calculateTeamAttribute() {
        for (let i = 0; i < 9; i++) {
            if (!this.memberInfo[i].cardid)
                return;
        }
        this.calculateTotalAttribute(1);
        this.calculateTotalAttribute(2);
        this.calculateTotalAttribute(3);
    }

    calculateTotalAttribute(attributeId) {
        let total = 0;
        let leaderBonus = 0
        let attributeType = attributeIndex[attributeId];
        let leaderAttributeId = this.memberInfo[4].attribute_id;
        let leaderSkillInfo = this.memberInfo[4].originalCardInfo.leader_skill_info;
        let leaderExtraSkillInfo = this.memberInfo[4].originalCardInfo.leader_extra_skill_info;
        let gemAllpercent = new Array();
        for (let i = 0; i < 9; i++) {
            gemAllpercent.push(this.memberInfo[i].gemallpercent);
        }

        // Get guest info
        if (this.guestInfo.guestEnabled) {
            let guestEffectTypeId = 0;
            let guestExtraEffectTypeId = 0;
        }

        // If target attribute agrees with the team leader attribute
        if (leaderAttributeId == attributeId) {
            for (let i = 0; i < 9; i++) {
                let member = this.memberInfo[i];
                let bareAttribute = member[attributeType];
                // bonus from school idol skills effect on single member
                let gemSingleBonus = member.gemnum;
                if (parseFloat(member.gemsinglepercent) > 0.16) {
                    gemSingleBonus += Math.ceil(bareAttribute * 0.1);
                    gemSingleBonus += Math.ceil(bareAttribute * 0.16);
                } else {
                    gemSingleBonus += Math.ceil(bareAttribute * member.gemsinglepercent);
                }
                //bonus from school idol skills effect on sthe whole team
                let gemAllBonus = 0;
                for (let j = 0; j < gemAllpercent.length; j++) {
                    if (gemAllpercent[j] > 0.024) {
                        gemAllBonus += Math.ceil(bareAttribute * 0.018);
                        gemAllBonus += Math.ceil(bareAttribute * 0.024);
                    } else {
                        gemAllBonus += Math.ceil(bareAttribute * gemAllpercent[j]);
                    }
                }
                // bonus from all school idol skills
                let gemBonusAttribute = bareAttribute + gemSingleBonus + gemAllBonus;

                // bonus from leader skill
                let leaderSkillBonus = 0;
                if (leaderSkillInfo != undefined) {
                    let effectTypeId = leaderSkillInfo.leader_skill_effect_type;
                    let effectType = attributeIndex[effectTypeId];
                    // If old leader skill e.g.クールPが9%UPする
                    if (effectTypeId == leaderAttributeId) {
                        leaderSkillBonus = Math.ceil(gemBonusAttribute * leaderSkillInfo.effect_value / 100);
                        // If new leader skill e.g.スマイルPの12%分クールPがUPする
                    } else {
                        leaderSkillBonus = Math.ceil(member[effectType] * leaderSkillInfo.effect_value / 100);
                    }
                }

                // bonus from extra leader skill
                let leaderExtraSkillBonus = 0;
                if (leaderExtraSkillInfo != undefined) {
                    if (member.originalCardInfo.member_tag.indexOf(leaderExtraSkillInfo.member_tag_id) > -1) {
                        leaderExtraSkillBonus = Math.ceil(gemBonusAttribute * leaderExtraSkillInfo.effect_value / 100);
                    }
                }

                // bonus from guest
                let guestleaderSkillBonus = 0;
                let guestLeaderExtraSkillBonus = 0;

                if (this.guestInfo.guestEnabled) {
                    // bonus from guest's leader skill
                    if (this.guestInfo.effectType) {
                        let guestEffectType = attributeIndex[this.guestInfo.effectType];
                        // If old leader skill e.g.クールPが9%UPする
                        if (this.guestInfo.effectType == leaderAttributeId) {
                            guestleaderSkillBonus = Math.ceil(gemBonusAttribute * 0.09);
                            // If new leader skill e.g.スマイルPの12%分クールPがUPする
                        } else {
                            guestleaderSkillBonus = Math.ceil(member[guestEffectType] * 0.12);
                        }
                    }
                    // bonus from guest's extra leader skill
                    if (this.guestInfo.extraEffectType) {
                        if (member.originalCardInfo.member_tag.indexOf(this.guestInfo.extraEffectType) > -1) {
                            if (this.guestInfo.extraEffectType == 4 || this.guestInfo.extraEffectType == 5) {
                                guestLeaderExtraSkillBonus = Math.ceil(gemBonusAttribute * 0.03);
                            } else {
                                guestLeaderExtraSkillBonus = Math.ceil(gemBonusAttribute * 0.06);
                            }
                        }
                    }
                }
                let memberTotal = gemBonusAttribute + leaderSkillBonus + leaderExtraSkillBonus + guestleaderSkillBonus + guestLeaderExtraSkillBonus;
                total += memberTotal;
                leaderBonus += leaderSkillBonus + leaderExtraSkillBonus + guestleaderSkillBonus + guestLeaderExtraSkillBonus;
            }
        } else {
            for (let i = 0; i < 9; i++) {
                total += this.memberInfo[i][attributeType];
            }
        }
        this.teamAttribute[attributeType] = total;
        this.teamAttribute[attributeType + '_string'] = String(total) + '　+' + String(leaderBonus);
        return total;
    }
}



function calculateTotalAttribute(attributeId) {
    let total = 0;
    let attributeType = attributeIndex[attributeId];
    let leaderAttributeId = this.memberInfo[4].attribute_id;
    let leaderSkillInfo = this.memberInfo[4].originalCardInfo.leader_skill_info;
    let leaderExtraSkillInfo = this.memberInfo[4].originalCardInfo.leader_extra_skill_info;
    let gemAllpercent = new Array();
    for (let i = 0; i < 9; i++) {
        gemAllpercent.push(this.memberInfo[i].gemallpercent);
    }

    // Get guest info
    let guest = false;
    if (guest) {
        let guestEffectTypeId = 0;
        let guestExtraEffectTypeId = 0;
    }

    // If target attribute agrees with the team leader attribute
    if (leaderAttributeId == attributeId) {
        for (let i = 0; i < 9; i++) {
            let member = this.memberInfo[i];
            let bareAttribute = member[attributeType];
            // bonus from school idol skills effect on single member
            let gemSingleBonus = member.gemnum;
            if (parseFloat(member.gemsinglepercent) > 0.16) {
                gemSingleBonus += Math.ceil(bareAttribute * 0.1);
                gemSingleBonus += Math.ceil(bareAttribute * 0.16);
            } else {
                gemSingleBonus += Math.ceil(bareAttribute * member.gemsinglepercent);
            }
            //bonus from school idol skills effect on sthe whole team
            let gemAllBonus = 0;
            for (let j = 0; j < gemAllpercent.length; j++) {
                if (gemAllpercent[j] > 0.024) {
                    gemAllBonus += Math.ceil(bareAttribute * 0.018);
                    gemAllBonus += Math.ceil(bareAttribute * 0.024);
                } else {
                    gemAllBonus += Math.ceil(bareAttribute * gemAllpercent[j]);
                }
            }
            // bonus from all school idol skills
            let gemBonusAttribute = bareAttribute + gemSingleBonus + gemAllBonus;

            // bonus from leader skill
            let leaderSkillBonus = 0;
            if (leaderSkillInfo != undefined) {
                let effectTypeId = leaderSkillInfo.leader_skill_effect_type;
                let effectType = attributeIndex[effectTypeId];
                // If old leader skill e.g.クールPが9%UPする
                if (effectTypeId == leaderAttributeId) {
                    leaderSkillBonus = Math.ceil(gemBonusAttribute * leaderSkillInfo.effect_value / 100);
                    // If new leader skill e.g.スマイルPの12%分クールPがUPする
                } else {
                    leaderSkillBonus = Math.ceil(member[effectType] * leaderSkillInfo.effect_value / 100);
                }
            }

            // bonus from extra leader skill
            let leaderExtraSkillBonus = 0;
            if (leaderExtraSkillInfo != undefined) {
                if (member.originalCardInfo.member_tag.indexOf(leaderExtraSkillInfo.member_tag_id) > -1) {
                    leaderExtraSkillBonus = Math.ceil(gemBonusAttribute * leaderExtraSkillInfo.effect_value / 100);
                }
            }

            // bonus from guest
            let guestleaderSkillBonus = 0;
            let guestLeaderExtraSkillBonus = 0;

            if (guest) {
                // bonus from guest's leader skill
                if (!(isNaN(guestEffectTypeId))) {
                    let guestEffectType = attributeIndex[guestEffectTypeId];
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
                    if (member.originalCardInfo.member_tag.indexOf(guestExtraEffectTypeId) > -1) {
                        if (guestExtraEffectTypeId == 4 || guestExtraEffectTypeId == 5) {
                            guestLeaderExtraSkillBonus = Math.ceil(gemBonusAttribute * 0.03);
                        } else {
                            guestLeaderExtraSkillBonus = Math.ceil(gemBonusAttribute * 0.06);
                        }
                    }
                }
            }
            let memberTotal = gemBonusAttribute + leaderSkillBonus + leaderExtraSkillBonus + guestleaderSkillBonus + guestLeaderExtraSkillBonus;
            total += memberTotal;
        }
    } else {
        for (let i = 0; i < 9; i++) {
            total += this.memberInfo[i][attributeType];
        }
    }
    return total;
}