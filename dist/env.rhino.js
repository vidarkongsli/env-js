/*
*	env.rhino.js
*/
var __env__ = {};
(function($env){
	
  $env.debug = function(){};
  
  $env.log = function(){};
  //uncomment this if you want to get some internal log statementes
  $env.log = print;
  $env.log("Initializing Rhino Platform Env");
  
  $env.error = function(msg, e){
    print("ERROR! : " + msg);
    print(e);
  };
  
  $env.hashCode = function(obj){
    return obj?obj.hashCode().toString():null;
  };
	//For Java the window.location object is a java.net.URL
	$env.location = function(path, base){
	  var protocol = new RegExp('(^\\w*\:)');
		var m = protocol.exec(path);
		if(m&&m.length>1){
			return new java.net.URL(path).toString();
		}else if(base){
		  return new java.net.URL(base + '/' + path).toString();
		}else{
			//return an absolute url from a relative to the file system
			return new java.io.File(path).toURL().toString();
		}
	};
	
	//For Java the window.timer is created using the java.lang.Thread in combination
	//with the java.lang.Runnable
	$env.timer = function(fn, time){
		return new java.lang.Thread(new java.lang.Runnable({
			run: function(){
				while (true){
					java.lang.Thread.currentThread().sleep(time);
					fn();
				}
			}
		}));
	};	
	
	//Since we're running in rhino I guess we can safely assume
	//java is 'enabled'.  I'm sure this requires more thought
	//than I've given it here
	$env.javaEnabled = true;	
	
	
	//Used in the XMLHttpRquest implementation to run a
	// request in a seperate thread
	$env.runAsync = function(fn){
		(new java.lang.Thread(new java.lang.Runnable({
			run: fn
		}))).start();
	};
	
	//Used to write to a local file
	$env.writeToFile = function(text, url){
		var out = new java.io.FileWriter( 
			new java.io.File( 
				new java.net.URI(url.toString())));				
		out.write( text, 0, text.length );
		out.flush();
		out.close();
	};
	
	//Used to delete a local file
	$env.deleteFile = function(url){
		var file = new java.io.File( new java.net.URI( url ) );
        file["delete"]();
	};
	
	$env.connection = function(xhr, responseHandler){
		var url = java.net.URL(xhr.url);//, $w.location);
	  var connection;
		if ( /^file\:/.test(url) ) {
			if ( xhr.method == "PUT" ) {
				var text =  data || "" ;
				$env.writeToFile(text, url);
			} else if ( xhr.method == "DELETE" ) {
				$env.deleteFile(url);
			} else {
				connection = url.openConnection();
				connection.connect();
			}
		} else { 
			connection = url.openConnection();
			connection.setRequestMethod( xhr.method );
			
			// Add headers to Java connection
			for (var header in xhr.headers){
				connection.addRequestProperty(header, xhr.headers[header]);
		  }connection.connect();
			
			// Stick the response headers into responseHeaders
			for (var i = 0; ; i++) { 
				var headerName = connection.getHeaderFieldKey(i); 
				var headerValue = connection.getHeaderField(i); 
				if (!headerName && !headerValue) break; 
				if (headerName)
					xhr.responseHeaders[headerName] = headerValue;
			}
		}
		if(connection){
				xhr.readyState = 4;
				xhr.status = parseInt(connection.responseCode,10) || undefined;
				xhr.statusText = connection.responseMessage || "";
				
				var contentEncoding = connection.getContentEncoding() || "utf-8",
					stream = (contentEncoding.equalsIgnoreCase("gzip") || contentEncoding.equalsIgnoreCase("decompress") )?
   							new java.util.zip.GZIPInputStream(connection.getInputStream()) :
   							connection.getInputStream(),
					baos = new java.io.ByteArrayOutputStream(),
   				buffer = java.lang.reflect.Array.newInstance(java.lang.Byte.TYPE, 1024),
					length,
					responseXML = null;

				while ((length = stream.read(buffer)) != -1) {
					baos.write(buffer, 0, length);
				}

				baos.close();
				stream.close();

				xhr.responseText = java.nio.charset.Charset.forName(contentEncoding).
					decode(java.nio.ByteBuffer.wrap(baos.toByteArray())).toString();
				
		}
		if(responseHandler){
		  responseHandler();
		}
	};
	
	var htmlDocBuilder = Packages.javax.xml.parsers.DocumentBuilderFactory.newInstance();
	htmlDocBuilder.setNamespaceAware(false);
	htmlDocBuilder.setValidating(false);
	
	$env.parseHTML = function(htmlstring){
		return htmlDocBuilder.newDocumentBuilder().parse(
				  new java.io.ByteArrayInputStream(
						(new java.lang.String(htmlstring)).getBytes("UTF8")));
	};
	
	var xmlDocBuilder = Packages.javax.xml.parsers.DocumentBuilderFactory.newInstance();
	xmlDocBuilder.setNamespaceAware(true);
	xmlDocBuilder.setValidating(true);
	
	$env.parseXML = function(xmlstring){
		return xmlDocBuilder.newDocumentBuilder().parse(
				  new java.io.ByteArrayInputStream(
						(new java.lang.String(xmlstring)).getBytes("UTF8")));
	};
	
	
  $env.xpath = function(expression, doc){
    return Packages.javax.xml.xpath.
      XPathFactory.newInstance().newXPath().
        evaluate(expression, doc, javax.xml.xpath.XPathConstants.NODESET);
  };
	
  $env.os_name        = java.lang.System.getProperty("os.name"); 
  $env.os_arch        = java.lang.System.getProperty("os.arch"); 
  $env.os_version     = java.lang.System.getProperty("os.version"); 
  $env.lang           = java.lang.System.getProperty("user.lang"); 
  $env.platform       = "Rhino ";//how do we get the version
	
})(__env__);/*
 * Pure JavaScript Browser Environment
 *   By John Resig <http://ejohn.org/>
 * Copyright 2008 John Resig, under the MIT License
 */
 

