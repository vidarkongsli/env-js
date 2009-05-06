$debug("Defining HTMLTableCellElement");
/* 
* HTMLTableCellElement - DOM Level 2
* Implementation Provided by Steven Wood
*/
$w.__defineGetter__("HTMLTableCellElement", function(){
    return function(){
        throw new Error("Object cannot be created in this context");
    };
});

var HTMLTableCellElement = function(ownerDocument) {
    this.HTMLElement = HTMLElement;
    this.HTMLElement(ownerDocument);
};
HTMLTableCellElement.prototype = new HTMLElement;
__extend__(HTMLTableCellElement.prototype, {
    
    
    // TODO :
    
});

			