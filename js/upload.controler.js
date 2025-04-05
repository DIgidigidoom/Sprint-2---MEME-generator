'use strict'
function onUploadToFB(url) {
    // console.log('url:', url)
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&t=${url}`)
}


function onUploadImg(ev) {
    ev.preventDefault()
    const canvasData = gElCanvas.toDataURL('image/jpeg')

    // After a successful upload, allow the user to share on Facebook
    function onSuccess(uploadedImgUrl) {
        // console.log('uploadedImgUrl:', uploadedImgUrl)
        const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        // console.log(' encodedUploadedImgUrl:', encodedUploadedImgUrl)
        document.querySelector('.modal').innerHTML = `
            <a class="img-url-a" href="${uploadedImgUrl}">Image Url</a>
            <p class="img-url-p">Image url: ${uploadedImgUrl}</p>
           
            <button class="btn btn-facebook" target="_blank" onclick="onUploadToFB('${encodedUploadedImgUrl}')">
                Share on Facebook  
            </button>
            <button class="btn close-modal-btn" onclick="onCloseModal()">Close</button> 
        `
    }
    const elModal = document.getElementById('modal_container')
    elModal.classList.add('show')
    uploadImg(canvasData, onSuccess)
}

function onCloseModal(){
    const elModal = document.getElementById('modal_container')
    elModal.classList.remove('show')
}


