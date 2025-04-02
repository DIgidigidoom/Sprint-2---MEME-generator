'use strict'
var gElCanvas
var gCtx
var gElImage
var imgId = 1
function onInitEditor() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    var imgs = getImgs()
    saveToStorage(IMG_STORAGE, imgs)
    onClearCanvas()
    renderMeme()
}
//////////////////////////////// Canvas //////////////////////////////////////////
function renderMeme(imgId) {
    drawImageOnCanvas(imgId)
}

function onClearCanvas() {
    gCtx.fillStyle = 'white'
    gCtx.fillRect(0, 0, gElCanvas.width, gElCanvas.height);
}

function drawImageOnCanvas(imgId = 1) {
    const img = new Image()
    const elImg = getImgById(imgId)
    img.src = elImg.url

    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
        drawTxt(1)
    }
}


/////////////////////////////// Editor Options ////////////////////////////////////

function onChangeText(editedTxt) {

    //Model
    setLineTxt(editedTxt)

    //DOM
    renderMeme()
}

function drawTxt(imgIdx, pos/*(0=top,1= buttom 2 = middle)*/) {

    const meme = getMeme()
    const memeTxt = meme.lines.txt

    gCtx.beginPath()
    gCtx.font = "40px Arial";
    gCtx.textAlign = "center";
    gCtx.textBaseline = "middle";
    gCtx.fillText(memeTxt, gElCanvas.width / 2, 40);

}