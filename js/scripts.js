document.documentElement.className = document.documentElement.className.replace(/\bno-js\b/g, '');

(function($){
    $(document).ready(function() {

        setTimeout(function(){
            document.querySelector(".page").classList.add("loaded");
        }, 500);

         /* ==============
           Consultation 
        ================= */   

        let formWrap = $(".consult-form-wrap, .consult-top");
        let mesConsult = $(".message-consult");
        let copyRight = $(".copyright-mobile");

        $(".btn-send").length && $(".btn-send").on("click", function(e){
            formWrap.fadeOut(200);
            copyRight.hide();
            mesConsult.fadeIn(300);

            e.preventDefault();
        });

        $(".btn-back-form") && $(".btn-back-form").on("click", function(e){
            formWrap.fadeIn(200);
            mesConsult.fadeOut(300);

            if (window.innerWidth < 768) copyRight.show();
            
            e.preventDefault();
        });
        
        

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

        // if ($(".slick-slider").length){
        //     $(".slick-slider").slick({
        //         swipe:false,
        //         swipeToSlide:false,
        //         infinite: true,
        //         adaptiveHeight:true,
        //         speed: 150,
        //         arrows: true,
        //         slidesToScroll: 1,
        //         slidesToShow: 1,
        //         fade: true,
        //         dots: true,

        //         responsive: [{
        //             breakpoint: 1018,
        //             settings: {
        //                 swipe:true
        //             }
        //         }]    
        //     })
        // };

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
        var indexActive = 0;
        var lastPoint = 0;

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

            activePane.classList.add("active");

            // Index Detect
            if (tabClickEvent.target.classList.contains("point-btn")){
                indexDetect(activePane);
                changeClone(indexActive);
            }
        }

        for (i = 0; i < tabs.length; i++) {
            tabs[i].addEventListener("click", tabsClick);
        }

        /* ==================
           NAVIGATION SCHEME
        ==================== */

        let btnScheme = document.querySelectorAll(".scheme-nav button");
        let pointClone  = document.querySelectorAll(".scheme-nav .point");

        btnScheme.forEach(function(btn){

            btn.addEventListener("click", function(e){
                let pane  = document.querySelectorAll(".scheme-desc");
                let point = document.querySelectorAll(".object-scheme-wrap .point");
                let activePane  = document.querySelector(".scheme-desc.active");
                let pointActive = document.querySelector(".point.active");

                indexDetect(activePane);

                pointActive.classList.remove("active");
                activePane.classList.remove("active");

                if (e.target.classList.contains("btn-nav-right")){
                    (indexActive == lastPoint) ? indexActive = 0 : indexActive++;
                } else {
                    (indexActive == 0) ? indexActive = lastPoint : indexActive--;
                }

                changeClone(indexActive);
                point[indexActive].classList.add("active");
                pane[indexActive].classList.add("active");
            });
        });

        function changeClone(index){
            pointClone.forEach(function(clone){
                clone.classList.remove("active");
            });
            pointClone[index].classList.add("active");
        }

        function indexDetect(activePane){
            let wrap = activePane.parentNode;
            let list = wrap.children;
    
            lastPoint = list.length - 1;
            indexActive = Array.prototype.indexOf.call(list, activePane);
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
            }

            $(".tabs-panel li").on("click", tabsLineMove);
        }
        
        /* ================
           FILTER FEEDBACK
        =================== */ 

        var ffItem = document.querySelectorAll(".feedback-filter li");
        var feedback = document.querySelectorAll(".feedback-item");

        ffItem.forEach(function(item){
            item.addEventListener("click", function(){
                var filterPar = item.getAttribute("data-filter");
                var scrollY = document.querySelector(".scroll-block");
                
                for (let i = 0; i < ffItem.length; i++){
                    ffItem[i].classList.remove("active");
                }
                
                scrollBar(true);
                item.classList.remove("active");
                this.classList.add("active");

                for (let i = 0; i < feedback.length; i++){
                    feedback[i].classList.remove("show");

                    if (filterPar == "all"){
                        feedback[i].classList.add("show");
                    } else if (feedback[i].getAttribute("data-feedback") === filterPar) {
                        feedback[i].classList.add("show");
                    }
                }
            });
        });

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
    
}(jQuery))
