'use strict'

function onInitGallery() {
    renderImgs()
}

function renderImgs() {
    const imgs = getImgs()
    let strHTML = imgs.map(img =>
        `<img src="${img.url}" id="${img.id}" onclick="onSelectPic(${img.id})">`
    )
    
    document.querySelector('.gallery-container').innerHTML = strHTML.join('')
}