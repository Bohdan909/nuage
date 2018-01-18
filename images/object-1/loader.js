let preloadSection2 = new createjs.LoadQueue();
let preloadSection3 = new createjs.LoadQueue();
let preloadSection4 = new createjs.LoadQueue();
let preloadSection5 = new createjs.LoadQueue();
let preloadChars = new createjs.LoadQueue();
let preloadCSSImages = new createjs.LoadQueue();
let preloadSectionFinal = new createjs.LoadQueue();


window.addEventListener("load", function() {
  "use strict";

  loadSection2();
  loadSection3();
  loadSection4();
  loadSection5();
  loadCharacters();
  loadCSSImages();
  loadSectionFinal();
});

function loadSection2() {
  console.log(' === loading section 2 resources ===');
  preloadSection2.on("complete", handleSection2LoadComplete, this);
  preloadSection2.loadManifest([
      {id: "person2", src: "images/person-2.png"},
      {id: "section2", src: "images/section-2.png"}
  ]);
}

function loadSection3() {
  console.log(' === loading section 3 resources ===');
  preloadSection3.on("complete", handleSection3LoadComplete, this);
  preloadSection3.loadManifest([
    {id: "cubeblue", src: "images/cube-blue.png"},
    {id: "person3", src: "images/person-3.png"},
    {id: "person3-start", src: "images/person-3-start.png"},
    {id: "section3f", src: "images/section-3-f.png"}
  ]);
}


function loadSection4() {
  console.log(' === loading section 4 resources ===');
  preloadSection4.on("complete", handleSection4LoadComplete, this);

  const mq = window.matchMedia('(min-width: 1024px)');
  let tabImgSrc1 = "images/Mango.gif";
  let tabImgSrc2 = "images/Fruit.gif";
  let tabImgSrc3 = "images/Monster.gif";
  let tabImgSrc4 = "images/Idol.gif";
  let tabImgSrc5 = "images/Frog.gif";
  let tabImgSrc6 = "images/Barrel.gif";
  let tabImgSrc7 = "images/Bamboo.gif";
  
  if (mq.matches) {
    tabImgSrc1 = "video/2.mp4";
    tabImgSrc2 = "video/2.mp4";
    tabImgSrc3 = "video/2.mp4";
    tabImgSrc4 = "video/2.mp4";
    tabImgSrc5 = "video/2.mp4";
    tabImgSrc6 = "video/2.mp4";
    tabImgSrc7 = "video/2.mp4";
  } 

  preloadSection4.loadManifest([
    {id: "mango",   src: tabImgSrc1},
    {id: "fruit",   src: tabImgSrc2},
    {id: "monster", src: tabImgSrc3},
    {id: "idol",    src: tabImgSrc4},
    {id: "frog",    src: tabImgSrc5},
    {id: "barrel",  src: tabImgSrc6},
    {id: "bamboo",  src: tabImgSrc7}
  ]);
}

function loadSection5() {
  console.log(' === loading section 5 resources ===');
  preloadSection5.on("complete", handleSection5LoadComplete, this);

  const mq = window.matchMedia('(min-width: 1024px)');
  let tabImgSrc1 = "images/Fireball.gif";
  let tabImgSrc2 = "images/Tornado.gif";
  let tabImgSrc3 = "images/Crossfire.gif";
  let tabImgSrc4 = "images/BoardCleaner.gif";
  let tabImgSrc5 = "images/WaterRing.gif";
  let tabImgSrc6 = "images/SuperRing.gif";
  let tabImgSrc7 = "images/Combined.gif";
  
  if (mq.matches) {
    tabImgSrc1 = "video/2.mp4";
    tabImgSrc2 = "video/2.mp4";
    tabImgSrc3 = "video/2.mp4";
    tabImgSrc4 = "video/2.mp4";
    tabImgSrc5 = "video/2.mp4";
    tabImgSrc6 = "video/2.mp4";
    tabImgSrc7 = "video/2.mp4";
  } 

  preloadSection5.loadManifest([
    {id: "fireball", src: tabImgSrc1},
    {id: "tornado", src: tabImgSrc2},
    {id: "crossfire", src: tabImgSrc3},
    {id: "boardcleaner", src: tabImgSrc4},
    {id: "waterring", src: tabImgSrc5},
    {id: "goldenidol", src: tabImgSrc6},
    {id: "combined", src: tabImgSrc7}
  ]);
}

function loadCharacters() {
  console.log(' === loading characters ===');
  preloadChars.on("complete", handleCharsLoadComplete, this);
  preloadChars.loadManifest([
    {id: "char1", src: "images/char-1.png"},
    {id: "icofb", src: "images/ico-fb.png"},
    {id: "char2", src: "images/char-2.png"},
    {id: "char3", src: "images/char-3.png"},
    {id: "char4", src: "images/char-4.png"},
    {id: "char5", src: "images/char-5.png"}
  ]);
}

