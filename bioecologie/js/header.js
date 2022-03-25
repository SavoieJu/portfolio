let header_navigation = document.querySelector(".header_navigation");
let header_navigation_icon = document.querySelector("#menu_hamburger-icon");
{/* <i class="fa-solid fa-xmark"></i> */}
function basculerMenu() {
    if (header_navigation.style.display == "" || header_navigation.style.display == "none") {
        header_navigation.style.display = "flex";
        header_navigation_icon.classList.remove("fa-bars");
        header_navigation_icon.classList.add("fa-xmark");
    } else {
        header_navigation.style.display = "none";
        header_navigation_icon.classList.remove("fa-xmark");
        header_navigation_icon.classList.add("fa-bars");
    }
}

function choixMenu(choix) {
    let docBiodiv = document.querySelector("[data-cours='biodiv']");
    let docBotani = document.querySelector("[data-cours='botani']");
    let docChimie = document.querySelector("[data-cours='chimie']");
    let docEnvphy = document.querySelector("[data-cours='envphy']");

    if (screen.width <= 864) {
        basculerMenu();
    }

    switch (choix) {
        case "biodiv":
            docBiodiv.open = true;
            docBotani.open = false;
            docChimie.open = false;
            docEnvphy.open = false;
            break;
        case "botani":
            docBiodiv.open = false;
            docBotani.open = true;
            docChimie.open = false;
            docEnvphy.open = false;
            break;
        case "chimie":
            docBiodiv.open = false;
            docBotani.open = false;
            docChimie.open = true;
            docEnvphy.open = false;
            break;
        case "envphy":
            docBiodiv.open = false;
            docBotani.open = false;
            docChimie.open = false;
            docEnvphy.open = true;
            break;
    
        default:
            break;
    }
}