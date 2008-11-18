$log("Defining Element");
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

	