// The Window Object
var __this__ = this;
this.__defineGetter__('window', function(){
  return __this__;
});
(function($w, $env){/*
*	window.js
*   - this file will be wrapped in a closure providing the window object as $w
*/
// a logger or empty function available to all modules.
var $log = $env.log,
    $error = $env.error,
    $debug = $env.debug;
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

$log("Initializing Window.");
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
  //get screen(){return $screen;}, see screen.js
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
};

//from jQuery
function setArray( target, array ) {
	// Resetting the length to 0, then using the native Array push
	// is a super-fast way to populate an object with array-like properties
	target.length = 0;
	Array.prototype.push.apply( target, array );
};
/*
*	dom.js
*
*	DOM Level 2 /DOM level 3 (partial)
*	
*	The Document Object is now private in scope but you can create new
*	Documents via document.implementation.createDocument which
*	now also exposes the DOM Level 3 function 'load(uri)'.
*
*/
	// Helper method for generating the right
	// DOM objects based upon the type
	
	var $nodeCache = {};//caches a reference to our implementation of the node
	var $nodeImplCache = {};//reverse look-up : caches a reference to the env supplied implementors dom node
	var $guid = (-1)*Math.pow(2,31);
  function createGUID(){
    /*jsl:ignore*/
    return String(++$guid);
    /*jsl:end*/
  };
	
  // A handy utility method to convert the env supplied DOM Level 2 implementation
  // into our window externalized implementaion.
  // Its kept here since Node is the base class of all the DOM window level classes
	function makeNode(node, doc ){
		if ( node !== null && node !== undefined) {
			if ( !$nodeCache[ $env.hashCode(node) ] ){
        if( (document.__html__)&&(node.getNodeType()===$w.Node.ELEMENT_NODE)){
          //$log("Caching HTML Node: " + node);
          makeHTMLElement(node.getTagName().toUpperCase(), node);
        }else if( (document.__html__)&&(node.getNodeType()===$w.Node.DOCUMENT_NODE)){
          //$log("Caching HTML Document: " + node);
          cacheNode( node, HTMLDocument );
        }else{
          $debug("Caching Node: " + node);
          if(     node.getNodeType() === $w.Node.ELEMENT_NODE){cacheNode(node, Element);}
          else if(node.getNodeType() === $w.Node.ATTRIBUTE_NODE){cacheNode(node, Attr);}
          else if(node.getNodeType() === $w.Node.TEXT_NODE){cacheNode(node, Text);}
          else if(node.getNodeType() === $w.Node.CDATA_SECTION_NODE){cacheNode(node, CDATASection);}
          else if(node.getNodeType() === $w.Node.PROCESSING_INSTRUCTION_NODE){cacheNode(node, ProcessingInstruction);}
          else if(node.getNodeType() === $w.Node.COMMENT_NODE){cacheNode(node, Comment);}
          else if(node.getNodeType() === $w.Node.DOCUMENT_NODE){cacheNode( node, Document );}
          else if(node.getNodeType() === $w.Node.DOCUMENT_TYPE_NODE){cacheNode(node, DocumentType);}
          else if(node.getNodeType() === $w.Node.DOCUMENT_FRAGMENT_NODE){cacheNode(node, DocumentFragment);}
          else{cacheNode(node, Node);}
        }
			}
			//$log("Retreived Node from cache: " + $env.hashCode(node ) + " => "+ $nodeCache[$env.hashCode(node)]);
			return $nodeCache[$env.hashCode(node)];
		} else{ 
		  //$log("makeNode => Node is null!");
		  return null;
	  }
	};
	

  function cacheNode(node, constructor){
    if(node && constructor){
      var cachednode = new constructor( node );
      $debug("Caching node "+ cachednode);
      $nodeCache[$env.hashCode(node)] = cachednode;
      $debug("Reversing lookup for node "+ cachednode.__$__);
      $nodeImplCache[cachednode.__$__] = node;
    }
  };$log("Defining Document");
/*
* Document - DOM Level 2
*  The Document object is not directly 
*/
$w.__defineGetter__('Document', function(){
  return function(){
    throw new Error("Object cannot be created in this context");
  };
});

var Document = function(node){
  var $dom = node, 
      $id = createGUID(), 
      $url; 
  $debug("Document " +$id);
  return __extend__(this,{
		get defaultView(){ //TODO: why isnt this just 'return $w;'?
			return { getComputedStyle: function(elem){
				return { getPropertyValue: function(prop){
					prop = prop.replace(/\-(\w)/g,function(m,c){ return c.toUpperCase(); });
					var val = elem.style[prop];
					if ( prop === "opacity" && val === "" ){ val = "1"; }return val;
				}};
			}};
		},
		get doctype(){return makeNode( $dom.getDoctype() );},
		get documentElement(){ return makeNode( $dom.getDocumentElement() ); },
	  get implementation(){ return $implementation; },
		get nodeName() { return "#document"; },
	  get styleSheets(){ return [];/*TODO*/ },
		addEventListener        : $w.addEventListener,
	  attachEvent             : $w.addEventListener,/*IE only subject to random, frustrating, obscure deprecation*/
	  createAttribute         : function(name){return makeNode( $dom.createAttribute(name) );},
	  createAttributeNS       : function(nsuri, qname){return makeNode($dom.createAttribute(nsuri, qname) );},
	  createCDATASection      : function(data){return makeNode( $dom.createCDATASection(data) );},
	  createComment           : function(data){return makeNode( $dom.createComment(data) );},
	  createDocumentFragment  : function(){return $dom.createDocumentFragment();},
	  createElement           : function(tagname){ return makeNode( $dom.createElement(tagname) );},
	  createElementNS         : function(nsuri, qname){ return makeNode( $dom.createElementNS(nsuri, qname) );},
		createEvent             : function(eventType){ 
		  var event;
		  if(eventType === "UIEvents"){ event = new UIEvent();}
		  else if(eventType === "MouseEvents"){ event = new MouseEvent();}
		  else{ event = new Event(); } 
		  return event;
	  },
	  createExpression        : function(xpath, nsuriMap){ return null;/*TODO*/},
	  createProcessingInstruction: function(target,data){ return makeNode( $dom.createProcessingInstruction(target, data) );},
	  createTextNode          : function(data){ return makeNode( $dom.createTextNode(data) );},
	  detachEvent             : window.detachEvent,/*IE only subject to random, frustrating, obscure deprecation*/
		dispatchEvent           : window.dispatchEvent,
	  evaluate                : function(xpath, context, nsuriMap, resulttype, result){ 
		  $log("document.evaluate("+xpath+")");
		  var nodelist = new NodeList($env.xpath(xpath, context?context:$dom));
		  $log("length :=> "+nodelist.length);
	    return nodelist;
    },
		getElementById          : function(id){
      $debug("document.getElementById( "+id+" )");
      var elem = makeNode( $dom.getElementById(id) );
			return elem;
		},
		getElementsByTagName    : function(name){ 
		  $debug("document.getElementsByTagName("+name+")");
			return new NodeList( $dom.getElementsByTagName(name) );
	  },
		getElementsByTagNameNS  : function(nsuri,qname){ 
		  $debug("document.getElementsByTagNameNS("+nsuri+", "+qname+")");
		  return  new NodeList( $dom.getElementsByTagNameNS( nsuri,qname ) );
	  },
		importNode              : function(node, deep){
		  return makeNode($dom.importNode($nodeImplCache[node.__$__], deep));
	  },
		adoptNode              : function(node){
		  return makeNode($dom.adoptNode($nodeImplCache[node.__$__]));
	  },
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
				$log("Sucessfully loaded document.");
				var event = document.createEvent();
				event.initEvent("load");
				$w.dispatchEvent( event );
			};
			xhr.send();
		},
		//This is actually IE specific but still convenient
		loadXML                 : function(xmlString){ 
		  $debug("Parsing document into internal dom");
		  $dom = $env.parseHTML(xmlString);
		  $nodeCache[$env.hashCode($dom)] = this;
		  $nodeImplCache[$id] = $dom;
		  $url = $url?$url:xmlString;
		  $debug("Finished Parsing Document ("+$id+"), Internal DOM is set. => " + $dom);
		  return this; 
	  },
	  normalizeDocument: function(){
	    $log("Normalizing Document");
	    $dom.normalizeDocument();
	    $log("Finished Normalizing Document");
    },
	  get xml(){return this.doctype.xml + "\n" +this.documentElement.xml;},
		removeEventListener     : window.removeEventListener,
		toString: function(){ return "Document" +  (typeof $url == "string" ? ": " + $url : ""); },
		get __$__(){return $id;}
  });
};$log("Defining Attr");
/*
* Attr - DOM Level 2
*/
$w.__defineGetter__("Attr", function(){
  return function(){
    throw new Error("Object cannot be created in this context");
  };
});

var Attr = function(node, id){
  var $dom = node, 
      $id = id?id:createGUID();
  $debug("Attr "+$id);
  __extend__(this, new Node($dom, $id));
  return __extend__(this, {
    get name(){return String($dom.getName()); },
    get ownerElement(){ return makeNode( $dom.getOwnerElement() );},
    get specified(){ return makeNode( $dom.getSpecified() );},
    get value(){return String($dom.getValue()); },
    set value(value){return $dom.setValue(value); },
    get xml(){return this.nodeName + "='" + this.nodeValue + "' ";}
  });
};$log("Defining CDATASection");
/*
* CDATASection - DOM Level 2
*/
$w.__defineGetter__("CDATASection", function(){
  return function(){
    throw new Error("Object cannot be created in this context");
  };
});

