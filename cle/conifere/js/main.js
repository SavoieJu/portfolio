function loadJSON(callback) {

    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', '../conifere/data/con_hiver.json', true);
    xobj.onreadystatechange = function() {
        if (xobj.readyState == 4 && xobj.status == "200") {
            callback(xobj.responseText);
        }
    }
    xobj.send(null);

}

menuOpacity();
function menuOpacity() {
    window.addEventListener("scroll", function(e) {
        let menu = document.querySelector("header");
        if (this.oldScroll > this.scrollY) {
            menu.style.opacity = "1";
            menu.style.pointerEvents = "all";
        } else {
            menu.style.opacity = "0";
            menu.style.pointerEvents = "none";
        }
        this.oldScroll = this.scrollY;
    });
}


let jsonresponse = null;
let principal = "";

function init() {
    principal = "conifere";

    loadJSON(function(response) {
        jsonresponse = JSON.parse(response);
        principaleBuilder(principal);
    });

    
}

init();

function principaleBuilder(id) {
    let titre = jsonresponse[id].info.nom;
    let description = jsonresponse[id].info.description;
    let conteneur = document.querySelector(".conteneur");
    let template = `
        <div class="principale">
            <h3>${titre}</h3>
            <div class="choix">

            </div>
        </div>
    `;
    conteneur.innerHTML = template;
    
    if (jsonresponse[id].choix != undefined) {
        jsonresponse[id].choix.forEach(el => {
            choixBuilder(el);
        });

        jsonresponse[id].choix.forEach(ele => {
            let choixPresent = document.querySelector(`.${ele}`);
            choixPresent.addEventListener("click", (element) => {
                principaleBuilder(element.target.classList[0]);
            });
        });
    } else {
        resultatBuidler(id);
    }

    

}

function choixBuilder(choix) {
    let titreChoix = jsonresponse[choix].info.nom;
    let descriptionChoix = jsonresponse[choix].info.description;
    let conteneurChoix = document.querySelector(".choix");
    let templateChoix = `
        <div class="${choix} option">
            <h3 class="${choix}">${titreChoix}</h3>
            <h4 class="${choix}">${descriptionChoix}</h4>
        </div>
    `;

    conteneurChoix.innerHTML += templateChoix;
    
}

function resultatBuidler(resultat) {
    let res = jsonresponse[resultat].resultat[0];
    let titreresultat = jsonresponse[res].info.nom;
    let descriptionresultat = jsonresponse[res].info.description;
    let conteneurresultat = document.querySelector(".choix");
    let templateresultat = `
        <div class="${resultat} option">
            <h3 class="${resultat}">${titreresultat}</h3>
            <h4 class="${resultat}">${descriptionresultat}</h4>
        </div>
    `;

    conteneurresultat.innerHTML += templateresultat;
}