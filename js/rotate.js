(function ( $ ) {
	defOptions = {
		'source': 'images/object/',
		'ext' : '.png',
		'count' : 70,
		'speed': 5,
		"auto" : false
	},

	$.fn.rotate3d = function(options) {

		// Set options
		if (!options.source) options.source = defOptions.source;
		if (!options.ext) options.ext = defOptions.ext;
		if (!options.count) options.count = defOptions.count;
		if (!options.speed) options.speed = defOptions.speed;
		if (!options.auto) options.auto = defOptions.auto;

		var clickPosition = null,
			currentIndex = 0,
			images = [],
			image = null,
			animateEnd = false;


		// Load images
		for (var i = 0; i <= options.count; ++i){
			var img = new Image();
			img.src = options.source + i + options.ext;
			images.push(img);
		}

		// Move
		var moveHandler = function(e) {
			var offset = e.clientX - clickPosition;

			if (Math.abs(offset) > options.speed) {
				clickPosition = e.clientX;
				currentIndex = currentIndex + (1 * (offset / Math.abs(offset)));

				if(currentIndex >= options.count) currentIndex = 0;
				if(currentIndex < 0) currentIndex = options.count;

				image.attr('src', images[currentIndex].src);
			}
		}

		var upHandler = function(e){
			$(document).off('mousemove', moveHandler);
		}

		function imageAttr(i){
			image.attr('src', images[i].src);
		}

		var animateReverseEnd = false, animateBackEnd = false, autoplayEnd = false, timer;

		// Autoplay	
		var autoPlay = function(){
			let i = 0;

			if (options.auto){

				function change(){
					imageAttr(i);
					i++;

					console.log("Auto: go_____");

					if (i >= images.length){
						clearInterval(timer);		
					    animateEnd = true;
					    animateBackEnd = true;
					    animateReverseEnd = true;

					    console.log("Auto: " + animateEnd);
					}
				}

				var timer = setInterval(change, 20); 
			}
		}

		// Reverse
		var changeImgReverse = function(){
			let i = options.count;

			function change(){
				imageAttr(i);
			    i--;

			    console.log("Reverse: go_____");
			    animateReverseEnd = false;

				if (i < (options.count - options.count*0.4)){
					clearInterval(timer);		
					animateReverseEnd = true;
				 	if (!animateBackEnd) changeImgBack();console.log("- AUTOBACK -");
				 	console.log("Reverse: " + animateReverseEnd);
				}
			}		

			var timer = setInterval(change, 50); 
		}

		// Back
		var changeImgBack = function(){
			let i = options.count - options.count*0.4;

			function change(){
				imageAttr(i);
				i++;

				console.log("Back: go_____");
				animateBackEnd = false;

				if (i >= images.length){
					clearInterval(timer);	

					animateBackEnd = true;
					animateReverseEnd = true;

					console.log("Back: " + animateEnd);
				}
			}

			var timer = setInterval(change, 50); 
		}
		

		// Init
		$(this).on('drag', function () {
			return false;
		});

		$(this).on('dragdrop', function () {
			return false;
		});

		$(this).on('dragstart', function () {
			return false;
		});

		var naviv = false;

		// AUTO
		/*
		$(".object-auto").on("mouseover", function(){
			if (!animateBackEnd) console.log("NAVIV");
			if (animateEnd && animateReverseEnd && animateBackEnd) changeImgReverse();
			animateReverseEnd = false;
		});

		$(".object-auto").on("mouseleave", function(){
			if (animateEnd && animateReverseEnd && animateBackEnd) changeImgBack();
			console.log("- LEAVE -");
			animateBackEnd = false;
		});
		*/


		// HOVER
		var animateOpenEnd  = true;
		var animateCloseEnd = true;

        $(".object-hover").on("mouseover", function(){
            if (animateOpenEnd && animateCloseEnd) animateOpen();
            animateOpenEnd = false;
        }); 

        $(".object-hover").on("mouseleave", function(){
            if (animateOpenEnd && animateCloseEnd) animateClose();
            animateCloseEnd = false;
        }); 


        
        ////////// MAIN OBJECT //////////

        // Open
        var animateOpen = function(){
            let i = 0;

            function change(){
                imageAttr(i);
                i++;

                if (i >= images.length){
                    clearInterval(timer);       
                    animateOpenEnd = true;
                    //if (!animateCloseEnd) animateClose();
                    setTimeout(animateClose, 700);
                }

                console.log("Open: " + animateOpenEnd);
            }       

            var timer = setInterval(change, 40); 
        }

        // Close
        var animateClose = function(){
            let i = options.count;

            function change(){
                imageAttr(i);
                i--;

                if (i <= 0){
                    clearInterval(timer);       
                    animateCloseEnd = true;
                }

                console.log("Close: " + animateCloseEnd);
            }       

            var timer = setInterval(change, 40); 
        }

        // if ($(".page").is(".page-main")){
        // 	setTimeout(function(){
	    //     	animateOpen();	
	    //     }, 1500);
        // }
        

        ////////// END MAIN OBJECT //////////
		

		$(this)
			.append($('<img>').attr({'src': options.source + currentIndex + options.ext}))
			.find('img')
			.on('mousedown', function(e){
				clickPosition = e.clientX;
				$(document).on('mousemove', moveHandler);
			});

		image = $(this).find('img');
		autoPlay();

		$(document).on('mouseup', upHandler);
	}
}(jQuery));