var CDATASection = function(node, id){
  var $dom = node, 
      $id = id?id:createGUID();
  $debug("CDATASection "+$id);
  __extend__(this, new Text($dom, $id));
  return __extend__(this,{
    get xml(){return "<![CDATA[" + this.nodeValue + "]]>";}
  });
};
$debug("Defining CharacterData");
/*
* CharacterData - DOM Level 2
*/
$w.__defineGetter__("CharacterData", function(){
  return function(){
    throw new Error("Object cannot be created in this context");
  };
});

var CharacterData = function(node, id){
  var $dom = node, 
      $id = id?id:createGUID();
  $debug("CharacterData "+$id);
  __extend__(this, new Node($dom, $id));
  return __extend__(this, {
    get data(){return $dom.getData();},
    set data(data){return $dom.setData(data);},
    get length(){return $dom.getLength();},
    appendData: function(arg){return $dom.appendData(arg);},
    deleteData: function(offset, count){ return $dom.deleteData(offset, count);},
    insertData: function(offset, arg){return $dom.insertData(offset, arg);},
    replaceData: function(offset, count, arg){return $dom.replaceData(offset, count, arg);},
    substringData: function(offset, count){return $dom.substringData(offset, count);}
  });
};$log("Defining Comment");
/* 
* Comment - DOM Level 2
*/
$w.__defineGetter__("Comment", function(){
  return function(){
    throw new Error("Object cannot be created in this context");
  };
});

var Comment = function(node, id){
  var $dom = node, 
      $id = id?id:createGUID();
  $debug("Comment "+$id);
  __extend__(this, new CharacterData($dom, $id));
  return __extend__(this,{
    get xml(){return "<!-- " + this.nodeValue + " -->";}
  });
};

	$log("Defining DocumentType");
;/*
* DocumentType - DOM Level 2
*/
$w.__defineGetter__('DocumentType', function(){
  return function(){
    throw new Error("Object cannot be created in this context");
  };
});

var DocumentType = function(node, id){
  var $dom = node, 
      $id = id?id:createGUID();
  $debug("DocumentType "+$id);
  __extend__(this, new Node($dom, $id));
  return __extend__(this, {
    get internalSubset(){return $dom.getInternalSubset();},
    get name(){return $dom.getName();},
    get publicId(){return $dom.getPublicId();},
    get systemId(){return $dom.getSystemId();},
    get xml(){return '<!DOCTYPE ' +this.name+ ' PUBLIC "'+this.publicId+'" "'+this.systemId+'">';}
  });
};

var __DocumentType__ = function(doctype){
  $domparser.parseString('<!DOCTYPE ' +doctype.name||''+ 
    ' PUBLIC "'+doctype.publicId||''+' '+'"'+
    doctype.systemId||''+'"><asdf></asdf>').doctype;
};$log("Defining Element");
/*
* Element - DOM Level 2
*/
$w.__defineGetter__("Element", function(){
  return function(){
    throw new Error("Object cannot be created in this context");
  };
});

var Element = function(node, id){
  var $dom = node, 
      $id = id?id:createGUID();
  
  $debug("Element "+$id);
  __extend__(this, new Node($dom, $id));
  return __extend__(this, {
  	get tagName(){ return $dom.getTagName(); },
  	get attributes(){
  	  //Simple way to emulate NamedNodeMap which is only
  	  //ever used here
  		var attrs = new NodeList($dom.getAttributes());
  		if(!attrs||(attrs.length === undefined)){setArray(attrs,[]);}
  		for ( var i = 0; i < attrs.length; i++ ){
  		  attrs[attrs[i].nodeName] = attrs[i];
  		}return attrs;
  	},
  	addEventListener: window.addEventListener,
  	removeEventListener: window.removeEventListener,
  	dispatchEvent: window.dispatchEvent,
  	getAttribute: function(name){ return String($dom.getAttribute(name));},
  	getAttributeNode: function(name){ return makeNode( $dom.getAttributeNode(name) ); },
  	getAttributeNodeNS: function(nsuri,localname){ return makeNode( $dom.getAttributeNodeNS(nsuri,localname) ); },
  	getElementsByTagName: function(name){ 
  	  //$debug("element.getElementsByTagName("+name+")");
  	  return new NodeList($dom.getElementsByTagName(name));
	  },
  	getElementsByTagNameNS: function(nsuri, localname){ return new NodeList( $dom.getElementsByTagNameNS(nsuri, localname) );},
  	hasAttribute: function(name){return $dom.hasAttribute(name);},
  	hasAttributeNS: function(nsuri,localname){return $dom.hasAttributeNS(nsuri,localname);},
  	removeAttribute: function(name){ $dom.removeAttribute(name); },
  	removeAttributeNode: function(node){ return makeNode($dom.removeAttributeNode($nodeImplCache[node.__$__])); },
  	removeAttributeNS: function(nsuri,localname){ $dom.removeAttributeNS(nsuri, localname); },
  	setAttribute: function(name,value){
  	  $dom.setAttribute(name,value);
  	  if(name === 'id' && this.ownerDocument.__html__){this.setIdAttribute(name,true);} 
	  },
  	setIdAttribute: function(name,bool){ $dom.setIdAttribute(name,bool); },
  	setAttributeNode: function(node){ return makeNode($dom.setAttributeNode($nodeImplCache[node.__$__])); },
  	setAttributeNodeNS: function(node){ return makeNode($dom.setAttributeNodeNS($nodeImplCache[node.__$__])); },
  	setAttributeNS: function(nsuri,qname,value){ $dom.setAttributeNS(nsuri,qname,value); },
  	toString: function(){ return "<" + this.tagName + (this.id ? "#" + this.id : "" ) + ">"; },
  	get xml(){
			var ret = "<" + this.tagName, attrs = this.attributes;
			for ( var i = 0; i< attrs.length;i++ ){ ret += " " + attrs[i].xml; }
			if ( this.childNodes.length || this.nodeName == "SCRIPT" ){
			  ret += ">" + this.childNodes.xml + "</" + this.tagName + ">";
			}else{
				ret += "/>";
			} return ret;
		}
  });
};

	/*
* DOMException - DOM Level 2
*/	

// For now I'm passing on this since DOMExceptions can simply flow 
// through the underlying env supplied dom implementation

$log("Defining DocumentFragment");
/* 
* DocumentFragment - DOM Level 2
*/
$w.__defineGetter__("DocumentFragment", function(){
  return function(){
    throw new Error("Object cannot be created in this context");
  };
});

var DocumentFragment = function(node, id){
  var $dom = node, 
      $id = id?id:createGUID();
  $debug("DocumentFragment " +$id);
  __extend__(this, new Node($dom, $id));
  // Nothing to extend as far as I know.  This and several other
  // classes need to be moved off of window as the constructor, though available
  // (by this I mean it wont throw a 'no such method') are not meant
  // to be used directly. Instead the document.create* is meant to be used.
  // Not perfectly sure how to implement this.  perhaps we have to examine
  // the context inside the constructor
};
//DOMImplementation
$log("Defining DOMImplementation");
$w.__defineGetter__("DOMImplementation", function(){
  return function(){
    throw new Error("Object cannot be created in this context");
  };
});

