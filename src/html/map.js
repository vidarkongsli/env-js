$log("Defining HTMLMapElement");
/* 
* HTMLMapElement - DOM Level 2
*/
$w.__defineGetter__("HTMLMapElement", function(){
    return function(){
        throw new Error("Object cannot be created in this context");
    };
});

var HTMLMapElement = function(ownerDocument) {
    //$log("creating anchor element");
    this.HTMLElement = HTMLElement;
    this.HTMLElement(ownerDocument);
};
HTMLMapElement.prototype = new HTMLElement;
__extend__(HTMLMapElement.prototype, {
    get areas(){
        return this.getElementsByTagName('area');
    },
    get name(){
        return this.getAttribute('name');
    },
    set name(value){
        this.setAttribute('name',value);
    }
});

			