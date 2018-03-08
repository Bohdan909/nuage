document.documentElement.className = document.documentElement.className.replace(/\bno-js\b/g, '');

(function($){
    $(document).ready(function() {

        let pageScroll = document.querySelector(".main").classList.contains("page-scroll");

        /* ===================
           Text Lines Animate 
        ====================== */

        let textBlock = document.querySelectorAll(".animate-text");

        textBlock.forEach(function(block){
            let text = block.innerText || block.textContent;
            let blockWidth = block.offsetWidth;
            let fontSize = parseInt(window.getComputedStyle(block, null).getPropertyValue('font-size'));
            let lineLength = blockWidth / (fontSize * 0.59);
            let resultArr = [];
            let resultHTML;

            if (block.classList.contains("animate-text-hide")){
                let parBlock = block.parentNode;
                let blockCal = parBlock.parentNode.children[0].querySelector(".animate-text");

                blockWidth = blockCal.offsetWidth;
                fontSize = parseInt(window.getComputedStyle(blockCal, null).getPropertyValue('font-size'));
                lineLength = blockWidth / (fontSize * 0.59);

                console.log(lineLength);
            }

            function linesWrap(text, maxLength) {
                
                let line = [];
                let length = 0;

                text.split(" ").forEach(function(word){

                    if ((length + word.length) >= maxLength) {
                        resultArr.push("<div>" + line.join(" ") + "</div>");
                        line = []; 
                        length = 0;
                    }

                    length += word.length + 1;
                    line.push(word);
                });

                if (line.length > 0) {
                    resultArr.push("<div>" + line.join(" ") + "</div>");
                }

                return resultArr;
            };

            linesWrap(text, lineLength);
            resultHTML = resultArr.join("");
            block.innerHTML = resultHTML;

            
        });

        /* ===================
           Consultation 
        ===================== */

        let formWrap   = $(".consult-form-wrap, .consult-top");
        let mesConsult = $(".message-consult");
        let copyRight  = $(".copyright-mobile");

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
           Menu
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
        let $likeBg = document.querySelectorAll(".social-drop-bg-animate");

        if (pageScroll){
            Array.prototype.forEach.call($like, function(likeItem){
                likeItem.addEventListener("mouseover", function(){
                    let $socDrop = this.parentNode.querySelector(".social-drop");

                    $likeBg.forEach(function(item){
                        item.beginElement();
                    });

                    // if ($socDrop.classList.contains("show")){
                    //     $socDrop.classList.add("hide");
                    //     $socDrop.classList.remove("show");
                    // } else {
                    //     $socDrop.classList.add("show");
                    //     $socDrop.classList.remove("hide");
                    // }
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

        if (document.body.contains(document.querySelector(".drop-wrap"))) {
            let $filterWrap = document.querySelector(".filter-wrap");
            let $dropBtn = $filterWrap.querySelector(".drop-wrap .btn");
            let $filterBtnText = $filterWrap.querySelector(".filter-btn-text");

            let $dropBlock = document.querySelector(".drop-block");
            let $dropInner = $dropBlock.querySelector(".drop-inner");
            
            $dropBtn.addEventListener("click", function () {
                let height = $dropBlock.querySelector(".drop-h").offsetHeight;

                //$dropBlock.classList.toggle("show");
                if ($dropBlock.classList.contains("show")) {
                    $dropBlock.classList.remove("show");
                    $filterWrap.classList.remove("show");
                } else {
                    $dropBlock.classList.add("show");
                    $filterWrap.classList.add("show");
                }

                if ($dropBlock.classList.contains("show")) {
                    $filterBtnText.innerHTML = "Закрыть";
                    $dropInner.setAttribute("style", "max-height: " + height + "px");
                } else {
                    dropClose();
                }
            });

            $(document).on("click", function(e){
                if ($(e.target).closest(".drop-wrap").length) return;
                dropClose();
                $dropBlock.classList.remove("show");
                $filterWrap.classList.remove("show");
                e.stopPropagation();
            });

            function dropClose(){
                $filterBtnText.innerHTML = "Открыть";
                $dropInner.setAttribute("style", "max-height: 0px");
            }
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
           Navigation Scheme
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
           Tabs
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
            indexDetect(activePane);
            changeClone(indexActive);
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
                // setTimeout(function(){
                    let offset = activeTab.getBoundingClientRect().left - tabs.getBoundingClientRect().left;
                    let leftValue = offset + (activeTab.offsetWidth - 35) / 2;
                    line.style.left = leftValue + "px";
                // }, 250);
            }
        }

        // SVG Drowing Set
        $(".point-ico-svg").length && (function(){
            replaceWithPaths($(".point-ico-svg"));
            setDash($(".point-ico-svg"));
        }());
        
        /* ================
           Filter Feedback
        =================== */

        var ffItem = document.querySelectorAll(".feedback-filter div");
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

        /* ================
           Product Hover
        =================== */

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
                    if (point[i].classList.contains("active")){
                        return point[i];
                    }
                }
            }
        }

        /* ==============
           Forms
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
                'source': 'images/object-1/1_000',
                'count' : 41,
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
            var $cubes = $(".cubes-b");
            var $slidesCount = 0;

            function displaySliderFugure(figIndex) {
                $(".figures").removeClass("show");	
                $(".figures-" + figIndex).addClass("show");
            }

            function setSlideVisualAttributes(slick, slideId) {
                var currentSlideElement = slick.$slides.get(slideId);
                var currentSlideSlickIndex = $(currentSlideElement).data("slick-index");
                
                displaySliderFugure(currentSlideSlickIndex + 1);

                var $curSlide = $bgItem.eq(currentSlideSlickIndex);
        
                $bgItem.removeClass("show");
                $curSlide.addClass("show");

                setTimeout(function(){
                    $(".assort-bg-list").attr("class", "assort-bg-list");
                    $(".assort-bg-list").addClass("bg-" + (currentSlideSlickIndex + 1));
                    //$bgItem.not(":eq(" + currentSlide + ")").removeClass("show");
                }, 900);
            }

            $slider.on("init reInit", function(event, slick){
                console.log("slick slider init / re-init");
                
                $slidesCount = slick.slideCount;
                
                $slideItems.text($slidesCount);

                setSlideVisualAttributes(slick, 0);
                
            });

            $slider.slick({
                centerMode: false,
                infinite: true,
                slidesToShow: 3,
                slidesToScroll: 1,
                speed: 500,
                focusOnSelect: false,
                swipe: false,
                useTransform: true,
                //cssEase: 'cubic-bezier(0.11,0,0.45,1)',
                touchMove: false,
                draggable: false,
                lazyLoad: 'progressive',
                
                responsive: [{
                    breakpoint: 1025,
                    settings: {
                        slidesToShow: 1,
                        fade: true
                    }
                }]
            });

            // slider filter
            var filterItem = $(".filter-item .filter-option");

            // Filter Click        
            filterItem.on("click", function(e){
                let elem = $(this);
                //console.log(elem.data("filter-option") + ": " + elem.data("filter-value"));

                if (elem.hasClass("selected")) {
                    elem.removeClass("selected");
                    assortFilter.add(elem.data("filter-option"), elem.data("filter-value"), true);
                } else {
                    elem.addClass("selected");
                    assortFilter.add(elem.data("filter-option"), elem.data("filter-value"), false);
                }
            });

            // ONE-TIME INITIALIZATIONS END //
            //////////////////////////////////

            /* =========================================
                3D ANIMATION AND BLOCK-SPECIFIC SCRIPTS
            ========================================== */

            function executePageSpecificScript(blockId) {

                switch (blockId) {
                    case "main":
                        $object.animateOpen(true, function () {
                            setTimeout($object.animateClose, 300);
                        });
                        break;
                    case "advantages":
                        $scheme.animateOpen(true, function () {
                            console.log("andvantages animation ended");
                        });
                        break;
                    case "assortment":
                        $slider.slick('setPosition');
                        
                        // Setup Classes
                        //$slideItems.text($slidesCount);

                        

                        // TODO: save and restore current slide index to localStorage
                        let lsCurrentSlideIndex = localStorage.getItem("currentSlide");
                        if (lsCurrentSlideIndex) {
                            $slider.slick("slickGoTo", lsCurrentSlideIndex, true);
                        }
                        

                        let curSlideIndex = (lsCurrentSlideIndex != null) ? lsCurrentSlideIndex : parseInt($curSlideInd.text());

                        //displaySliderFugure(curSlideIndex);

                        // setTimeout(function(){
                        //     $(".assort-bg-list").addClass("bg-1");
                        // }, 1000);

                        function checkSliderEdge(index){
                            if (index == 5) {
                                $slider.slick("slickGoTo", 0, true);
                            } else {
                                $slider.slick("slickNext");
                            }
                        }
                        
                        $slider.on( "click", ".slick-slider-inner", function( e ) {
                            if (!$(this).parent().hasClass("slick-current") || $(this).parent().hasClass("slick-cloned")) { 
                                e.preventDefault();
                                let currentSlideIndex = $slider.slick("slickCurrentSlide");
                                
                                checkSliderEdge(currentSlideIndex);
                            }	
                        });
                                
                        // Loader		
                        $(".slick-arrow").on("click", function(event){
                            let target = $(event.target);
                            let curIndex = $slider.slick("slickCurrentSlide"); 

                            checkSliderEdge(curIndex);

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

                            setSlideVisualAttributes(slick, nextSlide);

                            currentSlide = nextSlide;
                            
                            $curSlideInd.text(currentSlide + 1);
        
                            // Slider Description
                            function changeSliderDesc(){
                                var $sliderDesc = document.querySelectorAll(".assort-desc-wrap .assort-desc-item");	
        
                                for (let i = 0; i < $sliderDesc.length; i++){
                                    $sliderDesc[i].classList.remove("show");
                                }
        
                                $sliderDesc[currentSlide].classList.add("show");
                            }
                            localStorage.setItem("currentSlide", nextSlide);
                            
                            setTimeout(changeSliderDesc, 0);
        
                            // Cubes
                            $("body")
                                .attr("class", "")
                                .addClass("page-style-" + (currentSlide + 1));
                            
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
                    if (this.pageElement.classList.contains('prev')) {
                        this.pageElement.classList.remove('prev');
                    }
                    this.pageElement.classList.add('next');
                    //this.pageElement.addEventListener("transitionend", this.unload, true);
                    setTimeout(this.unload, 700);
                    
                };

                this.setPrev = function() {
                    if (this.pageElement.classList.contains('next')) {
                        this.pageElement.classList.remove('next');
                    }
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

                this.displayPageByIndex = function (index) {
                    if (this.currentPage) {
                        this.currentPage.unload();
                    }
                    this.currentPageIndex = index;
                    this.currentPage = this.pagesArray[index];
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
                };

                this.displayPage = function (pageId) {
                    for (let i = 0; i < this.pagesArray.length; i++) {
                        const page = this.pagesArray[i];
                        if (page.id == pageId) {
                            //this.clearLoadedState();
                            this.displayPageByIndex(i);
                            break;
                        }
                    }
                };

                this.setCurrentPageByIndex = function (index) {
                    
                    this.currentPageIndex = index;
                    console.log('set page index: ' + index);
                    
                    this.currentPage = this.pagesArray[index];
                    console.log('set current page ' + this.currentPage.id);
                    window.location.href = '#' + this.currentPage.id;
                    
                };

                this.setCurrentPage = function(pageId){
                    for (let i = 0; i < this.pagesArray.length; i++) {
                        const page = this.pagesArray[i];
                        if (page.id == pageId) {
                            //this.clearLoadedState();
                            this.setCurrentPageByIndex(i);
                            break;
                        }
                    }
                };

                this.clearLoadedState = function() {
                    this.pagesArray.forEach(function(page){
                        page.unload();
                    });
                };

                this.init = function() {
                    if (null != this.pagesArray && this.pagesArray.length > 1) {
                        this.clearLoadedState();
                        if (currentId != null) {
                            this.displayPage(currentId);
                        } else {
                            this.displayPageByIndex(0);
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

            // media query change
            function WidthChange(mq) {
                // window width is at least 1025px
                mainElem.classList.add("stop-scrolling");

                // CUSTOM EVENT HANDLERS FOR SCROLL AND NAVIGATION
                document.onkeydown = customScrollKeysHandler;
                
                // IE fix for onhashchange
                if(!window.HashChangeEvent)(function(){
                    var lastURL=document.URL;
                    window.addEventListener("hashchange",function(event){
                        Object.defineProperty(event,"oldURL",{enumerable:true,configurable:true,value:lastURL});
                        Object.defineProperty(event,"newURL",{enumerable:true,configurable:true,value:document.URL});
                        lastURL=document.URL;
                    });
                }());
                window.onhashchange = hashUrlChangeHandler;

                // add custom scroll only for devices with screen more than 1025px
                if (mq.matches) {
                    addWheelListener( window, customScrollWheelHandler, false);
                    
                    // add drag handlers for scrollable blocks
                    let scrollBlocks = document.querySelectorAll(".page .scroll-block");
                    Array.prototype.forEach.call(scrollBlocks, function(scrollBlock){
                        addWheelListener( scrollBlock, customScrollForScrollable, true);
                        scrollBlock.classList.add("dragscroll");
                        scrollBlock.style.cursor = "grab";
                    });
                } else {
                    // window width is less than 1025px
                    //window.ontouchmove = customScrollTouchHandler;
                    ontouch(window, customScrollTouchHandler, true);
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

            function customScrollTouchHandler(evt, dir, phase, swipetype, distance) {
                // https://gist.github.com/SleepWalker/da5636b1abcbaff48c4d
                
                if (phase == "end") {
                    if (swipetype == "left") {
                        scrollManager.scrollToNextPage();
                    } else if (swipetype == "right") {
                        scrollManager.scrollToPrevPage();
                    }
                }
            }

            // called when user navigates back or clicks on link
            function hashUrlChangeHandler(event) {
                if (event.newURL != event.oldURL) {
                    let newUrlId = window.location.hash.substr(1);
                    let oldUrlId = event.oldURL.split('#')[1];

                    scrollManager.displayPage(newUrlId);
                }
            }
            
            // FILTER FOR ASSORTMENT
            /** Assortment filter oject to handle filter states 
             * and functionality */
            function AssortmentFilter(){
                this.surface = [];
                this.absorbtion = [];
                this.quantity = [];
                this.filterArray = [];

                this.surfaceTypes = {
                    grid: ["1","2"],
                    soft: ["0","3","4","5"]
                };
                this.absorbLevels = {
                    one: ["5"],
                    two: ["0"],
                    three: ["1","2","3","4"],
                    four: ["1"],
                    five: ["2","3","4"]
                };
                this.quantities = {
                    six: ["4"],
                    eight: ["3"],
                    ten: ["0","1","2"],
                    twenty: ["5"]
                };
                

                this.save = function(array) {
                    localStorage.setItem("assortmentFilter", array);
                };

                this.load = function() {
                    let lsValue = localStorage.getItem("assortmentFilter");
                    this.filterArray = lsValue != null ? lsValue : []; 

                    this.apply(this.filterArray);
                };

                this.arrayDiff = function(array1, array2) {
                    return array1.filter(function(i) {
                        return array2.indexOf(i) < 0;
                    });
                };

                this.arrayIntersect = function(array1, array2) {
                    //console.log("Intersect input: [" + array1 + "] | [" + array2 + "]");
                    let result = [];
                    if (array1.length === 0) {
                        result = array2.slice();
                        return result;
                    } else if (array2.length === 0) {
                        result = array1.slice();
                        return result;
                    } 

                    if (array1.length > array2.length) {
                        return array1.filter(function(i) {
                            return array2.indexOf(i) >= 0;
                        });
                    } else {
                        return array2.filter(function(i) {
                            return array1.indexOf(i) >= 0;
                        });
                    }
                    
                }

                this.mergeFilters = function() {
                    // push into filterArray only values, that are common to merging arrays
                    let tempArray = [];

                    tempArray = this.arrayIntersect(this.arrayIntersect(this.surface, this.absorbtion), this.quantity);
                    //console.log("Merged Array: " + tempArray);
                    return tempArray;
                };

                /** resets assortment filter */
                this.reset = function() {
                    this.filterArray.length = 0;
                    $slider.slick("slickUnfilter");
                    $slider.slick("slickGoTo", 0, true);
                    localStorage.removeItem("assortmentFilter");
                };

                /** Calls slick slider filter() method.
                 * @param {array} indexesArray - array of slick slider indexes
                 */
                this.apply = function(indexesArray) {
                    $slider.slick("slickUnfilter");
                    
                    if (indexesArray.length > 0) {
                        $slider.slick("slickFilter", function(index){
                            return ($.inArray($(this).attr("data-slick-index"), indexesArray) != -1);
                        });
                    }
                    this.save(indexesArray);
                };

                /** adds array to assortment filter 
                 * @param {string} option Indicates filter group and passed from data-filter-option attribute
                 * @param {array} array Array of elements to display from data-filter-value.
                 * @param {boolean} subtract Indicates that option is unselected and we need to subtract array 
                */
                this.add = function(option, array, subtract) {
                    // add array for same group
                    // subtract if unchecked
                    switch (option) {
                        case "surface":
                            if (subtract === true) {
                                this.surface = this.arrayDiff(this.surface, array);
                            } else {
                                this.surface = this.surface.concat(array);
                            }
                            break;
                        case "absorb":
                            if (subtract === true) {
                                this.absorbtion = this.arrayDiff(this.absorbtion, array);
                            } else {
                                this.absorbtion = this.absorbtion.concat(array);
                            }
                            
                            break;
                        case "quantity":
                            if (subtract === true) {
                                this.quantity = this.arrayDiff(this.quantity, array);
                            } else {
                                this.quantity = this.quantity.concat(array);
                            }
                            break;
                        default:
                            break;
                    }

                    // console.log("Surface array: [" + this.surface + "]");
                    // console.log("Absorbtion array: [" + this.absorbtion + "]");
                    // console.log("Quantity array: [" + this.quantity + "]");
                    
                    // find intersection for different groups
                    this.filterArray = this.mergeFilters();

                    console.log("filterArray after merging: " + this.filterArray);

                    this.apply(this.filterArray);

                };

                /** removes array from assortment filter */
                this.remove = function(option, array) {

                };

                //this.load();
    
            }
            let assortFilter = new AssortmentFilter();
            //assortFilter.apply(assortFilter.quantities.ten);
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

    (function getPerspective(){
        var element = document.createElement('p'),
            html = document.getElementsByTagName('HTML')[0],
            body = document.getElementsByTagName('BODY')[0],
            propertys = {
                'webkitTransformStyle':'-webkit-transform-style',
                'MozTransformStyle':'-moz-transform-style',
                'msTransformStyle':'-ms-transform-style',
                'transformStyle':'transform-style'
            };

        body.insertBefore(element, null);

        for (var i in propertys) {
            if (element.style[i] !== undefined) {
                element.style[i] = "preserve-3d";
            }
        }

        var st = window.getComputedStyle(element, null),
            transform = st.getPropertyValue("-webkit-transform-style") ||
                        st.getPropertyValue("-moz-transform-style") ||
                        st.getPropertyValue("-ms-transform-style") ||
                        st.getPropertyValue("transform-style");

        if(transform!=='preserve-3d'){
          html.className += 'no-preserve-3d';
        }
        document.body.removeChild(element);

    }());

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
    
    // Find Parent
    function findParent(el, cls){
       while ((el = el.parentElement) && !el.classList.contains(cls));
       return el;
    }


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

        }, {passive: true}, useCapture || false);
    }

    /************************************
     * SWIPE HANDLER (Returns direction) 
     ************************************/
    // http://www.javascriptkit.com/javatutors/touchevents3.shtml
    function ontouch(el, callback, capture){
 
        var touchsurface = el,
        dir,
        swipeType,
        startX,
        startY,
        distX,
        distY,
        threshold = 150, //required min distance traveled to be considered swipe
        restraint = 50, // maximum distance allowed at the same time in perpendicular direction
        allowedTime = 500, // maximum time allowed to travel that distance
        elapsedTime,
        startTime,
        handletouch = callback || function(evt, dir, phase, swipetype, distance){}
     
        touchsurface.addEventListener('touchstart', function(e){
            var touchobj = e.changedTouches[0]
            dir = 'none'
            swipeType = 'none'
            dist = 0
            startX = touchobj.pageX
            startY = touchobj.pageY
            startTime = new Date().getTime() // record time when finger first makes contact with surface
            handletouch(e, 'none', 'start', swipeType, 0) // fire callback function with params dir="none", phase="start", swipetype="none" etc
            //e.preventDefault()
     
        }, capture || false)
     
        touchsurface.addEventListener('touchmove', function(e){
            var touchobj = e.changedTouches[0]
            distX = touchobj.pageX - startX // get horizontal dist traveled by finger while in contact with surface
            distY = touchobj.pageY - startY // get vertical dist traveled by finger while in contact with surface
            if (Math.abs(distX) > Math.abs(distY)){ // if distance traveled horizontally is greater than vertically, consider this a horizontal movement
                dir = (distX < 0)? 'left' : 'right'
                handletouch(e, dir, 'move', swipeType, distX) // fire callback function with params dir="left|right", phase="move", swipetype="none" etc
            }
            else{ // else consider this a vertical movement
                dir = (distY < 0)? 'up' : 'down'
                handletouch(e, dir, 'move', swipeType, distY) // fire callback function with params dir="up|down", phase="move", swipetype="none" etc
            }
            //e.preventDefault() // prevent scrolling when inside DIV
        }, capture || false)
     
        touchsurface.addEventListener('touchend', function(e){
            var touchobj = e.changedTouches[0]
            elapsedTime = new Date().getTime() - startTime // get time elapsed
            if (elapsedTime <= allowedTime){ // first condition for awipe met
                if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint){ // 2nd condition for horizontal swipe met
                    swipeType = dir // set swipeType to either "left" or "right"
                }
                else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint){ // 2nd condition for vertical swipe met
                    swipeType = dir // set swipeType to either "top" or "down"
                }
            }
            // Fire callback function with params dir="left|right|up|down", phase="end", swipetype=dir etc:
            handletouch(e, dir, 'end', swipeType, (dir =='left' || dir =='right')? distX : distY)
            //e.preventDefault()
        }, capture || false)
    }
     
    // USAGE:
    /*
    ontouch(el, function(evt, dir, phase, swipetype, distance){
     // evt: contains original Event object
     // dir: contains "none", "left", "right", "top", or "down"
     // phase: contains "start", "move", or "end"
     // swipetype: contains "none", "left", "right", "top", or "down"
     // distance: distance traveled either horizontally or vertically, depending on dir value
     
     if ( phase == 'move' && (dir =='left' || dir == 'right') )
      console.log('You are moving the finger horizontally by ' + distance)
    })
    */

}(jQuery))


