$log("Defining HTMLFrameSetElement");
/* 
* HTMLFrameSetElement - DOM Level 2
*/
$w.__defineGetter__("HTMLFrameSetElement", function(){
    return function(){
        throw new Error("Object cannot be created in this context");
    };
});

var HTMLFrameSetElement = function(ownerDocument) {
    //$log("creating anchor element");
    this.HTMLElement = HTMLElement;
    this.HTMLElement(ownerDocument);
};
HTMLFrameSetElement.prototype = new HTMLElement;
__extend__(HTMLFrameSetElement.prototype, {
    get cols(){
        return this.getAttribute('cols');
    },
    set cols(value){
        this.setAttribute('cols', value);
    },
    get rows(){
        return this.getAttribute('rows');
    },
    set rows(value){
        this.setAttribute('rows', value);
    }
});

			