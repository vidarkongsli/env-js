
/**
 * HTMLScriptElement - DOM Level 2
 *
 * HTML5: 4.3.1 The script element
 * http://dev.w3.org/html5/spec/Overview.html#script
 */
HTMLScriptElement = function(ownerDocument) {
    HTMLElement.apply(this, arguments);
};
HTMLScriptElement.prototype = new HTMLElement;
__extend__(HTMLScriptElement.prototype, {

    /**
     * HTML5 spec @ http://dev.w3.org/html5/spec/Overview.html#script
     *
     * "The IDL attribute text must return a concatenation of the
     * contents of all the text nodes that are direct children of the
     * script element (ignoring any other nodes such as comments or
     * elements), in tree order. On setting, it must act the same way
     * as the textContent IDL attribute."
     *
     * AND... "The term text node refers to any Text node,
     * including CDATASection nodes; specifically, any Node with node
     * type TEXT_NODE (3) or CDATA_SECTION_NODE (4)"
     */
    get text() {
        var kids = this.childNodes;
        var kid;
        var s = '';
        var imax = kids.length;
        for (var i = 0; i < imax; ++i) {
            kid = kids[i];
            if (kid.nodeType == Node.TEXT_NODE || kid.nodeType == Node.CDATA_SECTION_NODE) {
                s += kid.nodeValue;
            }
        }
        return s;
    },

    /**
     * HTML5 spec "Can be set, to replace the element's children with
     * the given value."   It *does not* execute the script!
     */
    set text(value) {
        // this deletes all children, and make a new single text node
        // with value
        this.textContent = value;

        // it does not execute, but leaving this in for now
        // only when the script is added THE FIRST time does
        // this execute.
        Envjs.loadInlineScript(this);
    },

    get htmlFor(){
        return this.getAttribute('for');
    },
    set htmlFor(value){
        this.setAttribute('for',value);
    },
    get event(){
        return this.getAttribute('event');
    },
    set event(value){
        this.setAttribute('event',value);
    },
    get charset(){
        return this.getAttribute('charset');
    },
    set charset(value){
        this.setAttribute('charset',value);
    },
    get defer(){
        return this.getAttribute('defer');
    },
    set defer(value){
        this.setAttribute('defer',value);
    },
    get src(){
        return this.getAttribute('src')||'';
    },
    set src(value){
        this.setAttribute('src',value);
    },
    get type(){
        return this.getAttribute('type')||'';
    },
    set type(value){
        this.setAttribute('type',value);
    },
    onload: HTMLEvents.prototype.onload,
    onerror: HTMLEvents.prototype.onerror,
    toString: function() {
        return '[object HTMLScriptElement]';
    }

});

