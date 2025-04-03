'use strict'
var gElCanvas
var gCtx
var gElImage
var gImgId = 1
function onInitEditor() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    // CanvasFont()
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
function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.clientWidth
    gElCanvas.height = elContainer.clientHeight
    renderMeme()
}

function drawImageOnCanvas(gImgId) {
    const img = new Image()
    const elImg = getImgById(gImgId)
    img.src = elImg.url

    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
        drawTxt()
        renderLineFocus()
        renderInputTxtBox()


    }

}

function drawTxt() {

    const meme = getMeme()
    const memeLines = meme.lines
    let memeLineIdx = 0
    memeLines.forEach(memeLine => {
        gCtx.beginPath()
        gCtx.font = `${memeLine.size}px Poppins-extra-bold`
        gCtx.fillStyle = memeLine.color
        gCtx.textAlign = "center"
        gCtx.textBaseline = "middle"
        gCtx.fillText(memeLine.txt, gElCanvas.width / 2, placeLines(memeLineIdx))



        const x = (gElCanvas.width / 2) - gCtx.measureText(memeLine.txt).width / 2;
        const y = placeLines(memeLineIdx) - memeLine.size / 2;
        const txtWidth = gCtx.measureText(memeLine.txt).width
        const txtHeight = memeLine.size
        setPos(x, y, txtWidth, txtHeight, memeLineIdx)

        memeLineIdx += 1
    })



}
function CanvasFont(){
    const font = new FontFace('Poppins-extra-bold', 'url(/fonts/Poppins-ExtraBold.ttf)');
    font.load().then(function(loadedFont) {
        document.fonts.add(loadedFont);
    });
}
function renderLineFocus() {
    var memes = getMeme()
    // console.log(memes.lines)
    // console.log(memes.selectedLineIdx)
    // console.log(memes.lines[memes.selectedLineIdx])
    const memeLineIdx = getLineIndex()
    const txtWidth = gCtx.measureText(memes.lines[memeLineIdx].txt).width
    const txtHeight = memes.lines[memeLineIdx].size
    gCtx.lineWidth = 2
    gCtx.strokeStyle = "grey"
    

    const padding = 10
    gCtx.strokeRect((gElCanvas.width / 2) - txtWidth / 2 - padding, placeLines(memeLineIdx) - txtHeight / 2 - padding, txtWidth + padding * 2, txtHeight + padding * 2);

}

function placeLines(linePlacing) {
    switch (linePlacing) {
        case 0:
            return gElCanvas.height * 0.1
        case 1:
            return gElCanvas.height * 0.9
        case 2:
            return gElCanvas.height/2

    }
}

function onSelectTxt(ev) {
    const { offsetX, offsetY } = ev

    const memeLines = getMeme().lines

    const clickedTxtLineIndx = memeLines.findIndex(line =>
        offsetX >= line.pos.x && offsetX <= (line.pos.x + line.pos.width) &&
        offsetY >= line.pos.y && offsetY <= (line.pos.y + line.pos.height)
    )
    console.log(clickedTxtLineIndx)
   
    if (clickedTxtLineIndx >= 0) {
        setLineIndex(clickedTxtLineIndx)
    }

    renderMeme(gImgId)

}

/////////////////////////////// Editor Options ////////////////////////////////////

function onChangeText(editedTxt) {

    //Model
    const lineIdx = getLineIndex()
    setLineTxt(editedTxt,lineIdx)

    //DOM
    renderMeme(gImgId)
}

function onSetColorFill(EditedColor) {
    //Model
    const lineIdx = getLineIndex()
    setLineColor(EditedColor,lineIdx)

    //DOM
    renderMeme(gImgId)
}

function onChangeFontSize(direction) {
    //Model
    const lineIdx = getLineIndex()
    setLineSize(direction,lineIdx)

    //DOM
    renderMeme(gImgId)
}

function onAddLine() {
    //Model
    debugger
    addLine()

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

function onToggleLinesFocus() {

    //model
    toggleLineIndex()


    //DOM
    renderMeme(gImgId)


}

function renderInputTxtBox(){
  const elTxtBox =  document.querySelector('.txt-input')
  const lineIdx = getLineIndex()
  elTxtBox.value = getMeme().lines[lineIdx].txt
}




function onDownloadImg(elLink) {
    const imgContent = gElCanvas.toDataURL('image/jpeg')
    elLink.href = imgContent
}