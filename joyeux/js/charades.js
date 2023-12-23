

function init_charades() {
    premiere_charade();
    deuxieme_charade();
}

function premiere_charade() {
    let charade_premiere = document.getElementById("charade-1-input");
    let reponse = "corbeau";

    charade_premiere.addEventListener("input", el => {
        if (charade_premiere.value.toLowerCase() == reponse) {
            console.log("Succès");
            ajouter_pere_noel_texte("emoji_noel_un");
            localStorage.setItem("charade_un_completer", "true");
            charade_un_completer = "true";
            document.getElementById("indice-1").classList.toggle("locked");
        }
    });
}

function deuxieme_charade() {
    let charade_deuxieme = document.getElementById("charade-2-input");
    let reponse = "belvédère";

    charade_deuxieme.addEventListener("input", el => {
        if (charade_deuxieme.value.toLowerCase() == reponse) {
            console.log("Succès");
            ajouter_pere_noel_texte("emoji_noel_deux");
            localStorage.setItem("charade_deux_completer", "true");
            charade_deux_completer = "true";
            document.getElementById("indice-2").classList.toggle("locked");
        }
    });
}