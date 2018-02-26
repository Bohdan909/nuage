document.documentElement.className = document.documentElement.className.replace(/\bno-js\b/g, '');

(function($){
    $(document).ready(function() {

         let pageScroll = document.querySelector(".main").classList.contains("page-scroll");
        
        // setTimeout(function(){
        //     document.querySelector(".page").classList.add("loaded");
        // }, 500);

        /* ==============
          Consultation 
       ================= */

        let formWrap = $(".consult-form-wrap, .consult-top");
        let mesConsult = $(".message-consult");
        let copyRight = $(".copyright-mobile");

        $(".btn-send").length && $(".btn-send").on("click", function (e) {
            formWrap.fadeOut(200);
            copyRight.hide();
            mesConsult.fadeIn(300);

            e.preventDefault();
        });

        $(".btn-back-form") && $(".btn-back-form").on("click", function (e) {
            formWrap.fadeIn(200);
            mesConsult.fadeOut(300);

            if (window.innerWidth < 768) copyRight.show();

            e.preventDefault();
        });
        
        /* ==============
           MENU 
        ================= */

        let $body = document.querySelector("body");
        let navMenu = document.querySelector(".menu");

        navMenu.addEventListener("click", function (event) {
            if (event.target.tagName == "IMG" && $body.classList.contains("menu-close")) {
                event.stopPropagation();
                return;
            }

            if ($body.classList.contains("menu-open")) {
                $body.classList.add("menu-close");

                setTimeout(function () {
                    $body.classList.remove("menu-open");
                }, 0);

            } else {
                $body.classList.add("menu-open");
                $body.classList.remove("menu-close");
            }
        });
        
        let $like = document.querySelectorAll(".like");

        if (pageScroll){
            Array.prototype.forEach.call($like, function(likeItem){
                likeItem.addEventListener("click", function(){
                    let $socDrop = this.parentNode.querySelector(".social-drop");

                    if ($socDrop.classList.contains("show")){
                        $socDrop.classList.add("hide");
                        $socDrop.classList.remove("show");
                    } else {
                        $socDrop.classList.add("show");
                        $socDrop.classList.remove("hide");
                    }
                });
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

        if (document.body.contains($dropBtn)) {
            $dropBtn.addEventListener("click", function () {
                let $dropBlock = this.parentNode.querySelector(".drop-block");
                let $dropInner = $dropBlock.querySelector(".drop-inner");
                let height = $dropBlock.querySelector(".drop-h").offsetHeight;

                $dropBlock.classList.toggle("show");
                if ($dropBlock.classList.contains("show")) {
                    $dropInner.setAttribute("style", "max-height: " + height + "px");
                } else {
                    $dropInner.setAttribute("style", "max-height: 0px");
                }
            });
        }

        if (pageScroll) {
            let $fbPage = document.querySelector(".page-feedback");
            let $fbHead = $fbPage.querySelectorAll(".answer-head");
            let $fbButtonPlus = $fbPage.querySelectorAll(".point-btn.plus");

            $fbButtonPlus.forEach(function (buttonPlus) {

                buttonPlus.addEventListener("click", function () {
                    let $point = this.parentNode.parentNode;
                    let $text = $point.querySelector(".answer-body");
                    let textHeight = $text.querySelector(".answer-body-inner").offsetHeight;

                    $point.classList.toggle("show");
                    if ($point.classList.contains("show")) {
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

        let btnScheme = document.querySelectorAll(".scheme-nav button");
        let pointClone = document.querySelectorAll(".scheme-nav .point");

        btnScheme.forEach(function (btn) {

            btn.addEventListener("click", function (e) {
                let pane = document.querySelectorAll(".scheme-desc");
                let point = document.querySelectorAll(".object-scheme-wrap .point");
                let activePane = document.querySelector(".scheme-desc.active");
                let pointActive = document.querySelector(".point.active");

                indexDetect(activePane);

                pointActive.classList.remove("active");
                activePane.classList.remove("active");

                if (e.target.classList.contains("btn-nav-right")) {
                    (indexActive == lastPoint) ? indexActive = 0 : indexActive++;
                } else {
                    (indexActive == 0) ? indexActive = lastPoint : indexActive--;
                }

                changeClone(indexActive);
                point[indexActive].classList.add("active");
                pane[indexActive].classList.add("active");
            });
        });

        function changeClone(index) {
            pointClone.forEach(function (clone) {
                clone.classList.remove("active");
            });
            pointClone[index].classList.add("active");
        }

        function indexDetect(activePane) {
            let wrap = activePane.parentNode;
            let list = wrap.children;

            lastPoint = list.length - 1;
            indexActive = Array.prototype.indexOf.call(list, activePane);
        }

        /* ==============
           TABS
        ================= */

        function findAncestor(el, cls) {
            while ((el = el.parentElement) && !el.classList.contains(cls));
            return el;
        }

        // another implementation
        let tabs = document.querySelectorAll(".tabs");
        function tabClick(event) {
            event.preventDefault();

            let tabElements = event.currentTarget.querySelectorAll(".tab");
            Array.prototype.forEach.call(tabElements, function (tabElement) {
                tabElement.classList.remove("active");
            });

            let targetTab = findAncestor(event.target, "tab");
            if (targetTab != null) {
                targetTab.classList.add("active");
            }

            animateTabLine(event.currentTarget);

            let activePaneId = event.target.getAttribute("data-tab");
            let activePane = document.getElementById(activePaneId);

            // clear panes state
            let panesParent = activePane.parentElement;
            let contentPanes = panesParent.querySelectorAll(".tab-pane");
            Array.prototype.forEach.call(contentPanes, function (pane) {
                pane.classList.remove("active");
            });

            activePane.classList.add("active");
        }

        Array.prototype.forEach.call(tabs, function (tab) {
            tab.addEventListener("click", tabClick);
            animateTabLine(tab);
        });

        // TABS LINE ANIMATION
        function animateTabLine(tabs) {
            let line = tabs.querySelector(".line");
            let activeTab = tabs.querySelector(".tab.active");
            if (line) {
                let offset = activeTab.getBoundingClientRect().left - tabs.getBoundingClientRect().left;
                let leftValue = offset + (activeTab.offsetWidth - 35) / 2;
                line.style.left = leftValue + "px";
            }
        }


        /* ================
           FILTER FEEDBACK
        =================== */

        var ffItem = document.querySelectorAll(".feedback-filter li");
        var feedback = document.querySelectorAll(".feedback-item");

        ffItem.forEach(function (item) {
            item.addEventListener("click", function () {
                var filterPar = item.getAttribute("data-filter");
                var scrollY = document.querySelector(".scroll-block");

                for (let i = 0; i < ffItem.length; i++) {
                    ffItem[i].classList.remove("active");
                }

                scrollBar(true);
                item.classList.remove("active");
                this.classList.add("active");

                for (let i = 0; i < feedback.length; i++) {
                    feedback[i].classList.remove("show");

                    if (filterPar == "all") {
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

        $("input, textarea").focus(function () {
            $(this).data("placeholder", $(this).attr("placeholder")).attr("placeholder", "");
        }).blur(function () {
            $(this).attr("placeholder", $(this).data("placeholder"));
        });

        scrollBar();

        windowSize();
        $(window).resize(windowSize);


        /* =============================
            CUSTOM SCROLL AND NAVIGATION
        ================================ */

        if (pageScroll){

            //////////////////////////////
            // ONE-TIME INITIALIZATIONS 
            /// for single-page app   ////
            

            var $object = $('.object-main');
            var $scheme = $('.object-scheme');

            $object.rotate3d({
                'source': 'images/object-1/1_',
                'count' : 39,
                'auto'  : true
            });

            // $scheme.rotate3d({
            //     'source': 'images/object-2/Vzruv_02.Alpha_',
            //     'count' : 70,
            //     'auto'  : true
            // });

            $scheme.rotate3d({
                'source': 'images/scheme/1_000',
                'count' : 70,
                'auto'  : true
            });

            var $slider = $(".assort-slider");
            var $slide = $slider.find(".slide");
            var $sliderLoader = $(".assort-slider-loader");
            var $bgItem = $(".assort-bg-list li");
            var $curSlideInd = $(".assort-slider-ind span");
            var $slideItems = $(".assort-slider-ind i");
            var items = $(".assort-slider > div").length;
            var $cubes = $(".cubes-b");
            
            $slider.slick({
                centerMode: false,
                infinite: true,
                slidesToShow: 3,
                slidesToScroll: 1,
                speed: 500,
                focusOnSelect: false,
                swipe: false,
                useTransform: true,
                cssEase: 'cubic-bezier(0.11,0,0.45,1)',

                responsive: [{
                    breakpoint: 1025,
                    settings: {
                        slidesToShow: 1,
                        fade: true
                    }
                }]
            });

            // ONE-TIME INITIALIZATIONS END //
            //////////////////////////////////

            /* =========================================
                3D ANIMATION AND BLOCK-SPECIFIC SCRIPTS
            ========================================== */

            function executePageSpecificScript(blockId) {

                switch (blockId) {
                    case "main":
                        $object.animateOpen(function () {
                            setTimeout($object.animateClose, 300);
                        });
                        break;
                    case "advantages":
                        $scheme.animateOpen(function () {
                            console.log("andvantages animation ended");
                        });
                        break;
                    case "assortment":
                        $slider.slick('setPosition');
                        
                        // Setup Classes
                        $slideItems.text(items);
                        $(".figures-1").addClass("show");
                        setTimeout(function(){
                            $(".assort-bg-list").addClass("bg-1");
                        }, 1000);
                        
                        $slider.on( "click", ".slick-slider-inner", function( e ) {
                            if (!$(this).parent().hasClass("slick-current") || $(this).parent().hasClass("slick-cloned")) { 
                                e.preventDefault();
                                var currentSlideIndex = $slider.slick("slickCurrentSlide");
                                if (currentSlideIndex == 5) {
                                    $slider.slick("slickGoTo", 0, true);
                                } else {
                                    $slider.slick("slickNext");
                                }                        
                            }	
                        });
                                
                        // Loader		
                        $(".slick-arrow").on("click", function(event){
                            let target = $(event.target);
                            let curIndex = parseInt($curSlideInd.text());
        
                            if (target.is(".slick-next")){
                                if (curIndex == 1) loader()
                            } else {
                                if (curIndex == items) loader()
                            }
                    
                            $(".figures").removeClass("show");	
                            $(".figures-" + curIndex).addClass("show");	
                        });
        
                        function loader(){
                            $(".slick-list").addClass("hide");
                            $sliderLoader.addClass("show");
        
                            setTimeout(function(){
                                $(".slick-list").removeClass("hide");
                                $sliderLoader.removeClass("show");
                            }, 700);
                        }
                        
                        // Change
                        $slider.on("beforeChange", function(event, slick, currentSlide, nextSlide){
        
                            currentSlide = nextSlide;
        
                            var $curSlide = $bgItem.eq(currentSlide);
        
                            $bgItem.removeClass("show");
                            $curSlide.addClass("show");
        
                            setTimeout(function(){
                                $(".assort-bg-list").attr("class", "assort-bg-list");
                                $(".assort-bg-list").addClass("bg-" + (currentSlide + 1));
                                //$bgItem.not(":eq(" + currentSlide + ")").removeClass("show");
                            }, 900);
        
                            $curSlideInd.text(currentSlide + 1);
        
                            // Slider Description
                            function changeSliderDesc(){
                                var $sliderDesc = document.querySelectorAll(".assort-desc-wrap .assort-desc-item");	
        
                                for (let i = 0; i < $sliderDesc.length; i++){
                                    $sliderDesc[i].classList.remove("show");
                                }
        
                                $sliderDesc[currentSlide].classList.add("show");
                            }
                            
                            setTimeout(changeSliderDesc, 0);
        
                            // Cubes
                            $("body")
                                .attr("class", "")
                                .addClass("page-style-" + (currentSlide + 1));
                            
                        });
        
                        // Filter Click
                        var filterItem = $(".filter-item .drops li, .filter-item .ico-list li, .filter-item .items-list li");
        
                        filterItem.on("click", function(){
                            console.log("click");
                            $(".drop-block").removeClass("show");
                            $(".drop-inner").attr("style", "max-height: 0px;");	
                        });
                        break;
                    default:
                        break;
                }
            }

            let movingMenuUnderline = document.querySelector(".menu .moving-underline");
            let menuListElem = document.querySelector(".menu ul");

            function playMenuUnderlineAnimation(currentBlockId) {
                let currentNavElement = document.querySelector("li." + currentBlockId);
            
                if (currentNavElement) {
                    let navElemOffset = currentNavElement.getBoundingClientRect().left - menuListElem.getBoundingClientRect().left;
                    movingMenuUnderline.style.width = currentNavElement.offsetWidth + "px";
                    movingMenuUnderline.style.transform = "translateX(" + navElemOffset + "px)";
                } else {
                    movingMenuUnderline.style.width = 0;
                }
            }

            // SCROLL MANAGER DEFINITION
            function Page(pageId){
                this.id = pageId;
                this.pageElement = document.getElementById(pageId);

                this.setLoaded = function(){
                    this.pageElement.classList.add('loaded');
                }
                this.setLoaded = this.setLoaded.bind(this);
                
                this.loaded = function(){
                    this.pageElement.classList.remove('loading');
                    this.clearNext();
                    this.clearPrev();
                    
                };
                this.loaded = this.loaded.bind(this);
                
                this.load = function(){
                    if (this.pageElement.classList.contains('next') || this.pageElement.classList.contains('prev')) {
                        this.pageElement.classList.add('loading');
                        setTimeout(this.setLoaded, 300);
                        //this.pageElement.addEventListener("transitionend", this.loaded, true);
                        setTimeout(this.loaded, 700);
                    } else {
                        this.setLoaded();
                    }
                    playMenuUnderlineAnimation(this.id);
                    executePageSpecificScript(this.id);
                };

                this.unload = function() {
                    this.pageElement.classList.remove('loaded');
                    this.pageElement.removeEventListener("transitionend", this.unload, true);
                };
                this.unload = this.unload.bind(this);

                this.setNext = function() {
                    this.pageElement.classList.add('next');
                    //this.pageElement.addEventListener("transitionend", this.unload, true);
                    setTimeout(this.unload, 700);
                    
                };

                this.setPrev = function() {
                    this.pageElement.classList.add('prev');
                    //this.pageElement.addEventListener("transitionend", this.unload, true);
                    setTimeout(this.unload, 700);
                };

                this.clearPrev = function() {
                    this.pageElement.classList.remove('prev');
                }

                this.clearNext = function() {
                    this.pageElement.classList.remove('next');
                }

                this.currentToPrev = function() {
                    this.setPrev();
                };

                this.nextToCurrent = function() {
                    this.load();
                };

                this.currentToNext = function() {
                    this.setNext();
                };

                this.prevToCurrent = function() {
                    this.load();
                };

            }

            function ScrollManager(parentSelector, pagesArray, currentId){
                this.scrollParent = document.querySelector(parentSelector);
                //this.pages = this.scrollParent.querySelectorAll(pagesSelector);
                this.currentPage = null;
                this.previousPage = null;
                this.nextPage = null;
                this.pagesArray = pagesArray;
                this.currentPageIndex = 0;

                this.setCurrentPageByIndex = function (index) {
                    
                    this.currentPageIndex = index;
                    console.log('set page index: ' + index);
                    
                    this.currentPage = this.pagesArray[index];
                    console.log('set current page ' + this.currentPage.id);
                    window.location.href = '#' + this.currentPage.id;
                    this.currentPage.load();

                    if (index > 0) {
                        this.previousPage = this.pagesArray[index - 1];
                        this.previousPage.setPrev();
                    } else {
                        this.previousPage = null;
                    }

                    if (index < (this.pagesArray.length - 1)) {
                        this.nextPage = this.pagesArray[index + 1];
                        this.nextPage.setNext();
                    } else {
                        this.nextPage = null;
                    }
                }

                this.setCurrentPage = function(pageId){
                    for (let i = 0; i < this.pagesArray.length; i++) {
                        const page = this.pagesArray[i];
                        if (page.id == pageId) {
                            this.setCurrentPageByIndex(i);
                            break;
                        }
                    }
                };

                this.init = function() {
                    if (null != this.pagesArray && this.pagesArray.length > 1) {
                        if (currentId != null) {
                            this.setCurrentPage(currentId);
                        } else {
                            this.setCurrentPageByIndex(0);
                        }
                    }
                };
                this.init();

                this.scrollToNextPage = function() {
                    if (this.currentPageIndex == this.pagesArray.length - 1) {
                        return;
                    }
                    
                    console.log('increase current page index');
                    this.currentPageIndex += 1;
                    this.setCurrentPageByIndex(this.currentPageIndex);

                };

                this.scrollToPrevPage = function() {
                    if (this.currentPageIndex == 0) {
                        return;
                    }
                    console.log('decrease current page index');
                    
                    this.currentPageIndex -= 1;
                    this.setCurrentPageByIndex(this.currentPageIndex); 
                };

                this.clearLoadedState = function() {
                    this.pagesArray.forEach(function(page){
                        page.unload();
                    });
                };
            }
            // SCROLL MANAGER DEFINITION END

            

            let mainElem = document.querySelector(".main");
            
            // left: 37, up: 38, right: 39, down: 40,
            // spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
            let keysPrev = { 38: 1, 33: 1};
            let keysNext = { 40: 1, 34: 1};

            //let baseHashUrl = "#";

            let lastScrollTime = 0;

            // initialize variable by hashtag from url if it present
            let currentHashtag = window.location.hash.substr(1);
            if (currentHashtag.length == 0) {
                currentHashtag = "main";
            }

            let scrollManager = new ScrollManager('.main', [
                new Page('main'),
                new Page('advantages'),
                new Page('assortment'),
                new Page('mission'),
                new Page('faq'),
                new Page('buy'),
                new Page('consultation')
            ], currentHashtag);
          
            //let allBlocks = document.querySelectorAll(".page");
            
            let mq = null;
            // media query event handler
            if (window.matchMedia) {
                mq = window.matchMedia("(min-width: 1025px)");
                mq.addListener(WidthChange);
                WidthChange(mq);
            }

            scrollManager.clearLoadedState();
            
            scrollManager.setCurrentPage(currentHashtag);

            // media query change
            function WidthChange(mq) {
                // window width is at least 1025px
                mainElem.classList.add("stop-scrolling");

                // CUSTOM EVENT HANDLERS FOR SCROLL AND NAVIGATION
                document.onkeydown = customScrollKeysHandler;
                window.ontouchmove = customScrollTouchHandler;
                window.onhashchange = hashUrlChangeHandler;

                // add custom scroll only for devices with screen more than 1025px
                if (mq.matches) {
                    addWheelListener( window, customScrollWheelHandler, false);
                    
                    let scrollBlocks = document.querySelectorAll(".page .scroll-block");
                    Array.prototype.forEach.call(scrollBlocks, function(scrollBlock){
                        addWheelListener( scrollBlock, customScrollForScrollable, true);
                        scrollBlock.classList.add("dragscroll");
                        scrollBlock.style.cursor = "grab";
                    });
                } else {
                    // window width is less than 1025px
                }
            }

            function customScrollKeysHandler(e) {
                if (keysPrev[e.keyCode]) {
                    e.preventDefault();
                    //scrollToPrevBlock();
                    scrollManager.scrollToPrevPage();
                } else if (keysNext[e.keyCode]) {
                    e.preventDefault();
                    //scrollToNextBlock();
                    scrollManager.scrollToNextPage();
                }
            }

            function customScrollWheelHandler(e) {
                //limit handling rate to prevent scrolling trough all pages
                if (Date.now() - lastScrollTime > 1400) {
                    if (e.deltaY > 0) {
                        //scrollToNextBlock();
                        scrollManager.scrollToNextPage();
                    } else if (e.deltaY < 0) {
                        //scrollToPrevBlock();
                        scrollManager.scrollToPrevPage();
                    }

                    lastScrollTime = Date.now();
                }
            }

            function customScrollForScrollable(e) {
                e.cancelBubble = true;
                customScrollWheelHandler(e);  
            }

            function customScrollTouchHandler(e) {
                // https://gist.github.com/SleepWalker/da5636b1abcbaff48c4d
            }

            // called when user navigates back or clicks on link
            function hashUrlChangeHandler(event) {
                if (event.newURL != event.oldURL) {
                    scrollManager.clearLoadedState();

                    let newUrlId = window.location.hash.substr(1);
                    let oldUrlId = event.oldURL.split('#')[1];

                    scrollManager.setCurrentPage(newUrlId);
                }
            }    
        }
    });


    let cachedWidth = window.innerWidth;

    function windowSize() {
        let winWidth = window.innerWidth,
            docWidth = $(document).width();

        scrollBar(true);

        // Resize Mobile
        if (winWidth !== cachedWidth) {


            cachedWidth = winWidth;
        }

    };

    // ScrollBar
    function scrollBar(update) {
        let $scroll = $(".scroll-block");

        if ($scroll.length && window.innerWidth > 767) {

            if (update) {
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
    function ClickOut(element) {
        this.element = element;

        this.removeClass = function (class_) {
            $(document).on("click", function (event) {
                if ($(event.target).closest(element).length) return;
                $(element).removeClass(class_);
                event.stopPropagation();
            });
        };
    };

    // forEach for IE
    (function () {
        if (typeof NodeList.prototype.forEach === "function") return false;
        NodeList.prototype.forEach = Array.prototype.forEach;
    }());


    /*********************************
     * UNIVERSAL MOUSE WHEEL HANDLER 
     *********************************/

    // creates a global "addWheelListener" method
    // example: addWheelListener( elem, function( e ) { console.log( e.deltaY ); e.preventDefault(); } );
    let prefix = "", _addEventListener, support;

    // detect event model
    if (window.addEventListener) {
        _addEventListener = "addEventListener";
    } else {
        _addEventListener = "attachEvent";
        prefix = "on";
    }

    // detect available wheel event
    support = "onwheel" in document.createElement("div") ? "wheel" : // Modern browsers support "wheel"
        document.onmousewheel !== undefined ? "mousewheel" : // Webkit and IE support at least "mousewheel"
            "DOMMouseScroll"; // let's assume that remaining browsers are older Firefox

    window.addWheelListener = function (elem, callback, useCapture) {
        _addWheelListener(elem, support, callback, useCapture);

        // handle MozMousePixelScroll in older Firefox
        if (support == "DOMMouseScroll") {
            _addWheelListener(elem, "MozMousePixelScroll", callback, useCapture);
        }
    };

    function _addWheelListener(elem, eventName, callback, useCapture) {
        elem[_addEventListener](prefix + eventName, support == "wheel" ? callback : function (originalEvent) {
            !originalEvent && (originalEvent = window.event);

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
                preventDefault: function () {
                    originalEvent.preventDefault ?
                        originalEvent.preventDefault() :
                        originalEvent.returnValue = false;
                }
            };

            // calculate deltaY (and deltaX) according to the event
            if (support == "mousewheel") {
                event.deltaY = - 1 / 40 * originalEvent.wheelDelta;
                // Webkit also support wheelDeltaX
                originalEvent.wheelDeltaX && (event.deltaX = - 1 / 40 * originalEvent.wheelDeltaX);
            } else {
                event.deltaY = originalEvent.deltaY || originalEvent.detail;
            }

            // it's time to fire the callback
            return callback(event);

        }, useCapture || false);
    }

}(jQuery))


