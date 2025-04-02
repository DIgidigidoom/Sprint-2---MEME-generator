'use strict'

function onInitGallery() {
    renderImgs()
}

function renderImgs() {
    const imgs = getImgs()
    let strHTML = imgs.map(img =>
        `<img src="${img.url}" id="${img.id}" onclick="onSelectPic(${img.id})">`
    )
    debugger
    document.querySelector('.gallery-container').innerHTML = strHTML.join('')

}