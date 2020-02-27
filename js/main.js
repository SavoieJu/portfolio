window.addEventListener("load", () => {
    menuOpacity();
    textTransition();
    accordeon();
});

function menuOpacity() {
    window.addEventListener("scroll", function(e) {
        let menu = document.querySelector("header");
        if (this.oldScroll > this.scrollY) {
            menu.style.opacity = "1";
            menu.style.pointerEvents = "all";
        } else {
            menu.style.opacity = "0";
            menu.style.pointerEvents = "none";
        }
        this.oldScroll = this.scrollY;
    });
}

function textTransition() {
    window.addEventListener("scroll", ()=>{
        let bigTextAccueil = document.querySelector("section.accueil > h2");
    
        bigTextAccueil.style.transform = "translateX("+ this.scrollY*3 +"px)";
    });
}


function accordeon() {
    let projetAccordeon = document.querySelectorAll(".projets_liste_projet_titre");

    projetAccordeon.forEach(el => {
        el.addEventListener("click", function() {
            if (el.children[2].checked == true) {
                el.children[2].checked = false;
                el.children[1].children[0].style.transform = "rotate(0deg)";
                checkedAccordeon();
            } else {
                el.children[2].checked = true;
                el.children[1].children[0].style.transform = "rotate(-180deg)";
                checkedAccordeon();
            }
        });
    });
}

function checkedAccordeon() {
    let projetAccordeon = document.querySelectorAll(".projets_liste_projet_titre");
    
    projetAccordeon.forEach(el => {
        if (el.children[2].checked == false) {
            el.parentElement.style.maxHeight = "10vh";
            el.children[1].children[0].style.transform = "rotate(0deg)";
        } else {
            el.parentElement.style.maxHeight = "40vh";
            el.children[1].children[0].style.transform = "rotate(-180deg)";
        }
    });
}


function changementImage(el) {
    if (el == null) {
        console.log("Image départ");
    } else {
        console.log("Image projet", el.children[0].innerHTML);
    }
}


