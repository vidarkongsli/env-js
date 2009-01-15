$log("Defining HTMLLegendElement");
/* 
* HTMLLegendElement - DOM Level 2
*/
$w.__defineGetter__("HTMLLegendElement", function(){
    return function(){
        throw new Error("Object cannot be created in this context");
    };
});

var HTMLLegendElement = function(ownerDocument) {
    this.HTMLElement = HTMLElement;
    this.HTMLElement(ownerDocument);
};
HTMLLegendElement.prototype = new HTMLElement;
__extend__(HTMLLegendElement.prototype, {
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
    }
});

			