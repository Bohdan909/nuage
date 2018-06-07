
document.documentElement.className = document.documentElement.className.replace(/\bno-js\b/g, '');

window.addEventListener("load", function(){

    document.querySelector(".page").classList.add("loaded");
});