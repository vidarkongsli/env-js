/*
 * Pure JavaScript Browser Environment
 *   By John Resig <http://ejohn.org/>
 * Copyright 2008 John Resig, under the MIT License
 */
 

// The Window Object
var window = this;
(function($w, $env){/*
*	window.js
*   - this file will be wrapped in a closure providing the window object as $w
*/
// a logger or empty function available to all modules.
var $log = $env.log;
var $error = $env.error;
//The version of this application
var $version = "0.1";
//This should be hooked to git or svn or whatever
var $revision = "0.0.0.0";

//These descriptions of window properties are taken loosely David Flanagan's
//'JavaScript - The Definitive Guide' (O'Reilly)

/**> $cookies - see cookie.js <*/
// read only boolean specifies whether the window has been closed
var $closed = false;

// a read/write string that specifies the default message that appears in the status line 
var $defaultStatus = "Done";

// a read-only reference to the Document object belonging to this window
/**> $document - See document.js <*/

//IE only, refers to the most recent event object - this maybe be removed after review
var $event = null;

//A read-only array of window objects
var $frames = [];

// a read-only reference to the History object
/**>  $history - see location.js <**/

// read-only properties that specify the height and width, in pixels
var $innerHeight = 600, $innerWidth = 800;

// a read-only reference to the Location object.  the location object does expose read/write properties
/**> $location - see location.js <**/

// a read only property specifying the name of the window.  Can be set when using open()
// and may be used when specifying the target attribute of links
var $name = 'Resig Env Browser';

// a read-only reference to the Navigator object
/**> $navigator - see navigator.js <**/

// a read/write reference to the Window object that contained the script that called open() to 
//open this browser window.  This property is valid only for top-level window objects.
var $opener;

// Read-only properties that specify the total height and width, in pixels, of the browser window.
// These dimensions include the height and width of the menu bar, toolbars, scrollbars, window
// borders and so on.  These properties are not supported by IE and IE offers no alternative 
// properties;
var $outerHeight = $innerHeight, $outerWidth = $innerWidth;

// Read-only properties that specify the number of pixels that the current document has been scrolled
//to the right and down.  These are not supported by IE.
var $pageXOffset = 0, $pageYOffest = 0;

//A read-only reference to the Window object that contains this window or frame.  If the window is
// a top-level window, parent refers to the window itself.  If this window is a frame, this property
// refers to the window or frame that conatins it.
var $parent;

// a read-only refernce to the Screen object that specifies information about the screen: 
// the number of available pixels and the number of available colors.
/**> $screen - see screen.js <**/

// read only properties that specify the coordinates of the upper-left corner of the screen.
var $screenX = 0, $screenY = 0;
var $screenLeft = $screenX, $screenTop = $screenY;

// a read-only refernce to this window itself.
var $self;

// a read/write string that specifies the current contents of the status line.
var $status = '';

// a read-only reference to the top-level window that contains this window.  If this
// window is a top-level window it is simply a refernce to itself.  If this window 
// is a frame, the top property refers to the top-level window that contains the frame.
var $top;

// the window property is identical to the self property.
var $window = $w;

__extend__($w,{
  get closed(){return $closed;},
  get defaultStatus(){return $defaultStatus;},
  set defaultStatus(_defaultStatus){$defaultStatus = _defaultStatus;},
  //get document(){return $document;}, - see document.js
  get event(){return $event;},
  get frames(){return $frames;},
  //get history(){return $history;}, - see location.js
  get innerHeight(){return $innerHeight;},
  get innerWidth(){return $innerWidth;},
  get clientHeight(){return $innerHeight;},
  get clientWidth(){return $innerWidth;},
  //get location(){return $location;}, see location.js
  get name(){return $name;},
  //get navigator(){return $navigator;}, see navigator.js
  get opener(){return $opener;},
  get outerHeight(){return $outerHeight;},
  get outerWidth(){return $outerWidth;},
  get pageXOffest(){return $pageXOffset;},
  get pageYOffset(){return $pageYOffset;},
  get parent(){return $parent;},
  get screen(){return $w.screen;},
  get screenLeft(){return $screenLeft;},
  get screenTop(){return $screenTop;},
  get screenX(){return $screenX;},
  get screenY(){return $screenY;},
  get self(){return $self;},
  get status(){return $status;},
  set status(_status){$status = _status;},
  get top(){return $top;},
  get window(){return $window;}
});

$w.open = function(url, name, features, replace){
  //TODO
};

$w.close = function(){
  //TODO
};     
  
/* Time related functions - see timer.js
*   - clearTimeout
*   - clearInterval
*   - setTimeout
*   - setInterval
*/

/*
* Events related functions - see event.js
*   - addEventListener
*   - attachEvent
*   - detachEvent
*   - removeEventListener
*   
* These functions are identical to the Element equivalents.
*/

/*
* UIEvents related functions - see uievent.js
*   - blur
*   - focus
*
* These functions are identical to the Element equivalents.
*/

/* Dialog related functions - see dialog.js
*   - alert
*   - confirm
*   - prompt
*/

/* Screen related functions - see screen.js
*   - moveBy
*   - moveTo
*   - print
*   - resizeBy
*   - resizeTo
*   - scrollBy
*   - scrollTo
*/

/* CSS related functions - see css.js
*   - getComputedStyle
*/

/*
* Shared utility methods
*/
// Helper method for extending one object with another.  
function __extend__(a,b) {
	for ( var i in b ) {
		var g = b.__lookupGetter__(i), s = b.__lookupSetter__(i);
		if ( g || s ) {
			if ( g ) a.__defineGetter__(i, g);
			if ( s ) a.__defineSetter__(i, s);
		} else
			a[i] = b[i];
	} return a;
};
	

// from ariel flesler http://flesler.blogspot.com/2008/11/fast-trim-function-for-javascript.html
// this might be a good utility function to provide in the env.core
// as in might be useful to the parser and other areas as well
function trim( str ){
 var start = -1,
  end = str.length;
/*jsl:ignore*/
 while( str.charCodeAt(--end) < 33 );
 while( str.charCodeAt(++start) < 33 );
/*jsl:end*/
 return str.slice( start, end + 1 );
};/*
*	location.js
*   - requires env
*/
	//the current location
	var $location = $env.location('./');
	
	$w.__defineSetter__("location", function(url){
	  //$w.onunload();
		$w.document.load(url);
		$location = url;
		setHistory($location);
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
				_hash = _hash.indexOf('#')===0?_hash:"#"+_hash;	
				$location = this.protocol + this.host + this.pathname + 
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
				$w.location = this.protocol + _hostname + ((this.port==="")?"":(":"+this.port)) +
				 	 this.pathname + this.search + this.hash;
			},
			get href(){
				//This is the only env specific function
				return $location;
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
*	history.js
*/

	$currentHistoryIndex = 0;
	$history = [];
	
	// Browser History
	$w.__defineGetter__("history", function(){	
		return {
			get length(){ return $history.length; },
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
					target = $currentHistoryIndex+target;
					if(target > -1 && target < $history.length){
						if($history[target].location == "hash"){
							$w.location.hash = $history[target].value;
						}else{
							$w.location = $history[target].value;
						}
						$currentHistoryIndex = target;
						//remove the last item added to the history
						//since we are moving inside the history
						$history.pop();
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
	  $log("adding value to history: " +value);
		$currentHistoryIndex++;
		$history.push({
			location: locationPart||"href",
			value: value
		});
	};
	/*
*	navigator.js
*   - requires env
*/
var $appCodeName  = "EnvJS";//eg "Mozilla"
var $appName      = "Resig/20070309 BirdDog/0.0.0.1";//eg "Gecko/20070309 Firefox/2.0.0.3"

// Browser Navigator
$w.__defineGetter__("navigator", function(){	
	return {
		get appCodeName(){
			return $appCodeName;
		},
		get appName(){
			return $appName;
		},
		get appVersion(){
			return $version +" ("+ 
			    $w.navigator.platform +"; "+
			    "U; "+//?
			    $env.os_name+" "+$env.os_arch+" "+$env.os_version+"; "+
			    $env.lang+"; "+
			    "rv:"+$revision+
			  ")";
		},
		get cookieEnabled(){
			return true;
		},
		get mimeTypes(){
			return [];
		},
		get platform(){
			return $env.platform;
		},
		get plugins(){
			return [];
		},
		get userAgent(){
			return $w.navigator.appCodeName + "/" + $w.navigator.appVersion + " " + $w.navigator.appName;
		},
		javaEnabled : function(){
			return $env.javaEnabled;	
		}
	};
});

/*
*	timer.js
*/
	
// Timers

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
	/*
* event.js
*/
	
// Window Events

var $events = [{}],
    $onerror,
    $onload,
    $onunload;

$w.addEventListener = function(type, fn){
  $log("adding event listener " + type);
	if ( !this.uuid || this == window ) {
		this.uuid = $events.length;
		$events[this.uuid] = {};
	}
	if ( !$events[this.uuid][type] ){
		$events[this.uuid][type] = [];
	}
	if ( $events[this.uuid][type].indexOf( fn ) < 0 ){
		$events[this.uuid][type].push( fn );
	}
};

$w.removeEventListener = function(type, fn){
  if ( !this.uuid || this == window ) {
    this.uuid = $events.length;
    $events[this.uuid] = {};
  }
  if ( !$events[this.uuid][type] ){
		$events[this.uuid][type] = [];
	}	
  $events[this.uuid][type] =
    $events[this.uuid][type].filter(function(f){
			return f != fn;
		});
};

$w.dispatchEvent = function(event){
  $log("dispatching event " + event.type);
  //the window scope defines the $event object, for IE(^^^) compatibility;
  $event = event;
	if ( event.type ) {
		if ( this.uuid && $events[this.uuid][event.type] ) {
			var self = this;
		  $log("Triggering event handler "+ this.uuid + " for " + event.type);
			$events[this.uuid][event.type].forEach(function(fn){
				fn.call( self, event );
			});
		}	
		if ( this["on" + event.type] ){
			this["on" + event.type].call( self, event );
		}
	}
};
	
$w.__defineGetter__('onerror', function(){
  return function(){
   //$w.dispatchEvent('error');
  };
});

$w.__defineSetter__('onerror', function(fn){
  //$w.addEventListener('error', fn);
});

/*$w.__defineGetter__('onload', function(){
  return function(){
		//var event = document.createEvent();
		//event.initEvent("load");
   //$w.dispatchEvent(event);
  };
});

$w.__defineSetter__('onload', function(fn){
  //$w.addEventListener('load', fn);
});

$w.__defineGetter__('onunload', function(){
  return function(){
   //$w.dispatchEvent('unload');
  };
});

$w.__defineSetter__('onunload', function(fn){
  //$w.addEventListener('unload', fn);
});*//*
*	dom.js
*
*	DOM Level 2 /DOM level 3 (partial)
*	
*	The DOMDocument is now private in scope but you can create new
*	DOMDocuments via document.implementation.createDocument which
*	now also exposes the DOM Level 3 function 'load(uri)'.
*
*/

  // Helper method for generating the right
	// DOM objects based upon the type
	/*var obj_nodes = {};

	function makeNode(node){
	  $log("Making Node");
		if ( node ) {
			if ( !obj_nodes[node]){
				obj_nodes[node] = node.getNodeType() == 1 ? new DOMElement( node ) :
					(node.getNodeType() == 8 ? new DOMComment( node ) : new DOMNode( node )) ;
  		}
			return obj_nodes[node];
		} else
			return null;
	};*/
	// Helper method for generating the right
	// DOM objects based upon the type
	
	var $nodeCache = {};//caches a reference to our implementation of the node
	var $nodeImplCache = {};//reverse look-up : caches a reference to the env supplied implementors dom node
	var $guid = (-1)*Math.pow(2,31);
  function createGUID(){
    return String(++$guid);
  };
	
	function makeNode(node){
		if ( node ) {
			if ( !$nodeCache[ $env.hashCode(node) ] ){
				if( node.getNodeType() == 1){
				  $nodeCache[$env.hashCode(node)] = new DOMElement( node );
				  $nodeImplCache[$nodeCache[$env.hashCode(node)].__guid__] = node;
				}else{
				  if(node.getNodeType() == 8){
				    $nodeCache[$env.hashCode(node)] = new DOMComment( node );
				    $nodeImplCache[$nodeCache[$env.hashCode(node)].__guid__] = node;
				  }else{
				    $nodeCache[$env.hashCode(node)] = new DOMNode( node );
				    $nodeImplCache[$nodeCache[$env.hashCode(node)].__guid__] = node;
			    }
				}
			}
			return $nodeCache[$env.hashCode(node)];
		} else{ 
		  return null;
	  }
	}
	
	//DOMImplementation
	var DOMImplementation = function(){
		return {
			hasFeature: function(feature, version){
				//TODO
				return false;
			},
			createDocumentType: function(qname, publicId, systemId){
				//TODO
			},
			createDocument:function(namespace, qname, docType){
				return new DOMDocument();
			},
			getFeature:function(feature, version){
				//TODO or TODONT?
			}
		};
	};
	
	// DOM Document
$w.__defineGetter__('DOMDocument', function(){
  var $dom, $id, $url;
  return function(){
    $id = createGUID();
    return __extend__(this,{
  		load: function(url){
  		  $log("Loading url into DOM Document: "+ url + " - (Asynch? "+$w.document.async+")");
  			var _this = this;
  			var xhr = new XMLHttpRequest();
  			xhr.open("GET", url, $w.document.async);
  			xhr.onreadystatechange = function(){
				  try{
					  _this.loadXML(xhr.responseText);
				  }catch(e){
				    $error("Error Parsing XML - ",e);
	          _this.loadXML(
	            "<html><head></head><body>"+
	              "<h1>Parse Error</h1>"+
	              "<p>"+e.toString()+"</p>"+  
	            "</body></html>");
			    }
  			  $url = url;
      		if ( !$nodeCache[$dom] ){
      			$nodeCache[$dom] = _this;
    			}
  				$log("Sucessfully loaded document.");
  				var event = document.createEvent();
  				event.initEvent("load");
  				$w.dispatchEvent( event );
  			};
  			xhr.send();
  		},
  		//This is actuall IE specific but still convenient
  		loadXML: function(xmlString){
  		  $dom = $env.parseXML(xmlString);
  		  return this;
  		},
  		get nodeType(){
  			return 9;
  		},
  		createTextNode: function(text){
  			return makeNode( $dom.createTextNode(
  				text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")) );
  		},
  		createElement: function(name){
  			return makeNode( $dom.createElement(name.toLowerCase()) );
  		},
  		getElementsByTagName: function(name){
  			return new DOMNodeList( 
  			  $dom.getElementsByTagName(
  				  name.toLowerCase()) );
  		},
  		getElementsByName: function(name){
  		  // why can't we just do ?: 
  			//var elems = $dom.getElementsByTagName(name), ret = [];
  			var elems = $dom.getElementsByTagName("*"), ret = [];
  			ret.item = function(i){ return this[i]; };
  			ret.getLength = function(){ return this.length; };
  			for ( var i = 0; i < elems.length; i++ ) {
  				var elem = elems.item(i);
  				if ( elem.getAttribute("name") == name )
  					ret.push( elem );
  			}return new DOMNodeList( ret );
  		},
  		getElementById: function(id){
  		  // why can't we just do ?: 
  		  //return makeNode($dom.getElementById(id));
  		  var elems = $dom.getElementsByTagName("*");
  			
  			for ( var i = 0; i < elems.length; i++ ) {
  				var elem = elems.item(i);
  				if ( elem.getAttribute("id") == id )
  					return makeNode(elem);
  			}
  			
  			return null;
  		},
  		get body(){
  			return this.getElementsByTagName("body")[0];
  		},
  		get documentElement(){
  			return makeNode( $dom.getDocumentElement() );
  		},
  		get ownerDocument(){
  			return null;
  		},
  		addEventListener: window.addEventListener,
  		removeEventListener: window.removeEventListener,
  		dispatchEvent: window.dispatchEvent,
  		get nodeName() {
  			return "#document";
  		},
  		importNode: function(node, deep){
  		  //need to replace this with some innerHtml magic
  		  //because the ._dom is private in scope now
  			return makeNode( $dom.importNode($nodeImplCache[node.__guid__], deep) );
  		},
  		toString: function(){
  			return "Document" + 
  			  (typeof $url == "string" ? ": " + $url : "");
  		},
  		get innerHTML(){
  			return this.documentElement.outerHTML;
  		},
  		
  		get defaultView(){
  			return {
  				getComputedStyle: function(elem){
  					return {
  						getPropertyValue: function(prop){
  							prop = prop.replace(/\-(\w)/g,function(m,c){
  								return c.toUpperCase();
  							});
  							var val = elem.style[prop];
  							if ( prop === "opacity" && val === "" ){
  								val = "1";
  							}return val;
  						}
  					};
  				}
  			};
  		},
  		
  		createEvent: function(){
  			return {
  				type: "",
  				initEvent: function(type){
  					this.type = type;
  				}
  			};
  		},
  		get __guid__(){return $id;}
    });
  };
});

function getDocument(node){
	return $nodeCache[node];
}
	
	// DOM NodeList

$w.__defineGetter__("DOMNodeList", function(){
  var $dom;
  return function(list){
		$dom = list;
		this.length = list.getLength();
		
		for ( var i = 0; i < this.length; i++ ) {
			var node = list.item(i);
			this[i] = makeNode( node );
		}
		return __extend__(this,{
  		toString: function(){
  			return "[ " +
  				Array.prototype.join.call( this, ", " ) + " ]";
  		},
  		get outerHTML(){
  			return Array.prototype.map.call(
  				this, function(node){return node.outerHTML;}).join('');
  		}
		});
	};
});
	
	// DOM Node
	
$w.__defineGetter__("DOMNode", function(){
  var $dom, $id;
  return function(node){
    $id = createGUID();
	  $dom = node;
	  return __extend__(this, {
  		get nodeType(){
  			return $dom.getNodeType();
  		},
  		get nodeValue(){
  			return $dom.getNodeValue();
  		},
  		get nodeName() {
  			return $dom.getNodeName();
  		},
  		get childNodes(){
  			return new DOMNodeList( $dom.getChildNodes() );
  		},
  		cloneNode: function(deep){
  			return makeNode( $dom.cloneNode(deep) );
  		},
  		get ownerDocument(){
  			return getDocument( $dom.ownerDocument );
  		},
  		get documentElement(){
  			return makeNode( $dom.documentElement );
  		},
  		get parentNode() {
  			return makeNode( $dom.getParentNode() );
  		},
  		get nextSibling() {
  			return makeNode( $dom.getNextSibling() );
  		},
  		get previousSibling() {
  			return makeNode( $dom.getPreviousSibling() );
  		},
  		toString: function(){
  			return '"' + this.nodeValue + '"';
  		},
  		get outerHTML(){
  			return this.nodeValue;
  		},
  		get __guid__(){return $id;}
	  });
  };
});

  // DOMComment

$w.__defineGetter__("DOMComment", function(){
	  $id = createGUID();
  return function(node){
    return __extend__(this, __extend__(new DOMNode(node),{
      get nodeType(){
  			return 8;
  		},
  		get outerHTML(){
  			return "<!--" + this.nodeValue + "-->";
  		}
    }));
  };
});

	// DOM Element

$w.__defineGetter__("DOMElement", function(){
	var $dom, $id;
	return function(elem){
	  $dom = elem;
	  $id = createGUID();
	  __extend__(this, new DOMNode($dom));
		
		// A lot of the methods defined below belong in HTML specific
		// subclasses.  This is already unwieldy since most of these
		//methods are meant for general xml consumption
		__extend__(this, {
  		get nodeName(){
  			return this.tagName;
  		},
  		get tagName(){
  			return $dom.getTagName().toUpperCase();
  		},
  		toString: function(){
  			return "<" + this.tagName + (this.id ? "#" + this.id : "" ) + ">";
  		},
  		get outerHTML(){
  			var ret = "<" + this.tagName, attr = this.attributes;
  			
  			for ( var i in attr )
  				ret += " " + i + "='" + attr[i] + "'";
  				
  			if ( this.childNodes.length || this.nodeName == "SCRIPT" )
  				ret += ">" + this.childNodes.outerHTML + 
  					"</" + this.tagName + ">";
  			else
  				ret += "/>";
  			
  			return ret;
  		},
  		
  		get attributes(){
  			var attr = {}, attrs = $dom.getAttributes();
  			for ( var i = 0; i < attrs.getLength(); i++ ){
  				attr[ attrs.item(i).nodeName ] = attrs.item(i).nodeValue;
				}return attr;
  		},
  		
  		get innerHTML(){
  			return this.childNodes.outerHTML;	
  		},
  		set innerHTML(html){
  			html = html.replace(/<\/?([A-Z]+)/g, function(m){
  				return m.toLowerCase();
  			}).replace(/&nbsp;/g, " ");
  			
  			var dom = new DOMParser().parseFromString("<wrap>" + html + "</wrap>");
  			var nodes = this.ownerDocument.importNode( dom.documentElement,  true ).childNodes;
  				
  			while (this.firstChild){
  				this.removeChild( this.firstChild );
				}
  			
  			for ( var i = 0; i < nodes.length; i++ )
  				this.appendChild( nodes[i] );
  		},
  		
  		get textContent(){
  			function nav(nodes){
  				var str = "";
  				for ( var i = 0; i < nodes.length; i++ ){
  					if ( nodes[i].nodeType == 3 ){
  						str += nodes[i].nodeValue;
  					}else if ( nodes[i].nodeType == 1 ){
  						str += nav(nodes[i].childNodes);
  					}
  				} return str;
  			} return nav(this.childNodes);
  		},
  		set textContent(text){
  			while (this.firstChild)
  				this.removeChild( this.firstChild );
  			this.appendChild( this.ownerDocument.createTextNode(text));
  		},
  		
  		style: {},
  		clientHeight: 0,
  		clientWidth: 0,
  		offsetHeight: 0,
  		offsetWidth: 0,
  		
  		get disabled() {
  			var val = this.getAttribute("disabled");
  			return val != "false" && !!val;
  		},
  		set disabled(val) { return this.setAttribute("disabled",val); },
  		
  		get checked() {
  			var val = this.getAttribute("checked");
  			return val != "false" && !!val;
  		},
  		set checked(val) { return this.setAttribute("checked",val); },
  		
  		get selected() {
  			if ( !this._selectDone ) {
  				this._selectDone = true;
  				
  				if ( this.nodeName == "OPTION" && !this.parentNode.getAttribute("multiple") ) {
  					var opt = this.parentNode.getElementsByTagName("option");
  					
  					if ( this == opt[0] ) {
  						var select = true;
  						
  						for ( var i = 1; i < opt.length; i++ ){
  							if ( opt[i].selected ) {
  								select = false;
  								break;
  							}
  						}
  						if ( select ){ this.selected = true; }
  					}
  				}
  			}
  			
  			var val = this.getAttribute("selected");
  			return val != "false" && !!val;
  		},
  		set selected(val) { return this.setAttribute("selected",val); },
  
  		get className() { return this.getAttribute("class") || ""; },
  		set className(val) {
  			return this.setAttribute("class",
  				val.replace(/(^\s*|\s*$)/g,""));
  		},
  		
  		get type() { return this.getAttribute("type") || ""; },
  		set type(val) { return this.setAttribute("type",val); },
  
  		get defaultValue() { return this.getAttribute("defaultValue") || ""; },
  		set defaultValue(val) { return this.setAttribute("defaultValue",val); },
  
  		get value() { return this.getAttribute("value") || ""; },
  		set value(val) { return this.setAttribute("value",val); },
  		
  		get src() { return this.getAttribute("src") || ""; },
  		set src(val) { return this.setAttribute("src",val); },
  		
  		get id() { return this.getAttribute("id") || ""; },
  		set id(val) { return this.setAttribute("id",val); },
  		
  		getAttribute: function(name){
  			return $dom.hasAttribute(name) ?
  				new String( $dom.getAttribute(name) ) :
  				null;
  		},
  		setAttribute: function(name,value){
  			$dom.setAttribute(name,value);
  		},
  		removeAttribute: function(name){
  			$dom.removeAttribute(name);
  		},
  		
  		get childNodes(){
  			return new DOMNodeList( $dom.getChildNodes() );
  		},
  		get firstChild(){
  			return makeNode( $dom.getFirstChild() );
  		},
  		get lastChild(){
  			return makeNode( $dom.getLastChild() );
  		},
  		appendChild: function(node){
  		  //Because the dom implementation is private in scope now,
  		  //we will need to fix these to use some innerHtml etc
  		  //if required
  			$dom.appendChild( $nodeImplCache[node.__guid__] );
  		},
  		insertBefore: function(node,before){
  			$dom.insertBefore( $nodeImplCache[node.__guid__], before ? $nodeImplCache[before.__guid__] : before );
  			
  			execScripts( node );
  			
  			function execScripts( node ) {
  				if ( node.nodeName == "SCRIPT" ) {
  					if ( !node.getAttribute("src") ) {
  						eval.call( window, node.textContent );
  					}
  				} else {
  					var scripts = node.getElementsByTagName("script");
  					for ( var i = 0; i < scripts.length; i++ ) {
  						execScripts( node );
  					}
  				}
  			}
  		},
  		removeChild: function(node){
  			$dom.removeChild( $nodeImplCache[node.__guid__] );
  		},
  
  		getElementsByTagName: function(name){
  		  // why can't we just do ?: 
  			//var elems = $dom.getElementsByTagName(name), ret = [];
  			var elems = $dom.getElementsByTagName("*"), ret = [];
  			ret.item = function(i){ return this[i]; };
  			ret.getLength = function(){ return this.length; };
  			for ( var i = 0; i < elems.length; i++ ) {
  				var elem = elems.item(i);
  				if ( elem.getAttribute("name") == name )
  					ret.push( elem );
  			}return new DOMNodeList( ret );
			},
  		
  		addEventListener: window.addEventListener,
  		removeEventListener: window.removeEventListener,
  		dispatchEvent: window.dispatchEvent,
  		
  		click: function(){
  			var event = document.createEvent();
  			event.initEvent("click");
  			this.dispatchEvent(event);
  		},
  		submit: function(){
  			var event = document.createEvent();
  			event.initEvent("submit");
  			this.dispatchEvent(event);
  		},
  		focus: function(){
  			var event = document.createEvent();
  			event.initEvent("focus");
  			this.dispatchEvent(event);
  		},
  		blur: function(){
  			var event = document.createEvent();
  			event.initEvent("blur");
  			this.dispatchEvent(event);
  		},
  		get contentWindow(){
  			return this.nodeName == "IFRAME" ? {
  				document: this.contentDocument
  			} : null;
  		},
  		get contentDocument(){
  			if ( this.nodeName == "IFRAME" ) {
  				if ( !this._doc )
  					this._doc = HTMLtoDOM("<html><head><title></title></head><body></body></html>");
  				return this._doc;
  			} else { return null; }
    	},
  		get __guid__(){return $id;}
		});
		
	  //All this constructor stuff belond in the HTML subclasses
	  //and even more generally in the HTML specific element
	  //subclass otherwise its going to become a mess
  	this.style = {
  		get opacity(){ return this._opacity; },
  		set opacity(val){ this._opacity = val + ""; }
  	};
		
		// Load CSS info
		var styles = (this.getAttribute("style") || "").split(/\s*;\s*/);
		for ( var i = 0; i < styles.length; i++ ) {
			var style = styles[i].split(/\s*:\s*/);
			if ( style.length == 2 )
				this.style[ style[0] ] = style[1];
		}
		
		if ( this.nodeName == "FORM" ) {
			this.__defineGetter__("elements", function(){
				return this.getElementsByTagName("*");
			});
			this.__defineGetter__("length", function(){
				var elems = this.elements;
				for ( var i = 0; i < elems.length; i++ ) {
					this[i] = elems[i];
				}
				return elems.length;
			});
		}

		if ( this.nodeName == "SELECT" ) {
			this.__defineGetter__("options", function(){
				return this.getElementsByTagName("option");
			});
		}

		this.defaultValue = this.value;
		return this;
	};
});

$w.__defineGetter__('DOMParser', function(){
  return function(){
    return __extend__(this, {
      parseFromString: function(xmlString){
        return document.implementation.createDocument().loadXML(xmlString);
      }
    });
  };
});
	
	/*
*	document.js
*
*	DOM Level 2 /DOM level 3 (partial)
*	
*	This file adds the document object to the window and allows you
*	you to set the window.document using an html string or dom object.
*
*/

// read only reference to the Document object
var $document =  new DOMDocument();
var $implementation =  new DOMImplementation();
var $async = false;

$w.__defineGetter__("document", function(){
	return __extend__($document, {
		get async(){ return $async;},
		set async(async){ $async = async; },
		get baseURI(){ return $env.location('./'); },
		get implementation(){ return $implementation; },
		get URL(){ return $w.location.href;  }
	});
});

	
	/*
*	html.js
*
*	DOM Level 2 HTML
*//*
*	xhr.js
*/
// XMLHttpRequest
// Originally implemented by Yehuda Katz
$w.XMLHttpRequest = function(){
	this.headers = {};
	this.responseHeaders = {};
};

XMLHttpRequest.prototype = {
	open: function(method, url, async, user, password){ 
		this.readyState = 1;
		if (async === false ){
			this.async = false;
		}else{ this.async = true; }
		this.method = method || "GET";
		this.url = $env.location(url);
		this.onreadystatechange();
	},
	setRequestHeader: function(header, value){
		this.headers[header] = value;
	},
	getResponseHeader: function(header){ },
	send: function(data){
		var self = this;
		
		function makeRequest(){
			$env.connection(self, function(){
				self.__defineGetter__("responseXML", function(){
					return responseXML;
				});
				if ( self.responseText.match(/^\s*</) ) {
					try {
						var doc = $w.document.implementation.createDocument();
						doc._dom = $env.parseXML(responseText);
						responseXML = doc;
					} catch(e) { /*TODO: need to flag an error here*/}
				}
			});
			self.onreadystatechange();
		}
		if (this.async){
		  $log("XHR sending asynch;");
			$env.runAsync(makeRequest);
		}else{
		  $log("XHR sending synch;");
			makeRequest();
		}
	},
	abort: function(){
		//TODO
	},
	onreadystatechange: function(){
		//TODO
	},
	getResponseHeader: function(header){
	  var rHeader, returnedHeaders;
		if (this.readyState < 3){
			throw new Error("INVALID_STATE_ERR");
		} else {
			returnedHeaders = [];
			for (rHeader in this.responseHeaders) {
				if (rHeader.match(new RegExp(header, "i")))
					returnedHeaders.push(this.responseHeaders[rHeader]);
			}
			if (returnedHeaders.length){ return returnedHeaders.join(", "); }
		}return null;
	},
	getAllResponseHeaders: function(){
	  var header;
		if (this.readyState < 3){
			throw new Error("INVALID_STATE_ERR");
		} else {
			var returnedHeaders = [];
			for (header in this.responseHeaders){
				returnedHeaders.push( header + ": " + this.responseHeaders[header] );
			}return returnedHeaders.join("\r\n");
		}
	},
	async: true,
	readyState: 0,
	responseText: "",
	status: 0
};/*
*	css.js
*/

// returns a CSS2Properties object that represents the style
// attributes and values used to render the specified element in this
// window.  Any length values are alwasys expressed in pixel, or
// absolute values.
$w.getComputedStyle = function(elt, pseudo_elt){
  //TODO
};/*
*	cookie.js
*   - requires env
*/

var $cookies = {
	persistent:{
		//domain - key on domain name {
			//path - key on path {
				//name - key on name {
					 //value : cookie value
					 //other cookie properties
				//}
			//}
		//}
		//expire - provides a timestamp for expiring the cookie
		//cookie - the cookie!
	},
	temporary:{//transient is a reserved word :(
		//like above
	}
};

//Window cookie
$w.__defineSetter__("cookie", function(cookie){
	var i,name,value,properties = {},attr,attrs = cookie.split(";");
	//for now the strategy is to simply create a json object
	//and post it to a file in the .cookies.js file.  I hate parsing
	//dates so I decided not to implement support for 'expires' 
	//(which is deprecated) and instead focus on the easier 'max-age'
	//(which succeeds 'expires') 
	cookie = {};//keyword properties of the cookie
	for(i=0;i<attrs.length;i++){
		attr = attrs[i].split("=");
		if(attr.length > 0){
			name = trim(attr[0]);
			value = trim(attr[1]);
			if(name=='max-age'){ 
				//we'll have to set a timer to check these 
				//and garbage collect expired cookies
				cookie[name] = parseInt(value, 10);
			} else if(name=='domain'){
				if(domainValid(value)){
					cookie['domain']=value;
				}else{
					cookie['domain']=$w.location.domain;
				}
			} else if(name=='path'){
				//not sure of any special logic for path
				cookie['path'] = value;
			} else {
				//its not a cookie keyword so store it in our array of properties
				//and we'll serialize individually in a moment
				properties[name] = value;
			}
		}else{
			if(attr[0] == 'secure'){
				cookie[attr[0]] = true;
			}
		}
	}
	if(!cookie['max-age']){
		//it's a transient cookie so it only lasts as long as 
		//the window.location remains the same
		mergeCookie($cookies.temporary, cookie, properties);
	}else if(cookie['max-age']===0){
		//delete the cookies
		//TODO
	}else{
		//the cookie is persistent
		mergeCookie($cookies.persistent, cookie, properties);
		persistCookies();
	}
});

$w.__defineGetter__("cookie", function(c){
	//The cookies that are returned must belong to the same domain
	//and be at or below the current window.location.path.  Also
	//we must check to see if the cookie was set to 'secure' in which
	//case we must check our current location.protocol to make sure it's
	//https:
	var allcookies = [], i;
	//TODO 	
});



var domainValid = function(domain){
	//make sure the domain
	//TODO 	
};

var mergeCookie = function(target, cookie, properties){
	var name, now;
	if(!target[cookie.domain]){
		target[cookie.domain] = {};
	}
	if(!target[cookie.domain][cookie.path]){
		target[cookie.domain][cookie.path] = {};
	}
	for(name in properties){
		now = new Date().getTime();
		target[cookie.domain][cookie.path][name] = {
			value:properties[name],
			"@env:secure":cookie.secure,
			"@env:max-age":cookie['max-age'],
			"@env:date-created":now,
			"@env:expiration":now + cookie['max-age']
		};
	}
};

var persistCookies = function(){
	//TODO
	//I think it should be done via $env so it can be customized
};

var loadCookies = function(){
	//TODO
	//should also be configurable via $env	
};

//We simply use the default ajax get to load the .cookies.js file
//if it doesn't exist we create it with a post.  Cookies are maintained
//in memory, but serialized with each set.
try{
	//TODO - load cookies
	loadCookies();
}catch(e){
	//TODO - fail gracefully
}	
	/*
*	screen.js
*/

var $availHeight  = 600,
    $availWidth   = 800,
    $colorDepth    = 16,
    $height       = 600,
    $width        = 800;
    
$w.__defineGetter__("screen", function(){
  return {
    get availHeight(){return $availHeight;},
    get availWidth(){return $availWidth;},
    get colorDepth(){return $colorDepth;},
    get height(){return $height;},
    get width(){return $width;}
  };
});


$w.moveBy = function(dx,dy){
  //TODO
};

$w.moveTo = function(x,y) {
  //TODO
};

/*$w.print = function(){
  //TODO
};*/

$w.resizeBy = function(dw, dh){
  $w.resizeTo($width+dw,$height+dh);
};

$w.resizeTo = function(width, height){
  $width = (width <= $availWidth) ? width : $availWidth;
  $height = (height <= $availHeight) ? height : $availHeight;
};

$w.scrollBy = function(dx, dy){
  //TODO
};
$w.scrollTo = function(x,y){
  //TODO
};/*
*	uievent.js
*/

var $onblur,
    $onfocus,
    $onresize;/*
*	dialog.js
*/
$w.alert = function(message){
 //TODO 
};

$w.confirm = function(question){
  //TODO
};

$w.prompt = function(message, defaultMsg){
  //TODO
};/*
*	env.parser.js
*/
/*
 * HTML Parser By John Resig (ejohn.org)
 * Original code by Erik Arvidsson, Mozilla Public License
 * http://erik.eae.net/simplehtmlparser/simplehtmlparser.js
 *
 * // Use like so:
 * HTMLParser(htmlString, {
 *     start: function(tag, attrs, unary) {},
 *     end: function(tag) {},
 *     chars: function(text) {},
 *     comment: function(text) {}
 * });
 *
 * // or to get an XML string:
 * HTMLtoXML(htmlString);
 *
 * // or to get an XML DOM Document
 * HTMLtoDOM(htmlString);
 *
 * // or to inject into an existing document/DOM node
 * HTMLtoDOM(htmlString, document);
 * HTMLtoDOM(htmlString, document.body);
 *
 */

(function(){

	// Regular Expressions for parsing tags and attributes
	var startTag = /^<([\w:-]+)((?:\s+[\w:-]+(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/,
		endTag = /^<\/([\w:-]+)[^>]*>/,
		attr = /([\w:-]+)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|([^>\s]+)))?/g;
		
	// Empty Elements - HTML 4.01
	var empty = makeMap("area,base,basefont,br,col,frame,hr,img,input,isindex,link,meta,param,embed");

	// Block Elements - HTML 4.01
	var block = makeMap("address,applet,blockquote,button,center,dd,del,dir,div,dl,dt,fieldset,form,frameset,hr,iframe,ins,isindex,li,map,menu,noframes,noscript,object,ol,p,pre,script,table,tbody,td,tfoot,th,thead,tr,ul");

	// Inline Elements - HTML 4.01
	var inline = makeMap("a,abbr,acronym,applet,b,basefont,bdo,big,br,button,cite,code,del,dfn,em,font,i,iframe,img,input,ins,kbd,label,map,object,q,s,samp,script,select,small,span,strike,strong,sub,sup,textarea,tt,u,var");

	// Elements that you can, intentionally, leave open
	// (and which close themselves)
	var closeSelf = makeMap("colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr");

	// Attributes that have their values filled in disabled="disabled"
	var fillAttrs = makeMap("checked,compact,declare,defer,disabled,ismap,multiple,nohref,noresize,noshade,nowrap,readonly,selected");

	// Special Elements (can contain anything)
	var special = makeMap("script,style");

	var HTMLParser = this.HTMLParser = function( html, handler ) {
		var index, chars, match, stack = [], last = html;
		stack.last = function(){
			return this[ this.length - 1 ];
		};

		while ( html ) {
			chars = true;

			// Make sure we're not in a script or style element
			if ( !stack.last() || !special[ stack.last() ] ) {

				// Comment
				if ( html.indexOf("<!--") === 0 ) {
					index = html.indexOf("-->");
	
					if ( index >= 0 ) {
						if ( handler.comment )
							handler.comment( html.substring( 4, index ) );
						html = html.substring( index + 3 );
						chars = false;
					}
	
				// end tag
				} else if ( html.indexOf("</") === 0 ) {
					match = html.match( endTag );
	
					if ( match ) {
						html = html.substring( match[0].length );
						match[0].replace( endTag, parseEndTag );
						chars = false;
					}
	
				// start tag
				} else if ( html.indexOf("<") === 0 ) {
					match = html.match( startTag );
	
					if ( match ) {
						html = html.substring( match[0].length );
						match[0].replace( startTag, parseStartTag );
						chars = false;
					}
				}

				if ( chars ) {
					index = html.indexOf("<");
					var text = index < 0 ? html : html.substring( 0, index );
					html = index < 0 ? "" : html.substring( index );
					if ( handler.chars ){handler.chars( text );}
				}
			} else {
				html = html.replace(new RegExp("(.*)<\/" + stack.last() + "[^>]*>"), function(all, text){
					text = text.replace(/<!--(.*?)-->/g, "$1").
						replace(/<!\[CDATA\[(.*?)]]>/g, "$1");
					if ( handler.chars ){handler.chars( text );}
					return "";
				});
				parseEndTag( "", stack.last() );
			}
			if ( html == last ){throw "Parse Error: " + html;}
			last = html;
		}
		
		// Clean up any remaining tags
		parseEndTag();

		function parseStartTag( tag, tagName, rest, unary ) {
			if ( block[ tagName ] ) {
				while ( stack.last() && inline[ stack.last() ] ) {
					parseEndTag( "", stack.last() );
				}
			}

			if ( closeSelf[ tagName ] && stack.last() == tagName ) {
				parseEndTag( "", tagName );
			}

			unary = empty[ tagName ] || !!unary;

			if ( !unary )
				stack.push( tagName );
			
			if ( handler.start ) {
				var attrs = [];
	
				rest.replace(attr, function(match, name) {
					var value = arguments[2] ? arguments[2] :
						arguments[3] ? arguments[3] :
						arguments[4] ? arguments[4] :
						fillAttrs[name] ? name : "";
					
					attrs.push({
						name: name,
						value: value,
						escaped: value.replace(/(^|[^\\])"/g, '$1\\\"') //"
					});
				});
	
				if ( handler.start )
					handler.start( tagName, attrs, unary );
			}
		}

		function parseEndTag( tag, tagName ) {
		  var pos;
			// If no tag name is provided, clean shop
			if ( !tagName ){
				pos = 0;
			}else{
			// Find the closest opened tag of the same type
				for ( pos = stack.length - 1; pos >= 0; pos-- ){
					if ( stack[ pos ] == tagName ){ break; }
				}
  		}
			if ( pos >= 0 ) {
				// Close all the open elements, up the stack
				for ( var i = stack.length - 1; i >= pos; i-- ){
					if ( handler.end ){
						handler.end( stack[ i ] );
  				}
				}
				// Remove the open elements from the stack
				stack.length = pos;
			}
		}
	};
	
	this.HTMLtoXML = function( html ) {
		var results = "";
		
		HTMLParser(html, {
			start: function( tag, attrs, unary ) {
				results += "<" + tag;
		
				for ( var i = 0; i < attrs.length; i++ )
					results += " " + attrs[i].name + '="' + attrs[i].escaped + '"';
		
				results += (unary ? "/" : "") + ">";
			},
			end: function( tag ) {
				results += "</" + tag + ">";
			},
			chars: function( text ) {
				results += text;
			},
			comment: function( text ) {
				results += "<!--" + text + "-->";
			}
		});
		
		return results;
	};
	
	this.HTMLtoDOM = function( html, doc ) {
		// There can be only one of these elements
		var one = makeMap("html,head,body,title");
		
		// Enforce a structure for the document
		var structure = {
			link: "head",
			base: "head"
		};
	
		if ( !doc ) {
			if ( typeof DOMDocument != "undefined" ){
				doc = new DOMDocument();
			}else if ( typeof document != "undefined" && document.implementation && document.implementation.createDocument ){
				doc = document.implementation.createDocument("", "", null);
			}else if ( typeof ActiveX != "undefined" ){
				doc = new ActiveXObject("Msxml.DOMDocument");
			}
		} else {
			doc = doc.ownerDocument ||
				doc.getOwnerDocument && doc.getOwnerDocument() ||
				doc;
		}
		
		var elems = [],
			documentElement = doc.documentElement || doc.getDocumentElement && doc.getDocumentElement();
				
		// If we're dealing with an empty document then we
		// need to pre-populate it with the HTML document structure
		if ( !documentElement && doc.createElement ) (function(){
			var html = doc.createElement("html");
			var head = doc.createElement("head");
			head.appendChild( doc.createElement("title") );
			html.appendChild( head );
			html.appendChild( doc.createElement("body") );
			doc.appendChild( html );
		})();
		
		// Find all the unique elements
		if ( doc.getElementsByTagName ){
			for ( var i in one ){
			   one[ i ] = doc.getElementsByTagName( i )[0];
		  }
		}
		
		// If we're working with a document, inject contents into
		// the body element
		var curParentNode = one.body;
		
		HTMLParser( html, {
			start: function( tagName, attrs, unary ) {
				// If it's a pre-built element, then we can ignore
				// its construction
				if ( one[ tagName ] ) {
					curParentNode = one[ tagName ];
					return;
				}
			
				var elem = doc.createElement( tagName );
				
				for ( var attr in attrs )
					elem.setAttribute( attrs[ attr ].name, attrs[ attr ].value );
				
				if ( structure[ tagName ] && typeof one[ structure[ tagName ] ] != "boolean" )
					one[ structure[ tagName ] ].appendChild( elem );
				
				else if ( curParentNode && curParentNode.appendChild )
					curParentNode.appendChild( elem );
					
				if ( !unary ) {
					elems.push( elem );
					curParentNode = elem;
				}
			},
			end: function( tag ) {
				elems.length -= 1;
				
				// Init the new parentNode
				curParentNode = elems[ elems.length - 1 ];
			},
			chars: function( text ) {
				curParentNode.appendChild( doc.createTextNode( text ) );
			},
			comment: function( text ) {
				// create comment node
			}
		});
		
		return doc;
	};

	function makeMap(str){
		var obj = {}, items = str.split(",");
		for ( var i = 0; i < items.length; i++ )
			obj[ items[i] ] = true;
		return obj;
	};
	
})();
/*
*	outro.js
*/


})(window, __env__); 

