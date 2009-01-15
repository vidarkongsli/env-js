/*
*	timer.js
*/
	

$log("Initializing Window Timer.");

//private
var $timers = [];

$w.setTimeout = function(fn, time){
	var num;
	return num = window.setInterval(function(){
		fn();
		window.clearInterval(num);
	}, time);
};

window.setInterval = function(fn, time){
	var num = $timers.length;
	if(time===0){
	    fn();
	}else{
    	$timers[num] = $env.timer(fn, time);
    	$timers[num].start();
	}
	return num;
};

window.clearInterval = window.clearTimeout = function(num){
	if ( $timers[num] ) {
		$timers[num].stop();
		delete $timers[num];
	}
};	
	