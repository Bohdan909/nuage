document.documentElement.className = document.documentElement.className.replace(/\bno-js\b/g, '');

(function ($) {
    $(document).ready(function () {

        setTimeout(function () {
            document.querySelector(".page").classList.add("loaded");
        }, 500);

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
            console.log(event.target);
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

        let $socDrop = document.querySelector(".social-drop");
        let $like = document.querySelector(".like");

        if (document.body.contains($like)) {
            $like.addEventListener("click", function () {
                if ($socDrop.classList.contains("show")) {
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

        let $fbHead = document.querySelectorAll(".answer-head");
        let $fbPage = document.querySelector(".page-feedback");

        if (document.body.contains($fbPage)) {
            $fbHead.forEach(function (head) {

                head.addEventListener("click", function () {
                    let $point = this.parentNode;
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

            // clear panes state
            let contentPanes = document.querySelectorAll(".tab-pane");
            Array.prototype.forEach.call(contentPanes, function (pane) {
                pane.classList.remove("active");
            });

            let activePaneId = event.target.getAttribute("data-tab");
            let activePane = document.getElementById(activePaneId);

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
                line.style.left = `${offset + (activeTab.offsetWidth - 35) / 2}px`;
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

        let mainElem = document.querySelector(".main");

        // left: 37, up: 38, right: 39, down: 40,
        // spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
        let keysPrev = { 37: 1, 38: 1, 33: 1, 36: 1 };
        let keysNext = { 39: 1, 40: 1, 32: 1, 34: 1, 35: 1 };

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

        let lastScrollTime = 0;

        // initialize variable by hashtag from url if it present
        let currentHashtag = window.location.hash.substr(1);


        let currentBlockIndex = 0;
        let prevBlockIndex = -1;

        let movingMenuUnderline = document.querySelector(".menu .moving-underline");
        let menuListElem = document.querySelector(".menu ul");
        let allBlocks = document.querySelectorAll(".page");

        var $object = $('.object-main');
        var $scheme = $('.object-scheme');

        $object.rotate3d({
            'source': 'images/object-1/1_',
            'count': 39,
            'auto': true
        });

        $scheme.rotate3d({
            'source': 'images/object-2/Vzruv_02.Alpha_',
            'count': 70,
            'auto': true
        });

        // media query event handler
        if (window.matchMedia) {
            const mq = window.matchMedia("(min-width: 0px)");
            mq.addListener(mediaWidthChange);
            mediaWidthChange(mq);
        }

        currentBlockIndex = getBlockIndexByHashtag(currentHashtag);
        navigateToBlock(currentBlockIndex);

        function clearLoadedState() {
            Array.prototype.forEach.call(allBlocks, function (block) {
                block.classList.remove("loaded");
            });
        }

        // media query change
        function mediaWidthChange(mq) {
            if (mq.matches) {
                // window width is at least 1025px
                mainElem.classList.add("stop-scrolling");

                clearLoadedState();

                // CUSTOM EVENT HANDLERS FOR SCROLL AND NAVIGATION
                document.onkeydown = customScrollKeysHandler;
                // handler for wheel event 
                addWheelListener(window, customScrollWheelHandler);

                window.ontouchmove = customScrollTouchHandler;

                window.onhashchange = hashUrlChangeHandler;
            } else {
                // window width is less than 1025px
            }
        }

        function getBlockIndexByHashtag(hashtag) {
            let result = currentBlockIndex;
            let blockIndex = navLinks.indexOf(hashtag);
            if (blockIndex != -1) {
                result = blockIndex;
            }
            return result;
        }

        function playMenuUnderlineAnimation(currentBlockId) {
            let currentNavElement = document.querySelector("li." + currentBlockId);
            //let prevNavElement = document.querySelector("li." + prevBlockId);

            if (currentNavElement) {
                let navElemOffset = currentNavElement.getBoundingClientRect().left - menuListElem.getBoundingClientRect().left;
                movingMenuUnderline.style.width = `${currentNavElement.offsetWidth}px`;
                movingMenuUnderline.style.transform = `translateX(${navElemOffset}px)`;
            } else {
                movingMenuUnderline.style.width = 0;
            }

            /*if (prevNavElement) {
                prevNavElement.classList.remove("active");
            }
            
            if (currentNavElement) {
                currentNavElement.classList.add("active");
            }*/
        }

        function navigateToBlockByHashtag(hashtag) {
            currentBlockIndex = getBlockIndexByHashtag(hashtag);
            navigateToBlock(currentBlockIndex);
        }

        function displayBlock(currentBlockId) {
            clearLoadedState();

            let elem = document.getElementById(currentBlockId);

            mainElem.style.height = elem.scrollHeight + "px";

            elem.classList.add("loaded");
            // animation part

            playMenuUnderlineAnimation(currentBlockId);

            prevBlockIndex = prevBlockIndex == -1 ? 0 : prevBlockIndex;
            // remove loaded from previous block
            let prevBlockId = navLinks[prevBlockIndex];

            let prevElement = document.getElementById(prevBlockId);
            prevElement.classList.remove("loaded");

            executePageSpecificScript(currentBlockId);
        }

        function getBlockId(blockIndex) {
             return navLinks[blockIndex];
        }

        function navigateToBlock(blockIndex) {
            if (currentBlockIndex == prevBlockIndex) {
                console.log(`trying to open already opened page index: ${currentBlockIndex} `);
                return;
            }

            let currentBlockId = getBlockId(currentBlockIndex);

            window.location.href = baseHashUrl + currentBlockId;

        }

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

        function customScrollWheelHandler(e) {

            let targetElement = document.getElementById(currentHashtag);
            let contentElem = targetElement.querySelector(".content");

            if (targetElement.scrollHeight - document.documentElement.clientHeight == document.documentElement.scrollTop) {
                console.log(`== scrolled to bottom ==`);
                //limit handling rate to prevent scrolling trough all pages
                if (Date.now() - lastScrollTime > 1000) {
                    if (e.deltaY > 0) {
                        scrollToNextBlock();
                    } else if (e.deltaY < 0) {
                        scrollToPrevBlock();
                    }

                    lastScrollTime = Date.now();
                }
            } else {
                console.log(`== just scroll ==`);

            }

        }

        function customScrollTouchHandler(e) {
            // https://gist.github.com/SleepWalker/da5636b1abcbaff48c4d
        }

        // called when user navigates back or clicks on link
        function hashUrlChangeHandler(event) {
            console.log(`hash change called`);

            if (event.newURL != event.oldURL) {
                console.log(`hash changed`);
                let newUrlId = window.location.hash.substr(1);
                let oldUrlId = event.oldURL.split('#')[1];
                //let newBlockIndex = getBlockIndexByHashtag(newUrlId);
                prevBlockIndex = getBlockIndexByHashtag(oldUrlId);
                console.log(`prev block: ${oldUrlId}, new block: ${newUrlId}`);
                //navigateToBlockByHashtag(newUrlId);

                displayBlock(newUrlId);
            }
        }

        /* =========================================
            3D ANIMATION AND BLOCK-SPECIFIC SCRIPTS
          ========================================== */

        function executePageSpecificScript(blockId) {

            switch (blockId) {
                case "main":
                    // if ($object.length == 0) {
                    //     $object = $('.object-main');
                    // }
                    //$object.rotate3d.animateOpen();
                    $object.animateOpen(function () {
                        setTimeout($object.animateClose, 300);
                    });
                    break;
                case "advantages":
                    // if ($scheme.length == 0) {
                    //     $scheme = $('.object-scheme');
                    // }
                    $scheme.animateOpen(function () {
                        console.log("andvantages animation ended");
                    });
                    break;
                case "assortment":
                    break;
                default:
                    break;
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


