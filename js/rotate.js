(function ( $ ) {
	defOptions = {
		'source': 'images/object/',
		'ext' : '.png',
		'count' : 70,
		'speed': 5,
		"auto" : false
	},

	$.fn.rotate3d = function(options) {
		var base = this;
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
		base.moveHandler = function(e) {
			var offset = e.clientX - clickPosition;

			if (Math.abs(offset) > options.speed) {
				clickPosition = e.clientX;
				currentIndex = currentIndex + (1 * (offset / Math.abs(offset)));

				if(currentIndex >= options.count) currentIndex = 0;
				if(currentIndex < 0) currentIndex = options.count;

				image.attr('src', images[currentIndex].src);
			}
		}

		base.upHandler = function(e){
			$(document).off('mousemove', base.moveHandler);
		}

		base.imageAttr = function (i){
			image.attr('src', images[i].src);
		}

		var animateReverseEnd = false, 
		animateBackEnd = false, 
		autoplayEnd = false, 
		timer;

		// Autoplay	
		base.autoPlay = function(){
			let i = 0;

			if (options.auto){

				function change(){
					base.imageAttr(i);
					i++;

					console.log("Auto: go_____");

					if (i >= images.length){
						clearInterval(timer);		
					    animateEnd = true;
					    animateBackEnd = true;
					    animateReverseEnd = true;

					    console.log("Auto: " + animateEnd);
					} else {window.requestAnimationFrame(change);}
				}

				//var timer = setInterval(change, 20);
				window.requestAnimationFrame(change);
			}
		}

		// Reverse
		base.changeImgReverse = function(){
			let i = options.count;

			function change(){
				base.imageAttr(i);
			    i--;

			    console.log("Reverse: go_____");
			    animateReverseEnd = false;

				if (i < (options.count - options.count*0.4)){
					clearInterval(timer);		
					animateReverseEnd = true;
				 	if (!animateBackEnd) changeImgBack();console.log("- AUTOBACK -");
				 	console.log("Reverse: " + animateReverseEnd);
				} else {window.requestAnimationFrame(change);}
			}		

			//var timer = setInterval(change, 50);
			window.requestAnimationFrame(change);
		}

		// Back
		base.changeImgBack = function(){
			let i = options.count - options.count*0.4;

			function change(){
				base.imageAttr(i);
				i++;

				console.log("Back: go_____");
				animateBackEnd = false;

				if (i >= images.length){
					clearInterval(timer);	

					animateBackEnd = true;
					animateReverseEnd = true;

					//console.log("Back: " + animateEnd);
				} else {window.requestAnimationFrame(change);}
			}

			//var timer = setInterval(change, 50);
			window.requestAnimationFrame(change);
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
		base.animateOpenEnd  = true;
		base.animateCloseEnd = true;
		base.isOpened = false;
		base.isHovered = false;

        ////////// MAIN OBJECT //////////

        // Open
        base.animateOpen = function(reset, callback){
			if (reset) {
				base.isOpened = false;
			}
			if (!base.animateOpenEnd || !base.animateCloseEnd || base.isOpened) {
				//console.log(base.selector + " postpone Open animation");
				
				//setTimeout( base.animateOpen, 2000);
				return;
			}
			base.animateOpenEnd = false;
			let i = 0;
			let startTime = null;

            function change(){
				if (!startTime) startTime = (new Date()).getTime();				
				var currentTicks = (new Date).getTime();

				if (currentTicks - startTime >= 30) {
					startTime = currentTicks;
					
					base.imageAttr(i);
					i++;
				}

				if (i >= images.length){
					clearInterval(timer);       
					base.animateOpenEnd = true;
					base.isOpened = true;
					//if (!animateCloseEnd) animateClose();
					//setTimeout(animateClose, 700);
					if (callback) {
						callback();
						
					} 
				} else {window.requestAnimationFrame(change);}

                //console.log(base.selector + " Open ended: " + base.animateOpenEnd);
            }       

			//var timer = setInterval(change, 40); 
			window.requestAnimationFrame(change);
			
			
        }

        // Close
        base.animateClose = function(){
			if (!base.animateOpenEnd || !base.animateCloseEnd || !base.isOpened || base.isHovered){
				//console.log(base.selector + " postpone Close animation");

				//setTimeout( base.animateClose, 2000);
				return;
			} 
			base.animateCloseEnd = false;
			let i = options.count;
			let startTime = null;

            function change(){
				if (!startTime) startTime = (new Date()).getTime();				
				var currentTicks = (new Date).getTime();

				if (currentTicks - startTime >= 30) {
					startTime = currentTicks;

					base.imageAttr(i);
					i--;
				}

                if (i <= 0){
                    clearInterval(timer);       
					base.animateCloseEnd = true;
					base.isOpened = false;
				} else {window.requestAnimationFrame(change);}
				
                //console.log(base.selector + " Close ended: " + base.animateCloseEnd);
            }       

			//var timer = setInterval(change, 40);
			window.requestAnimationFrame(change);
        }

        // if ($(".page").is(".page-main")){
        // 	setTimeout(function(){
	    //     	animateOpen();	
	    //     }, 1500);
        // }
        

		////////// END MAIN OBJECT //////////

		if (base.hasClass("object-hover")) {
			
			
			var hoverArea = base.children(".hover-area");
			if(hoverArea.length <= 0) {
				hoverArea = base;
			}

			hoverArea.on("mouseover", function(){
				base.isHovered = true;
				base.animateOpen(false);

				//base.animateOpenEnd = false;
			}); 
	
			hoverArea.on("mouseleave", function(){
				base.isHovered = false;
				if (!base.isOpened && !base.animateOpenEnd) {
					setTimeout(base.animateClose, 2000);
				} else if (base.isOpened && base.animateOpenEnd) {
					base.animateClose();
				}
				
				//base.animateCloseEnd = false;
			}); 
		}
		
		

		base
			.append($('<img>').attr({'src': options.source + currentIndex + options.ext}))
			.find('img')
			.on('mousedown', function(e){
				clickPosition = e.clientX;
				$(document).on('mousemove', base.moveHandler);
			});

		image = $(this).find('img');
		//base.autoPlay();

		$(document).on('mouseup', base.upHandler);

	}
}(jQuery));
