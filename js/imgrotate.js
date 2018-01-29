/**********************************************************************
                         3D image rotating script
                    By Mark Wilton-Jones 04-05/1/2007
                               Version 1.0
***********************************************************************

Please see http://www.howtocreate.co.uk/jslibs/ for details and a demo of this script
Please see http://www.howtocreate.co.uk/tutorials/jsexamples/imagerotate.html for configuration instructions
Please see http://www.howtocreate.co.uk/jslibs/termsOfUse.html for terms of use

________________________________________________________________________________*/

function rotatingImageError(rotError,useThrow) {
    rotError = { name: 'RotatingImage error', message: rotError, description: rotError };
    if( useThrow ) { eval('throw(rotError)'); } else { alert( rotError.name + ': ' + rotError.message ); }
}

function getRotPositionFromEvent(mousEvent) {
    if( typeof( mousEvent.pageX ) != 'undefined' ) {
        return [mousEvent.pageX,mousEvent.pageY];
    } else {
        var startX = mousEvent.clientX, startY = mousEvent.clientY;
        if( document.documentElement && ( document.documentElement.scrollLeft || document.documentElement.scrollTop ) ) {
            return [startX+document.documentElement.scrollLeft,startY+document.documentElement.scrollTop];
        } else {
            return [startX+document.body.scrollLeft,startY+document.body.scrollTop];
        }
    }
}

function RotatingImage( imgPrefix, imgExt, imgName, numRot, numTilt, curRot, curTilt, progressScript, oReadyScript, useThrow ) {

    //check for errors
    var rotError = '';
    if( !this.startAutoRot ) { rotError += '\n* Use the \'new\' keyword when calling the RotatingImage function.'; }
    if( typeof(imgPrefix) != 'string' ) { rotError += '\n* Image prefix must be a string.'; }
    if( typeof(imgExt) != 'string' ) { rotError += '\n* Image extension must be a string.'; }
    if( typeof(imgName) != 'string' ) { rotError += '\n* Image name must be a string.'; }
    if( RotatingImage.prototype.doneImages[imgName] ) { rotError += '\n* Image name'+imgName+' has already been set up ready to rotate. This cannot be done twice for a single image.'; }
    if( isNaN(numRot) || numRot < 1 || parseInt(numRot) != numRot ) { rotError += '\n* Number of images in the rotation must be a whole number >= 1.'; }
    if( isNaN(numTilt) || numTilt < 1 || parseInt(numTilt) != numTilt ) { rotError += '\n* Number of tilt angles must be a whole number >= 1.'; }
    if( isNaN(curRot) || curRot < 1 || curRot > numRot || parseInt(curRot) != curRot ) { rotError += '\n* Current rotation must be a whole number between 1 and the number of images in the rotation.'; }
    if( isNaN(curTilt) || curTilt < 1 || curTilt > numTilt || parseInt(curTilt) != curTilt ) { rotError += '\n* Current tilt must be a whole number between 1 and the number of tilt angles.'; }
    if( rotError ) { rotatingImageError(rotError,useThrow); return; }
    RotatingImage.prototype.doneImages[imgName] = true;

    //store values
    this.imgPrefix = imgPrefix;
    this.imgExt = imgExt;
    this.imgName = imgName;
    this.numRot = numRot;
    this.numTilt = numTilt;
    this.curRot = curRot;
    this.curTilt = curTilt;
    this.useThrow = useThrow;

    //prepare automation
    this.rotInterval = 0;
    this.tiltInterval = 0;
    this.pausedX = false;
    this.pausedY = false;

    //begin preloading required images - this could take a while :)
    this.preloadComplete = false;
    this.imagesLoaded = 0;
    this.imageCache = [];
    var rotref = this;
    for( var i = 1; i <= numRot; i++ ) {
        this.imageCache[i] = [];
        for( var j = 1; j <= numTilt; j++ ) {
            //index 0 is unused in both array levels
            //this is harmless but makes it easier to use later without having to add and subtract 1 (so it is more efficient)
            this.imageCache[i][j] = new Image();
            this.imageCache[i][j].onload = (function (theImage) { return function () {
                if( theImage.alreadyload ) { return; }
                theImage.alreadyload = true;
                rotref.imagesLoaded++;
                if( progressScript ) { progressScript( rotref.imagesLoaded / ( rotref.numRot * rotref.numTilt ) ); }
                if( rotref.imagesLoaded == rotref.numRot * rotref.numTilt ) {
                    if( oReadyScript ) { oReadyScript(); }
                    rotref.preloadComplete = true;
                }
            }; })(this.imageCache[i][j]); //workaround for Safari stupidity ('this' points to window)
            this.imageCache[i][j].onerror = function () { this.onload(); };
            this.imageCache[i][j].src = this.imgPrefix + '_' + i + '_' + j + this.imgExt;
            if( this.imageCache[i][j].complete ) { this.imageCache[i][j].onload(); }
        }
    }
}
RotatingImage.prototype.doneImages = {};

