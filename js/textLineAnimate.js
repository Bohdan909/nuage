window.addEventListener("load", function(){

    let mobile = window.matchMedia("(max-width: 767px)").matches;
    
    function setLines(){    
        console.log("=== SET LINES ===");

        let textBlock = document.querySelectorAll(".animate-text");
        let blockWidth, fontSize, lineLength;   

        console.log(textBlock);
        
        textBlock.forEach(function(block){
            
            const coef = 0.60;
            let text = block.innerText || block.textContent || "";
            let resultArr = [];
            let resultHTML;
            
            if (block.parentNode.classList.contains("feedback-item") && mobile){  
                blockWidth = window.innerWidth - 35;
                fontSize   = 13;
                lineLength = blockWidth / (fontSize * coef);
            } else {
                let blockWrap = findParent(block, "animate-text-wrap");
                blockWidth = (block.classList.contains("animate-text-p")) ? blockWrap.offsetWidth - 80 : blockWrap.offsetWidth;
                fontSize   = parseInt(window.getComputedStyle(block, null).getPropertyValue('font-size'));
                lineLength = blockWidth / (fontSize * coef);
            }

            insertToHTML();
            
            function linesWrap(text, maxLength){
                
                let line = [];
                let length = 0;

                text.split(" ").forEach(function(word){

                    if ((length + word.length) >= maxLength){
                        resultArr.push("<div>" + line.join(" ") + "</div>");
                        line = []; 
                        length = 0;
                    }

                    length += word.length + 1;
                    line.push(word);
                });

                if (line.length > 0) resultArr.push("<div>" + line.join(" ") + "</div>");

                return resultArr;
            };

            function insertToHTML(){
                linesWrap(text, lineLength);
                resultHTML = resultArr.join("");
                block.innerHTML = resultHTML;
            }
        });

        console.log("=== END SET LINES ===");
    }   

    setLines(); 

    window.addEventListener("orientationchange", function(){
        window.location.reload();
        // html.classList.add("orientation-change");
    }, true);
});

// Find Parent
function findParent(el, cls){
    while ((el = el.parentElement) && !el.classList.contains(cls));
    return el;
 }