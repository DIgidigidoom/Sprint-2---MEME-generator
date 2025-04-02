'use strict'
var gElCanvas
var gCtx
var gElImage
function onInitEditor(){
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    renderMeme()
}
function renderMeme(){
    clearCanvas()
    drawImageOnCanvas(1)

}

function clearCanvas(){
    gCtx.fillStyle = 'white'
    gCtx.fillRect(0, 0, gElCanvas.width, gElCanvas.height);
}

function drawImageOnCanvas(imgId) {
    const img = new Image()
    const elImg = getImgById(imgId)
    img.src = elImg.url
    
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
    }
}