var DOMImplementation = function(){
	return {
		hasFeature: function(feature, version){
			//TODO
			return false;
		},
		createDocumentType: function(qname, publicid, systemid){
			return new __DocumentType__({
			  name:qname, publicId:publicid, systemId:systemid
			});
		},
		createDocument:function(nsuri, qname, doctype){
		  //TODO - this currently returns an empty doc
		  //but needs to handle the args
			return new HTMLDocument();
		},
		getFeature:function(feature, version){
			//TODO or TODONT?
		}
	};
};


$log("Initializing document.implementation");
var $implementation =  new DOMImplementation();$log("Defining ProcessingInstruction");
/*
* ProcessingInstruction - DOM Level 2
*/
$w.__defineGetter__('ProcessingInstruction', function(){
  return function(){
    throw new Error("Object cannot be created in this context");
  };
});

var ProcessingInstruction = function(node, id){
  var $dom = node, 
      $id = id?id:createGUID();
  $debug("ProcessingInstruction " +$id);
  __extend__(this, new Node($dom, $id));
  return __extend__(this, {
    get data(){return $dom.getData();},
    set data(data){return $dom.setData(data);},
    get target(){return $dom.getTarget();}
  });
};$log("Defining Node");
/*
* Node - DOM Level 2
*/	
$w.__defineGetter__('Node', function(){
  return __extend__(function(){
        throw new Error("Object cannot be created in this context");
      } , {
  		ELEMENT_NODE    :1,
  		ATTRIBUTE_NODE  :2,
  		TEXT_NODE       :3,
  		CDATA_SECTION_NODE: 4,
  		PROCESSING_INSTRUCTION_NODE: 7,
  		COMMENT_NODE: 8,
  		DOCUMENT_NODE: 9,
  		DOCUMENT_TYPE_NODE: 10,
  		DOCUMENT_FRAGMENT_NODE: 11
	});
});

var Node = function(node, id){
  __extend__(this, {
  		ELEMENT_NODE    :1,
  		ATTRIBUTE_NODE  :2,
  		TEXT_NODE       :3,
  		CDATA_SECTION_NODE: 4,
  		PROCESSING_INSTRUCTION_NODE: 7,
  		COMMENT_NODE: 8,
  		DOCUMENT_NODE: 9,
  		DOCUMENT_TYPE_NODE: 10,
  		DOCUMENT_FRAGMENT_NODE: 11
	});
  var $dom = node, 
      $id = id?id:createGUID();
  $debug("Node  "+$id);
  return __extend__(this, {
    get attributes(){ return null;},
		get childNodes(){ return new NodeList( $dom.getChildNodes() ); },
		get firstChild(){ return makeNode( $dom.getFirstChild() ); },
		get lastChild(){ return makeNode( $dom.getLastChild() ); },
		get localName(){ return  String($dom.getLocalName()); },
		get namespaceURI(){ return  String($dom.getNamespaceURI()); },
		get nextSibling() { return makeNode( $dom.getNextSibling() ); },
		get nodeName() {return String($dom.getNodeName()); },
		get nodeType(){ return Number($dom.getNodeType()); },
		get nodeValue(){ return $dom.getNodeValue(); },
		set nodeValue(value){ return $dom.setNodeValue(value); },
		get ownerDocument(){ return makeNode(  $dom.getOwnerDocument() ); },
		get parentNode() { return makeNode( $dom.getParentNode() ); },
		get prefix() { return $dom.getPrefix(); },
		set prefix(prefix) { return $dom.setPrefix(prefix); },
		get previousSibling() { return makeNode( $dom.getPreviousSibling() ); },
		get xml() { return this.nodeValue; },
		appendChild: function(node){ $dom.appendChild( $nodeImplCache[node.__$__] ); },
		cloneNode: function(deep){ return makeNode( $dom.cloneNode(deep) ); },
		hasAttributes: function(){ return $dom.hasAttributes(); },
		hasChildNodes: function(){ return $dom.hasChildNodes(); },
		insertBefore: function(node,before){
			$dom.insertBefore( $nodeImplCache[node.__$__], before ? $nodeImplCache[before.__$__] : before );
		},
		isSupported: function(feature,version){return $dom.isSupported(feature,version);},
		normalize: function(){return $dom.normalize();},
		removeChild: function(node){ 
		  $dom.removeChild( $nodeImplCache[node.__$__] ); 
		  $nodeCache[$nodeImplCache[node.__$__]]=null;
		  delete $nodeCache[$nodeImplCache[node.__$__]];
		  delete $nodeImplCache[node.__$__];
		  node = null;
		  delete node;
	  },
		replaceChild: function(newNode, oldNode){ 
		  $dom.replaceChild( $nodeImplCache[newNode.__$__],$nodeImplCache[oldNode.__$__] ); 
		  $nodeCache[$nodeImplCache[oldNode.__$__]]=null;
		  delete $nodeCache[$nodeImplCache[oldNode.__$__]];
		  delete $nodeImplCache[oldNode.__$__];
		  oldNode = null;
		  delete oldNode;
	  },
		toString: function(){ return '"' + this.nodeValue + '"'; },
		get __$__(){return String($id);}
  });
};


__extend__(Node, {
		ELEMENT_NODE    :1,
		ATTRIBUTE_NODE  :2,
		TEXT_NODE       :3,
		CDATA_SECTION_NODE: 4,
		PROCESSING_INSTRUCTION_NODE: 7,
		COMMENT_NODE: 8,
		DOCUMENT_NODE: 9,
		DOCUMENT_TYPE_NODE: 10,
		DOCUMENT_FRAGMENT_NODE: 11
});$log("Defining NodeList");
/*
* NodeList - DOM Level 2
*/
$w.__defineGetter__('NodeList', function(){
  return function(){
    throw new Error("Object cannot be created in this context");
  };
});

var NodeList = function(nodes){
  function toArray(nodelist){
    if(nodelist&&nodelist.getLength){
      var node, nodeArray = [];
  		for ( var i = 0; i < nodelist.getLength(); i++ ) {
  		  node = makeNode( nodelist.item(i) );
  		  if(node === null){$log(node + " = makeNode("+nodelist.item(i)+"); : NodeList");}
  			nodeArray.push(node);
  		}return nodeArray;
	  }else{return [];}
  };
	setArray(this,toArray(nodes));
	__extend__(this,{
		toString: function(){ return "[ " + Array.prototype.join.apply(this,[","]) + " ]"; },
  	item: function(index){return  this[index] ;},
  	get xml(){
  	  var xml = "";
		  for(var i=0;i<this.length;i++){ xml +=  this[i].xml; }
		  return xml;
		}
	});
	return this;
};$log("Defining DOMParser");
/*
* DOMParser
*/
$w.__defineGetter__('DOMParser', function(){
  return function(){
    return __extend__(this, {
      parseFromString: function(xmlString){
        $debug("Parsing XML String: " +xmlString);
        return document.implementation.createDocument().loadXML(xmlString);
      }
    });
  };
});

$log("Initializing Internal DOMParser.");
//keep one around for internal use
$domparser = new DOMParser();
$log("Defining Text");
/*
* Text - DOM Level 2
*/
$w.__defineGetter__("Text", function(){
  return function(){
    throw new Error("Object cannot be created in this context");
  };
});

var Text = function(node, id){
  var $dom = node, 
      $id = id?id:createGUID();
  $debug("Text " +$id);
  __extend__(this, new CharacterData($dom, $id));
  return __extend__(this, {
    splitText: function(offset){return makeNode($dom.splitText(offset));}
  });
};
/*
*	html.js
*
*	DOM Level 2 HTML
*/

var correctHTMLIds = function (node){
  var children;
  try{
    if(node.nodeType === Node.ELEMENT_NODE){
        //$log("Setting ID Attribute " + node);
        if(node.hasAttribute('id'))
          node.setIdAttribute('id',true);
      children = node.childNodes;
      for(var i=0;i<children.length;i++){
        correctHTMLIds(children.item(i));
      }
    }
  }catch(e){$log(e);}
};
			
