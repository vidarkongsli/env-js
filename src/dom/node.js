$log("Defining Node");
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
});