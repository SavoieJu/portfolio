let parties = ["bas-ventre", "anneau péri-occulaire", "oeil", "sourcil", "avant-sourcil", "tectrices des primaires", "lore", "joue", "gorge", "nuque", "poitrine", "côté", "ventre", "flanc", "sous-caudale", "queue", "primaires", "malaires", "grandes tectrices", "callote", "tertiaires", "scapulaires", "bec", "bandeau", "dos", "tectrices moyennes", "secondaires", "tectrices"];
let pathSVG = document.querySelectorAll("[data-partie]");
let partiesRestantes = parties;
let partieLive = "";
let nbErreur = 0;
let nbCorrect = 0;
let total = 0;
let isLast = false
init();

function init() {
    partieLive = "";
    nbErreur = 0;
    nbCorrect = 0;
    total = 0;
    chosirPartie();
    partieListener();
}

function chosirPartie() {
        updaterResultat()
        total++;
        let randomNb = Math.floor(Math.random() * partiesRestantes.length);
        partieLive = "" + partiesRestantes[randomNb] + "";
        let partieAffiche = document.querySelector(".partieAffiche");
        partiesRestantes = arrayEnleve(partiesRestantes, partieLive)
        partieAffiche.innerHTML = partieLive;
}

function arrayEnleve(array, valeur) { 
    return array.filter(function(ele){ 
        return ele != valeur; 
    });
}

function partieListener() {
    let partieSVG = document.querySelectorAll("[data-partie]");
    
    partieSVG.forEach(el => {
        el.addEventListener("click", (partie)=>{
            if (partiesRestantes.length == 0) {
                let partieSVG = document.querySelectorAll("[data-partie]");
                partiesRestantes = parties;
                verifierPartie(partie, partieLive);
                partieSVG.forEach(el => {
                    pathSVG.forEach((el)=>{
                        el.style.fill = "";
                    });
                });
            } else {
                verifierPartie(partie, partieLive);
            }
        });
    });
}

function verifierPartie(partie, partieLa) {
    if (partie.target.dataset.partie == partieLa) {
        if (nbErreur == 0) {
            selectPathSVG(partie.target.dataset.partie).style.fill = "green";
            nbErreur = 0;
            nbCorrect++;
            chosirPartie();
        } else {
            selectPathSVG(partie.target.dataset.partie).style.fill = "yellow";
            nbErreur = 0;
            chosirPartie();
        }
    } else if (partie.target.dataset.partie != partieLa) {
        if (nbErreur > 0) {
            selectPathSVG(partieLive).style.fill = "red";
            nbErreur = 0;
            chosirPartie();
        } else {
            nbErreur++;
        }
    }
}

function selectPathSVG(path) {
    let res = ""
    pathSVG.forEach((el) => {
        if (el.dataset.partie == path) {
            res = el;
        }
    });
    return res;
}

function updaterResultat() {
    let bonReponse = document.querySelector("#good");
    let totalReponse = document.querySelector("#total");

    bonReponse.innerHTML = nbCorrect;
    totalReponse.innerHTML = total;
}