//This extends makeNode by allowing HTML<T>Elements to be defined
function makeHTMLElement(name, node){
  //This is an html document so we need to use explicit interfaces per the 
  if(     name.match(/A/)){cacheNode(node, HTMLAnchorElement);}
  else if(name.match(/AREA/)){cacheNode(node, HTMLElement);}
  else if(name.match(/BASE/)){cacheNode(node, HTMLElement);}
  else if(name.match(/BLOCKQUOTE|Q/)){cacheNode(node, HTMLElement);}
  else if(name.match(/BODY/)){cacheNode(node, HTMLElement);}
  else if(name.match(/BR/)){cacheNode(node, HTMLElement);}
  else if(name.match(/BUTTON/)){cacheNode(node, HTMLElement);}
  else if(name.match(/CAPTION/)){cacheNode(node, HTMLElement);}
  else if(name.match(/COL|COLGROUP/)){cacheNode(node, HTMLElement);}
  else if(name.match(/DEL|INS/)){cacheNode(node, HTMLElement);}
  else if(name.match(/DIV/)){cacheNode(node, HTMLElement);}
  else if(name.match(/DL/)){cacheNode(node, HTMLElement);}
  else if(name.match(/FIELDSET/)){cacheNode(node, HTMLElement);}
  else if(name.match(/FORM/)){cacheNode(node, HTMLFormElement);}
  else if(name.match(/FRAME/)){cacheNode(node, HTMLElement);}
  else if(name.match(/FRAMESET/)){cacheNode(node, HTMLElement);}
  else if(name.match(/H1|H2|H3|H4|H5|H6/)){cacheNode(node, HTMLElement);}
  else if(name.match(/HEAD/)){cacheNode(node, HTMLElement);}
  else if(name.match(/HR/)){cacheNode(node, HTMLElement);}
  else if(name.match(/HTML/)){cacheNode(node, HTMLElement);}
  else if(name.match(/IFRAME/)){cacheNode(node, HTMLElement);}
  else if(name.match(/IMG/)){cacheNode(node, HTMLElement);}
  else if(name.match(/INPUT/)){cacheNode(node, HTMLElement);}
  else if(name.match(/LABEL/)){cacheNode(node, HTMLElement);}
  else if(name.match(/LEGEND/)){cacheNode(node, HTMLElement);}
  else if(name.match(/LI/)){cacheNode(node, HTMLElement);}
  else if(name.match(/LINK/)){cacheNode(node, HTMLElement);}
  else if(name.match(/MAP/)){cacheNode(node, HTMLElement);}
  else if(name.match(/META/)){cacheNode(node, HTMLElement);}
  else if(name.match(/OBJECT/)){cacheNode(node, HTMLElement);}
  else if(name.match(/OL/)){cacheNode(node, HTMLElement);}
  else if(name.match(/OPTGROUP/)){cacheNode(node, HTMLElement);}
  else if(name.match(/OPTION/)){cacheNode(node, HTMLElement);}
  else if(name.match(/P/)){cacheNode(node, HTMLElement);}
  else if(name.match(/PARAM/)){cacheNode(node, HTMLElement);}
  else if(name.match(/PRE/)){cacheNode(node, HTMLElement);}
  else if(name.match(/SCRIPT/)){cacheNode(node, HTMLElement);}
  else if(name.match(/SELECT/)){cacheNode(node, HTMLElement);}
  else if(name.match(/STYLE/)){cacheNode(node, HTMLElement);}
  else if(name.match(/TABLE/)){cacheNode(node, HTMLElement);}
  else if(name.match(/TBODY|TFOOT|THEAD/)){cacheNode(node, HTMLElement);}
  else if(name.match(/TD|TH/)){cacheNode(node, HTMLElement);}
  else if(name.match(/TEXTAREA/)){cacheNode(node, HTMLElement);}
  else if(name.match(/TITLE/)){cacheNode(node, HTMLElement);}
  else if(name.match(/TR/)){cacheNode(node, HTMLElement);}
  else if(name.match(/UL/)){cacheNode(node, HTMLElement);}
  else{
    $debug("Caching HTML Element " + name);
    cacheNode(node, HTMLElement);
  }
};
	
$log("Defining HTMLDocument");
/*
* HTMLDocument - DOM Level 2
*  The Document object is not directly 
*/
$w.__defineGetter__("HTMLDocument", function(){
  return function(){
    throw new Error("Object cannot be created in this context");
  };
});
var HTMLDocument = function(node){
  var $url, 
      $domain, 
      $title = "", 
      $lastModified = "",
      $refferer = "",
      $open = false;
  __extend__(this, new Document(node));
  return __extend__(this, {
    get anchors(){return new HTMLCollection(this.getElementsByName('a'), 'Anchor');},
    get applets(){return new HTMLCollection(this.getElementsByName('applet'), 'Applet');},
    get body(){ return this.getElementsByName('body')[0];},
    set body(html){return this.replaceNode(this.body,html);},
    //set/get cookie see cookie.js
    get domain(){return $domain||$w.location.domain;},
    set domain(){return; /* TODO - requires a bit of thought to enforce domain restrictions */ },
    get forms(){
      $log("document.forms");
      return new HTMLCollection(this.getElementsByName('form'), 'Form');
    },
    get images(){return new HTMLCollection(this.getElementsByName('img'), 'Image');},
    get lastModified(){ return $lastModified; /* TODO */},
    get links(){return new HTMLCollection(this.getElementsByName('link'), 'Link');},
    get referrer(){return $refferer; /* TODO */},
    get title(){return $title; /* TODO */},
    set title(title){$title = title;},
    get URL(){return $url; /* TODO*/},
		close : function(){ $open = false;/* TODO */ },
		getElementsByName : function(name){
		  $debug("document.getElementsByName ( "+name+" )");
		  return this.getElementsByTagName(name);
	  },
	  open : function(){ $open = true; /* TODO */ },
	  write: function(htmlstring){ return;/* TODO */ },
	  writeln: function(htmlstring){ this.write(htmlstring+'\n'); },
		toString: function(){ return "Document" +  (typeof $url == "string" ? ": " + $url : ""); },
		get innerHTML(){ return this.documentElement.outerHTML; },
		get __html__(){return true;}
  });
};

//This is useful as html elements that modify the dom must also run through the new 
//nodes and determine if they are javascript tags and load it.  This is really the fun 
//parts! ;)
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
};$log("Defining HTMLElement");
/*
* HTMLElement - DOM Level 2
*/
$w.__defineGetter__("HTMLElement", function(){
  return function(){
    throw new Error("Object cannot be created in this context");
  };
});

