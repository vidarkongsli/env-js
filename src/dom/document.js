$log("Defining Document");
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
};