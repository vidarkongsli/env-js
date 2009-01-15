$log("Defining DocumentFragment");
/* 
* DocumentFragment - DOM Level 2
*/
$w.__defineGetter__("DocumentFragment", function(){
    return function(){
        throw new Error("Object cannot be created in this context");
    };
});

/**
 * @class  DOMDocumentFragment - DocumentFragment is a "lightweight" or "minimal" Document object.
 * @extends DOMNode
 * @author Jon van Noort (jon@webarcana.com.au) and David Joham (djoham@yahoo.com)
 * @param  ownerDocument : DOMDocument - The Document object associated with this node.
 */
var DOMDocumentFragment = function(ownerDocument) {
  this.DOMNode = DOMNode;
  this.DOMNode(ownerDocument);
  this.nodeName  = "#document-fragment";
  this.nodeType = DOMNode.DOCUMENT_FRAGMENT_NODE;
};
DOMDocumentFragment.prototype = new DOMNode;
__extend__(DOMDocumentFragment.prototype,{
    get xml(){
        var xml = "",
            count = this.childNodes.length;
        
        // create string concatenating the serialized ChildNodes
        for (var i = 0; i < count; i++) {
            xml += this.childNodes.item(i).xml;
        }
        
        return xml;
    },
    toString : function(){
        return "DocumentFragment #"+this._id;
    }
});
