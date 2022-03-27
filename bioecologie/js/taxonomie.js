ajoutPaddingBranches();

function ajoutPaddingBranches() {
    let taxon = document.querySelectorAll(".branches > ul > li");
    taxon.forEach((el, index)=>{
        console.log(index);
        el.style.paddingLeft = "" + 10 * index + "px";
    });
}