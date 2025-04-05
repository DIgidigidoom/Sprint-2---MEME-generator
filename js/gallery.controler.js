'use strict'
var gIsSavedImgs = false


function onInitGallery() {
    _createImages()
    renderImgs()
}

function renderImgs() {
    let strHTML = ''
    if (!gIsSavedImgs) {
        const imgs = getImgs()
        strHTML = imgs.map(img =>
            `<img src="${img.url}" id="${img.id}" onclick="onSelectImg(${img.id})">`
        )
    } else {
        const imgs = getImgs()
        strHTML = imgs.map(img =>
            `<img src="${img.url}" id="${img.id}" onclick="onSelectImg(${img.id})">`
        )
    }

    document.querySelector('.gallery-container').innerHTML = strHTML.join('')
}

function onOpenGallery(bool) {
    gIsSavedImgs = bool
    let elEditor = document.querySelector('.editor-container')
    let elGallery = document.querySelector('.gallery-layout')

    elEditor.classList.add('hide')
    elGallery.classList.remove('hide')
    renderImgs()
}



function onSelectImg(imgId) {
    let elEditor = document.querySelector('.editor-container')
    let elGallery = document.querySelector('.gallery-layout')

    onClearCanvas()

    elEditor.classList.remove('hide')
    elGallery.classList.add('hide')
    
    renderMeme(imgId)


}

function onRandomizeMeme() {

    const imgs = getImgs()
    gImgId = getRandomInt(0, imgs.length)

    let elEditor = document.querySelector('.editor-container')
    let elGallery = document.querySelector('.gallery-layout')
    let elinputTxt = document.querySelector('.txt-input')
    elinputTxt.value = 'Type Your Text Here'
    resetMeme()
    elEditor.classList.remove('hide')
    elGallery.classList.add('hide')
    renderMeme(gImgId)

}