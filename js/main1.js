(function (win, doc) {
	'use strict';

	win.addEventListener('load', function(){
		var box1 = doc.getElementById('box1'),
	    	statusdiv = doc.getElementById('statusdiv'),
	    	startx = 0,
	    	starty = 0,
	    	boxLeft = 0,
	    	boxTop = 0,
	    	dist = 0;

	    box1.addEventListener('touchstart', function(e){
	    	this.style.opacity = '0.5';
			var touchobj = e.changedTouches[0]; // reference first touch point (ie: first finger)
			console.log('touchstart')
			startx = parseInt(touchobj.clientX); // get x position of touch point relative to left edge of browser
			starty = parseInt(touchobj.clientY); // get x position of touch point relative to top edge of browser

			boxLeft = parseInt(box1.style.left) // get left position of box
			boxTop = parseInt(box1.style.top) // get left position of box

			statusdiv.innerHTML = 'Status: touchstart <br /> ClientX: ' + startx + 'px <br /> ClientY: ' + starty + 'px';

			e.preventDefault();

		}, false)

		box1.addEventListener('touchmove', function(e){
			var touchobj = e.changedTouches[0]; // reference first touch point for this event
			if(parseInt(touchobj.clientX) > startx){
				var distX = parseInt(touchobj.clientX) - startx;
			} else {
				var distX =  parseInt(touchobj.clientX);
			}
			if(parseInt(touchobj.clientY) > starty){
				var distY = parseInt(touchobj.clientY) - starty;
			} else {
				var distY =  parseInt(touchobj.clientY);
			}
			
			statusdiv.innerHTML = 'Status: touchmove<br /> Horizontal distance traveled: ' + distX + 'px <br /> Vertical distance traveled: ' + distY + 'px';

			console.log(distX);
			console.log(distY);

			this.style.left = distX + 'px';
			this.style.top = distY + 'px';

			e.preventDefault();
		}, false)

		box1.addEventListener('touchend', function(e){
			this.style.opacity = '1';
			var touchobj = e.changedTouches[0]; // reference first touch point for this event

			startx = parseInt(touchobj.clientX);
			starty = parseInt(touchobj.clientY);

			//statusdiv.innerHTML = 'Status: touchend<br /> Resting x coordinate: ' + touchobj.clientX + 'px';
			e.preventDefault();
		}, false)
	}, false)
}(this, this.document));