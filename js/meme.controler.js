'use strict'
var gElCanvas
var gCtx
var gElImage
var gImgId = 1
function onInitEditor() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    var imgs = getImgs()
    saveToStorage(IMG_STORAGE, imgs)
    onClearCanvas()
    renderMeme()
}
//////////////////////////////// Canvas //////////////////////////////////////////
function renderMeme(imgId = 1) {
    gImgId = imgId
    drawImageOnCanvas(gImgId)
}

function onClearCanvas() {
    gCtx.fillStyle = 'white'
    gCtx.fillRect(0, 0, gElCanvas.width, gElCanvas.height);
}

function drawImageOnCanvas(gImgId) {
    const img = new Image()
    const elImg = getImgById(gImgId)
    img.src = elImg.url

    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
        drawTxt()
        renderLineFocus()

    }

}

function drawTxt() {

    const meme = getMeme()
    const memeLines = meme.lines
    let memeLineIdx = 0
    memeLines.forEach(memeLine => {
        gCtx.beginPath()
        gCtx.font = `${memeLine.size}px Arial`
        gCtx.fillStyle = memeLine.color
        gCtx.textAlign = "center"
        gCtx.textBaseline = "middle"
        gCtx.fillText(memeLine.txt, gElCanvas.width / 2, placeLines(memeLineIdx))
        memeLineIdx += 1


        const x = gElCanvas.width / 2;
        const y = placeLines(memeLineIdx);
        const txtWidth = gCtx.measureText(memeLine.txt).width
        const txtHeight = memeLine.size

        console.log(x)
        console.log(y)

        console.log(txtWidth)
        console.log(txtHeight)

    })

    

}

function renderLineFocus() {
    var memes = getMeme()
    // console.log(memes.lines)
    // console.log(memes.selectedLineIdx)
    // console.log(memes.lines[memes.selectedLineIdx])
    const txtWidth = gCtx.measureText(memes.lines[memes.selectedLineIdx].txt).width
    const txtHeight = memes.lines[memes.selectedLineIdx].size
    gCtx.lineWidth = 2
    gCtx.strokeStyle = "grey"
    const memeLineIdx = getLineIndex()

    const padding = 10
    gCtx.strokeRect((gElCanvas.width / 2) - txtWidth / 2 - padding, placeLines(memeLineIdx) - txtHeight / 2 - padding, txtWidth + padding * 2, txtHeight + padding * 2);
    
}

function placeLines(linePlacing) {
    switch (linePlacing) {
        case 0:
            return 40
        case 1:
            return 350
        case 2:
            return 200

    }
}

function onToggleLinesFocus() {
    
    //model
    setLineIndex()


    //DOM
    renderMeme(gImgId)


}

/////////////////////////////// Editor Options ////////////////////////////////////

function onChangeText(editedTxt) {

    //Model
    setLineTxt(editedTxt)

    //DOM
    renderMeme(gImgId)
}

function onSetColorFill(EditedColor) {
    //Model
    setLineColor(EditedColor)

    //DOM
    renderMeme(gImgId)
}

function onChangeFontSize(direction) {
    //Model
    setLineSize(direction)

    //DOM
    renderMeme(gImgId)
}

function onAddLine() {
    //Model
    addLine()
    setLineIndex()
    //DOM 
    renderMeme(gImgId)
}

function getEvPos(ev) {
    const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']

    let pos = {
        x: ev.offsetX,
        y: ev.offsetY,
    }

    if (TOUCH_EVS.includes(ev.type)) {
        //* Prevent triggering the default mouse behavior
        ev.preventDefault()

        //* Gets the first touch point (could be multiple in touch event)
        ev = ev.changedTouches[0]

        /* 
        * Calculate touch coordinates relative to canvas 
        * position by subtracting canvas offsets (left and top) from page coordinates
        */
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
            // x: ev.pageX ,
            // y: ev.pageY ,
        }
    }
    return pos
}



function onDownloadImg(elLink) {
    const imgContent = gElCanvas.toDataURL('image/jpeg')
    elLink.href = imgContent
}