$log("Defining HTMLFieldSetElement");
/* 
* HTMLFieldSetElement - DOM Level 2
*/
$w.__defineGetter__("HTMLFieldSetElement", function(){
    return function(){
        throw new Error("Object cannot be created in this context");
    };
});

var HTMLFieldSetElement = function(ownerDocument) {
    //$log("creating anchor element");
    this.HTMLElement = HTMLElement;
    this.HTMLElement(ownerDocument);
};
HTMLFieldSetElement.prototype = new HTMLElement;
__extend__(HTMLFieldSetElement.prototype, {
    get form(){
        var parent = this.parent;
        while(parent.nodeName.toLowerCase() != 'form'){
            parent = parent.parent;
        }
        return parent;
    }
});

			