var HTMLElement = function(node){
  __extend__(this, new Element(node));  
	registerEventAttrs(this);
	return __extend__(this, {
		get className() { return this.getAttribute("class") || ""; },
		set className(val) { return this.setAttribute("class",trim(val)); },
		get dir() { return this.getAttribute("dir") || ""; },
		set dir(val) { return this.setAttribute("dir",val); },
		get id() { return this.getAttribute("id") || ""; },
		set id(val) { return this.setAttribute("id",val); },
		get innerHTML(){  return this.childNodes.xml; },
		set innerHTML(html){
		  //$debug("htmlElement.innerHTML("+html+")");
		  //Should be replaced with HTMLPARSER usage
			html = (html?html:"").replace(/<\/?([A-Z]+)/g, function(m){
				return m.toLowerCase();
			}).replace(/&nbsp;/g, " ");
			var doc = new DOMParser().
			  parseFromString('<div>'+html+'</div>');
      var elements, nodes = this.ownerDocument.importNode(doc.documentElement, true).childNodes;
			while (this.firstChild){ this.removeChild( this.firstChild );}
			for(var i = 0; i<nodes.length; i++ ){
			  this.appendChild( nodes.item(i) );
        correctHTMLIds(nodes.item(i));
		  }
		  delete doc;
		},
		get lang() { return this.getAttribute("lang") || ""; },
		set lang(val) { return this.setAttribute("lang",val); },
		offsetHeight: 0,
		offsetWidth: 0,
		offsetLeft: 0,
		offsetRight: 0,
		get offsetParent(){return;/* TODO */},
		set offsetParent(element){return;/*TODO*/},
		scrollHeight: 0,
		scrollWidth: 0,
		scrollLeft: 0, 
		scrollRight: 0,
		get style(){return null;},//new CSS2Properties(trim(this.getAttribute("style") || ""));},
		get title() { return this.getAttribute("title") || ""; },
		set title(val) { return this.setAttribute("title",val); },
		//Not in the specs but I'll leave it here for now.
		get outerHTML(){ return this.xml; },
	  scrollIntoView: function(){/*TODO*/},
		onclick: function(event){try{eval(this.getAttribute('onclick'));}catch(e){$error(e);}},
		ondblclick: function(event){try{eval(this.getAttribute('ondblclick'));}catch(e){$error(e);}},
		onkeydown: function(event){try{eval(this.getAttribute('onkeydown'));}catch(e){$error(e);}},
		onkeypress: function(event){try{eval(this.getAttribute('onkeypress'));}catch(e){$error(e);}},
		onkeyup: function(event){try{eval(this.getAttribute('onkeyup'));}catch(e){$error(e);}},
		onmousedown: function(event){try{eval(this.getAttribute('onmousedown'));}catch(e){$error(e);}},
		onmousemove: function(event){try{eval(this.getAttribute('onmousemove'));}catch(e){$error(e);}},
		onmouseout: function(event){try{eval(this.getAttribute('onmouseout'));}catch(e){$error(e);}},
		onmouseover: function(event){try{eval(this.getAttribute('onmouseover'));}catch(e){$error(e);}},
		onmouseup: function(event){try{eval(this.getAttribute('onmouseup'));}catch(e){$error(e);}}
	});
};


	var registerEventAttrs = function(elm){
    if(elm.hasAttribute('onclick')){ elm.addEventListener('click', elm.onclick ); }
    if(elm.hasAttribute('ondblclick')){ elm.addEventListener('dblclick', elm.onclick ); }
    if(elm.hasAttribute('onkeydown')){ elm.addEventListener('keydown', elm.onclick ); }
    if(elm.hasAttribute('onkeypress')){ elm.addEventListener('keypress', elm.onclick ); }
    if(elm.hasAttribute('onkeyup')){ elm.addEventListener('keyup', elm.onclick ); }
    if(elm.hasAttribute('onmousedown')){ elm.addEventListener('mousedown', elm.onclick ); }
    if(elm.hasAttribute('onmousemove')){ elm.addEventListener('mousemove', elm.onclick ); }
    if(elm.hasAttribute('onmouseout')){ elm.addEventListener('mouseout', elm.onclick ); }
    if(elm.hasAttribute('onmouseover')){ elm.addEventListener('mouseover', elm.onclick ); }
    if(elm.hasAttribute('onmouseup')){ elm.addEventListener('mouseup', elm.onclick ); }
    return elm;
	};
	
	var click = function(element){
		var event = new Event({
		  target:element,
		  currentTarget:element
		});
		event.initEvent("click");
		element.dispatchEvent(event);
	};
	var submit = function(element){
		var event = new Event({
		  target:element,
		  currentTarget:element
		});
		event.initEvent("submit");
		element.dispatchEvent(event);
	};
	var focus = function(element){
		var event = new Event({
		  target:element,
		  currentTarget:element
		});
		event.initEvent("focus");
		element.dispatchEvent(event);
	};
	var blur = function(element){
		var event = new Event({
		  target:element,
		  currentTarget:element
		});
		event.initEvent("blur");
		element.dispatchEvent(event);
	};$log("Defining HTMLFormElement");
/* 
* HTMLAnchorElement - DOM Level 2
*/
$w.__defineGetter__("Form", function(){
  return function(){
    throw new Error("Object cannot be created in this context");
  };
});
$w.__defineGetter__("HTMLFormElement", function(){
  return function(){
    throw new Error("Object cannot be created in this context");
  };
});

var HTMLFormElement = function(node){
  __extend__(this, new HTMLElement(node));
  return __extend__(this,{
    get acceptCharset(){ return this.getAttribute('acceptCharset');},
    set acceptCharset(acceptCharset){this.setAttribute('acceptCharset', acceptCharset);},
    get action(){return this.getAttribute('action');},
    set action(action){this.setAttribute('action', action);},
    get elements() {return this.getElementsByTagName("*");},
    get enctype(){return this.getAttribute('enctype');},
    set enctype(enctype){this.setAttribute('enctype', enctype);},
    get length() {return this.elements.length;},
    get method(){return this.getAttribute('method');},
    set method(action){this.setAttribute('method', method);},
		get name() { return this.getAttribute("id") || ""; },
		set name(val) { return this.setAttribute("id",val); },
		get target() { return this.getAttribute("id") || ""; },
		set target(val) { return this.setAttribute("id",val); },
		submit:function(){submit(this);},
		reset:function(){reset(this);}
  });
};


			$log("Defining HTMLCollection");
/*
* HTMLCollection - DOM Level 2
*/
$w.__defineGetter__("HTMLCollection", function(){
  return function(){
    throw new Error("Object cannot be created in this context");
  };
});

var HTMLCollection = function(nodelist, type){
  var $items = [], 
      $item, i;
  if(type === "Anchor" ){
    for(i=0;i<nodelist.length;i++){ 
      //The name property is required to be add to the collection
      if(nodelist.item(i).name){
        item = new nodelist.item(i);
        $items.push(item);
        this[nodelist.item(i).name] = item;
      }
    }
  }else if(type === "Link"){
    for(i=0;i<nodelist.length;i++){ 
      //The name property is required to be add to the collection
      if(nodelist.item(i).href){
        item = new nodelist.item(i);
        $items.push(item);
        this[nodelist.item(i).name] = item;
      }
    }
  }else if(type === "Form"){
    for(i=0;i<nodelist.length;i++){ 
      //The name property is required to be add to the collection
      if(nodelist.item(i).href){
        item = new nodelist.item(i);
        $items.push(item);
        this[nodelist.item(i).name] = item;
      }
    }
  }
  setArray(this, $items);
  return __extend__(this, {
    item : function(i){return this[i];},
    namedItem : function(name){return this[name];}
  });
};

	$log("Defining HTMLAnchorElement");
/* 
* HTMLAnchorElement - DOM Level 2
*/
$w.__defineGetter__("Anchor", function(){
  return function(){
    throw new Error("Object cannot be created in this context");
  };
});
$w.__defineGetter__("HTMLAnchorElement", function(){
  return function(){
    throw new Error("Object cannot be created in this context");
  };
});

