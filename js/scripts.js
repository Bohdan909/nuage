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

        $(".btn-send").length && $(".btn-send").on("click", function(e){
            formWrap.fadeOut(200);
            mesConsult.fadeIn(300);

            e.preventDefault();
        });

        $(".btn-back-form") && $(".btn-back-form").on("click", function(e){
            formWrap.fadeIn(200);
            mesConsult.fadeOut(300);

            e.preventDefault();
        });;
        

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

        /* ==================
           NAVIGATION SCHEME
        ==================== */

        var btnScheme = document.querySelectorAll(".scheme-nav button");

        btnScheme.forEach(function(btn){

            btn.addEventListener("click", function(e){
                var pane = document.querySelectorAll(".scheme-desc");
                var point = document.querySelectorAll(".point");
                var activePane = document.querySelector(".scheme-desc.active");
                var pointActive = document.querySelector(".point.active");
                var wrap = pointActive.parentNode;
                var list = wrap.children;
                var lastPoint = list.length - 1;
                var indexActive = Array.prototype.indexOf.call(list, pointActive);
                
                pointActive.classList.remove("active");
                activePane.classList.remove("active");

                if (e.target.classList.contains("btn-nav-right")){
                    (indexActive == lastPoint) ? indexActive = 0 : indexActive++;
                } else {
                    (indexActive == 0) ? indexActive = lastPoint : indexActive--;
                }

                point[indexActive].classList.add("active");
                pane[indexActive].classList.add("active");
            });
        });

        /* ==============
           TABS
        ================= */

        let tabs = document.querySelectorAll(".tabs > .tab");

        function tabsClick(tabClickEvent) {

            for (let i = 0; i < tabs.length; i++) {
                tabs[i].classList.remove("active");
            }

            let clickedTab = tabClickEvent.currentTarget; 

            clickedTab.classList.add("active");
            tabClickEvent.preventDefault();

            let contentPanes = document.querySelectorAll(".tab-pane");

            for (let i = 0; i < contentPanes.length; i++) {
                contentPanes[i].classList.remove("active");
            }

            let anchorReference = tabClickEvent.target;
            let activePaneId = anchorReference.getAttribute("data-tab");
            let activePane = document.querySelector("#" + activePaneId);

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
                console.log(filterPar);
                
                for (let i = 0; i < ffItem.length; i++){
                    ffItem[i].classList.remove("active");
                }

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


        /* ================
            CUSTOM SCROLL
        =================== */
        // TODO: 
        // 1) handle other scroll events
        // 4) fix animation for some pages

        //$(".main").addClass("stop-scrolling");
        let mainElem = document.querySelector(".main");
        mainElem.classList.add("stop-scrolling");

        // left: 37, up: 38, right: 39, down: 40,
        // spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
        let keysPrev = {37: 1, 38: 1, 33: 1, 36: 1};
        let keysNext = {39: 1, 40: 1, 32: 1, 34: 1, 35: 1};

        let navLinks = [
            "main",
            "advantages",
            "assortment",
            "mission",
            "faq",
            "buy",
            "consultation"
        ];
        let baseHashUrl = "#";

        // TODO: initialize variable by hashtag from url if it present
        let currentHashtag = window.location.hash.substr(1);
        
        let currentBlockIndex = 0;
        let prevBlockIndex = 0;

        
        setCurrentBlockIndexByHashtag(currentHashtag);

        function setCurrentBlockIndexByHashtag(hashtag) {
            let hashtagIndex = navLinks.indexOf(hashtag);
            if ( hashtagIndex != -1 ) {
                currentBlockIndex = hashtagIndex;
            }
        }

        let movingMenuUnderline = document.querySelector(".menu .moving-underline");
        let menuListElem = document.querySelector(".menu ul");

        function navigateToBlock(blockIndex){
            let currentBlockId = navLinks[currentBlockIndex];
            let prevBlockId = navLinks[prevBlockIndex];
            let currentNavElement = document.querySelector("li." + currentBlockId);
            let prevNavElement = document.querySelector("li." + prevBlockId);
            
            if (currentNavElement) {
                let navElemOffset = currentNavElement.getBoundingClientRect().left - menuListElem.getBoundingClientRect().left;
                movingMenuUnderline.style.width = `${currentNavElement.offsetWidth}px`;
                movingMenuUnderline.style.transform = `translateX(${navElemOffset}px)`;
            } else {
                movingMenuUnderline.style.width = 0;
            }
            
            if (prevNavElement) {
                //prevNavElement.classList.remove("active");
            }
            
            if (currentNavElement) {
                //currentNavElement.classList.add("active");
            }
            
            let elem = document.getElementById(currentBlockId);
            mainElem.style.height = elem.scrollHeight + "px";
            
            elem.classList.remove("loaded");
            window.location.href = baseHashUrl + currentBlockId;
            elem.classList.add("loaded");
            
            let prevElement = document.getElementById(prevBlockId);
            prevElement.classList.remove("loaded");
        }
        
        navigateToBlock(currentBlockIndex);

        function scrollToNextBlock() {
            if (currentBlockIndex == navLinks.length - 1) {
                return;
            }
            prevBlockIndex = currentBlockIndex;
            currentBlockIndex += 1;
            navigateToBlock(currentBlockIndex);
        }
        function scrollToPrevBlock() {
            if (currentBlockIndex == 0) {
                return;
            }
            prevBlockIndex = currentBlockIndex;
            currentBlockIndex -= 1;
            navigateToBlock(currentBlockIndex);
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

        let lastScrollTime = 0 
        function customScrollWheelHandler(e) {
            
            // limit handling rate to prevent scrolling trough all pages
            if (Date.now() - lastScrollTime > 1000) {

                if (e.deltaY > 0) {
                    scrollToNextBlock();
                } else if (e.deltaY < 0) {
                    scrollToPrevBlock();
                }

                lastScrollTime = Date.now();
            }
        }

        function customScrollTouchHandler(e) {
            // https://gist.github.com/SleepWalker/da5636b1abcbaff48c4d
        }

        function handleDirectClickOnNavLinks (event) {
            if (!event.target.matches('a[href^="#"]')) return;
            event.preventDefault();

            // extract hashtag from link
            let hashtag = event.target.hash.substr(1);
            setCurrentBlockIndexByHashtag(hashtag)
            navigateToBlock(currentBlockIndex);            
        } 

        document.onkeydown = customScrollKeysHandler;
        // handler for wheel event 
        addWheelListener( window, customScrollWheelHandler );

        window.ontouchmove = customScrollTouchHandler;
        
        // Handle direct click on havigation links  
        let navigationMenuElement = document.querySelector(".main");
        navigationMenuElement.addEventListener("click", handleDirectClickOnNavLinks);
        
    });


    let cachedWidth = window.innerWidth;

    function windowSize(){
        let winWidth = window.innerWidth,
            docWidth = $(document).width();

        scrollBar(true);

        // Resize Mobile
        if (winWidth !== cachedWidth){
            

            cachedWidth = winWidth;
        }   
            
    };

    // ScrollBar
    function scrollBar(update){
        let $scroll = $(".scroll-block");

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


    /*********************************
     * UNIVERSAL MOUSE WHEEL HANDLER 
     *********************************/

    // creates a global "addWheelListener" method
    // example: addWheelListener( elem, function( e ) { console.log( e.deltaY ); e.preventDefault(); } );
    let prefix = "", _addEventListener, support;

    // detect event model
    if ( window.addEventListener ) {
        _addEventListener = "addEventListener";
    } else {
        _addEventListener = "attachEvent";
        prefix = "on";
    }

    // detect available wheel event
    support = "onwheel" in document.createElement("div") ? "wheel" : // Modern browsers support "wheel"
              document.onmousewheel !== undefined ? "mousewheel" : // Webkit and IE support at least "mousewheel"
              "DOMMouseScroll"; // let's assume that remaining browsers are older Firefox

    window.addWheelListener = function( elem, callback, useCapture ) {
        _addWheelListener( elem, support, callback, useCapture );

        // handle MozMousePixelScroll in older Firefox
        if( support == "DOMMouseScroll" ) {
            _addWheelListener( elem, "MozMousePixelScroll", callback, useCapture );
        }
    };

    function _addWheelListener( elem, eventName, callback, useCapture ) {
        elem[ _addEventListener ]( prefix + eventName, support == "wheel" ? callback : function( originalEvent ) {
            !originalEvent && ( originalEvent = window.event );

            // create a normalized event object
            let event = {
                // keep a ref to the original event object
                originalEvent: originalEvent,
                target: originalEvent.target || originalEvent.srcElement,
                type: "wheel",
                deltaMode: originalEvent.type == "MozMousePixelScroll" ? 0 : 1,
                deltaX: 0,
                deltaY: 0,
                deltaZ: 0,
                preventDefault: function() {
                    originalEvent.preventDefault ?
                        originalEvent.preventDefault() :
                        originalEvent.returnValue = false;
                }
            };
            
            // calculate deltaY (and deltaX) according to the event
            if ( support == "mousewheel" ) {
                event.deltaY = - 1/40 * originalEvent.wheelDelta;
                // Webkit also support wheelDeltaX
                originalEvent.wheelDeltaX && ( event.deltaX = - 1/40 * originalEvent.wheelDeltaX );
            } else {
                event.deltaY = originalEvent.deltaY || originalEvent.detail;
            }

            // it's time to fire the callback
            return callback( event );

        }, useCapture || false );
    }
    
}(jQuery))


