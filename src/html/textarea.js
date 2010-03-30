
/**
 * HTMLTextAreaElement - DOM Level 2
 * HTML5: 4.10.11 The textarea element
 * http://dev.w3.org/html5/spec/Overview.html#the-textarea-element
 */
HTMLTextAreaElement = function(ownerDocument) {
    HTMLInputAreaCommon.apply(this, arguments);
};
HTMLTextAreaElement.prototype = new HTMLInputAreaCommon();
__extend__(HTMLTextAreaElement.prototype, {
    get cols(){
        return this.getAttribute('cols');
    },
    set cols(value){
        this.setAttribute('cols', value);
    },
    get rows(){
        return this.getAttribute('rows');
    },
    set rows(value){
        this.setAttribute('rows', value);
    },
    toString: function() {
        return '[object HTMLTextAreaElement]';
    }
});

