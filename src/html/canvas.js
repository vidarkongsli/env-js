$debug("Defining HTMLCanvasElement");
/* 
* HTMLCanvasElement - DOM Level 2
*/
$w.__defineGetter__("HTMLCanvasElement", function(){
    return function(){
        throw new Error("Object cannot be created in this context");
    };
});

var HTMLxElement = function(ownerDocument) {
    this.HTMLElement = HTMLElement;
    this.HTMLElement(ownerDocument);
};
HTMLxElement.prototype = new HTMLElement;
__extend__(HTMLxElement.prototype, {
});

			