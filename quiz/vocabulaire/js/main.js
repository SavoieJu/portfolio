let jsonresponse = [];
let questionRestante = [];
let repondu = false;
let numQuestionActuelle = -1;
let numDeChoixUtilise = 0;
let pointage = 0;
let totalQuestion = 0;
let typeDeQuestion = ["choix"];
var questionChoix = [];
let ordreQuestion = [];
let erreur = document.querySelector("#erreur");
let questionNumero = 1;

loadJSON(function(response) {
    jsonresponse = JSON.parse(response).liste;
    init();
});

function init() {
    let btnSuivant = document.querySelector("#bouton_suivant");
    let erreur = document.querySelector("#erreur");

    // btnSuivant.addEventListener("click", () => {
    //     if (repondu) {
    //         prochaineQuestion();
    //     } else {
    //         erreur.classList.remove("hidden");
    //         erreur.style.opacity = 1;
    //     }
    // });

    remplirQuestionRestante();
}

function loadJSON(callback) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', 'data/vocab.json', true);
    xobj.onreadystatechange = function() {
        if (xobj.readyState == 4 && xobj.status == "200") {
            callback(xobj.responseText);
        }
    }
    xobj.send(null);
}

function remplirQuestionRestante() {
    questionRestante = jsonresponse;
    ordreQuestion = genererOrdeQuestion();
    questionChoix = choisirQuestionARepondre();

    questionSuivante();
}

function choisirTypeQuestionRandom() {
    let type = "";
    type = typeDeQuestion[Math.floor(Math.random() * typeDeQuestion.length)];
    return type;
}

function genererOrdeQuestion() {
    var arr = [];
    while(arr.length < questionRestante.length){
        var r = Math.floor(Math.random() * questionRestante.length);
        if(arr.indexOf(r) === -1) arr.push(r);
    }
    return arr;
}

function choisirQuestionARepondre() {
    let questionEtChoix = {

    };
    for (let i = 0; i < ordreQuestion.length; i++) {
        let question = ordreQuestion[i];
        let randomChoix = ordreQuestion[i];
        let choix = [];

        for (let u = 0; u < 3; u++) {
            randomChoix = randomChiffre(ordreQuestion.length);
            while (randomChoix == question || choix.includes(randomChoix)) {
                randomChoix = randomChiffre(ordreQuestion.length);
            }
            choix.push(randomChoix);
        }

        questionEtChoix[i] = {
            "question": ordreQuestion[i],
            "choix": choix
        };
        choix = [];
    }  
    return questionEtChoix;
}

function randomChiffre(size) {
    return Math.floor(Math.random() * size);
}

function questionSuivante() {
    mettreAJourPointage();
    erreur.classList.add("hidden");
    erreur.style.opacity = 0;
    repondu = false;
    numQuestionActuelle++;
    if (numQuestionActuelle % questionRestante.length == 0 && numQuestionActuelle != 0) {    
        numQuestionActuelle = -1;
        remplirQuestionRestante();
    } else {
        contruireChoix();
    }
}

function contruireChoix() {
    let choix_conteneur = document.querySelector(".input_conteneur");
    let lemotAfficher = document.querySelector("#prompt");
    let questionARemplir = numQuestionActuelle;
    let ordeAAfficher = questionChoix[questionARemplir].choix;
    ordeAAfficher.push(questionChoix[questionARemplir].question);
    ordeAAfficher = shuffle(ordeAAfficher);

    choix_conteneur.innerHTML = "";

    choix_conteneur.innerHTML = `
    <ul>
        <li onclick="verifierChoix(${ordeAAfficher[0]}, this)" data-q="${ordeAAfficher[0]}">${questionRestante[ordeAAfficher[0]].definition}.</li>
        <li onclick="verifierChoix(${ordeAAfficher[1]}, this)" data-q="${ordeAAfficher[1]}">${questionRestante[ordeAAfficher[1]].definition}.</li>
        <li onclick="verifierChoix(${ordeAAfficher[2]}, this)" data-q="${ordeAAfficher[2]}">${questionRestante[ordeAAfficher[2]].definition}.</li>
        <li onclick="verifierChoix(${ordeAAfficher[3]}, this)" data-q="${ordeAAfficher[3]}">${questionRestante[ordeAAfficher[3]].definition}.</li>
    </ul>
    `;

    lemotAfficher.innerHTML = questionRestante[questionChoix[questionARemplir].question].mot;
}

//Fisher-Yates Shuffle
function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    while (currentIndex != 0) {
  
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

  function verifierChoix(reponse, sender) {
    if (!repondu && reponse == questionChoix[numQuestionActuelle].question) {
        sender.classList.add("correct");
        pointage++;
        totalQuestion++;
        questionNumero++;
    } else if (!repondu){
        sender.classList.add("mauvais");
        totalQuestion++;
        questionNumero++;
        document.querySelector(`[data-q="${questionChoix[numQuestionActuelle].question}"]`).classList.add("correct");
    }
    
    repondu = true;
  }

  function suivant() {
      if (repondu) {
        questionSuivante();
      } else {
        erreur.classList.remove("hidden");
        erreur.style.opacity = 1;
      }
  }

  function mettreAJourPointage() {
      let questionNb = document.querySelector("#total");
      let pointageScore = document.querySelector("#pointage");
      let pointageTotal = document.querySelector("#total_possible");

      questionNb.innerHTML = questionNumero;
      pointageScore.innerHTML = pointage;
      pointageTotal.innerHTML = totalQuestion;
  }