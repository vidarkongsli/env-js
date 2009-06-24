$debug("Defining HTMLTitleElement");
/* 
* HTMLTitleElement - DOM Level 2
*/
var HTMLTitleElement = function(ownerDocument) {
    this.HTMLElement = HTMLElement;
    this.HTMLElement(ownerDocument);
};
HTMLTitleElement.prototype = new HTMLElement;
__extend__(HTMLTitleElement.prototype, {
    $recursivelyGatherTextFromNodeTree: function(aNode) {
        var accumulateText = "";
        var idx; var n;
        for (idx=0;idx < aNode.childNodes.length;idx++){
            n = aNode.childNodes.item(idx);
	    if      (n.nodeType == DOMNode.TEXT_NODE)
                accumulateText += n.data;
            else
                accumulateText += this.$recursivelyGatherTextFromNodeTree(n);
        }

        return accumulateText;
    },
    get text() {
        return this.$recursivelyGatherTextFromNodeTree(this);
    },

    set text(titleStr) {
        this.innerHTML = titleStr; // if paranoid, would error on embedded HTML
    }
});

$w.HTMLTitleElement = HTMLTitleElement;
