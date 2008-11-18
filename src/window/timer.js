/*
*	timer.js
*/
	

$log("Initializing Window Timer.");

var $timers = [];

$w.setTimeout = function(fn, time){
	var num;
	return num = $w.setInterval(function(){
		fn();
		$w.clearInterval(num);
	}, time);
};

$w.setInterval = function(fn, time){
	var num = $timers.length;
	$timers[num] = $env.timer(fn, time);
	$timers[num].start();
	return num;
};

$w.clearInterval = $w.clearTimeout = function(num){
	if ( $timers[num] ) {
		$timers[num].stop();
		delete $timers[num];
	}
};	
	