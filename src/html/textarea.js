$log("Defining HTMLxElement");
/* 
* HTMLxElement - DOM Level 2
*/
$w.__defineGetter__("HTMLxElement", function(){
    return function(){
        throw new Error("Object cannot be created in this context");
    };
});

var HTMLxElement = function(ownerDocument) {
    //$log("creating anchor element");
    this.HTMLElement = HTMLElement;
    this.HTMLElement(ownerDocument);
};
HTMLxElement.prototype = new HTMLElement;
__extend__(HTMLxElement.prototype, {
});

			