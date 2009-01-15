$log("Defining HTMLOptGroupElement");
/* 
* HTMLOptGroupElement - DOM Level 2
*/
$w.__defineGetter__("HTMLOptGroupElement", function(){
    return function(){
        throw new Error("Object cannot be created in this context");
    };
});

var HTMLOptGroupElement = function(ownerDocument) {
    //$log("creating anchor element");
    this.HTMLElement = HTMLElement;
    this.HTMLElement(ownerDocument);
};
HTMLOptGroupElement.prototype = new HTMLElement;
__extend__(HTMLOptGroupElement.prototype, {
    get disabled(){
        return this.getAttribute('disabled');
    },
    set disabled(value){
        this.setAttribute('disabled',value);
    },
    get label(){
        return this.getAttribute('label');
    },
    set label(value){
        this.setAttribute('label',value);
    },
});

			