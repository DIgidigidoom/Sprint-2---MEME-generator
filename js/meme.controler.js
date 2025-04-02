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
        // renderLineFocus()
    }
}

function drawTxt() {

    const meme = getMeme()
    const memeLines = meme.lines

    memeLines.forEach(memeLine => {
        gCtx.beginPath()
        gCtx.font = `${memeLine.size}px Arial`
        gCtx.fillStyle = memeLine.color
        gCtx.textAlign = "center"
        gCtx.textBaseline = "middle"
        let memeLineIdx = getLineIndex()
        gCtx.fillText(memeLine.txt, gElCanvas.width / 2, placeLines(memeLineIdx))
        setLineIndex()
    })
    
}

// function renderLineFocus() {
//     var memes = getMeme()
//     // console.log(memes.lines)
//     // console.log(memes.selectedLineIdx)
//     // console.log(memes.lines[memes.selectedLineIdx])
//     const txtWidth = gCtx.measureText(memes.lines[memes.selectedLineIdx].txt).width
//     const txtHeight = memes.lines[memes.selectedLineIdx].size
//     gCtx.lineWidth = 2
//     gCtx.strokeStyle = "grey"


//     const padding = 10
//     gCtx.strokeRect((gElCanvas.width / 2) - txtWidth / 2 - padding, placeLines(memes.selectedLineIdx) - txtHeight / 2 - padding, txtWidth + padding * 2, txtHeight + padding * 2);
// }

function placeLines(linePlacing) {
    switch (linePlacing) {
        case 0:
            return 40
        case 1:
            return 350
        default:
            return 200

    }
}

// function onToggleLinesFocus() {
//     //model
//     setLineIndex()

//     //DOM
//     renderMeme()


// }

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

    //DOM 
    renderMeme(gImgId)
}





function onDownloadImg(elLink) {
    const imgContent = gElCanvas.toDataURL('image/jpeg')
    elLink.href = imgContent
}