//general redraw
RotatingImage.prototype.redraw = function () {
    if( !this.image ) { this.image = document.images[this.imgName]; if( !this.image ) { return; } }
    this.image.src = this.imageCache[this.curRot][this.curTilt].src;
};

//automation
RotatingImage.prototype.startAutoTilt = function (oTime,oStartDir) {
    var oOb = this;
    if( this.numTilt < 2 ) {
        rotatingImageError('AutoTilt can only be used if more than one tilt angles are being used.',this.useThrow); return;
    }
    if( isNaN(oTime) || oTime < 10 || parseInt(oTime) != oTime ) {
        rotatingImageError('AutoTilt needs to be passed an integer greater than 10 to use as the stepping interval.',this.useThrow); return;
    }
    this.stopAutoTilt();
    this.tiltDirection = oStartDir;
    this.tiltInterval = setInterval(function () {
        if( oOb.preloadComplete && !oOb.pausedY && ( oOb.image || document.images[oOb.imgName] ) ) {
            if( oOb.tiltDirection && oOb.curTilt == oOb.numTilt ) { oOb.tiltDirection = false; }
            if( !oOb.tiltDirection && oOb.curTilt == 1 ) { oOb.tiltDirection = true; }
            if( oOb.tiltDirection ) { oOb.tiltUp(true); } else { oOb.tiltDown(true); }
        }
    },oTime);
};
RotatingImage.prototype.stopAutoTilt = function () {
    if( this.tiltInterval ) {
        clearInterval(this.tiltInterval);
        this.tiltInterval = 0;
    }
};
RotatingImage.prototype.startAutoRot = function (oTime,oDir) {
    var oOb = this;
    if( isNaN(oTime) || oTime < 10 || parseInt(oTime) != oTime ) {
        rotatingImageError('AutoRotate needs to be passed an integer greater than 10 to use as the stepping interval.',this.useThrow); return;
    }
    this.stopAutoRot();
    this.rotDirection = oDir;
    this.rotInterval = setInterval(function () {
        if( oOb.preloadComplete && !oOb.pausedX && ( oOb.image || document.images[oOb.imgName] ) ) {
            if( oOb.rotDirection ) { oOb.rotateUp(true); } else { oOb.rotateDown(true); }
        }
    },oTime);
};
RotatingImage.prototype.stopAutoRot = function () {
    if( this.rotInterval ) {
        clearInterval(this.rotInterval);
        this.rotInterval = 0;
    }
};

//individual tilt/rotation
RotatingImage.prototype.tiltTo = function (oTilt,oAllow) {
    if( !oAllow ) { this.stopAutoTilt(); }
    if( isNaN(oTilt) || oTilt < 1 || oTilt > this.numTilt || parseInt(oTilt) != oTilt ) {
        rotatingImageError('tiltTo number must be a whole number between 1 and the number of tilt angles.',this.useThrow); return;
    }
    this.curTilt = oTilt;
    this.redraw();
};
RotatingImage.prototype.tiltUp = function (oAllow) {
    if( !oAllow ) { this.stopAutoTilt(); }
    if( this.curTilt < this.numTilt ) {
        this.curTilt++;
        this.redraw();
    }
};
RotatingImage.prototype.tiltDown = function (oAllow) {
    if( !oAllow ) { this.stopAutoTilt(); }
    if( this.curTilt > 1 ) {
        this.curTilt--;
        this.redraw();
    }
};
RotatingImage.prototype.rotateTo = function (oRot,oAllow) {
    if( !oAllow ) { this.stopAutoRot(); }
    if( isNaN(oRot) || oRot < 1 || oRot > this.numRot || parseInt(oRot) != oRot ) {
        rotatingImageError('rotateTo number must be a whole number between 1 and the number of images in the rotation.',this.useThrow); return;
    }
    this.curRot = oRot;
    this.redraw();
};
RotatingImage.prototype.rotateUp = function (oAllow) {
    if( !oAllow ) { this.stopAutoRot(); }
    this.curRot++;
    if( this.curRot > this.numRot ) { this.curRot = 1; }
    this.redraw();
};
RotatingImage.prototype.rotateDown = function (oAllow) {
    if( !oAllow ) { this.stopAutoRot(); }
    this.curRot--;
    if( !this.curRot ) { this.curRot = this.numRot; }
    this.redraw();
};

