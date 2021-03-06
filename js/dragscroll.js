/**
 * @fileoverview dragscroll - scroll area by dragging
 * @version 0.0.8
 * 
 * @license MIT, see http://github.com/asvd/dragscroll
 * @copyright 2015 asvd <heliosframework@gmail.com> 
 */


(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['exports'], factory);
    } else if (typeof exports !== 'undefined') {
        factory(exports);
    } else {
        factory((root.dragscroll = {}));
    }
}(this, function (exports) {
    var _window = window;
    var _document = document;
    var mousemove = 'mousemove';
    var mouseup = 'mouseup';
    var mousedown = 'mousedown';
    var EventListener = 'EventListener';
    var addEventListener = 'add'+EventListener;
    var removeEventListener = 'remove'+EventListener;
    var newScrollX, newScrollY;
    var friction = 0.97;
    var velocityX = 0;
    var velocityY = 0;

    var dragged = [];
    var reset = function(i, el) {
        for (i = 0; i < dragged.length;) {
            el = dragged[i++];
            el = el.container || el;
            el[removeEventListener](mousedown, el.md, 0);
            _window[removeEventListener](mouseup, el.mu, 0);
            _window[removeEventListener](mousemove, el.mm, 0);
        }

        // cloning into array since HTMLCollection is updated dynamically
        dragged = [].slice.call(_document.getElementsByClassName('dragscroll'));
        for (i = 0; i < dragged.length;) {
            (function(el, lastClientX, lastClientY, pushed, scroller, cont){
                (cont = el.container || el)[addEventListener](
                    mousedown,
                    cont.md = function(e) {
                        el.style['webkitCursor'] = 'grabbing';
                        el.style['mozCursor'] = 'grabbing';
                        el.style.cursor = 'grabbing';
                        el.classList.add('dragging');
                        if (!el.hasAttribute('nochilddrag') ||
                            _document.elementFromPoint(
                                e.pageX, e.pageY
                            ) == cont
                        ) {
                            pushed = 1;
                            lastClientX = e.clientX;
                            lastClientY = e.clientY;

                            e.preventDefault();
                        }
                    }, 0
                );

                _window[addEventListener](
                    mouseup, cont.mu = function(e) {
                        if (pushed) {
                            window.requestAnimationFrame(function() {
                                inertialScroll(el);
                            });
                        }
                        
                        pushed = 0;
                        el.style['webkitCursor'] = 'grab';
                        el.style['mozCursor'] = 'grab';
                        el.classList.remove('dragging');
                        el.style.cursor = 'grab';
                    }, 0
                );

                _window[addEventListener](
                    mousemove,
                    cont.mm = function(e) {
                        if (pushed) {
                            window.requestAnimationFrame(function(){
                                (scroller = el.scroller||el).scrollLeft -=
                                    newScrollX = (- lastClientX + (lastClientX=e.clientX));
                                scroller.scrollTop -=
                                    newScrollY = (- lastClientY + (lastClientY=e.clientY));
                                if (el == _document.body) {
                                    (scroller = _document.documentElement).scrollLeft -= newScrollX;
                                    scroller.scrollTop -= newScrollY;
                                }
                                
                                velocityX = newScrollX;
                                velocityY = newScrollY;
                            });
                        }
                    }, 0
                );

                function inertialScroll(element) {
                    (scroller = element.scroller||element).scrollLeft -= velocityX;
                    scroller.scrollTop -= velocityY;
                    if (element == _document.body) {
                        (scroller = _document.documentElement).scrollLeft -= velocityX;
                        scroller.scrollTop -= velocityY;
                    }
                    velocityX *= friction;
                    velocityY *= friction;
                    
                    if (Math.abs(velocityY) > 0.5) {
                        window.requestAnimationFrame(function(){
                            inertialScroll(element);
                        });
                    }
                }

             })(dragged[i++]);
        }
    }

      
    if (_document.readyState == 'complete') {
        reset();
    } else {
        _window[addEventListener]('load', reset, 0);
    }

    exports.reset = reset;
}));

