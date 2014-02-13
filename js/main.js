(function (win, doc) {
	'use strict';

	
	
	var	dragger = {};
	
	dragger.element = doc.getElementById('box2');
	dragger.boxleft = {}; // left position of moving box
	dragger.startx = {}; // starting x coordinate of touch point
	dragger.boxtop = {};
	dragger.starty = {};
	dragger.dist = 0; // dragger.distance traveled by touch point
	dragger.touchobj = null; // Touch object holder


	function calculePosition(positionBox, dist, limitScreen, offset, sideToMove){

		/**
		 * Si position + trayecto + offset
		 * es mayor al ancho de la pantalla 
		 * me estoy yendo de pista
		 */
		
	 	if (positionBox + dist + offset > limitScreen) { 
	 		
 			//lo posiciono en: scree.width - offset del elemento
			dragger.element.style[sideToMove] = limitScreen - offset + 'px';

		}else{ 
			
			/**
			 * Si position + trayecto
			 * es menor a 0 
			 * me estoy yendo de pista
			 */

			if(positionBox + dist < 0){

				//Lo dejo en 0						
				dragger.element.style[sideToMove] = 0 + 'px';

			} else {

				/**
				 * Muevo libremente
				 */

		 		dragger.element.style[sideToMove] = positionBox + dist + 'px';

			}

		}
	}
	dragger.element.addEventListener('touchend', function(e){
		dragger.element.style.boxShadow = '';
		dragger.element.style.opacity = '';
	}); 
	dragger.element.addEventListener('touchstart', function(e){
		dragger.element.style.opacity = '0.5';
		dragger.element.style.boxShadow = '5px 5px 20px black';
	})
	dragger.element.addEventListener('touchstart', function(e){
		dragger.touchobj = e.changedTouches[0] // reference first touch point
		
		dragger.boxleft = parseInt(dragger.element.style.left) // get left position of box
		dragger.boxtop = parseInt(dragger.element.style.top) // get left position of box
		
		dragger.startx = parseInt(dragger.touchobj.clientX) // get x coord of touch point
		dragger.starty = parseInt(dragger.touchobj.clientY) // get x coord of touch point
		
		e.preventDefault() // prevent default click behavior

	})

	dragger.element.addEventListener('touchmove', function(e){
		
		dragger.touchobj = e.changedTouches[0] // reference first touch point for this event
		
		dragger.distX = parseInt(dragger.touchobj.clientX) - dragger.startx // calculate dragger.dist traveled by touch point
		dragger.distY = parseInt(dragger.touchobj.clientY) - dragger.starty // calculate dragger.dist traveled by touch point
			
		calculePosition(dragger.boxleft, dragger.distX, win.screen.width, dragger.element.offsetWidth, 'left');
		calculePosition(dragger.boxtop, dragger.distY, win.screen.height, dragger.element.offsetHeight, 'top');

		e.preventDefault()

	})
	win.dragger = dragger;

}(this, this.document));
