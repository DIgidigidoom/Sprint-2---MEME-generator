'use strict'
const SEARCHES_STORAGE = 'topSrchsDB'
var gSrchMap = {}
var gTopFiveKeys



function createPopularSrchs() {

    gSrchMap = loadFromStorage(SEARCHES_STORAGE)
    if (!gSrchMap) {
        gSrchMap = {
            hair: 2,
            cute: 5,
            dog: 7,
            laugh: 1,
            funny: 10,
            evil: 4
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
    updateTopFiveSrchs(keyword)
}

function sortSrchMap() {
    const srchMap = Object.entries(gSrchMap)
    const sorted = srchMap.sort((a, b) => b[1] - a[1])
    const sliced = sorted.slice(0, 5)
    gTopFiveKeys = sliced.map((key, val) => key)
}


