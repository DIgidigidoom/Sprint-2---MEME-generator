'use strict'
var gIsSavedImgs = false


function onInitGallery() {
    document.querySelector('.srch-gallery').addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
            const filterValue = e.target.value
            updateSearchCount(this.value)
        }
    })
    document.querySelector('.srch-gallery').addEventListener('change', function () {
        updateSearchCount(this.value)
      })
    
    _createImages()
    renderImgs()
    createPopularSrchs()
    sortSrchMap()
    updateTopFiveSrchs()
    setDataList()
}

function renderImgs(filteredImgs) {
    let strHTML = ''
    if (filteredImgs) {
        strHTML = filteredImgs.map(img =>
            `<img src="${img.url}" id="${img.id}" onclick="onSelectImg(${img.id})">`
        )
    } else {
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

function onFilterGallery(filter) {
    const imgs = getImgs()
    const cleanFilter = filter.toLowerCase().trim();
    let filteredImges = imgs.filter(img =>
        img.keywords.some(kw => kw.includes(cleanFilter)))

    renderImgs(filteredImges)
}

function updateTopFiveSrchs() {
    let innerHTML = ''
    let idx = 1
    gTopFiveKeys.forEach(srch => {
        const elFreqSrch = document.querySelector(`.freq-srch-${idx}`)
            innerHTML = srch[0]
            elFreqSrch.innerHTML = innerHTML
            elFreqSrch.style.fontSize = `${srch[1]*2}px`
        idx += 1
    });
   
}
function setDataList(){
    let idx = 1
    gTopFiveKeys.forEach(srch => {
        const elDataList = document.querySelector(`.data-list-${idx}`)
        elDataList.value = srch[0]
        idx += 1
    });
}

function onChooseFreqSrch(idx){
    const txtPressed = document.querySelector(`.freq-srch-${idx}`).innerHTML
    document.querySelector('.srch-gallery').value = ''
    document.querySelector('.srch-gallery').value = txtPressed
    updateSearchCount(txtPressed)
    onFilterGallery(txtPressed)
}