var HTMLAnchorElement = function(node){
	var hash 	 = new RegExp('(\\#.*)'),
			hostname = new RegExp('\/\/([^\:\/]+)'),
			pathname = new RegExp('(\/[^\\?\\#]*)'),
			port 	 = new RegExp('\:(\\d+)\/'),
			protocol = new RegExp('(^\\w*\:)'),
			search 	 = new RegExp('(\\?[^\\#]*)');
  __extend__(this, new HTMLElement(node));
  return __extend__(this,{
		get accessKey() { return this.getAttribute("id") || ""; },
		set accessKey(val) { return this.setAttribute("id",val); },
		get charset() { return this.getAttribute("id") || ""; },
		set charset(val) { return this.setAttribute("id",val); },
		get coords() { return this.getAttribute("id") || ""; },
		set coords(val) { return this.setAttribute("id",val); },
		get href() { return this.getAttribute("id") || ""; },
		set href(val) { return this.setAttribute("id",val); },
		get hreflang() { return this.getAttribute("id") || ""; },
		set hreflang(val) { return this.setAttribute("id",val); },
		get name() { return this.getAttribute("id") || ""; },
		set name(val) { return this.setAttribute("id",val); },
		get rel() { return this.getAttribute("id") || ""; },
		set rel(val) { return this.setAttribute("id",val); },
		get rev() { return this.getAttribute("id") || ""; },
		set rev(val) { return this.setAttribute("id",val); },
		get shape() { return this.getAttribute("id") || ""; },
		set shape(val) { return this.setAttribute("id",val); },
		get tabIndex() { return this.getAttribute("id") || ""; },
		set tabIndex(val) { return this.setAttribute("id",val); },
		get target() { return this.getAttribute("id") || ""; },
		set target(val) { return this.setAttribute("id",val); },
		get type() { return this.getAttribute("id") || ""; },
		set type(val) { return this.setAttribute("id",val); },
		blur:function(){blur(this);},
		focus:function(){focus(this);},
		get hash(){
			var m = hash.exec(this.href);
			return m&&m.length>1?m[1]:"";
		},
		set hash(_hash){
			//setting the hash is the only property of the location object
			//that doesn't cause the window to reload
			_hash = _hash.indexOf('#')===0?_hash:"#"+_hash;	
			this.href = this.protocol + this.host + this.pathname + this.search + _hash;
		},
		get host(){
			return this.hostname + (this.port !== "")?":"+this.port:"";
		},
		set host(_host){
			this.href = this.protocol + _host + this.pathname + this.search + this.hash;
		},
		get hostname(){
			var m = hostname.exec(this.href);
			return m&&m.length>1?m[1]:"";
		},
		set hostname(_hostname){
			this.href = this.protocol + _hostname + ((this.port==="")?"":(":"+this.port)) +
			 	 this.pathname + this.search + this.hash;
		},
		get pathname(){
			var m = this.href;
			m = pathname.exec(m.substring(m.indexOf(this.hostname)));
			return m&&m.length>1?m[1]:"/";
		},
		set pathname(_pathname){
			this.href = this.protocol + this.host + _pathname + 
				this.search + this.hash;
		},
		get port(){
			var m = port.exec(this.href);
			return m&&m.length>1?m[1]:"";
		},
		set port(_port){
			this.href = this.protocol + this.hostname + ":"+_port + this.pathname + 
				this.search + this.hash;
		},
		get protocol(){
			return protocol.exec(this.href)[0];
		},
		set protocol(_protocol){
			this.href = _protocol + this.host + this.pathname + 
				this.search + this.hash;
		},
		get search(){
			var m = search.exec(this.href);
			return m&&m.length>1?m[1]:"";
		},
		set search(_search){
			this.href = this.protocol + this.host + this.pathname + 
				_search + this.hash;
		}
  });
};


			$log("Defining Event");
/*
* event.js
*/
$w.__defineGetter__("Event", function(){
  __extend__(this,{
    CAPTURING_PHASE : 1,
    AT_TARGET       : 2,
    BUBBLING_PHASE  : 3
  });
  return function(){
    throw new Error("Object cannot be created in this context");
  };
});

var Event = function(options){
  if(options === undefined){options={target:window,currentTarget:window};}
  __extend__(this,{
    CAPTURING_PHASE : 1,
    AT_TARGET       : 2,
    BUBBLING_PHASE  : 3
  });
  $log("Creating new Event");
  var $bubbles = options.bubbles?options.bubbles:true,
      $cancelable = options.cancelable?options.cancelable:true,
      $currentTarget = options.currentTarget?options.currentTarget:null,
      $eventPhase = options.eventPhase?options.eventPhase:Event.CAPTURING_PHASE,
      $target = options.eventPhase?options.eventPhase:document,
      $timestamp = options.timestamp?options.timestamp:new Date().getTime().toString(),
      $type = options.type?options.type:"";
  return __extend__(this,{
    get bubbles(){return $bubbles;},
    get cancelable(){return $cancelable;},
    get currentTarget(){return $currentTarget;},
    get eventPhase(){return $eventPhase;},
    get target(){return $target;},
    get timestamp(){return $timestamp;},
    get type(){return $type;},
    initEvent: function(type,bubbles,cancelable){
      $type=type?type:$type;
      $bubbles=bubbles?bubbles:$bubbles;
      $cancelable=cancelable?cancelable:$cancelable;
    },
    preventDefault: function(){return;/* TODO */},
    stopPropagation: function(){return;/* TODO */}
  });
};

$log("Defining MouseEvent");
/*
*	mouseevent.js
*/
$log("Defining MouseEvent");
/*
*	uievent.js
*/

var $onblur,
    $onfocus,
    $onresize;/*
* CSS2Properties - DOM Level 2 CSS
*/
$w.__defineGetter__("CSS2Properties", function(){
  return function(){
    throw new Error("Object cannot be created in this context");
  };
});


var CSS2Properties = function(options){
  var $styles = [];
  var $styleMap = {};
  for (var prop in $supportedStyles){
    $styleMap[prop] = "";
    this.__defineGetter__(prop, function(){return $styleMap[prop];});
    if(!options.readonly){
      //because the window.getComputedStyle return a CSS2Properties
      //object that is read only we make the setter optional
      this.__defineSetter__(prop, function(value){$styleMap[prop] = value;});
    }
  }
  if(options.cssText){cssTextToStyles(options.cssText);}
  function cssTextToStyles(cssText){
    $styles=[];
    var style, styles = cssText.split(';');
    for ( var i = 0; i < styles.length; i++ ) {
    	style = styles[i].split(':');
    	if ( style.length == 2 ){
  	    //keep a reference to the original name of the style which was set
  	    $styles[i]=styles[i];
  		  //camel case for dash case
  		  //this could be done much better with a match with function arg
  		  //but I'm tearing through this just to get a first pass
    	  style[0] = trim(style[0]).split('-');
    	  if(style[0].length == 2){
    	    style[0] = style[0][0]+style[0][1].substring(0,1).toUpperCase()+
    	      style[0][1].substring(1,style[0][1].length);
    	  }else{
    	    //No '-' dash present
    	    style[0] = style[0][0];
        }
    	  if($styleMap[style[0]]){
    	    //set the value internally with camelcase name so its exposed via the 'get'.
    	    $styleMap[style[0]] = trim(style[1]);
    	  };
    	}
    }
    setArray(this, $styles);
  };
  
  return __extend__(this, {
    get cssText(){$styles.join(';');},
    set cssText(cssText){ cssTextToStyles(cssText); }
  });
};

