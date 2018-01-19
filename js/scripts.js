document.documentElement.className = document.documentElement.className.replace(/\bno-js\b/g, '');

(function($){
    $(document).ready(function() {

        setTimeout(function(){
            document.querySelector(".page").classList.add("loaded");
        }, 500);

        // if (window.performance) {
        //   console.info("window.performance work's fine on this browser");
        // }

        // if (performance.navigation.type == 1) {
        //     console.info( "This page is reloaded" );
        // } else {
        //     console.info( "This page is not reloaded");
        // }

        // $("a").on("click", function(){
        //     var href = $(this).attr('href');

        //     // $(".preloader svg, .preloader-logo-wrap").hide();
        //     // $(".preloader").fadeIn(1000);

        //     setTimeout(function() {window.location = href}, 1200);
        // });
        

        /* ==============
           MENU 
        ================= */   

        let $body    = document.querySelector("body");
        let $btnMenu = document.querySelector(".btn-menu");


        $btnMenu.addEventListener("click", function(){

            if ($body.classList.contains("menu-open")){
                $body.classList.add("menu-close");

                setTimeout(function(){
                    $body.classList.remove("menu-open");
                }, 0);
                
            } else {
                $body.classList.add("menu-open");
                $body.classList.remove("menu-close");
            }
        });

        let $socDrop = document.querySelector(".social-drop");
        let $like = document.querySelector(".like");
        
        if(document.body.contains($like)){
            $like.addEventListener("click", function(){
                if ($socDrop.classList.contains("show")){
                    $socDrop.classList.add("hide");
                    $socDrop.classList.remove("show");
                } else {
                    $socDrop.classList.add("show");
                    $socDrop.classList.remove("hide");
                }
                
            });
        }

        /* ==============
           Slick Slider
        ================= */

        if ($(".slick-slider").length){
            $(".slick-slider").slick({
                swipe:false,
                swipeToSlide:false,
                infinite: true,
                adaptiveHeight:true,
                speed: 150,
                arrows: true,
                slidesToScroll: 1,
                slidesToShow: 1,
                fade: true,
                dots: true,

                responsive: [{
                    breakpoint: 1018,
                    settings: {
                        swipe:true
                    }
                }]    
            })
        };

        /* ==============
           Drops
        ================= */

        let $dropBtn = document.querySelector(".drop-wrap .btn"); 

        if (document.body.contains($dropBtn)){
            $dropBtn.addEventListener("click", function(){
                let $dropBlock = this.parentNode.querySelector(".drop-block");
                let $dropInner = $dropBlock.querySelector(".drop-inner");
                let height     = $dropBlock.querySelector(".drop-h").offsetHeight;

                $dropBlock.classList.toggle("show");
                if ($dropBlock.classList.contains("show")){
                    $dropInner.setAttribute("style", "max-height: " + height + "px");
                } else {
                    $dropInner.setAttribute("style", "max-height: 0px");
                }

            });  
        }  

        let $fbHead = document.querySelectorAll(".answer-head");
        let $fbPage = document.querySelector(".page-feedback");

        if (document.body.contains($fbPage)){
            $fbHead.forEach(function(head){

                head.addEventListener("click", function(){
                    let $point = this.parentNode;
                    let $text = $point.querySelector(".answer-body");
                    let textHeight = $text.querySelector(".answer-body-inner").offsetHeight;

                    $point.classList.toggle("show");   
                    if ($point.classList.contains("show")){
                        $text.setAttribute("style", "max-height: " + textHeight + "px");
                    } else {
                        $text.setAttribute("style", "max-height: 0px");
                    } 

                });
            });
        }

        /* ==============
           TABS
        ================= */

        var tabs = document.querySelectorAll(".tabs > .tab");

        function tabsClick(tabClickEvent) {

            for (let i = 0; i < tabs.length; i++) {
                tabs[i].classList.remove("active");
            }

            var clickedTab = tabClickEvent.currentTarget; 

            clickedTab.classList.add("active");
            tabClickEvent.preventDefault();

            var contentPanes = document.querySelectorAll(".tab-pane");

            for (let i = 0; i < contentPanes.length; i++) {
                contentPanes[i].classList.remove("active");
            }

            var anchorReference = tabClickEvent.target;
            var activePaneId = anchorReference.getAttribute("data-tab");
            var activePane = document.querySelector("#" + activePaneId);

            console.log(activePane);

            activePane.classList.add("active");
        }

        for (i = 0; i < tabs.length; i++) {
            tabs[i].addEventListener("click", tabsClick);
        }


        /* ==============
           TABS LINE
        ================= */ 

        if ($(".tabs-panel").length){

            let $line = $(".tabs-panel .line");

            tabsLineMove();

            function tabsLineMove(){
                let $tabsLiAct =  $(".tabs-panel li.active");
                let offsetLeft = $tabsLiAct.position().left;

                $line.css("left", offsetLeft + (($tabsLiAct.innerWidth() - 35)/2));

                console.log($tabsLiAct.innerWidth());
            }

            $(".tabs-panel li").on("click", tabsLineMove);
        }
        

        /* ==============
           FORMS
        ================= */   

        $("input, textarea").focus(function(){
           $(this).data("placeholder",$(this).attr("placeholder")).attr("placeholder","");
        }).blur(function(){
           $(this).attr("placeholder",$(this).data("placeholder"));
        });

        scrollBar();

        windowSize();   
        $(window).resize(windowSize); 

        /* ================
            CUSTOM SCROLL
        =================== */
        // TODO: 
        // 1) handle other scroll events
        // 2) remove "loaded" class when navigating to other block
        // 3) animated underline for menu

        $(".main").addClass("stop-scrolling");

        // left: 37, up: 38, right: 39, down: 40,
        // spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
        var keysPrev = {37: 1, 38: 1, 33: 1, 36: 1};
        var keysNext = {39: 1, 40: 1, 32: 1, 34: 1, 35: 1};

        var navLinks = [
            "main",
            "advantages",
            "assortment",
            "mission",
            "faq",
            "buy",
            "consultation"
        ];
        var baseHashUrl = "index1.htm#";

        // TODO: initialize variable by hashtag from url if it present
        var currentHashtag = window.location.hash.substr(1);
        
        var currentBlockIndex = 0;
        if (navLinks.indexOf(currentHashtag) != -1) {
            currentBlockIndex = navLinks.indexOf(currentHashtag);
        }
        
        function navigateToBlock(blockIndex){
            var currentBlockId = navLinks[currentBlockIndex];
            window.location.href = baseHashUrl + currentBlockId;
            var elem = document.getElementById(currentBlockId);
            elem.className += " loaded";
        }
        
        navigateToBlock(currentBlockIndex);

        function scrollToNextBlock() {
            if (currentBlockIndex == navLinks.length - 1) {
                return;
            }
            console.log("scroll to next block");
            currentBlockIndex += 1;
            navigateToBlock(currentBlockIndex);
        }
        function scrollToPrevBlock() {
            if (currentBlockIndex == 0) {
                return;
            }
            console.log("scroll to previous block");
            currentBlockIndex -= 1;
            navigateToBlock(currentBlockIndex);
        }

        function customScrollHandler(e) {
            console.log("custom scroll handler");
        }
        function customScrollKeysHandler(e) {
            if (keysPrev[e.keyCode]) {
                e.preventDefault();
                scrollToPrevBlock();
            } else if (keysNext[e.keyCode]) {
                e.preventDefault();
                scrollToNextBlock();
            }
        }
        window.onmousewheel = document.onmousewheel = customScrollHandler; 
        window.onwheel = customScrollHandler; 
        window.ontouchmove = customScrollHandler;  
        document.onkeydown = customScrollKeysHandler;
        
    });


    var cachedWidth = window.innerWidth;

    function windowSize(){
        var winWidth = window.innerWidth,
            docWidth = $(document).width();

        scrollBar(true);

        // Resize Mobile
        if (winWidth !== cachedWidth){
            

            cachedWidth = winWidth;
        }   
            
    };

    // ScrollBar
    function scrollBar(update){
        var $scroll = $(".scroll-block");

        if ($scroll.length && window.innerWidth > 767){
            
            if (update){
                $scroll.perfectScrollbar("update");
            } else {
                $scroll.perfectScrollbar({
                    wheelSpeed: 0.5,
                    wheelPropagation: false,
                    minScrollbarLength: 20
                }); 
            }
        }
    }

    // Click Out
    function ClickOut(element){
        this.element = element;
        
        this.removeClass = function(class_){
            $(document).on("click", function(event) {
                if ($(event.target).closest(element).length) return;
                $(element).removeClass(class_);
                event.stopPropagation();
            });
        };
    };

    // forEach for IE
    (function(){
        if ( typeof NodeList.prototype.forEach === "function" ) return false;
        NodeList.prototype.forEach = Array.prototype.forEach;
    }());


    var lastScrollTop = 0;
	$(window).scroll(function(event){
        var st = $(this).scrollTop();
        if (st > lastScrollTop){
            // downscroll code
            console.log("scroll down");
            
        } else {
            // upscroll code
            console.log("scroll up");
            
        }
        lastScrollTop = st;
	});
    
}(jQuery))
