
/*
* HTMLParagraphElement - DOM Level 2
*/
HTMLParagraphElement = function(ownerDocument) {
    this.HTMLElement = HTMLElement;
    this.HTMLElement(ownerDocument);
};
HTMLParagraphElement.prototype = new HTMLElement;
__extend__(HTMLParagraphElement.prototype, {
    toString: function(){
        return '[object HTMLParagraphElement]';
    }
});

