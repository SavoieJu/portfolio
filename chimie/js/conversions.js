init();

function init() {
    let molecule = document.querySelector("#mm");
    molecule.addEventListener("input", ()=>{
        formatMol(molecule.value);
    });
}

function formatMol(molecule) {
    
    let elements = molecule.match(/./g);

    elements.forEach(element => {
        if (isNaN(parseInt(element))) {
        } else {
            elements[elements.indexOf(element)] = parseInt(element);
        }
    });

    formatedArray = [];
    build = "";

    for (i = 0; i < elements.length; i++) {
        
        if (isNaN(elements[i])) {
            if (((elements[i].toUpperCase() == elements[i] || elements[i] == "(") && elements[i] != ")") && !build.includes("(") || (build.includes("(") && build.includes(")"))) {
                formatedArray.push(build)
                build = elements[i];
            } else {
                build = build + elements[i];
            }
        } else {
            build = build + elements[i];
        }
        if (i == elements.length-1) {
            formatedArray.push(build)
        }
    }    

    formatedArray.shift();

    showRes(formatedArray)
}

function showRes(formatedArray) {
    let resPlace = document.querySelector(".resultmm");
    resPlace.innerHTML = "";
    console.log(resPlace);

    for (let i = 0; i < formatedArray.length; i++) {
        resPlace.innerHTML = resPlace.innerHTML += formatedArray[i] + " ";
    }
}