//panning
RotatingImage.prototype.setPanning = function (oX,oY,oStopX,oStopY) {
    var oOb = this;
    if( !this.image ) { this.image = document.images[this.imgName]; if( !this.image ) {
        rotatingImageError('Panning cannot be allowed until after the image has been created.',this.useThrow); return;
    } }
    if( !oX && !oY ) {
        this.image.onmousedown = null;
        if( this.image.style ) { this.image.style.cursor = ''; }
        return;
    }
    if( this.image.style ) { this.image.style.cursor = 'move'; }
    this.image.ondragstart = function () { return false; }
    this.image.onselectstart = function () { return false; }
    this.image.onmousedown = function (e) {
        if( !e ) { e = window.event; } if( !e ) { return true; }
        if( e.button > 1 || e.which > 1 ) { return true; }
        var startRotImg = oOb.curtRot, startTiltImg = oOb.curtTilt, startPos = getRotPositionFromEvent(e), oldmouseup = document.onmouseup, curSegs = [0,0];
        this.onmousemove = function (e) {
            if( !e ) { e = window.event; }
            var newSegs = [ this.width / ( oOb.numRot / 2 ), this.height / oOb.numTilt ];
            var mousePos = getRotPositionFromEvent(e);
            newSegs[2] = newSegs[0] = Math.round( ( mousePos[0] - startPos[0] ) / newSegs[0] );
            newSegs[3] = newSegs[1] = Math.round( ( mousePos[1] - startPos[1] ) / newSegs[1] );
            if( oX ) {
                if( oStopX ) { oOb.stopAutoRot(); }
                oOb.pausedX = true;
                while( newSegs[0] > curSegs[0] ) { oOb.rotateDown(!oStopX); newSegs[0]--; }
                while( newSegs[0] < curSegs[0] ) { oOb.rotateUp(!oStopX); newSegs[0]++; }
            }
            if( oY ) {
                if( oStopY ) { oOb.stopAutoTilt(); }
                oOb.pausedY = true;
                while( newSegs[1] > curSegs[1] ) { oOb.tiltDown(!oStopY); newSegs[1]--; }
                while( newSegs[1] < curSegs[1] ) { oOb.tiltUp(!oStopY); newSegs[1]++; }
            }
            curSegs = [newSegs[2],newSegs[3]];
        };
        document.onmouseup = function () {
            oOb.pausedX = false;
            oOb.pausedY = false;
            oOb.image.onmousemove = null;
            document.onmouseup = oldmouseup;
        };
        return false;
    };
};

//zooming
RotatingImage.prototype.setupZoomInformation = function() { if( !this.image ) { this.image = document.images[this.imgName]; if( !this.image ) {
        rotatingImageError('Images cannot be zoomed until after they have been created.',this.useThrow); return;
    } }
    if( !this.rotZoomDetails ) {
        if( !this.image.height && !this.image.width ) {
            rotatingImageError('Images cannot be zoomed until after they have loaded.',this.useThrow); return;
        }
        this.rotZoomDetails = { height: this.image.height, width: this.image.width, zoom: 100 };
    }
}
RotatingImage.prototype.zoomImageIn = function (byPercent,maxPercent) {
    this.setupZoomInformation();
    if( !this.rotZoomDetails ) { return 0; }
    var desiredPercent = this.rotZoomDetails.zoom + byPercent;
    if( desiredPercent > maxPercent ) { desiredPercent = maxPercent; }
    this.zoomImageTo(desiredPercent);
    return desiredPercent;
}
RotatingImage.prototype.zoomImageOut = function (byPercent,minPercent) {
    this.setupZoomInformation();
    if( !this.rotZoomDetails ) { return 0; }
    var desiredPercent = this.rotZoomDetails.zoom - byPercent;
    if( desiredPercent < minPercent ) { desiredPercent = minPercent; }
    this.zoomImageTo(desiredPercent);
    return desiredPercent;
}
RotatingImage.prototype.zoomImageTo = function (toPercent) {
    this.setupZoomInformation();
    if( !this.rotZoomDetails ) { return; }
    if( isNaN(toPercent) || toPercent < 0 ) { rotatingImageError('A positive number must be used when zooming.',this.useThrow); return; }
    this.image.height = Math.round( this.rotZoomDetails.height * ( toPercent / 100 ) );
    this.image.width = Math.round( this.rotZoomDetails.width * ( toPercent / 100 ) );
    this.rotZoomDetails.zoom = toPercent;
}

//simulated read-only properties
RotatingImage.prototype.getTilt = function () { return this.curTilt; };
RotatingImage.prototype.getNumTilt = function () { return this.numTilt; };
RotatingImage.prototype.getRotation = function () { return this.curRot; };
RotatingImage.prototype.getNumRotation = function () { return this.numRot; };