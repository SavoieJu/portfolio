function init_navigation() {
    let btn1 = document.getElementById("charade-1");
    let btn2 = document.getElementById("charade-2");
    let btn3 = document.getElementById("defi-final");

    let contenant_vide = document.querySelector(".vide");
    let charade_premier = document.querySelector(".premier");
    let charade_deuxieme = document.querySelector(".deuxieme");

    //a faire
    let code_final = document.querySelector(".code_final");
    let indice_final = document.querySelector(".emplacement_final");

    btn1.addEventListener("click", () => {
        if (!possede_la_classe(contenant_vide, "hidden")) {
            contenant_vide.classList.add("hidden")
        }
        if (possede_la_classe(charade_premier, "hidden")) {
            charade_premier.classList.toggle("hidden");
        }
        if (!possede_la_classe(charade_deuxieme, "hidden")) {
            charade_deuxieme.classList.toggle("hidden");
        }
        if (!possede_la_classe(code_final, "hidden")) {
            code_final.classList.toggle("hidden");
        }
        if (!possede_la_classe(indice_final, "hidden")) {
            indice_final.classList.toggle("hidden");
        }
    })

    btn2.addEventListener("click", () => {
        if (!possede_la_classe(contenant_vide, "hidden")) {
            contenant_vide.classList.add("hidden")
        }
        if (!possede_la_classe(charade_premier, "hidden")) {
            charade_premier.classList.toggle("hidden");
        }
        if (possede_la_classe(charade_deuxieme, "hidden")) {
            charade_deuxieme.classList.toggle("hidden");
        }
        if (!possede_la_classe(code_final, "hidden")) {
            code_final.classList.toggle("hidden");
        }
        if (!possede_la_classe(indice_final, "hidden")) {
            indice_final.classList.toggle("hidden");
        }
    })

    btn3.addEventListener("click", () => {
        if (!possede_la_classe(contenant_vide, "hidden")) {
            contenant_vide.classList.add("hidden")
        }
        if (!possede_la_classe(charade_premier, "hidden")) {
            charade_premier.classList.toggle("hidden");
        }
        if (!possede_la_classe(charade_deuxieme, "hidden")) {
            charade_deuxieme.classList.toggle("hidden");
        }
        if (possede_la_classe(code_final, "hidden")) {
            if (localStorage.getItem("numpad_trouver") == "true") {
                if (!possede_la_classe(code_final, "hidden")) {
                    code_final.classList.toggle("hidden");
                }
                if (possede_la_classe(indice_final, "hidden")) {
                    indice_final.classList.toggle("hidden");
                }
            } else {
                if (possede_la_classe(code_final, "hidden")) {
                    code_final.classList.toggle("hidden");
                }
                if (!possede_la_classe(indice_final, "hidden")) {
                    indice_final.classList.toggle("hidden");
                }
            }
            
        }
    })
}