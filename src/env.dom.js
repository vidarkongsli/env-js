/*
*	env.dom.js
*
*	DOM Level 2 /DOM level 3 (partial)
*	
*	This file adds the document object to the window and allows you
*	you to set the window.document using an html string or dom object.

*	The DOMDocument is now private in scope but you can create new
*	DOMDocuments via document.implementation.createDocument which
*	now also exposes the DOM Level 3 function 'load(uri)'.
*
*	//loads syncronously by default
*	var doc = document.load('file://foo.html');
*	//alternatively
*	window.document = "<html><head><head/><body></body></html>";
*
*	//loads asynchronously by default
*	var xmldoc = document.implementation.createDocument();
*	xmldoc.load('foo.xml');
*/

(function($env, $w){
	$w.__defineGetter__("document", function(){
		var async = false;
		return extend({
			get async(){
				return async;	
			},
			set async(_async){
				async = _async;
			},
			get baseURI(){
				return $env.location('./');
			},
			get implementation(){
				return new DOMImplementation();
			},
			get URL(){
				return $w.location.href; 
			}
		}, this._dom||{});
	});
	
	$w.__defineSetter__("document", function(stringOrDOM){
		var doc = $w.document.implementation.createDocument();
		if(typeof stringOrDOM == "string"){
			this._dom = HTMLtoDOM(stringOrDOM);
		}else{
			this._dom = stringOrDOM;
		}
	});
	
	//global document
	document = $w.document;
	
	// Helper method for generating the right
	// DOM objects based upon the type
	var obj_nodes = new java.util.HashMap();

	function makeNode(node){
		if ( node ) {
			if ( !obj_nodes.containsKey( node ) )
				obj_nodes.put( node, node.getNodeType() == 1?
					new DOMElement( node ) :
					node.getNodeType() == 8 ?
					new DOMComment( node ) :
					new DOMNode( node ) );
			
			return obj_nodes.get(node);
		} else
			return null;
	};
	
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
	var DOMDocument = function(){};
	
	DOMDocument.prototype = {
		load: function(url){
			var _this = this;
			var xhr = new XMLHttpRequest();
			xhr.open("GET", url, this.async||true );
			xhr.onreadystatechange = function(){
				if(this === $w.document){
					$w.document = xhr.responseText;
				}else{
					this._dom = $env.parseXML(xhr.responseText);
				}
				var event = document.createEvent();
				event.initEvent("load");
				$w.dispatchEvent( event );
			};
			xhr.send();
			this._uri = uri;
			
			if ( !obj_nodes.containsKey( this._dom ) )
				obj_nodes.put( this._dom, this );
		},
		get nodeType(){
			return 9;
		},
		createTextNode: function(text){
			return makeNode( this._dom.createTextNode(
				text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")) );
		},
		createElement: function(name){
			return makeNode( this._dom.createElement(name.toLowerCase()) );
		},
		getElementsByTagName: function(name){
			return new DOMNodeList( this._dom.getElementsByTagName(
				name.toLowerCase()) );
		},
		getElementsByName: function(name){
			var elems = this._dom.getElementsByTagName("*"), ret = [];
			ret.item = function(i){ return this[i]; };
			ret.getLength = function(){ return this.length; };
			
			for ( var i = 0; i < elems.length; i++ ) {
				var elem = elems.item(i);
				if ( elem.getAttribute("name") == name )
					ret.push( elem );
			}
			
			return new DOMNodeList( ret );
		},
		getElementById: function(id){
			var elems = this._dom.getElementsByTagName("*");
			
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
			return makeNode( this._dom.getDocumentElement() );
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
			return makeNode( this._dom.importNode(node._dom, deep) );
		},
		toString: function(){
			return "Document" + (typeof this._url == "string" ?
				": " + this._url : "");
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
							
							if ( prop == "opacity" && val == "" )
								val = "1";
								
							return val;
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
		}
	};
	
	function getDocument(node){
		return obj_nodes.get(node);
	}
	
	// DOM NodeList
	
	window.DOMNodeList = function(list){
		this._dom = list;
		this.length = list.getLength();
		
		for ( var i = 0; i < this.length; i++ ) {
			var node = list.item(i);
			this[i] = makeNode( node );
		}
	};
	
	DOMNodeList.prototype = {
		toString: function(){
			return "[ " +
				Array.prototype.join.call( this, ", " ) + " ]";
		},
		get outerHTML(){
			return Array.prototype.map.call(
				this, function(node){return node.outerHTML;}).join('');
		}
	};
	
	// DOM Node
	
	window.DOMNode = function(node){
		this._dom = node;
	};
	
	DOMNode.prototype = {
		get nodeType(){
			return this._dom.getNodeType();
		},
		get nodeValue(){
			return this._dom.getNodeValue();
		},
		get nodeName() {
			return this._dom.getNodeName();
		},
		get childNodes(){
			return new DOMNodeList( this._dom.getChildNodes() );
		},
		cloneNode: function(deep){
			return makeNode( this._dom.cloneNode(deep) );
		},
		get ownerDocument(){
			return getDocument( this._dom.ownerDocument );
		},
		get documentElement(){
			return makeNode( this._dom.documentElement );
		},
		get parentNode() {
			return makeNode( this._dom.getParentNode() );
		},
		get nextSibling() {
			return makeNode( this._dom.getNextSibling() );
		},
		get previousSibling() {
			return makeNode( this._dom.getPreviousSibling() );
		},
		toString: function(){
			return '"' + this.nodeValue + '"';
		},
		get outerHTML(){
			return this.nodeValue;
		}
	};

	window.DOMComment = function(node){
		this._dom = node;
	};

	DOMComment.prototype = extend(new DOMNode(), {
		get nodeType(){
			return 8;
		},
		get outerHTML(){
			return "<!--" + this.nodeValue + "-->";
		}
	});

	// DOM Element

	window.DOMElement = function(elem){
		this._dom = elem;
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
	};
	
	DOMElement.prototype = extend( new DOMNode(), {
		get nodeName(){
			return this.tagName;
		},
		get tagName(){
			return this._dom.getTagName().toUpperCase();
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
			var attr = {}, attrs = this._dom.getAttributes();
			
			for ( var i = 0; i < attrs.getLength(); i++ )
				attr[ attrs.item(i).nodeName ] = attrs.item(i).nodeValue;
				
			return attr;
		},
		
		get innerHTML(){
			return this.childNodes.outerHTML;	
		},
		set innerHTML(html){
			html = html.replace(/<\/?([A-Z]+)/g, function(m){
				return m.toLowerCase();
			}).replace(/&nbsp;/g, " ");
			
			var nodes = this.ownerDocument.importNode(
				HTMLtoDOM("<wrap>" + html + "</wrap>").documentElement, 
				true
			).childNodes;
				
			while (this.firstChild)
				this.removeChild( this.firstChild );
			
			for ( var i = 0; i < nodes.length; i++ )
				this.appendChild( nodes[i] );
		},
		
		get textContent(){
			return nav(this.childNodes);
			
			function nav(nodes){
				var str = "";
				for ( var i = 0; i < nodes.length; i++ )
					if ( nodes[i].nodeType == 3 )
						str += nodes[i].nodeValue;
					else if ( nodes[i].nodeType == 1 )
						str += nav(nodes[i].childNodes);
				return str;
			}
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
						
						for ( var i = 1; i < opt.length; i++ )
							if ( opt[i].selected ) {
								select = false;
								break;
							}
							
						if ( select )
							this.selected = true;
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
			return this._dom.hasAttribute(name) ?
				new String( this._dom.getAttribute(name) ) :
				null;
		},
		setAttribute: function(name,value){
			this._dom.setAttribute(name,value);
		},
		removeAttribute: function(name){
			this._dom.removeAttribute(name);
		},
		
		get childNodes(){
			return new DOMNodeList( this._dom.getChildNodes() );
		},
		get firstChild(){
			return makeNode( this._dom.getFirstChild() );
		},
		get lastChild(){
			return makeNode( this._dom.getLastChild() );
		},
		appendChild: function(node){
			this._dom.appendChild( node._dom );
		},
		insertBefore: function(node,before){
			this._dom.insertBefore( node._dom, before ? before._dom : before );
			
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
			this._dom.removeChild( node._dom );
		},

		getElementsByTagName: Document.prototype.getElementsByTagName,
		
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
			} else
				return null;
		}
	});
	
})(window);