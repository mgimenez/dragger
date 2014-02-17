(function (win, doc) {
	'use strict';

	var limitWidthInit = 140,//win.screen.width,
		limitHeightInit = 160,
		limitWidth = win.screen.width,
		limitHeight = win.screen.height;

	function Dragger (element) {

		this.element = element;
		this.lastPositionBoxLeft = 0; // left position of moving box
		this.lastPositionBoxTop = 0;
		this.startx = 0; // starting x coordinate of touch point
		this.starty = 0;
		this.touchobj = null; // Touch object holder

		var that = this;

		this.element.addEventListener('touchend', function(e){
			that.element.classList.remove('touch');
		});

		this.element.addEventListener('touchstart', function(e){
			
			that.element.classList.add('touch');

			that.touchobj = e.changedTouches[0] // reference first touch point
			
			that.lastPositionBoxLeft = parseInt(that.element.style.left) // get left position of box
			that.lastPositionBoxTop = parseInt(that.element.style.top) // get left position of box
			
			that.startx = parseInt(that.touchobj.clientX) // get x coord of touch point
			that.starty = parseInt(that.touchobj.clientY) // get x coord of touch point
			
			e.preventDefault() // prevent default click behavior

		});

		this.element.addEventListener('touchmove', function(e){
			
			that.touchobj = e.changedTouches[0] // reference first touch point for this event
			
			that.distX = parseInt(that.touchobj.clientX) - that.startx // calculate dragger.dist traveled by touch point
			that.distY = parseInt(that.touchobj.clientY) - that.starty // calculate dragger.dist traveled by touch point
				
			that.calculeMoving();

			e.preventDefault()

		});

		this.initPosition();

	}

	Dragger.prototype.initPosition = function () {
		this.element.style.top = Math.floor(Math.random() * limitHeightInit) + 0 +'px';
		this.element.style.left = Math.floor(Math.random() * limitHeightInit) + 0 + 'px';
		this.startx = this.element.style.top;
		this.starty = this.element.style.left;
	}


	Dragger.prototype.calculeMoving = function (){

		/**
		 * Si position + trayecto + offset
		 * es mayor al ancho de la pantalla 
		 * me estoy yendo de pista
		 */

	 	if (this.lastPositionBoxLeft + this.distX + this.element.offsetWidth > limitWidth) { 
	 		
 			//lo posiciono en: scree.width - offset del elemento
			this.element.style.left = limitWidth - this.element.offsetWidth + 'px';

		}else{ 
			
			/**
			 * Si position + trayecto
			 * es menor a 0 
			 * me estoy yendo de pista
			 */

			if(this.lastPositionBoxLeft + this.distX < 0){

				//Lo dejo en 0						
				this.element.style.left = 0 + 'px';

			} else {

				/**
				 * Muevo libremente
				 */

		 		this.element.style.left = this.lastPositionBoxLeft + this.distX + 'px';

			}

		}

		if (this.lastPositionBoxTop + this.distY + this.element.offsetHeight > limitHeight) { 
	 		
 			//lo posiciono en: scree.width - offset del elemento
			this.element.style.top = limitHeight - this.element.offsetHeight + 'px';

		}else{ 
			
			/**
			 * Si position + trayecto
			 * es menor a 0 
			 * me estoy yendo de pista
			 */

			if(this.lastPositionBoxTop + this.distY < 0){

				//Lo dejo en 0						
				this.element.style.top = 0 + 'px';

			} else {

				/**
				 * Muevo libremente
				 */

		 		this.element.style.top = this.lastPositionBoxTop + this.distY + 'px';

			}

		}

	}


	var boxes = doc.querySelectorAll('.box'),
		total = boxes.length,
		track = doc.getElementById('track'),
		i = 0;

	Dragger.intances = {}

	for (i; i<total; i=i+1){
		Dragger.intances[i] = new Dragger(boxes[i]);
	}


	/**
	 * create new dragger on touch any box
	 */
	track.addEventListener('touchstart', function(e){
		console.log(e.target.nodeName)
		if(e.target.nodeName === 'DIV'){

			var box = doc.createElement('div'),
				color = e.target.className.split(' ')[1];

			box.classList.add('box');
			box.classList.add(color);
			track.appendChild(box);
			new Dragger(box);

		}
	});

	win.Dragger = Dragger.intances;

}(this, this.document));
