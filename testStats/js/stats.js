import choix_test from '../data/stats.json' assert {type: 'json'};

let question;
let options_cont;
let options;
let resultats_cont
let resultat;
let note
let retour;

let historiqueChoix;

init();

function init() {
    selecteurs();
    remplirTexte('0')
    interaction();
}

function selecteurs() {
    question = document.querySelector(".question");
    options_cont = document.querySelector(".options");
    options = document.querySelectorAll(".option");
    resultats_cont = document.querySelector(".resultats");
    resultat = document.querySelector(".resultat");
    note = document.querySelector(".note");
    retour = document.querySelector(".retour");
}

function remplirTexte(idChoix) {
    if (idChoix == '0' || idChoix == 0 ) {
        historiqueChoix = [];
        ajouterHistorique('0');
    }

    

    question.innerText = choix_test[idChoix].question;
    question.dataset.id_question = idChoix;
    console.log(choix_test[idChoix]);

    if (choix_test[idChoix].final) {
        remplirTexteResultat(idChoix);
    } else {
        remplirTexteQuestion(idChoix);
    }

    if (choix_test[idChoix].note) {
        note.classList.remove("cacher");
        note.innerText = choix_test[idChoix].note_txt;
    } else {
        note.classList.add("cacher");
    }
}

function remplirTexteQuestion(idChoix) {
    resultats_cont.classList.add("cacher");
    options_cont.classList.remove("cacher");
    
    for (let i = 0; i < options.length; i++) {
        options[i].innerText = choix_test[idChoix].choix[i];
        options[i].dataset.id_choix = choix_test[idChoix].id_choix[i];
    }
}

function remplirTexteResultat(idChoix) {
    resultats_cont.classList.remove("cacher");
    options_cont.classList.add("cacher");
    resultat.innerText = choix_test[idChoix].resultat;
}

function interaction() {
    options.forEach(el => {
        el.addEventListener("click", () => {
            remplirTexte(el.dataset.id_choix);
            ajouterHistorique(question.dataset.id_question);
            console.log(historiqueChoix);
        });
    });

    retour.addEventListener("click", () => {
        btnRetour();
    });
}

function ajouterHistorique(idChoix) {
    historiqueChoix.push(idChoix);
}

function btnRetour() {
    if (question.dataset.id_question != 0) {
        historiqueChoix.pop();
        remplirTexte(historiqueChoix[historiqueChoix.length - 1]);
    }
}