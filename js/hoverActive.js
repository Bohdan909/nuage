
window.addEventListener("load", function(){

    if (document.body.contains(document.querySelector(".product-list"))){
        let point = document.querySelectorAll(".product-list section > div");
        let pointAct = findPointAct(point);
        let pointWidth = pointAct.offsetWidth;
        let pointPos = pointAct.offsetLeft;
        let pointBg = document.querySelector(".product-list > span");

        setBg(pointWidth, pointPos);

        for (let i = 0; i < point.length; i++){
            
            point[i].addEventListener("mouseover", function(){
                changeBg(this);
            });

            point[i].addEventListener("mouseleave", function(){
                if (!this.classList.contains("active")){
                    pointAct = findPointAct(point);
                    changeBg(pointAct);
                }
            });

            point[i].addEventListener("click", function(){                    
                changeBg(this);
            });
        }

        window.addEventListener("resize", function(){
            pointAct = findPointAct(point);
            changeBg(pointAct);
        });

        function changeBg(pnt){
            pointWidth = pnt.offsetWidth;
            pointPos = pnt.offsetLeft;
            setBg(pointWidth, pointPos);
        }

        function setBg(width, pos){
            pointBg.setAttribute("style", "width: " + width + "px; left: " + pos + "px");
        }

        function findPointAct(point){
            for (let i = 0; i < point.length; i++){
                if (point[i].classList.contains("active")) return point[i];
            }
        }
    }
});