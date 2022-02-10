let hierarchie = ["Espèce", "Genre", "Famille", "Ordre", "Classe", "Embranchement", "Règne"];

function loadJSON(callback) {

    let xobj = new XMLHttpRequest();
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
let previousSelected = [];
let selected = "";

function init() {
    loadJSON(function(response) {
        jsonresponse = JSON.parse(response);
        buildTaxon(jsonresponse["Eukaryotes"]);
    });
}

function reload() {
    loadJSON(function(response) {
        jsonresponse = JSON.parse(response);
    });
}

init();

function depthOf (object) {
    let level = 0;
    for(let key in object) {
        if (!object.hasOwnProperty(key)) continue;

        if(typeof object[key] == 'object'){
            let depth = depthOf(object[key]) + 1;
            level = Math.max(depth, level);
        }
    }
    return level;
}

function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}

function buildTaxon(taxons) {
    tax = taxons;
    // console.log(taxons);
    if (taxons == undefined)  {
        tax = jsonresponse;
    }
    // console.log(tax);
    let options = ``;

    let level = depthOf(tax);
    
    if (level > 0) {
        for (const option in tax) {
            options += `<h3 class="option">${option}</h3>`;
        }
    } else {
        for (const option in tax) {
            options += `
            <div>
                <h4 class="option">${option}</h4>
                <h5 class="nomCommun">${tax[option]}</h5>
            </div>`;
        }
    }

    let taxon = `
        <div class="${hierarchie[depthOf(tax)]}">
            <h2>${hierarchie[depthOf(tax)]}</h2>
            <div class="options">${options}</div>
        </div>
    `;
       

    conteneur.innerHTML = taxon + conteneur.innerHTML;

    

    let optionsListener = document.querySelectorAll(`.${hierarchie[depthOf(tax)]} > .options > .option`);

    optionsListener.forEach((el)=>{
        el.addEventListener("click", (e)=>{
            if (isEmpty(tax[e.target.innerHTML]) != true) {
                e.target.classList.add("previouslySelected")
                buildTaxon(tax[e.target.innerHTML]);
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

    let previous = document.querySelectorAll(".conteneur > div:not(:first-child)");

    previous.forEach((el) => {
        el.childNodes[3].childNodes.forEach((els) => {
            els.addEventListener("click", (element) => {
                console.log(element.target);
                console.log("yoyo");
                goingBack(element);
            });
        });
    });
}

function goingBack(thing) {
    let child = thing.target.parentNode.parentNode;
    let parent = child.parentNode;
    let index = Array.prototype.indexOf.call(parent.children, child);
    let selection = thing.target.innerHTML;

    parent.childNodes.forEach(el=>{
        if (el.nodeName ==  "#text") {
            parent.removeChild(el);
        }
    });

    amountOfNodes = parent.childNodes.length;
    while (parent.childNodes.length != amountOfNodes-index) {
        parent.removeChild(parent.firstChild);
    }

    selected = document.querySelectorAll(".previouslySelected");
    selectedHtml = [];
    selected.forEach((els)=>{
        selectedHtml.push(els.innerHTML);
    })
    selectedHtml[0] = selection;
    high = selectedHtml;
    console.log(high);
    selectedHtml.push("Eukaryotes");
    selectedHtml.reverse();
    document.querySelector(".conteneur").innerHTML = "";
    // console.log(selectedHtml);
    reload();
    selectedHtml.forEach(elx=>{
        jsonresponse = jsonresponse[elx]
        console.log(jsonresponse);
        buildTaxon(jsonresponse);
    });
    highlightPreviouslySelected(high);
}

function highlightPreviouslySelected(previousSelected) {
    let selected = [];
    let options = document.querySelectorAll(".option");
    console.log(previousSelected);
    options.forEach(el=>{
        previousSelected.forEach(els=>{
            if (el.innerHTML == els) {
                el.classList.add("previouslySelected");
            }
            
        });
    })
}