//Obviously these arent all supported but by commenting out various sections
//this provides a single location to configure what is exposed as supported.
var $supportedStyles = {
    azimuth:	"",
    background:	"",
    backgroundAttachment:	"",
    backgroundColor:	"",
    backgroundImage:	"",
    backgroundPosition:	"",
    backgroundRepeat:	"",
    border:	"",
    borderBottom:	"",
    borderBottomColor:	"",
    borderBottomStyle:	"",
    borderBottomWidth:	"",
    borderCollapse:	"",
    borderColor:	"",
    borderLeft:	"",
    borderLeftColor:	"",
    borderLeftStyle:	"",
    borderLeftWidth:	"",
    borderRight:	"",
    borderRightColor:	"",
    borderRightStyle:	"",
    borderRightWidth:	"",
    borderSpacing:	"",
    borderStyle:	"",
    borderTop:	"",
    borderTopColor:	"",
    borderTopStyle:	"",
    borderTopWidth:	"",
    borderWidth:	"",
    bottom:	"",
    captionSide:	"",
    clear:	"",
    clip:	"",
    color:	"",
    content:	"",
    counterIncrement:	"",
    counterReset:	"",
    cssFloat:	"",
    cue:	"",
    cueAfter:	"",
    cueBefore:	"",
    cursor:	"",
    direction:	"",
    display:	"",
    elevation:	"",
    emptyCells:	"",
    font:	"",
    fontFamily:	"",
    fontSize:	"",
    fontSizeAdjust:	"",
    fontStretch:	"",
    fontStyle:	"",
    fontVariant:	"",
    fontWeight:	"",
    height:	"",
    left:	"",
    letterSpacing:	"",
    lineHeight:	"",
    listStyle:	"",
    listStyleImage:	"",
    listStylePosition:	"",
    listStyleType:	"",
    margin:	"",
    marginBottom:	"",
    marginLeft:	"",
    marginRight:	"",
    marginTop:	"",
    markerOffset:	"",
    marks:	"",
    maxHeight:	"",
    maxWidth:	"",
    minHeight:	"",
    minWidth:	"",
    opacity:	"",
    orphans:	"",
    outline:	"",
    outlineColor:	"",
    outlineOffset:	"",
    outlineStyle:	"",
    outlineWidth:	"",
    overflow:	"",
    overflowX:	"",
    overflowY:	"",
    padding:	"",
    paddingBottom:	"",
    paddingLeft:	"",
    paddingRight:	"",
    paddingTop:	"",
    page:	"",
    pageBreakAfter:	"",
    pageBreakBefore:	"",
    pageBreakInside:	"",
    pause:	"",
    pauseAfter:	"",
    pauseBefore:	"",
    pitch:	"",
    pitchRange:	"",
    position:	"",
    quotes:	"",
    richness:	"",
    right:	"",
    size:	"",
    speak:	"",
    speakHeader:	"",
    speakNumeral:	"",
    speakPunctuation:	"",
    speechRate:	"",
    stress:	"",
    tableLayout:	"",
    textAlign:	"",
    textDecoration:	"",
    textIndent:	"",
    textShadow:	"",
    textTransform:	"",
    top:	"",
    unicodeBidi:	"",
    verticalAlign:	"",
    visibility:	"",
    voiceFamily:	"",
    volume:	"",
    whiteSpace:	"",
    widows:	"",
    width:	"",
    wordSpacing:	"",
    zIndex:	""
};/* 
* CSSRule - DOM Level 2
*/
$w.__defineGetter__("CSSRule", function(){
  return function(){
    throw new Error("Object cannot be created in this context");
  };
});

var CSSRule = function(options){
  var $style, 
      $selectorText = options.selectorText?options.selectorText:"";
      $style = new CSS2Properties({cssText:options.cssText?options.cssText:null});
    return __extend__(this, {
      get style(){return $style;},
      get selectorText(){return $selectorText;},
      set selectorText(selectorText){$selectorText = selectorText;}
    });
};
/* 
* CSSStyleSheet - DOM Level 2
*/
$w.__defineGetter__("CSSStyleSheet", function(){
  return function(){
    throw new Error("Object cannot be created in this context");
  };
});

var CSSStyleSheet = function(options){
    var $cssRules, 
        $disabled = options.disabled?options.disabled:false,
        $href = options.href?options.href:null,
        $parentStyleSheet = options.parentStyleSheet?options.parentStyleSheet:null,
        $title = options.title?options.title:"",
        $type = "text/css";
        
    function parseStyleSheet(text){
      //this is pretty ugly, but text is the entire text of a stylesheet
      var cssRules = [];
    	if (!text) text = "";
    	text = trim(text.replace(/\/\*(\r|\n|.)*\*\//g,""));
    	// TODO: @import ?
    	var blocks = text.split("}");
    	blocks.pop();
    	var i, len = blocks.length;
    	var definition_block, properties, selectors;
    	for (i=0; i<len; i++){
    		definition_block = blocks[i].split("{");
    		if(definition_block.length === 2){
      		selectors = definition_block[0].split(",");
      		for(var j=0;j<selectors.length;j++){
      		  cssRules.push(new CSSRule({
      		    selectorText:selectors[j],
      		    cssText:definition_block[1]
      		  }));
      		}
      		setArray($cssRules, cssRules);
    		}
    	}
    };
    parseStyleSheet(options.text);
    return __extend__(this, {
      get cssRules(){return $cssRules;},
      get rule(){return $cssRules;},//IE - may be deprecated
      get href(){return $href;},
      get parentStyleSheet(){return $parentStyleSheet;},
      get title(){return $title;},
      get type(){return $type;},
      addRule: function(selector, style, index){/*TODO*/},
      deleteRule: function(index){/*TODO*/},
      insertRule: function(rule, index){/*TODO*/},
      removeRule: function(index){this.deleteRule(index);}//IE - may be deprecated
    });
};
/*
*	location.js
*   - requires env
*/
$log("Initializing Window Location.");
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

  $log("Initializing Window History.");
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
$log("Initializing Window Navigator.");

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
	/*
* event.js
*/
// Window Events
$log("Initializing Window Event.");
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
*	xhr.js
*/
$log("Initializing Window XMLHttpRequest.");
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
			  var responseXML = null;
				self.__defineGetter__("responseXML", function(){
  				if ( self.responseText.match(/^\s*</) ) {
  				  if(responseXML){return responseXML;}
  				  else{
    					try {
    					  $log("parsing response text into xml document");
    						responseXML = $domparser.parseFromString(self.responseText);
  					    return responseXML;
    					} catch(e) { return null;/*TODO: need to flag an error here*/}
  					}
  				}else{return null;}
  			});
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
	  var header, returnedHeaders = [];
		if (this.readyState < 3){
			throw new Error("INVALID_STATE_ERR");
		} else {
			for (header in this.responseHeaders){
				returnedHeaders.push( header + ": " + this.responseHeaders[header] );
			}
		}return returnedHeaders.join("\r\n");
	},
	async: true,
	readyState: 0,
	responseText: "",
	status: 0
};/*
*	css.js
*/
$log("Initializing Window CSS");
// returns a CSS2Properties object that represents the style
// attributes and values used to render the specified element in this
// window.  Any length values are always expressed in pixel, or
// absolute values.
$w.getComputedStyle = function(elt, pseudo_elt){
  //TODO
};/*
*	screen.js
*/
$log("Initializing Window Screen.");

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
*	dialog.js
*/
$log("Initializing Window Dialogs.");
$w.alert = function(message){
 //TODO 
};

$w.confirm = function(question){
  //TODO
};

$w.prompt = function(message, defaultMsg){
  //TODO
};/*
*	document.js
*
*	DOM Level 2 /DOM level 3 (partial)
*	
*	This file adds the document object to the window and allows you
*	you to set the window.document using an html string or dom object.
*
*/

// read only reference to the Document object

$log("Initializing window.document.");
var $document =  new HTMLDocument();
var $async = false;

$log("Adding window.document features.");
$w.__defineGetter__("document", function(){
	return __extend__($document, {
		get async(){ return $async;},
		set async(async){ $async = async; },
		get baseURI(){ return $env.location('./'); },
		get URL(){ return $w.location.href;  }
	});
});

	
	/*
*	outro.js
*/


})(window, __env__); 

