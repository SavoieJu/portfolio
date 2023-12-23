let list_valeurs_numpad = [];
let valeur_bon_code = 27839274;

function init_numpad() {
    let btn_numpad = document.querySelectorAll(".btn_numpad");
    btn_numpad.forEach(el => {
        el.addEventListener("click", () => {
            let valeur_pese = el.dataset.valeur;
            gestion_numpad(valeur_pese);
        })
    });
}

function gestion_numpad(valeur) {
    if ((valeur != "ok" && valeur != "back") && list_valeurs_numpad.length < 8) {
        switch (valeur) {
            case "1":
                list_valeurs_numpad.push("1")
                afficher_valeur_numpad(list_valeurs_numpad);
                break;
            case "2":
                list_valeurs_numpad.push("2")
                afficher_valeur_numpad(list_valeurs_numpad);
                break;
            case "3":
                list_valeurs_numpad.push("3")
                afficher_valeur_numpad(list_valeurs_numpad);
                break;
            case "4":
                list_valeurs_numpad.push("4")
                afficher_valeur_numpad(list_valeurs_numpad);
                break;
            case "5":
                list_valeurs_numpad.push("5")
                afficher_valeur_numpad(list_valeurs_numpad);
                break;
            case "6":
                list_valeurs_numpad.push("6")
                afficher_valeur_numpad(list_valeurs_numpad);
                break;
            case "7":
                list_valeurs_numpad.push("7")
                afficher_valeur_numpad(list_valeurs_numpad);
                break;
            case "8":
                list_valeurs_numpad.push("8")
                afficher_valeur_numpad(list_valeurs_numpad);
                break;
            case "9":
                list_valeurs_numpad.push("9")
                afficher_valeur_numpad(list_valeurs_numpad);
                break;
            case "0":
                list_valeurs_numpad.push("0")
                afficher_valeur_numpad(list_valeurs_numpad);
                break;
            default:
                break;
        }
    } else if (valeur == "back") {
        if (list_valeurs_numpad != []) {
            list_valeurs_numpad.pop();
            afficher_valeur_numpad(list_valeurs_numpad);
        }
    } else if (valeur == "ok") {
        let valeur_a_tester = "";
        list_valeurs_numpad.forEach(el => {
            valeur_a_tester = valeur_a_tester + "" + el;
        });
        test_numpad(parseInt(valeur_a_tester));
    }
}

function afficher_valeur_numpad(liste) {
    let valeur_a_affiche = "";
    liste.forEach(el => {
        valeur_a_affiche = valeur_a_affiche + el;
    });
    let affichage_numpad = document.getElementById("code_secret");
    affichage_numpad.value = valeur_a_affiche;
}

function test_numpad(valeur_essaie) {
    if (valeur_essaie == valeur_bon_code) {
        numpad_succes();
    } else {
        numpad_erreur();
    }
}

function numpad_erreur() {
    list_valeurs_numpad = [];
    afficher_valeur_numpad(list_valeurs_numpad);
}

function numpad_succes() {
    document.querySelector(".code_final").classList.toggle("hidden");
    document.querySelector(".emplacement_final").classList.toggle("hidden");
    ajouter_pere_noel_texte("emoji_noel_final")
    localStorage.setItem("numpad_trouver", "true");
}