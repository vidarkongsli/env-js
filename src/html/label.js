$debug("Defining HTMLLabelElement");
/* 
* HTMLLabelElement - DOM Level 2
*/
$w.__defineGetter__("HTMLLabelElement", function(){
    return function(){
        throw new Error("Object cannot be created in this context");
    };
});

var HTMLLabelElement = function(ownerDocument) {
    this.HTMLElement = HTMLElement;
    this.HTMLElement(ownerDocument);
};
HTMLLabelElement.prototype = new HTMLElement;
__extend__(HTMLLabelElement.prototype, {
    get form(){
        var parent = this.parent;
        while(parent.nodeName.toLowerCase() != 'form'){
            parent = parent.parent;
        }
        return parent;
    },
    get accessKey(){
        return this.getAttribute('accesskey');
    },
    set accessKey(value){
        this.setAttribute('accesskey',value);
    },
    get htmlFor(){
        return this.getAttribute('for');
    },
    set htmlFor(value){
        this.setAttribute('for',value);
    }
});

			