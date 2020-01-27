(function(){
    let boutonMenu = document.querySelector("#menuListener");
    let menuDown = false;

    boutonMenu.addEventListener("click", changeOrientation);

    function changeOrientation() {
        if (!menuDown) {
            boutonMenu.style.transform = "rotate(-180deg)";
            menuDown = true;
        } else {
            boutonMenu.style.transform = "rotate(0deg)";
            menuDown = false;
        }
    }
  })();