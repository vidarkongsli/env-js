
/* 
* HTMLQuoteElement - DOM Level 2
*/
HTMLQuoteElement = function(ownerDocument) {
    HTMLElement.apply(this, arguments);
};
HTMLQuoteElement.prototype = new HTMLElement;
__extend__(HTMLQuoteElement.prototype, {
    get cite(){
        return this.getAttribute('cite');
    },
    set cite(value){
        this.setAttribute('cite',value);
    }
});
