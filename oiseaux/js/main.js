let src = "data/chansons/XC445610 - American Woodcock - Scolopax minor.mp3";

function loadJSON(callback) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', 'data/oiseaux.json', true);
    xobj.onreadystatechange = function() {
        if (xobj.readyState == 4 && xobj.status == "200") {
            callback(xobj.responseText);
        }
    }
    xobj.send(null);
}

let jsonresponse = null;

loadJSON(function(response) {
    jsonresponse = JSON.parse(response);
    fillInBirds(jsonresponse);
});

init(src);

function init(newSong) {
    let currentAudio = document.querySelector("#player");
    let timeBar = document.querySelector("#timeLeft");

    
    let updateTimeBar = null;
    let isIntervalPaused = false;

    currentAudio.src = newSong;

    currentAudio.onloadedmetadata = function() {
        currentAudio.currentTime = 0;
        timeBar.max = currentAudio.duration * 100;

        updateTimeBar = setInterval(() => {
            if (!isIntervalPaused) {
                timeBar.value = currentAudio.currentTime * 100;
            }
        }, 100)
    };
    
    timeBar.addEventListener("change", ()=>{
        isIntervalPaused = true;
        currentAudio.currentTime = timeBar.value/100;
        currentAudio.play();
        isIntervalPaused = false;
    });

    timeBar.addEventListener("mousedown", ()=>{
        isIntervalPaused = true;
    });

    timeBar.addEventListener("mouseup", ()=>{
        isIntervalPaused = false;
    });

}

function fillInBirds(birdList) {
    let liste = document.querySelector(".liste");
    for (const bird in birdList) {
        liste.innerHTML += `<li data-src="${birdList[bird][1]}.mp3">${bird}</li>`;
    }
    eventListenerOiseaux();
}

let toutesOiseaux = null;
let audio = null;

function eventListenerOiseaux() {
    let oiseaux = document.querySelectorAll(".liste > li");
    audio = document.querySelector("#player");
    highlightCurrent(src, oiseaux, );

    oiseaux.forEach((el)=>{
        el.addEventListener("click", (element)=>{
            audio.src = "data/chansons/" + element.target.dataset.src + "";
            audio.dataset.current = "data/chansons/" + element.target.dataset.src + ""
            audio.play();
            highlightCurrent("", oiseaux, element);
        });
    });

    let barreRecherche = document.querySelector("#recherche");
    
    barreRecherche.addEventListener("input", (el)=>{
        toutesOiseaux = document.querySelectorAll(".liste > li");
        filter(el.target.value);
    });
    
}

function filter(recherche) {
    toutesOiseaux.forEach((el)=>{
        if (!el.innerHTML.toLowerCase().includes(recherche.toLowerCase())) {
            el.classList.add("hidden");
        } else {
            el.classList.remove("hidden");
        }
    });
}

function highlightCurrent(current, oiseaux, elements) {
    if (current != "") {
        oiseaux[0].classList.add("selected");
    } else {
        if (audio.dataset.current == "data/chansons/" + elements.target.dataset.src + "") {
            oiseaux.forEach((rem)=>{
                rem.classList.remove("selected");
            });
            elements.target.classList.add("selected");
        } else {
            elements.target.classList.remove("selected");
        }
    }
    
}










