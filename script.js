const imageContainer = document.getElementById('imageContainer');
const loader = document.getElementById('loaderContainer');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];
let initialLoading=true;


const countImage = 5;
const clientId = "z5LcyXX3ghc-9DBtHwGVcVgvRQUfnvfFa6lPTpxiRT0";
let apiUrl = `https://api.unsplash.com/photos/random?client_id=${clientId}&count=${countImage}`;


function changeCount(afterInitalCount){
     apiUrl = `https://api.unsplash.com/photos/random?client_id=${clientId}&count=${afterInitalCount}`;
}
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}



function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    photosArray.forEach((photo) => {
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });
        img.addEventListener('load', ()=>{
            imagesLoaded++;
            if (imagesLoaded === totalImages) {
                ready = true;
                loader.hidden = true;
                
            }
        });
        
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

async function getImages() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
        if (initialLoading) {
            afterInitalCount(30);
            initialLoading=false;
        }
    } catch (error) {
        console.error(error);
    }
}

window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getImages();
    }
});

// On load
getImages();
