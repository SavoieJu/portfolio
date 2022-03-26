let visionneur = document.querySelector(".visionneur");
let body = document.querySelector("body");
let conteneurImageVisionneur = document.querySelector(".visionneur_images_conteneur");
let images = [];
let currentImage = 0;

window.addEventListener("load", loadede);

function loadede() {
    selectionnerImages();
}

function selectionnerImages() {
    images = Array.from(document.querySelectorAll("main img"));
    console.log(images);
    ajoutEventSurImages(); 
}

function ajoutEventSurImages() {
    images.forEach((img, index)=>{
        img.dataset.index = index;
        img.addEventListener("click", (el)=>{
            mettreImageDansVisionneur(img);
            toggleVisionneur(el.target.dataset.index);
            currentImage = el.target.dataset.index
        });
        
    });
}

function toggleVisionneur(initialOpen = "0") {
    toggleClass(visionneur, "hidden");
    toggleClass(body, "no_scroll");
}

function toggleClass(element, className) {
    element.classList.toggle(className);
}

function mettreImageDansVisionneur(img) {
    let nouvelleImage = document.createElement('div');

    conteneurImageVisionneur.innerHTML = "";

    nouvelleImage.classList.add("visionneur_images_conteneur_image");
    nouvelleImage.style.backgroundImage = `url(${img.src})`;

    conteneurImageVisionneur.append(nouvelleImage);
}

function precedant() {
    currentImage--;
    if (currentImage < 0) {
        currentImage = images[images.length-1].dataset.index;
        mettreImageDansVisionneur(images[currentImage]);
    } else {
        mettreImageDansVisionneur(images[currentImage]);
    }
}

function suivant() {
    currentImage++;
    if (currentImage > images.length-1) {
        currentImage = 0;
        mettreImageDansVisionneur(images[currentImage]);
    } else {
        mettreImageDansVisionneur(images[currentImage]);
    }
}