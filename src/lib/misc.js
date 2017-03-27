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