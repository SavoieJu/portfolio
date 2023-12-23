let premiere_visite = "true";
let charade_un_completer = "false";
let charade_deux_completer = "false";
let numpad_trouver = "false";

init();

function init() {

    if (localStorage.getItem("premiere_visite") == null) {
        let aide_generale_popup = document.querySelector(".aide_generale");
        aide_generale_popup.classList.toggle("hidden");
    }

    prendre_valeurs_enregistrer();
    init_numpad();
    init_navigation();
    init_popup();
    init_charades();
    init_btn_indices();
}

function ajouter_pere_noel_texte(class_btn_cible) {
    document.querySelectorAll("." + class_btn_cible).forEach(el => {
        el.innerHTML = "🎅";
    })
}

function possede_la_classe(element, classe) {
    if (element.classList.contains(classe)) {
        return true
    } else {
        return false
    }
}

function prendre_valeurs_enregistrer() {
    if (localStorage.getItem("premiere_visite") == null) {
        localStorage.setItem("premiere_visite", "false");
        premiere_visite = "false";
        localStorage.setItem("charade_un_completer", "false");
        localStorage.setItem("charade_deux_completer", "false");
        localStorage.setItem("numpad_trouver", "false");
    } else {
        charade_un_completer = localStorage.getItem("charade_un_completer");
        charade_deux_completer = localStorage.getItem("charade_deux_completer");
        numpad_trouver = localStorage.getItem("numpad_trouver");

        etape_completer();
    }
}

function etape_completer() {
    if (localStorage.getItem("charade_un_completer") == "true") {
        ajouter_pere_noel_texte("emoji_noel_un");
        document.getElementById("charade-1-input").value = "corbeau"
        charade_un_completer = "true";
        document.getElementById("indice-1").classList.toggle("locked");
    }

    if (localStorage.getItem("charade_deux_completer") == "true") {
        ajouter_pere_noel_texte("emoji_noel_deux");
        document.getElementById("charade-2-input").value = "belvédère"
        charade_deux_completer = "true";
        document.getElementById("indice-2").classList.toggle("locked");
    }

    if (localStorage.getItem("numpad_trouver") == "true") {
        ajouter_pere_noel_texte("emoji_noel_final");
        numpad_trouver = "true";
    }
}

function init_popup() {

    let fermer_popup_btn = document.querySelectorAll(".fermer_popup");

    fermer_popup_btn.forEach((ele) => {
        ele.addEventListener("click", () => {
            let popups = document.querySelectorAll(".popup");
            popups.forEach(el => {
                if (!possede_la_classe(el, "hidden")) {
                    el.classList.toggle("hidden");
                }
            })
        });
    });

    let btn_aide_generale = document.querySelector(".btn_aide_generale");
    btn_aide_generale.addEventListener("click", () => {
        let popup_aide = document.querySelector(".aide_generale");
        if (possede_la_classe(popup_aide, "hidden")) {
            popup_aide.classList.toggle("hidden");
        }
    });
}

function init_btn_indices() {
    let btn_charades_empl_un = document.getElementById("indice-1");
    let popup_indice_un = document.querySelector(".popup_indice_un");
    if (localStorage.getItem("charade_un_completer") == "true") {
        btn_charades_empl_un.classList.remove("locked");
    }
    btn_charades_empl_un.addEventListener("click", () => {
        if (localStorage.getItem("charade_un_completer") == "true") {
            popup_indice_un.classList.toggle("hidden");
        }
    });


    let btn_charades_empl_deux = document.getElementById("indice-2");
    let popup_indice_deux = document.querySelector(".popup_indice_deux");
    if (localStorage.getItem("charade_deux_completer") == "true") {
        btn_charades_empl_deux.classList.remove("locked");
    }
    btn_charades_empl_deux.addEventListener("click", () => {
        if (localStorage.getItem("charade_deux_completer") == "true") {
            popup_indice_deux.classList.toggle("hidden");
        }
    });

    let btn_charades_empl_final = document.getElementById("indice-3");
    let popup_indice_final = document.querySelector(".popup_indice_final");
    if (localStorage.getItem("numpad_trouver") == "true") {
        btn_charades_empl_final.classList.remove("locked");
    }
    btn_charades_empl_final.addEventListener("click", () => {
        if (localStorage.getItem("numpad_trouver") == "true") {
            popup_indice_final.classList.toggle("hidden");
        }
    });
}