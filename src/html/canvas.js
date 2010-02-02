
/* 
* HTMLCanvasElement - DOM Level 2
*/
HTMLCanvasElement = function(ownerDocument) {
    this.HTMLElement = HTMLElement;
    this.HTMLElement(ownerDocument);
};
HTMLCanvasElement.prototype = new HTMLElement;
__extend__(HTMLCanvasElement.prototype, {

    // TODO: obviously a big challenge

});

	