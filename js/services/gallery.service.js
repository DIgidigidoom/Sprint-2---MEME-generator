'use strict'
const SEARCHES_STORAGE = 'topSrchsDB'
var gSrchMap = {}
var gTopFiveKeys



function createPopularSrchs() {

    gSrchMap = loadFromStorage(SEARCHES_STORAGE)
    if (!gSrchMap) {
        gSrchMap = {
            hair: 9,
            cute: 5,
            dog: 7,
            laugh: 8,
            funny: 10,
            evil: 5
        }
        saveToStorage(SEARCHES_STORAGE, gSrchMap)
    }
}

function updateSearchCount(keyword) {
    const key = keyword.toLowerCase().trim()

    if (gSrchMap[key]) {
        gSrchMap[key] += 1;
    } else {
        gSrchMap[key] = 1;
    }
    saveToStorage(SEARCHES_STORAGE, gSrchMap)
    sortSrchMap()
    enlargeSrchedTxT(keyword)
    console.log(gTopFiveKeys)
}

function sortSrchMap() {
    const srchMap = Object.entries(gSrchMap)
    const sorted = srchMap.sort((a, b) => b[1] - a[1])
    const sliced = sorted.slice(0, 5)
    gTopFiveKeys = sliced.map((key, val) => key)
    console.log(gTopFiveKeys)
}

function unSortSrchMap() {
    for (let i = gTopFiveKeys.length - 1; i > 0; i--) {
        // Make sure this line declares j properly
        let j = Math.floor(Math.random() * (i + 1));
        // Swap elements
        [gTopFiveKeys[i], gTopFiveKeys[j]] = [gTopFiveKeys[j], gTopFiveKeys[i]];
      }
      console.log(gTopFiveKeys)
}

