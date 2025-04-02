'use strict'
const IMG_STORAGE = 'imageDB'

var gImgs = loadFromStorage(IMG_STORAGE) || []
var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'I sometimes eat Falafel',
            size: 20,
            color: 'red'
        }
    ]
}
var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }

function getImgs() {
    return gImgs
}

function createImg() {
    return {
        id: 1,
        url:
            'img/1.jpg',
        keywords: ['funny', 'cat']
    }
}

function getImgById(imgId) {
    return gImgs.find(img => imgId === img.id)
}