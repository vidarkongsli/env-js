
/** 
 * HTMLUnknownElement DOM Level 2
 */
HTMLUnknownElement = function(ownerDocument) {
    this.HTMLElement = HTMLElement;
    this.HTMLElement(ownerDocument);

};
HTMLUnknownElement.prototype = new HTMLElement;
__extend__(HTMLUnknownElement.prototype,{
    toString: function(){
        return '[object HTMLUnknownElement]';
    }
});
