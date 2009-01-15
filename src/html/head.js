$log("Defining HTMLHeadElement");
/* 
* HTMLHeadElement - DOM Level 2
*/
$w.__defineGetter__("HTMLHeadElement", function(){
    return function(){
        throw new Error("Object cannot be created in this context");
    };
});

var HTMLHeadElement = function(ownerDocument) {
    this.HTMLElement = HTMLElement;
    this.HTMLElement(ownerDocument);
};
HTMLHeadElement.prototype = new HTMLElement;
__extend__(HTMLHeadElement.prototype, {
    get profile(){
        return this.getAttribute('profile');
    },
    set profile(value){
        this.setAttribute('profile', value);
    },
});

			