'use strict'
var gElCanvas
var gCtx
var gElImage
var gImgId = 1
var gEmojiMode = false
var gEmoji

function onInitEditor() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    addLine()
    onClearCanvas()
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

}


//////////////////////////////// Canvas //////////////////////////////////////////
function renderMeme(imgId = 1) {
    gImgId = imgId
    drawImageOnCanvas(gImgId)

}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.clientWidth
    gElCanvas.height = elContainer.clientHeight
    // setPos(getLineIndex())
    renderMeme(gImgId)

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
        drawEmoji()

    }

}

function drawTxt() {

    const meme = getMeme()
    const memeLines = meme.lines
    let memeLineIdx = 0

    memeLines.forEach(memeLine => {
        setPos(memeLineIdx)
        gCtx.beginPath()
        gCtx.font = `${memeLine.size}px ${memeLine.font}`
        gCtx.fillStyle = memeLine.color
        gCtx.textAlign = 'center'
        gCtx.textBaseline = "middle"
        const { x, y, width, height } = getPos(memeLineIdx)
        gCtx.fillText(memeLine.txt, x + width / 2, y + height / 2)

        memeLineIdx += 1
    })



}

function drawEmoji(ev, pos) {
    const emojis = getEmojis()
    const emoji = emojis.emoji
    emoji.forEach(em => {
        const x = em.pos.x
        const y = em.pos.y
        gCtx.beginPath()
        gCtx.font = "40px Arial";
        gCtx.textAlign = "center";
        gCtx.textBaseline = "middle";

        gCtx.fillText(em.type, x, y);
    })
    clearEmojiSelection()
}

function renderLineFocus() {

    const { x, y, width, height } = getPos()

    gCtx.lineWidth = 2
    gCtx.strokeStyle = "grey"
    gCtx.strokeRect(x - 20, y, width + 40, height);

}

function placeLines(lineIdx) {

    switch (lineIdx) {
        case 0:
            return gElCanvas.height * 0.1
        case 1:

            return gElCanvas.height * 0.9
        default:

            return gElCanvas.height / 2

    }
}

function onDown(ev) {
    const pos = getEvPos(ev)
    if (gEmojiMode) {
        addEmoji(pos)
    }

    onSelectTxt(ev, pos)
    renderMeme(gImgId)
}

function onSelectTxt(ev, pos) {
    // const pos = getEvPos(ev)

    const memeLines = getMeme().lines

    const clickedTxtLineIndx = memeLines.findIndex(line =>
        pos.x >= line.pos.x && pos.x <= (line.pos.x + line.pos.width) &&
        pos.y >= line.pos.y && pos.y <= (line.pos.y + line.pos.height)
    )
    console.log(clickedTxtLineIndx)

    if (clickedTxtLineIndx >= 0) {
        setLineIndex(clickedTxtLineIndx)
    }

    updateFontSelctor()



}

function getCanvasPropeties() {
    const canvasProperties = { gElCanvas, gCtx }
    return canvasProperties
}

/////////////////////////////// EDITOR OPTIONS ////////////////////////////////////

function onChangeText(editedTxt) {

    //Model
    const lineIdx = getLineIndex()
    setLineTxt(editedTxt, lineIdx)

    //DOM
    renderMeme(gImgId)
}

function renderInputTxtBox() {
    const elTxtBox = document.querySelector('.txt-input')
    const lineIdx = getLineIndex()
    elTxtBox.value = getMeme().lines[lineIdx].txt
}

/////////// Line Edit Row /////////////////////////
function onToggleLinesFocus() {

    //model
    toggleLineIndex()


    //DOM
    renderMeme(gImgId)


}

function onAddLine() {
    //Model
    toggleLineIndex()
    addLine()
    
    //DOM 
    renderMeme(gImgId)
}

function onDltLine() {
    //Model
    if (getMeme().lines.length === 0) return
    const lineIdx = getLineIndex()
    dltLine(lineIdx)

    //DOM
    renderMeme(gImgId)

}

function onClearCanvas() {
    gCtx.fillStyle = 'white'
    gCtx.fillRect(0, 0, gElCanvas.width, gElCanvas.height);
}


/////////// Text Edit Row /////////////////////////
function onChangeFontSize(direction) {
    //Model
    const lineIdx = getLineIndex()
    setLineSize(direction, lineIdx)

    //DOM
    renderMeme(gImgId)
}

function onTextAlign(txtAlign) {
    //Model
    const lineIdx = getLineIndex()
    textAlign(txtAlign, lineIdx)

    //DOM
    renderMeme(gImgId)
}

function onMoveText(direction) {
    //Model
    const lineIdx = getLineIndex()
    moveText(direction, lineIdx)

    //DOM
    renderMeme(gImgId)
}

function onSetColorFill(EditedColor) {
    //Model
    const lineIdx = getLineIndex()
    setLineColor(EditedColor, lineIdx)

    //DOM
    renderMeme(gImgId)
}

function onFontSelect(newFont) {
    //Model
    const lineIdx = getLineIndex()
    setTxtFont(newFont, lineIdx)

    //DOM
    renderMeme(gImgId)
}

function updateFontSelctor() {
    const meme = getMeme()
    const lineIdx = getLineIndex()
    const font = meme.lines[lineIdx].font
    const dropdown = document.getElementById("font-selctor");
    dropdown.value = font;
}

/////////// Emojis /////////////////////////
function onEmojiSelected(emoji) {
    gEmojiMode = true
    switch (emoji) {
        case 'happy':
            gEmoji = '😃'
            break
        case 'cool':
            gEmoji = '😎'
            break
        case 'frozen':
            gEmoji = '🥶'
            break
    }
}

function clearEmojiSelection() {
    document.querySelectorAll('.emojis input[type="radio"]').forEach(radio => {
        radio.checked = false
    })
    gEmojiMode = false
}


/////////// Share Options /////////////////////////
function onDownloadImg(elLink) {
    const imgContent = gElCanvas.toDataURL('image/jpeg')
    elLink.href = imgContent
}

function onSaveImg() {
    const canvasData = gElCanvas.toDataURL('image/jpeg')
    addImg(canvasData)
}


////////////////////////////////////////Misc..////////////////////////////////////////////////////
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
function toggleMenu() {
    document.body.classList.toggle('menu-open')
}