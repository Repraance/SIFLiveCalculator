export let changeAttributeWithRankup = (member) => {
    if (member.mezame) {
        member.smile = member.originalCardInfo.smile_max;
        member.pure = member.originalCardInfo.pure_max;
        member.cool = member.originalCardInfo.cool_max;
        member[member.attribute] += member.originalCardInfo.after_love_max;
    } else {
        member.smile = member.originalCardInfo.smile;
        member.pure = member.originalCardInfo.pure;
        member.cool = member.originalCardInfo.cool;
        member[member.attribute] += member.originalCardInfo.before_love_max;
    }
}

export let defaultTeamInfo = new Array(10);
for (let i = 0; i < 9; i++) {
    defaultTeamInfo[i] = {
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
}
defaultTeamInfo[9] = new Object();