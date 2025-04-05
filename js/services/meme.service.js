'use strict'
const IMG_STORAGE = 'imageDB'
const IMG_SAVED_STORAGE = 'imageSavedDB'
let gAvailableLines = [true, true, true]
var gImgs = []
var gSavedImgs = []



var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: []
}
var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }
function _createImages() {

    gImgs = loadFromStorage(IMG_STORAGE)
    gSavedImgs = loadFromStorage(IMG_SAVED_STORAGE)
    if (!gImgs || !gImgs.length) {
        gImgs = [
            { id: 1, url: 'Images/1.jpg', keywords: ['hair', 'funny','evil','president','old'] },
            { id: 2, url: 'Images/2.jpg', keywords: ['puppies','dog', 'puppies'] },
            { id: 3, url: 'Images/3.jpg', keywords: ['cute','baby', 'dog'] },
            { id: 4, url: 'Images/4.jpg', keywords: ['cute', 'cat'] },
            { id: 5, url: 'Images/5.jpg', keywords: ['baby', 'Succsses','funny','cute'] },
            { id: 6, url: 'Images/6.jpg', keywords: ['aliens', 'funny','hair','hands'] },
            { id: 7, url: 'Images/7.jpg', keywords: ['funny', 'cute','baby'] },
            { id: 8, url: 'Images/8.jpg', keywords: ['hair', 'funny','evil','actor'] },
            { id: 9, url: 'Images/9.jpg', keywords: ['funny', 'baby','evil','laugh'] },
            { id: 10, url: 'Images/10.jpg', keywords: ['laugh', 'president'] },
            { id: 11, url: 'Images/11.jpg', keywords: ['funny', 'kissing'] },
            { id: 12, url: 'Images/12.jpg', keywords: ['funny', 'old','hands','glasses'] },
            { id: 13, url: 'Images/13.jpg', keywords: ['hands','actor'] },
            { id: 14, url: 'Images/14.jpg', keywords: ['actor', 'glasses'] },
            { id: 15, url: 'Images/15.jpg', keywords: ['actor', 'hands'] },
            { id: 16, url: 'Images/16.jpg', keywords: ['actor', 'old','laugh'] },
            { id: 17, url: 'Images/17.jpg', keywords: ['evil', 'hands','old'] },
            { id: 18, url: 'Images/18.jpg', keywords: ['funny', 'hands'] },
        ]
        saveToStorage(IMG_STORAGE, gImgs)
    }
    if (!gSavedImgs || !gSavedImgs.length) {
        gSavedImgs = [
            { id: 1, url: 'Images/saved_1.jpg', keywords: ['hair', 'funny','evil','president','old'] },
            { id: 2, url: 'Images/saved_2.jpg', keywords: ['cute','baby', 'dog'] },
            { id: 3, url: 'Images/saved_3.jpg', keywords: ['funny', 'cute','baby'] },
        ]
        saveToStorage(IMG_SAVED_STORAGE, gSavedImgs)
    }
}
function getImgs() {
    if (!gIsSavedImgs) {
        return gImgs
    } else {
        return gSavedImgs
    }

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

function addImg(savedImg) {
    debugger
    const newImg = {
        id: gSavedImgs.length + 1,
        url: savedImg,
        keywords: gImgs[gImgId-1].keywords
    }
    gSavedImgs.push(newImg)
    saveToStorage(IMG_SAVED_STORAGE, gSavedImgs)
}

function getImgById(imgId) {
    if (!gIsSavedImgs) {
        return gImgs.find(img => imgId === img.id)
    } else {
        return gSavedImgs.find(img => imgId === img.id)
    }

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
function setTxtFont(newFont, lineIdx) {
    gMeme.lines[lineIdx].font = newFont
}
function textAlign(txtAlign, lineIdx) {
    const currentAlign = gMeme.lines[lineIdx].alignment
    const txtXpos = gMeme.lines[lineIdx].pos.x

    if (currentAlign === txtAlign) return

    if (currentAlign === 0) {
        if (txtAlign === 1) {
            gMeme.lines[lineIdx].pos.x += 15
        } else if (txtAlign = -1) {
            gMeme.lines[lineIdx].pos.x -= 15
        }
    } else if (currentAlign === 1) {
        if (txtAlign === 0) {
            gMeme.lines[lineIdx].pos.x -= 15
        } else if (txtAlign === -1) {
            gMeme.lines[lineIdx].pos.x -= 30
        }
    } else if (currentAlign === -1) {
        if (txtAlign === 0) {
            gMeme.lines[lineIdx].pos.x += 15
        } else if (txtAlign === -1) {
            gMeme.lines[lineIdx].pos.x += 30
        }
    }

    gMeme.lines[lineIdx].alignment = txtAlign

}

function moveText(direction, lineIdx) {
    if (direction === 'up') {
        gMeme.lines[lineIdx].pos.y -= 15
    } else {
        gMeme.lines[lineIdx].pos.y += 15
    }
}

function dltLine(lineIdx) {
    gMeme.lines.splice(lineIdx, 1)
    setLineIndex(0)

}

function addLine() {

    const lineIdx = getLineIndex()



    const newLine = {
        txt: 'Type Your Text Here',
        size: 30,
        color: getRandomColor(),
        font: 'poppins-regular',
        alignment: 0,
        pos: {
            x: 0,
            y: 0,
            width: 0,
            height: 0

        },
    }

    gMeme.lines.push(newLine)



    setPos(getLineIndex())


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

function setPos(memeLineIdx) {
    const { gElCanvas, gCtx } = getCanvasPropeties()
    const memeLine = gMeme.lines[memeLineIdx]
    gMeme.lines[memeLineIdx].pos.x = (gElCanvas.width / 2) - gCtx.measureText(memeLine.txt).width / 2;
    gMeme.lines[memeLineIdx].pos.y = placeLines(memeLineIdx) - memeLine.size / 2;
    gMeme.lines[memeLineIdx].pos.width = gCtx.measureText(memeLine.txt).width
    gMeme.lines[memeLineIdx].pos.height = memeLine.size
}

function getPos(tempIdx) {
    let pos
    if (tempIdx != undefined) {
        pos = gMeme.lines[tempIdx].pos
    } else {
        pos = gMeme.lines[gMeme.selectedLineIdx].pos
    }
    return pos
}
function getAvailableLines() {
    return gAvailableLines
}
function setAvailableLines(idx, bool) {
    gAvailableLines[idx] = bool
}