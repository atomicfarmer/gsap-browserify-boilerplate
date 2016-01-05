const $ = require('jquery');
const TweenLite = require('gsap-tween-lite');

Main = function(){

	var viewWidth;
	var viewHeight;

	function init(){
		viewWidth = window.innerWidth;
		viewHeight = window.innerHeight;


		addEvents();
	}

	function resize(){
		viewWidth = window.innerWidth;
		viewHeight = window.innerHeight;
	}

	function update(){
	}

	function addEvents(e){
		TweenLite.ticker.addEventListener("tick", update);
		$(window).on('resize', resize).trigger('resize');
	}

	return {
		init:init
	}
}();


$(Main.init);