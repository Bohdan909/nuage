
document.documentElement.className = document.documentElement.className.replace(/\bno-js\b/g, '');

window.addEventListener("load", function(){

    document.querySelector(".page").classList.add("loaded");
});

$(document).ready(function(){


    scrollBar();

    // ScrollBar
    function scrollBar(update) {
        let $scroll = $(".scroll-block");

        if ($scroll.length && window.innerWidth > 767) {

            if (update) {
                $scroll.perfectScrollbar("update");
            } else {
                $scroll.perfectScrollbar({
                    wheelSpeed: 0.9,
                    wheelPropagation: false,
                    minScrollbarLength: 20
                });
            }
        }
    }
});