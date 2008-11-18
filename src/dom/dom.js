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
  };