$log("Defining HTMLQuoteElement");
/* 
* HTMLQuoteElement - DOM Level 2
*/
$w.__defineGetter__("HTMLQuoteElement", function(){
    return function(){
        throw new Error("Object cannot be created in this context");
    };
});

var HTMLQuoteElement = function(ownerDocument) {
    //$log("creating anchor element");
    this.HTMLElement = HTMLElement;
    this.HTMLElement(ownerDocument);
};
HTMLQuoteElement.prototype = new HTMLElement;
__extend__(HTMLQuoteElement.prototype, {
    get cite(){
        return this.getAttribute('cite');
    },
    set cite(value){
        this.setAttribute('cite',value);
    }
});

			