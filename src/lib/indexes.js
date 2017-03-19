export const colorIndex = {
    1: '#E91E63',
    2: '#4CAF50',
    3: '#2196F3'
}

export const attributeIndex = {
    1: 'smile',
    2: 'pure',
    3: 'cool'
}

export const rarityIndex = {
    1: 'N',
    2: 'R',
    3: 'SR',
    4: 'UR',
    5: 'SSR'
}

export let teamInfoSample = new Array(10);
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