function loadCSSImages() {
  console.log(' === loading CSS images ===');
  preloadCSSImages.on("complete", handleCSSImagesLoadComplete, this);
  preloadCSSImages.loadManifest([
    {id: "map", src: "images/map.jpg"},
    {id: "mapmobile", src: "images/map-mobile.jpg"},
    {id: "sprites", src: "images/sprites.png"}
  ]);
}

function loadSectionFinal() {
  console.log(' === loading final section images ===');
  preloadSectionFinal.on("complete", handleFinalImagesLoadComplete, this);
  preloadSectionFinal.loadManifest([
    {id: "monet04", src: "images/monet-04.png"},
    {id: "monet03", src: "images/monet-03.png"},
    {id: "monet02", src: "images/monet-02.png"},
    {id: "monet01", src: "images/monet-01.png"},
    //{id: "app1", src: "images/app-1.svg"},
    //{id: "app2", src: "images/app-2.svg"},
    {id: "tel1", src: "images/tel-1.png"},
    {id: "tel2", src: "images/tel-2.png"}
  ]);
}

function handleCSSImagesLoadComplete() {
  console.log(' === loading CSS images complete ===');
  const mq = window.matchMedia('(max-width: 1024px)');
  let mapImgSrc = null;
  if (mq.matches) {
    mapImgSrc = preloadCSSImages.getItem("mapmobile").src;
  } else {
    mapImgSrc = preloadCSSImages.getItem("map").src;
  }
  // let mapImgSrc = preloadCSSImages.getItem("map").src;
  document.querySelector(".map").style.backgroundImage = 'url(' + mapImgSrc + ')';

  let spriteImgSrc = preloadCSSImages.getItem("sprites").src;
}

function handleSection2LoadComplete() {
  let personImage = preloadSection2.getResult("person2");
  personImage.classList.add("person");

  // cache section element 
  let section2Element = document.querySelector(".section-2");

  // add img programmaticaly
  section2Element.querySelector(".socket").appendChild(personImage);
  //setCSSBackgroundImageForElement(section2Element, preloadSection2, "section2");
}

function handleSection3LoadComplete() {
  // section 3
  let section3Element = document.querySelector(".section-3");
  
  let person3_start = preloadSection3.getResult("person3-start");
  person3_start.classList.add("person", "person-sad");

  let person3 = preloadSection3.getResult("person3");
  person3.classList.add("person", "person-joyful");

  let section3f = preloadSection3.getResult("section3f");
  section3f.classList.add("figure");

  section3Element.querySelector(".socket").appendChild(person3);
  section3Element.querySelector(".socket").appendChild(person3_start);
  section3Element.appendChild(section3f);
}

function handleSection4LoadComplete() {
  // section 4
  let section4Element = document.querySelector(".section-4");
  let section4ScreenElem = section4Element.querySelector(".screen .screen-inner");

  var tab1 = section4ScreenElem.querySelector("#tab-1").appendChild(preloadSection4.getResult("mango"));
  setAttributes(tab1, {"autoplay": "", "loop": ""}); 

  var tab2 = section4ScreenElem.querySelector("#tab-2").appendChild(preloadSection4.getResult("fruit"));
  setAttributes(tab2, {"autoplay": "", "loop": ""}); 

  var tab3 = section4ScreenElem.querySelector("#tab-3").appendChild(preloadSection4.getResult("monster"));
  setAttributes(tab3, {"autoplay": "", "loop": ""}); 

  var tab4 = section4ScreenElem.querySelector("#tab-4").appendChild(preloadSection4.getResult("idol"));
  setAttributes(tab4, {"autoplay": "", "loop": ""}); 

  var tab5 = section4ScreenElem.querySelector("#tab-5").appendChild(preloadSection4.getResult("frog"));
  setAttributes(tab5, {"autoplay": "", "loop": ""}); 

  var tab6 = section4ScreenElem.querySelector("#tab-6").appendChild(preloadSection4.getResult("barrel"));
  setAttributes(tab6, {"autoplay": "", "loop": ""}); 

  var tab7 = section4ScreenElem.querySelector("#tab-7").appendChild(preloadSection4.getResult("bamboo"));
  setAttributes(tab7, {"autoplay": "", "loop": ""}); 
}

