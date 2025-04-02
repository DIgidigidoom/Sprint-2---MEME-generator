'use strict'

function onInitGallery() {
    renderImgs()
}

function renderImgs() {
    const imgs = getImgs()
    let strHTML = imgs.map(img =>
        `<img src="${img.url}" id="${img.id}" onclick="onSelectImg(${img.id})">`
    )

    document.querySelector('.gallery-container').innerHTML = strHTML.join('')
}

function onOpenGallery() {
    let elEditor = document.querySelector('.editor-container')
    let elGallery = document.querySelector('.gallery-container')

    elEditor.classList.add('hide')
    elGallery.classList.remove('hide')
}


function onSelectImg(imgId) {
    let elEditor = document.querySelector('.editor-container')
    let elGallery = document.querySelector('.gallery-container')
    let elinputTxt = document.querySelector('.txt-input')
    elinputTxt.value = 'Type Your Text Here'
    resetMeme()
    elEditor.classList.remove('hide')
    elGallery.classList.add('hide')
    renderMeme(imgId)
    

}