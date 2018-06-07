
document.documentElement.className = document.documentElement.className.replace(/\bno-js\b/g, '');

window.addEventListener("load", function(){

    let volItem = document.querySelectorAll(".touchevents .vol-item");
    let bodyTouch =  document.querySelector(".touchevents body");

    for (let i = 0; i < volItem.length; i++){

        volItem[i].addEventListener("touchstart", function(){

            for (let j = 0; j < volItem.length; j++){
                volItem[j].classList.remove("hover");
            }

            this.classList.toggle("hover");
        });

        bodyTouch.addEventListener("touchstart", function(e){

            if (!e.target.classList.contains("img")){
                volItem[i].classList.remove("hover");
            }
        });
    }

    document.querySelector(".page").classList.add("loaded");
});