function handleSection5LoadComplete() {
  // section 5
  let section5Element = document.querySelector(".section-5");
  let section5ScreenElem = section5Element.querySelector(".screen .screen-inner");

  var tab21 = section5ScreenElem.querySelector("#tab-21").appendChild(preloadSection5.getResult("fireball"));
  setAttributes(tab21, {"autoplay": "", "loop": ""});

  var tab22 = section5ScreenElem.querySelector("#tab-22").appendChild(preloadSection5.getResult("tornado"));
  setAttributes(tab22, {"autoplay": "", "loop": ""});

  var tab23 = section5ScreenElem.querySelector("#tab-23").appendChild(preloadSection5.getResult("crossfire"));
  setAttributes(tab23, {"autoplay": "", "loop": ""}); 

  var tab24 = section5ScreenElem.querySelector("#tab-24").appendChild(preloadSection5.getResult("boardcleaner"));
  setAttributes(tab24, {"autoplay": "", "loop": ""}); 

  var tab25 = section5ScreenElem.querySelector("#tab-25").appendChild(preloadSection5.getResult("waterring"));
  setAttributes(tab25, {"autoplay": "", "loop": ""}); 

  var tab26 = section5ScreenElem.querySelector("#tab-26").appendChild(preloadSection5.getResult("goldenidol"));
  setAttributes(tab26, {"autoplay": "", "loop": ""}); 

  var tab27 = section5ScreenElem.querySelector("#tab-27").appendChild(preloadSection5.getResult("combined"));
  setAttributes(tab27, {"autoplay": "", "loop": ""}); 
}

function setAttributes(el, options) {
    Object.keys(options).forEach(function(attr) {
      el.setAttribute(attr, options[attr]);
    });
}

function handleCharsLoadComplete() {
  let char1 = preloadChars.getResult("char1");
  char1.classList.add("character-image");
  let char2 = preloadChars.getResult("char2");
  char2.classList.add("character-image");
  let char3 = preloadChars.getResult("char3");
  char3.classList.add("character-image");
  let char4 = preloadChars.getResult("char4");
  char4.classList.add("character-image");
  let char5 = preloadChars.getResult("char5");
  char5.classList.add("character-image");

  let char1Element = document.querySelector(".section.character-4");
  let childElement = char1Element.querySelector(".character-name");
  char1Element.querySelector(".character-socket").insertBefore(char1, childElement);

  let char2Element = document.querySelector(".section.character-2");
  childElement = char2Element.querySelector(".character-name");
  char2Element.querySelector(".character-socket").insertBefore(char2, childElement);

  let char3Element = document.querySelector(".section.character-3");
  childElement = char3Element.querySelector(".character-name");
  char3Element.querySelector(".character-socket").insertBefore(char3, childElement);

  let char4Element = document.querySelector(".section.character-1");
  childElement = char4Element.querySelector(".character-name");
  char4Element.querySelector(".character-socket").insertBefore(char4, childElement);

  let char5Element = document.querySelector(".section.character-5");
  childElement = char5Element.querySelector(".character-name");
  char5Element.querySelector(".character-socket").insertBefore(char5, childElement);
}

function handleFinalImagesLoadComplete() {
  let sectionFinalElem = document.querySelector(".section.section-final");
  let monetSocketElem = sectionFinalElem.querySelector(".map .map-socket");
  monetSocketElem.querySelector(".monet-4").appendChild(preloadSectionFinal.getResult("monet04"));
  monetSocketElem.querySelector(".monet-3").appendChild(preloadSectionFinal.getResult("monet03"));
  monetSocketElem.querySelector(".monet-2").appendChild(preloadSectionFinal.getResult("monet02"));
  monetSocketElem.querySelector(".monet-1").appendChild(preloadSectionFinal.getResult("monet01"));

  let footerTelBlock = sectionFinalElem.querySelector(".footer .tel-block");
  let telLink1 = sectionFinalElem.querySelector(".footer .tel-link-1");
  let telLink2 = sectionFinalElem.querySelector(".footer .tel-link-2");

  //footerTelBlock.querySelector(".download-1 .btn-circle").appendChild(preloadSectionFinal.getResult("app1"));
  //footerTelBlock.querySelector(".download-2 .btn-circle").appendChild(preloadSectionFinal.getResult("app2"));
  var tel1Img = preloadSectionFinal.getResult("tel1");
  tel1Img.classList.add("tel");
  tel1Img.classList.add("tel-1");
  var tel2Img = preloadSectionFinal.getResult("tel2");
  tel2Img.classList.add("tel");
  tel2Img.classList.add("tel-2");
  telLink1.appendChild(tel1Img);
  telLink2.appendChild(tel2Img);

}

function setCSSBackgroundImageForElement(element, loadQueue, resourceId) {
  "use strict";
  let bgImage = loadQueue.getResult(resourceId, true);

  let reader = new window.FileReader();
  reader.readAsDataURL(bgImage); 
  reader.onloadend = function() {
      let base64data = reader.result;
      element.style.backgroundImage = 'url(' + base64data + ')';
      element.style.backgroundPosition = '50% 100%';
  };
}