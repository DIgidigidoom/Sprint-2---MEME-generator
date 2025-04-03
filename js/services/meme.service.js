'use strict'
const IMG_STORAGE = 'imageDB'
var gImgs = []



var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'Type Your Text Here',
            size: 30,
            color: 'white',
            pos: {
                x: 0,
                y: 0,
                width: 0,
                height: 0

            },
        },
    ]
}
var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }
function _createImages() {

    gImgs = loadFromStorage(IMG_STORAGE)

    if (!gImgs || !gImgs.length) {
        gImgs = [
            { id: 1, url: 'Images/1.jpg', keywords: ['funny', 'cat'] },
            { id: 2, url: 'Images/2.jpg', keywords: ['funny', 'cat'] },
            { id: 3, url: 'Images/3.jpg', keywords: ['funny', 'cat'] },
            { id: 4, url: 'Images/4.jpg', keywords: ['funny', 'cat'] },
            { id: 5, url: 'Images/5.jpg', keywords: ['funny', 'cat'] },
            { id: 6, url: 'Images/6.jpg', keywords: ['funny', 'cat'] },
            { id: 7, url: 'Images/7.jpg', keywords: ['funny', 'cat'] },
            { id: 8, url: 'Images/8.jpg', keywords: ['funny', 'cat'] },
            { id: 9, url: 'Images/9.jpg', keywords: ['funny', 'cat'] },
            { id: 10, url: 'Images/10.jpg', keywords: ['funny', 'cat'] },
            { id: 11, url: 'Images/11.jpg', keywords: ['funny', 'cat'] },
            { id: 12, url: 'Images/12.jpg', keywords: ['funny', 'cat'] },
            { id: 13, url: 'Images/13.jpg', keywords: ['funny', 'cat'] },
            { id: 14, url: 'Images/14.jpg', keywords: ['funny', 'cat'] },
            { id: 15, url: 'Images/15.jpg', keywords: ['funny', 'cat'] },
            { id: 16, url: 'Images/16.jpg', keywords: ['funny', 'cat'] },
            { id: 17, url: 'Images/17.jpg', keywords: ['funny', 'cat'] },
            { id: 18, url: 'Images/18.jpg', keywords: ['funny', 'cat'] },
        ]
        saveToStorage(IMG_STORAGE, gImgs)
    }
}
function getImgs() {
    return gImgs
}
function getMeme() {
    return gMeme
}
function resetMeme() {
    gMeme =
    {
        selectedImgId: 1,
        selectedLineIdx: 0,
        lines: [
            {
                txt: 'Type Your Text Here',
                size: 30,
                color: 'white',
                pos: {
                    x: 0,
                    y: 0,
                    width: 0,
                    height: 0

                },
            },
        ]
    }
    return gMeme
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
function getMemeById(imgId) {
    debugger
    return gMeme.find(meme => imgId === meme.selectedImgId)
}

function setLineTxt(editedTxt, lineIdx) {
    gMeme.lines[lineIdx].txt = editedTxt

}

function setLineColor(EditedColor, lineIdx) {
    gMeme.lines[lineIdx].color = EditedColor
}

function setLineSize(direction, lineIdx) {
    gMeme.lines[lineIdx].size += direction
}

function addLine() {
    if (gMeme.lines.length > 2) return
    const newLine = {
        txt: 'Type Your Text Here',
        size: 40,
        color: getRandomColor(),
        pos: {
            x: 0,
            y: 0,
            width: 0,
            height: 0

        },
    }
    gMeme.lines.push(newLine)
    toggleLineIndex()
}

function toggleLineIndex() {
    if (gMeme.selectedLineIdx < gMeme.lines.length - 1) {
        gMeme.selectedLineIdx += 1

    } else {
        gMeme.selectedLineIdx = 0
    }

}
function setLineIndex(txtLineIndex) {
    gMeme.selectedLineIdx = txtLineIndex

}
function getLineIndex() {
    return gMeme.selectedLineIdx
}

function setPos(x, y, width, height, memeLineIdx) {
    gMeme.lines[memeLineIdx].pos.x = x
    gMeme.lines[memeLineIdx].pos.y = y
    gMeme.lines[memeLineIdx].pos.width = width
    gMeme.lines[memeLineIdx].pos.height = height
}
