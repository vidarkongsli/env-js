$debug("Defining HTMLStyleElement");
/* 
* HTMLStyleElement - DOM Level 2
*/
$w.__defineGetter__("HTMLStyleElement", function(){
    return function(){
        throw new Error("Object cannot be created in this context");
    };
});

var HTMLStyleElement = function(ownerDocument) {
    this.HTMLElement = HTMLElement;
    this.HTMLElement(ownerDocument);
};
HTMLStyleElement.prototype = new HTMLElement;
__extend__(HTMLStyleElement.prototype, {
    get disabled(){
        return this.getAttribute('disabled');
    },
    set disabled(value){
        this.setAttribute('disabled',value);
    },
    get media(){
        return this.getAttribute('media');
    },
    set media(value){
        this.setAttribute('media',value);
    },
    get type(){
        return this.getAttribute('type');
    },
    set type(value){
        this.setAttribute('type',value);
    },
});

			