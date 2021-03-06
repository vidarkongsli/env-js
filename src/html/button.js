
/*
 * HTMLButtonElement - DOM Level 2
 *
 * HTML5: 4.10.6 The button element
 * http://dev.w3.org/html5/spec/Overview.html#the-button-element
 */
HTMLButtonElement = function(ownerDocument) {
    HTMLTypeValueInputs.apply(this, arguments);
};
HTMLButtonElement.prototype = new HTMLTypeValueInputs();
__extend__(HTMLButtonElement.prototype, inputElements_status);
__extend__(HTMLButtonElement.prototype, {
    get dataFormatAs(){
        return this.getAttribute('dataFormatAs');
    },
    set dataFormatAs(value){
        this.setAttribute('dataFormatAs',value);
    },
    toString: function() {
        return '[object HTMLButtonElement]';
    }
});

