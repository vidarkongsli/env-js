/*
*	env.location.js
*/
(function($env, $w){
	//the current location
	var location = $env.location('./');
	
	$w.__defineSetter__("location", function(url){
		$.document.load(url);
		location = url;
		setHistory(location);
	});
	
	$w.__defineGetter__("location", function(url){
		var hash 	 = new RegExp('(\\#.*)'),
			hostname = new RegExp('\/\/([^\:\/]+)'),
			pathname = new RegExp('(\/[^\\?\\#]*)'),
			port 	 = new RegExp('\:(\\d+)\/'),
			protocol = new RegExp('(^\\w*\:)'),
			search 	 = new RegExp('(\\?[^\\#]*)');
		return {
			get hash(){
				var m = hash.exec(this.href);
				return m&&m.length>1?m[1]:"";
			},
			set hash(_hash){
				//setting the hash is the only property of the location object
				//that doesn't cause the window to reload
				_hash = _hash.indexOf('#')==0?_hash:"#"+_hash;	
				location = this.protocol + this.host + this.pathname + 
					this.search + _hash;
				setHistory(_hash, "hash");
			},
			get host(){
				return this.hostname + (this.port !== "")?":"+this.port:"";
			},
			set host(_host){
				$w.location = this.protocol + _host + this.pathname + 
					this.search + this.hash;
			},
			get hostname(){
				var m = hostname.exec(this.href);
				return m&&m.length>1?m[1]:"";
			},
			set hostname(_hostname){
				$w.location = this.protocol + hostname + ((this.port=="")?"":(":"+this.port))
				 	+ this.pathname + this.search + this.hash;
			},
			get href(){
				//This is the only env specific function
				return $env.locationHref(location);
			},
			set href(url){
				$w.location = url;	
			},
			get pathname(){
				var m = this.href;
				m = pathname.exec(m.substring(m.indexOf(this.hostname)));
				return m&&m.length>1?m[1]:"/";
			},
			set pathname(_pathname){
				$w.location = this.protocol + this.host + _pathname + 
					this.search + this.hash;
			},
			get port(){
				var m = port.exec(this.href);
				return m&&m.length>1?m[1]:"";
			},
			set port(_port){
				$w.location = this.protocol + this.hostname + ":"+_port + this.pathname + 
					this.search + this.hash;
			},
			get protocol(){
				return protocol.exec(this.href)[0];
			},
			set protocol(_protocol){
				$w.location = _protocol + this.host + this.pathname + 
					this.search + this.hash;
			},
			get search(){
				var m = search.exec(this.href);
				return m&&m.length>1?m[1]:"";
			},
			set search(_search){
				$w.location = this.protocol + this.host + this.pathname + 
					_search + this.hash;
			},
			toString: function(){
				return this.href;
			},
			reload: function(force){
				//TODO
			},
			replace: function(url){
				//TODO
			}
		};
	});
	
	/*
	*	env.history.js 
	*	declared inside window.location private scope because the two are so 
	*	intimately linked, the cleanest solution was to share spit
	*/

	current = 0;
	history = [];
	
	// Browser History
	$w.__defineGetter__("history", function(){	
		return {
			get length(){
				return history.length;
			},
			back : function(count){
				if(count){
					go(-count);
				}else{go(-1);}
			},
			forward : function(count){
				if(count){
					go(count);
				}else{go(1);}
			},
			go : function(target){
				if(typeof target == "number"){
					target = current+target;
					if(target > -1 && target < history.length){
						if(history[target].location == "hash"){
							$x.location.hash = history[target].value;
						}else{
							$w.location = history[target].value;
						}
						current = target;
						//remove the last item added to the history
						//since we are moving inside the history
						history.pop();
					}
				}else{
					//TODO: walk throu the history and find the 'best match'
				}
			}
		};
	});

	//Here locationPart is the particutlar method/attribute 
	// of the location object that was modified.  This allows us
	// to modify the correct portion of the location object
	// when we navigate the history
	var setHistory = function( value, locationPart){
		current++;
		history.push({
			location: locationPart||"href",
			value: value
		});
	};
	
})(env, window);