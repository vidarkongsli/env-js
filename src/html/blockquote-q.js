
/*
 * HTMLQuoteElement - DOM Level 2
 * HTML5: 4.5.5 The blockquote element
 * http://dev.w3.org/html5/spec/Overview.html#htmlquoteelement
 */
HTMLQuoteElement = function(ownerDocument) {
    HTMLElement.apply(this, arguments);
};
__extend__(HTMLQuoteElement.prototype, HTMLElement.prototype);
__extend__(HTMLQuoteElement.prototype, {
    get cite(){
        return this.getAttribute('cite');
    },
    set cite(value){
        this.setAttribute('cite',value);
    },
    toString: function() {
        return '[object HTMLQuoteElement]';
    }
});
