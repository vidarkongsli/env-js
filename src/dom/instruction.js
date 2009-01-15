$log("Defining ProcessingInstruction");
/*
* ProcessingInstruction - DOM Level 2
*/
$w.__defineGetter__('ProcessingInstruction', function(){
    return function(){
        throw new Error("Object cannot be created in this context");
    };
});

/**
 * @class  DOMProcessingInstruction - The ProcessingInstruction interface represents a "processing instruction",
 *   used in XML as a way to keep processor-specific information in the text of the document
 * @extends DOMNode
 * @author Jon van Noort (jon@webarcana.com.au)
 * @param  ownerDocument : DOMDocument - The Document object associated with this node.
 */
var DOMProcessingInstruction = function(ownerDocument) {
  this.DOMNode  = DOMNode;
  this.DOMNode(ownerDocument);
  // The target of this processing instruction.
  // XML defines this as being the first token following the markup that begins the processing instruction.
  this.target = "";
  // The content of this processing instruction.
  // This is from the first non white space character after the target to the character immediately preceding the ?>
  this.data   = "";
  this.nodeType  = DOMNode.PROCESSING_INSTRUCTION_NODE;
};
DOMProcessingInstruction.prototype = new DOMNode;
__extend__(DOMProcessingInstruction.prototype, {
    get data(){
        return this.nodeValue;
    },
    set data(data){
        // throw Exception if DOMNode is readonly
        if (this.ownerDocument.implementation.errorChecking && this._readonly) {
            throw(new DOMException(DOMException.NO_MODIFICATION_ALLOWED_ERR));
        }
        this.nodeValue = data;
    },
    get target(){
        return this.nodeName;
    },
    get xml(){
        return "<?" + this.nodeName +" "+ this.nodeValue + " ?>";
    },
    toString : function(){
        return "ProcessingInstruction #"+this._id;
    }
});
