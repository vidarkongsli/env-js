$log("Defining HTMLModElement");
/* 
* HTMLModElement - DOM Level 2
*/
$w.__defineGetter__("HTMLModElement", function(){
    return function(){
        throw new Error("Object cannot be created in this context");
    };
});

var HTMLModElement = function(ownerDocument) {
    //$log("creating anchor element");
    this.HTMLElement = HTMLElement;
    this.HTMLElement(ownerDocument);
};
HTMLModElement.prototype = new HTMLElement;
__extend__(HTMLModElement.prototype, {
    get cite(){
        return this.getAttribute('cite');
    },
    set cite(value){
        this.setAttribute('cite', value);
    },
    get dateTime(){
        return this.getAttribute('datetime');
    },
    set dateTime(value){
        this.setAttribute('datetime', value);
    }
});

			