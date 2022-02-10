let hierarchie = ["Espèce", "Genre", "Famille", "Ordre", "Classe", "Embranchement", "Règne"];

function loadJSON(callback) {

    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', "taxonomie/data/taxonomie.json", true);
    xobj.onreadystatechange = function() {
        if (xobj.readyState == 4 && xobj.status == "200") {
            callback(xobj.responseText);
        }
    }
    xobj.send(null);

}

let jsonresponse = null;
let conteneur = document.querySelector(".conteneur");


function init() {
    loadJSON(function(response) {
        jsonresponse = JSON.parse(response);
        buildTaxon(jsonresponse);
    });
}

init();

function depthOf (object) {
    var level = 0;
    for(var key in object) {
        if (!object.hasOwnProperty(key)) continue;

        if(typeof object[key] == 'object'){
            var depth = depthOf(object[key]) + 1;
            level = Math.max(depth, level);
        }
    }
    return level;
}

function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}

function buildTaxon(taxons) {
    let options = ``;

    let level = depthOf(taxons);
    
    if (level > 0) {
        for (const option in taxons) {
            options += `<h3 class="option">${option}</h3>`;
        }
    } else {
        for (const option in taxons) {
            options += `
            <div>
                <h4 class="option">${option}</h4>
                <h5 class="nomCommun">${taxons[option]}</h5>
            </div>`;
        }
    }
    
    let taxon = `
        <div class="${hierarchie[depthOf(taxons)]}">
            <h2>${hierarchie[depthOf(taxons)]}</h2>
            <div class="options">${options}</div>
        </div>
    `;    

    conteneur.innerHTML = taxon + conteneur.innerHTML;

    

    let optionsListener = document.querySelectorAll(`.${hierarchie[depthOf(taxons)]} > .options > .option`);

    optionsListener.forEach((el)=>{
        el.addEventListener("click", (e)=>{
            if (isEmpty(taxons[e.target.innerHTML]) != true) {
                e.target.classList.add("previouslySelected")
                buildTaxon(taxons[e.target.innerHTML]);
            } else {
                let wip = `
                    <div>
                        <h2>Il n'y a rien pour l'instant</h2>
                    </div>
                `;   
                conteneur.innerHTML = wip + conteneur.innerHTML;
            }
        });
    });

    console.log(optionsListener);
}
