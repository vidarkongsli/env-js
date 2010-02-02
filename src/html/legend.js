
/**
 * HTMLLegendElement - DOM Level 2
 */
HTMLLegendElement = function(ownerDocument) {
    this.HTMLInputCommon = HTMLInputCommon;
    this.HTMLInputCommon(ownerDocument);
};
HTMLLegendElement.prototype = new HTMLInputCommon;
__extend__(HTMLLegendElement.prototype, {
    get align(){
        return this.getAttribute('align');
    },
    set align(value){
        this.setAttribute('align',value);
    }
});

