/*
*	env.event.js
*/
(function($w){
	
	// Window Events
	
	var events = [{}];

	$w.addEventListener = function(type, fn){
		if ( !this.uuid || this == window ) {
			this.uuid = events.length;
			events[this.uuid] = {};
		}
	   
		if ( !events[this.uuid][type] )
			events[this.uuid][type] = [];
		
		if ( events[this.uuid][type].indexOf( fn ) < 0 )
			events[this.uuid][type].push( fn );
	};
	
	$w.removeEventListener = function(type, fn){
	   if ( !this.uuid || this == window ) {
	       this.uuid = events.length;
	       events[this.uuid] = {};
	   }
	   
	   if ( !events[this.uuid][type] )
			events[this.uuid][type] = [];
			
		events[this.uuid][type] =
			events[this.uuid][type].filter(function(f){
				return f != fn;
			});
	};
	
	$w.dispatchEvent = function(event){
		if ( event.type ) {
			if ( this.uuid && events[this.uuid][event.type] ) {
				var self = this;
			
				events[this.uuid][event.type].forEach(function(fn){
					fn.call( self, event );
				});
			}
			
			if ( this["on" + event.type] )
				this["on" + event.type].call( self, event );
		}
	};
		
})(window);