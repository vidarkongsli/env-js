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
    //we override this so we can apply browser behavior specific to head children
    //like loading scripts
    appendChild : function(newChild) {
        //$log("HTMLHeadElement.appendChild");
        var newChild = HTMLElement.prototype.appendChild.apply(this,[newChild]);
        __evalScript__(newChild);
        return newChild;
    },
    insertBefore : function(newChild, refChild) {
        //$log("HTMLHeadElement.insertBefore");
        var newChild = HTMLElement.prototype.insertBefore.apply(this,[newChild]);
        //__evalScript__(newChild);
        return newChild;
    }
});

var __evalScript__ = function(newChild){
    //check to see if this is a script element and apply a script loading strategy
    //the check against the ownerDocument isnt really enough to support frames in
    // the long run, but for now it's ok
    if(newChild.nodeType == DOMNode.ELEMENT_NODE && 
        newChild.ownerDocument == window.document ){
        if(newChild.nodeName.toUpperCase() == "SCRIPT"){
            $log("loading script via policy. parent : " + this.tagName);
            $policy.loadScript(newChild);
        }
    }
};