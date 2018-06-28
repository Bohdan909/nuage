document.documentElement.className=document.documentElement.className.replace(/\bno-js\b/g,""),function(e){e(document).ready(function(){const t=document.querySelector("html");let o=document.querySelector(".main").classList.contains("page-scroll"),a=window.matchMedia("(max-width: 767px)").matches;!function(){let e,t,s;console.log("=== SET LINES ==="),document.querySelectorAll(".animate-text").forEach(function(n){let o,r=n.innerText||n.textContent||"",l=[];if(n.parentNode.classList.contains("feedback-item")&&a)e=window.innerWidth-35,s=e/(.6*(t=13));else{let o=i(n,"animate-text-wrap");e=n.classList.contains("animate-text-p")?o.offsetWidth-80:o.offsetWidth,t=parseInt(window.getComputedStyle(n,null).getPropertyValue("font-size")),s=e/(.6*t)}(function(e,t){let s=[],n=0;e.split(" ").forEach(function(e){n+e.length>=t&&(l.push("<div>"+s.join(" ")+"</div>"),s=[],n=0),n+=e.length+1,s.push(e)}),s.length>0&&l.push("<div>"+s.join(" ")+"</div>")})(r,s),o=l.join(""),n.innerHTML=o}),console.log("=== END SET LINES ===")}(),window.addEventListener("orientationchange",function(){window.location.reload()},!0);let r=e(".consult-form-wrap, .consult-top"),l=e(".message-consult"),c=e(".copyright-mobile");e(".btn-send").length&&e(".btn-send").on("click",function(e){r.removeClass("fade-in").addClass("fade-out"),c.hide(),l.removeClass("fade-out").addClass("fade-in"),e.preventDefault()}),e(".btn-back-form")&&e(".btn-back-form").on("click",function(e){r.removeClass("fade-out").addClass("fade-in"),l.removeClass("fade-in").addClass("fade-out"),window.innerWidth<768&&c.show(),e.preventDefault()});let d=document.querySelector("body");document.querySelector(".menu").addEventListener("click",function(e){"IMG"==e.target.tagName&&d.classList.contains("menu-close")?e.stopPropagation():d.classList.contains("menu-open")?(d.classList.add("menu-close"),setTimeout(function(){d.classList.remove("menu-open")},0)):(d.classList.add("menu-open"),d.classList.remove("menu-close"))});let u=document.querySelectorAll(".like"),h=document.querySelectorAll(".social-drop-bg-animate");o&&Array.prototype.forEach.call(u,function(e){e.addEventListener("mouseover",function(){this.parentNode.querySelector(".social-drop");h.forEach(function(e){e.beginElement()})})});let f=new function(){this.surface=[],this.absorbtion=[],this.quantity=[],this.filterArray=[],this.surfaceTypes={grid:["1","2"],soft:["0","3","4","5"]},this.absorbLevels={one:["5"],two:["0"],three:["1","2","3","4"],four:["1"],five:["2","3","4"]},this.quantities={six:["4"],eight:["3"],ten:["0","1","2"],twenty:["5"]},this.save=function(e){localStorage.setItem("assortmentFilter",e)},this.load=function(){let e=localStorage.getItem("assortmentFilter");this.filterArray=null!=e?e:[],this.apply(this.filterArray)},this.arrayDiff=function(e,t){return e.filter(function(e){return t.indexOf(e)<0})},this.arrayIntersect=function(e,t){let s=[];return 0===e.length?s=t.slice():0===t.length?s=e.slice():e.length>t.length?e.filter(function(e){return t.indexOf(e)>=0}):t.filter(function(t){return e.indexOf(t)>=0})},this.mergeFilters=function(){let e=[],t=[],s=[],n=[];(e=this.surface.slice().concat(this.absorbtion.slice()).concat(this.quantity.slice())).sort();let i=0,o=0;for(;o<e.length;)e[o]==e[o+2]?(n.push(e[o]),i=3):e[o]==e[o+1]?(s.push(e[o]),i=2):(t.push(e[o]),i=1),o+=i;return console.log("exist1time: "+t),console.log("exist2times: "+s),console.log("exist3times: "+n),e=n.length>0?n:s.length>0?s:t},this.reset=function(){this.filterArray.length=0,D.slick("slickUnfilter"),D.slick("slickGoTo",0,!0),localStorage.removeItem("assortmentFilter")},this.apply=function(t){D.slick("slickUnfilter"),t.length>0&&D.slick("slickFilter",function(s){return-1!=e.inArray(e(this).attr("data-slick-index"),t)}),this.save(t)},this.add=function(e,t,s,n){switch(e){case"surface":this.surface=!0===s?this.arrayDiff(this.surface,t):this.surface.concat(t);break;case"absorb":this.absorbtion=!0===s?this.arrayDiff(this.absorbtion,t):this.absorbtion.concat(t);break;case"quantity":this.quantity=!0===s?this.arrayDiff(this.quantity,t):this.quantity.concat(t)}this.filterArray=this.mergeFilters(),console.log("filterArray after merging: "+this.filterArray);let i=!1;0==this.surface.length&&0==this.absorbtion.length&&0==this.quantity.length&&(i=!0),!i&&this.filterArray.length<=0&&n?n():this.apply(this.filterArray)}};if(document.body.contains(document.querySelector(".drop-wrap"))){let t=document.querySelector(".filter-wrap"),s=t.querySelector(".drop-wrap .btn"),n=t.querySelector(".filter-btn-text"),i=document.querySelector(".drop-block"),o=i.querySelector(".drop-inner");function m(){n.innerHTML="Открыть",o.setAttribute("style","max-height: 0px")}s.addEventListener("click",function(){let e=i.querySelector(".drop-h").offsetHeight;i.classList.contains("show")?(i.classList.remove("show"),t.classList.remove("show"),f.reset(),function(){let e=document.querySelectorAll(".filter-wrap .filter-option");Array.prototype.forEach.call(e,function(e){e.classList.remove("selected")})}()):(i.classList.add("show"),t.classList.add("show")),i.classList.contains("show")?(n.innerHTML="Закрыть",o.setAttribute("style","max-height: "+e+"px")):m()}),e(document).on("click",function(s){e(s.target).closest(".drop-wrap").length||(m(),i.classList.remove("show"),t.classList.remove("show"),s.stopPropagation())})}if(o){let e=document.querySelector(".page-feedback");e.querySelectorAll(".answer-head");e.querySelectorAll(".point-btn.plus").forEach(function(e){e.addEventListener("click",function(){let e=this.parentNode.parentNode,t=e.querySelector(".answer-body"),s=t.querySelector(".answer-body-inner").offsetHeight;e.classList.toggle("show"),e.classList.contains("show")?t.setAttribute("style","max-height: "+s+"px"):t.setAttribute("style","max-height: 0px")})})}let g=document.querySelectorAll(".scheme-nav button"),p=document.querySelectorAll(".scheme-nav .point");function v(e){p.forEach(function(e){e.classList.remove("active")}),p[e].classList.add("active")}function y(e){let t=e.parentNode.children;lastPoint=t.length-1,indexActive=Array.prototype.indexOf.call(t,e)}function L(){let e=document.querySelector(".mission-text-slider-wrap");if(!e)return;let t=e.querySelectorAll(".mission-tabs .tab"),s=null;for(let i=0;i<t.length;i++){if(t[i].classList.contains("active")){s=i;break}}t[s].classList.remove("active");let n=t[s].querySelector("span").getAttribute("data-tab");document.getElementById(n).classList.remove("active"),s>=t.length-1?s=0:s+=1,t[s].classList.add("active"),n=t[s].querySelector("span").getAttribute("data-tab"),document.getElementById(n).classList.add("active")}g.forEach(function(e){e.addEventListener("click",function(e){let t=document.querySelectorAll(".scheme-desc"),s=document.querySelectorAll(".object-scheme-wrap .point"),n=document.querySelector(".scheme-desc.active"),i=document.querySelector(".point.active");y(n),i.classList.remove("active"),n.classList.remove("active"),e.target.classList.contains("btn-nav-right")?indexActive==lastPoint?indexActive=0:indexActive++:0==indexActive?indexActive=lastPoint:indexActive--,v(indexActive),s[indexActive].classList.add("active"),t[indexActive].classList.add("active")})});var w=window.setInterval(L,3e3);let b=document.querySelectorAll(".tabs");function x(e){e.preventDefault(),e.currentTarget.classList.contains("mission-tabs")&&w&&(window.clearInterval(w),w=!1);let t=e.currentTarget.querySelectorAll(".tab");Array.prototype.forEach.call(t,function(e){e.classList.remove("active")});let s=i(e.target,"tab");null!=s&&s.classList.add("active"),S(e.currentTarget);let n=e.target.getAttribute("data-tab"),o=document.getElementById(n),a=o.parentElement.querySelectorAll(".tab-pane");Array.prototype.forEach.call(a,function(e){e.classList.remove("active")}),o.classList.add("active"),y(o),v(indexActive)}function S(e){let t=e.querySelector(".line"),s=e.querySelector(".tab.active");if(t){let n=s.querySelector("span").offsetWidth,i=s.getBoundingClientRect().left-e.getBoundingClientRect().left,o=i+(s.offsetWidth-(n-26));console.log(i),t.style.left=o+"px",t.style.width=n-52+"px"}}Array.prototype.forEach.call(b,function(e){e.addEventListener("click",x),S(e)}),e(".point-ico-svg").length&&(replaceWithPaths(e(".point-ico-svg")),setDash(e(".point-ico-svg")));var E=document.querySelectorAll(".feedback-filter div"),q=document.querySelectorAll(".feedback-item");if(document.body.contains(document.querySelector(".map-filter-btn"))){let e=document.querySelector(".map-filter-btn"),t=(document.querySelector(".map-filter"),document.querySelector(".map-column")),s=e.querySelector("span");e.addEventListener("click",function(){let n=s.getAttribute("data-text-tgl"),i=s.innerText||s.textContent||"";s.innerHTML=n,s.setAttribute("data-text-tgl",i),t.classList.contains("hide-filter")?(t.classList.remove("hide-filter"),e.classList.remove("hide")):(t.classList.add("hide-filter"),e.classList.add("hide"))})}if(document.body.contains(document.querySelector(".product-list"))){let e=document.querySelectorAll(".product-list section > div"),t=P(e),s=t.offsetWidth,n=t.offsetLeft,i=document.querySelector(".product-list > span");k(s,n);for(let o=0;o<e.length;o++)e[o].addEventListener("mouseover",function(){A(this)}),e[o].addEventListener("mouseleave",function(){this.classList.contains("active")||A(t=P(e))}),e[o].addEventListener("click",function(){A(this)});function A(e){s=e.offsetWidth,n=e.offsetLeft,k(s,n)}function k(e,t){i.setAttribute("style","width: "+e+"px; left: "+t+"px")}function P(e){for(let t=0;t<e.length;t++)if(e[t].classList.contains("active"))return e[t]}window.addEventListener("resize",function(){A(t=P(e))})}!function(){const e=document.querySelector(".product-viewer-wrap"),s=document.querySelector(".product-zoom"),n=document.querySelectorAll(".zoom-img");if(document.body.contains(e)&&t.classList.contains("no-touchevents")&&(e.classList.contains("product-viewer-front")||e.classList.contains("product-viewer-back"))){let t,i,o,a,r,l,c,d="100ms",u="ease",h=1.05;e.addEventListener("mouseenter",function(f){for(let e=0;e<n.length;e++)n[e].classList.remove("show");e.classList.contains("product-viewer-front")?((c=s.querySelector(".zoom-img-front")).classList.add("show"),s.classList.add("show")):e.classList.contains("product-viewer-back")&&((c=s.querySelector(".zoom-img-back")).classList.add("show"),s.classList.add("show")),t=f.pageX-this.getBoundingClientRect().left,i=f.pageY-this.getBoundingClientRect().top,o=-1.95*t,a=-1.7*i,r=f.pageX-270,l=f.pageY-260,s.setAttribute("style","left:"+r+"px; top: "+l+"px;"),styles="transform: matrix("+h+",0,0,"+h+","+o+","+a+"); transition: transform "+d+" "+u,c.setAttribute("style",styles),c.addEventListener("transitionend",function(){c.classList.remove("z-entering")})}),e.addEventListener("mousemove",function(e){c.classList.contains("z-entering")||c.classList.contains("z-exiting")||(t=e.pageX-this.getBoundingClientRect().left,i=e.pageY-this.getBoundingClientRect().top,o=-1.95*t,a=-1.7*i,r=e.pageX-270,l=e.pageY-260,s.setAttribute("style","left:"+r+"px; top: "+l+"px;"),styles="transform: matrix("+h+",0,0,"+h+","+o+","+a+"); transition: transform "+d+" "+u,c.setAttribute("style",styles))}),e.addEventListener("mouseleave",function(e){setTimeout(function(){s.classList.remove("show")},400),styles="transform: matrix(1,0,0,1,0,0); transition: transform "+d+" "+u,1!==h&&c.classList.add("z-exiting"),c.classList.add("z-exiting"),setTimeout(function(){c.setAttribute("style",styles)},1e3),c.addEventListener("transitionend",function(){c.classList.remove("z-exiting")})})}}();let C=e(".cursor-move"),T=e(".cursor-target"),I=e(".product-list section > div a, .point-btn");var M={setCursor:function(t){C.show().addClass("show").removeClass("drag"),T.addClass("hover"),e("html").mousedown(function(e){return!1}),M.updateCursor()},dragCursor:function(){C.addClass("drag")},removeCursor:function(){C.removeClass("show drag"),T.removeClass("hover")},hideCursor:function(){C.hide()},updateCursor:function(){e(document).mousemove(function(e){C.css({top:e.pageY+3+"px",left:e.pageX+3+"px"})})}};T.on("mouseenter",function(e){M.setCursor()}),I.on("click",function(){M.hideCursor()}),I.on({mouseenter:function(){M.removeCursor()},mouseleave:function(){M.setCursor()}}),T.on("mouseleave",function(){M.removeCursor()}),T.on("mousedown",function(){M.dragCursor()}),T.on("mouseup",function(){M.setCursor()}),n(),s(),e(window).resize(s);var N=e(".object-main"),B=e(".object-scheme");N.length&&N.rotate3d({source:"images/object-1/1_000",count:41,auto:!0}),B.length&&B.rotate3d({source:"images/scheme/scheme_",count:63,auto:!0});let D=e(".assort-slider"),z=(D.find(".slide"),e(".assort-slider-loader"),e(".assort-bg-list li")),j=(e(".assort-slider-ind span"),e(".assort-slider-ind i")),R=(e(".cubes-b"),0),W=e(".assort-slider-rev section"),Y=W.find("div"),O=[0,-30,-60,-90,-120,-150];function X(t,s){var n,i=t.$slides.get(s),o=e(i).data("slick-index");n=o+1,e(".figures").removeClass("show"),e(".figures-"+n).addClass("show"),function(e){Y.removeClass("active"),Y.eq(e).addClass("active"),W.css({transform:"translateY("+O[e]+"px"})}(s);var a=z.eq(o);z.removeClass("show"),a.addClass("show"),setTimeout(function(){e(".assort-bg-list").attr("class","assort-bg-list"),e(".assort-bg-list").addClass("bg-"+(o+1))},900),e("body").attr("class","").addClass("page-style-"+(o+1)),setTimeout(function(e){var t=document.querySelectorAll(".assort-desc-wrap .assort-desc-item");for(let s=0;s<t.length;s++)t[s].classList.remove("show");t[e].classList.add("show")}.bind(this,o),0)}function U(){let e=localStorage.getItem("currentSlide");return e||(e=0),e}let H=U();function V(){console.log("No results for this filter criteria")}D.on("init",function(e,t){console.log("slick slider init"),R=t.slideCount,j.text(R),X(t,H)}),D.on("reInit",function(e,t){console.log("slick slider re-init"),R=t.slideCount,j.text(R),X(t,t.currentSlide)}),D.length&&D.slick({centerMode:!1,infinite:!0,slidesToShow:3,slidesToScroll:1,speed:500,focusOnSelect:!1,swipe:!1,useTransform:!0,touchMove:!1,draggable:!1,lazyLoad:"progressive",responsive:[{breakpoint:1025,settings:{slidesToShow:1,fade:!0}}]}),e(".filter-item").on("click",function(t){let s=null;s=t.target.classList.contains("filter-option")?t.target:i(t.target,"filter-option"),jqElem=e(s);let n=i(s,"drops");if(s.classList.contains("selected"))s.classList.remove("selected"),f.add(jqElem.data("filter-option"),jqElem.data("filter-value"),!0,V);else{if(null!=n){let t=n.querySelectorAll(".filter-option");Array.prototype.forEach.call(t,function(t){t.classList.contains("selected")&&f.add(e(t).data("filter-option"),e(t).data("filter-value"),!0),t.classList.remove("selected")})}s.classList.add("selected"),f.add(jqElem.data("filter-option"),jqElem.data("filter-value"),!1,V)}});let F=document.querySelector(".mission-video video");document.querySelector(".mission-video video");document.querySelector("html").classList.contains("touchevents");let G=document.querySelector(".video-block-wrapper"),_=document.querySelector(".mission-video-content"),Q=document.querySelector(".video-calibrate"),Z=(document.querySelector(".mission-video-play"),document.querySelector(".mission-video-close")),$=document.getElementById("header"),J=document.querySelector(".page-mission .cubes");function K(){Z.style.opacity="0"}function ee(e){var t;t=function(){setTimeout(K,1500)},"1"!=Z.style.opacity&&(Z.style.opacity="1"),t&&t()}function te(){console.log("video Close"),F.muted=!0,$.style.opacity="1",G.classList.remove("open"),setTimeout(function(){F.pause()},500),_.removeEventListener("mousemove",ee,!1),_.removeEventListener("touchstart",ee,!1)}function se(t){switch(t){case"main":te(),N.animateOpen(!0,function(){setTimeout(N.animateClose,300)});break;case"advantages":te(),B.animateOpen(!0,function(){console.log("andvantages animation ended")});break;case"assortment":function s(e){5==e?D.slick("slickGoTo",0,!0):D.slick("slickNext")};te(),D.slick("setPosition"),H=U(),D.slick("slickGoTo",H,!0),D.on("click",".slick-slider-inner",function(t){if((!e(this).parent().hasClass("slick-current")||e(this).parent().hasClass("slick-cloned"))&&(console.log(D[0].slick.slideCount),D[0].slick.slideCount>3)){t.preventDefault(),s(D.slick("slickCurrentSlide"))}}),e(".slick-arrow").on("click",function(t){e(t.target);s(D.slick("slickCurrentSlide"))}),D.on("beforeChange",function(e,t,s,n){X(t,n),localStorage.setItem("currentSlide",n)});break;case"mission":F.play(),w||(w=window.setInterval(L,5e3));break;case"faq":te(),E.forEach(function(e){e.addEventListener("click",function(){var t=e.getAttribute("data-filter");document.querySelector(".scroll-block");for(let e=0;e<E.length;e++)E[e].classList.remove("active");n(!0),e.classList.remove("active"),this.classList.add("active");for(let e=0;e<q.length;e++)q[e].classList.remove("show"),"all"==t?q[e].classList.add("show"):q[e].getAttribute("data-feedback")===t&&q[e].classList.add("show")})});break;case"buy":case"consultation":te()}}F&&(F.controls=!1,F.addEventListener("canplay",function(){console.log("Video state: "+F.readyState)},!1),Q.addEventListener("click",function(){var e,t;G.classList.contains("open")||(console.log("video Open"),$.style.opacity="0",t=!1,(e=F).currentTime=0,e.muted=t,e.play(),G.classList.add("open"),_.addEventListener("mousemove",ee,!1),_.addEventListener("touchstart",ee,!1),J.classList.add("hide"))}),Q.addEventListener("mouseleave",function(){}),Z.addEventListener("click",function(){setTimeout(te,200),J.classList.remove("hide")}),window.addEventListener("blur",function(){te()}));let ne=document.querySelector(".menu .moving-underline"),ie=document.querySelector(".menu ul");function oe(e){let t=document.querySelector("li."+e);if(function(e,t,s){let n=e.querySelectorAll(t);Array.prototype.forEach.call(n,function(e){e.classList.remove(s)})}(ie,".menu-item","active"),t){t.classList.add("active");let e=t.getBoundingClientRect().left-ie.getBoundingClientRect().left;ne.style.width=t.offsetWidth+"px",ne.style.transform="translateX("+e+"px)"}else ne.style.width=0}function ae(e,t){this.id=e,this.title=t,this.pageElement=document.getElementById(e),this.setLoaded=function(){this.pageElement.classList.add("loaded")},this.setLoaded=this.setLoaded.bind(this),this.loaded=function(){this.pageElement.classList.remove("loading"),this.clearNext(),this.clearPrev()},this.loaded=this.loaded.bind(this),this.load=function(){this.pageElement&&(this.pageElement.classList.contains("next")||this.pageElement.classList.contains("prev")?(this.pageElement.classList.add("loading"),setTimeout(this.setLoaded,300),setTimeout(this.loaded,700)):this.setLoaded(),oe(this.id),se(this.id))},this.unload=function(){this.pageElement&&(this.pageElement.classList.remove("loaded"),this.pageElement.removeEventListener("transitionend",this.unload,!0))},this.unload=this.unload.bind(this),this.setNext=function(){this.pageElement&&(this.pageElement.classList.contains("prev")&&this.pageElement.classList.remove("prev"),this.pageElement.classList.add("next"),setTimeout(this.unload,700))},this.setPrev=function(){this.pageElement&&(this.pageElement.classList.contains("next")&&this.pageElement.classList.remove("next"),this.pageElement.classList.add("prev"),setTimeout(this.unload,700))},this.clearPrev=function(){this.pageElement.classList.remove("prev")},this.clearNext=function(){this.pageElement.classList.remove("next")},this.currentToPrev=function(){this.setPrev()},this.nextToCurrent=function(){this.load()},this.currentToNext=function(){this.setNext()},this.prevToCurrent=function(){this.load()}}let re=document.querySelector(".main"),le={38:1,33:1},ce={40:1,34:1},de=0,ue=window.location.hash.substr(1);0==ue.length&&(ue=null);let he=null;o&&(he=new function(e,t,s){this.pageIndicator,this.currentPage=null,this.previousPage=null,this.nextPage=null,this.pagesArray=e,this.currentPageIndex=0,this.displayCurrentPageTitle=function(e){null!=this.pageIndicator&&(this.pageIndicator.querySelector(".current-page-title").innerHTML=e)},this.displayPageByIndex=function(e){this.currentPage&&this.currentPage.unload(),this.currentPageIndex=e,this.currentPage=this.pagesArray[e],this.currentPage.load(),this.displayCurrentPageTitle(this.currentPage.title),e>0?(this.previousPage=this.pagesArray[e-1],this.previousPage.setPrev()):this.previousPage=null,e<this.pagesArray.length-1?(this.nextPage=this.pagesArray[e+1],this.nextPage.setNext()):this.nextPage=null},this.displayPage=function(e){for(let t=0;t<this.pagesArray.length;t++)if(this.pagesArray[t].id==e){this.displayPageByIndex(t);break}},this.setCurrentPageByIndex=function(e){this.currentPageIndex=e,console.log("set page index: "+e),this.currentPage=this.pagesArray[e],console.log("set current page "+this.currentPage.id),window.location.href="#"+this.currentPage.id},this.setCurrentPage=function(e){for(let t=0;t<this.pagesArray.length;t++)if(this.pagesArray[t].id==e){this.setCurrentPageByIndex(t);break}},this.clearLoadedState=function(){this.pagesArray.forEach(function(e){e.unload()})},this.init=function(){null!=s&&(this.pageIndicator=document.getElementById(s)),null!=this.pagesArray&&this.pagesArray.length>1&&(this.clearLoadedState(),null!=t?this.displayPage(t):this.displayPageByIndex(0))},this.init(),this.scrollToNextPage=function(){this.currentPageIndex!=this.pagesArray.length-1&&(console.log("increase current page index"),this.currentPageIndex+=1,this.setCurrentPageByIndex(this.currentPageIndex))},this.scrollToPrevPage=function(){0!=this.currentPageIndex&&(console.log("decrease current page index"),this.currentPageIndex-=1,this.setCurrentPageByIndex(this.currentPageIndex))}}([new ae("main","Главная"),new ae("advantages","Преимущества"),new ae("assortment","Ассортимент"),new ae("mission","Миссия"),new ae("faq","Вопрос-Ответ"),new ae("buy","Где купить?"),new ae("consultation","Консультация")],ue,"page-indicator"));let fe=null;function me(e){var t,s,n,i,a,r,l,c,d,u,h,f;if(re.classList.add("stop-scrolling"),document.onkeydown=ge,window.HashChangeEvent||(t=document.URL,window.addEventListener("hashchange",function(e){Object.defineProperty(e,"oldURL",{enumerable:!0,configurable:!0,value:t}),Object.defineProperty(e,"newURL",{enumerable:!0,configurable:!0,value:document.URL}),t=document.URL})),window.onhashchange=Le,e.matches){o&&addWheelListener(window,pe,!1);let e=document.querySelectorAll(".page .scroll-block");Array.prototype.forEach.call(e,function(e){addWheelListener(e,ve,!0),e.classList.add("dragscroll")})}else s=window,n=!0,h=s,f=ye||function(e,t,s,n,i){},h.addEventListener("touchstart",function(e){var t=e.changedTouches[0];i="none",a="none",dist=0,r=t.pageX,l=t.pageY,u=(new Date).getTime(),f(e,"none","start",a,0)},n||!1),h.addEventListener("touchmove",function(e){var t=e.changedTouches[0];c=t.pageX-r,d=t.pageY-l,Math.abs(c)>Math.abs(d)?f(e,i=c<0?"left":"right","move",a,c):f(e,i=d<0?"up":"down","move",a,d)},n||!1),h.addEventListener("touchend",function(e){e.changedTouches[0],(new Date).getTime()-u<=500&&(Math.abs(c)>=150&&Math.abs(d)<=50?a=i:Math.abs(d)>=150&&Math.abs(c)<=50&&(a=i)),f(e,i,"end",a,"left"==i||"right"==i?c:d)},n||!1)}function ge(e){le[e.keyCode]?(e.preventDefault(),he.scrollToPrevPage()):ce[e.keyCode]&&(e.preventDefault(),he.scrollToNextPage())}function pe(e){o&&Date.now()-de>1400&&(e.deltaY>0?he.scrollToNextPage():e.deltaY<0&&he.scrollToPrevPage(),de=Date.now())}function ve(e){e.cancelBubble=!0,pe(e)}function ye(e,t,s,n,i){o&&"end"==s&&("left"==n?he.scrollToNextPage():"right"==n&&he.scrollToPrevPage())}function Le(e){if(e.newURL!=e.oldURL){let t=window.location.hash.substr(1);e.oldURL.split("#")[1];he.displayPage(t)}}window.matchMedia&&((fe=window.matchMedia("(min-width: 1025px)")).addListener(me),me(fe))});let t=window.innerWidth;function s(){let s=window.innerWidth;e(document).width();n(!0),s!==t&&(t=s)}function n(t){let s=e(".scroll-block");s.length&&window.innerWidth>767&&(t?s.perfectScrollbar("update"):s.perfectScrollbar({wheelSpeed:.9,wheelPropagation:!1,minScrollbarLength:20}))}function i(e,t){for(;(e=e.parentElement)&&!e.classList.contains(t););return e}!function(){var e=document.createElement("p"),t=document.getElementsByTagName("HTML")[0],s=document.getElementsByTagName("BODY")[0];for(var n in s.insertBefore(e,null),{webkitTransformStyle:"-webkit-transform-style",MozTransformStyle:"-moz-transform-style",msTransformStyle:"-ms-transform-style",transformStyle:"transform-style"})void 0!==e.style[n]&&(e.style[n]="preserve-3d");var i=window.getComputedStyle(e,null);"preserve-3d"!==(i.getPropertyValue("-webkit-transform-style")||i.getPropertyValue("-moz-transform-style")||i.getPropertyValue("-ms-transform-style")||i.getPropertyValue("transform-style"))&&(t.className+="no-preserve-3d"),document.body.removeChild(e)}(),function(){if("function"==typeof NodeList.prototype.forEach)return!1;NodeList.prototype.forEach=Array.prototype.forEach}();let o,a,r="";function l(e,t,s,n){e[o](r+t,"wheel"==a?s:function(e){!e&&(e=window.event);let t={originalEvent:e,target:e.target||e.srcElement,type:"wheel",deltaMode:"MozMousePixelScroll"==e.type?0:1,deltaX:0,deltaY:0,deltaZ:0,preventDefault:function(){e.preventDefault?e.preventDefault():e.returnValue=!1}};return"mousewheel"==a?(t.deltaY=-.025*e.wheelDelta,e.wheelDeltaX&&(t.deltaX=-.025*e.wheelDeltaX)):t.deltaY=e.deltaY||e.detail,s(t)},{passive:!0},n||!1)}window.addEventListener?o="addEventListener":(o="attachEvent",r="on"),a="onwheel"in document.createElement("div")?"wheel":void 0!==document.onmousewheel?"mousewheel":"DOMMouseScroll",window.addWheelListener=function(e,t,s){l(e,a,t,s),"DOMMouseScroll"==a&&l(e,"MozMousePixelScroll",t,s)}}(jQuery);
//# sourceMappingURL=scripts.js.map