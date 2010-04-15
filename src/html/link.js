
/*
 * HTMLLinkElement - DOM Level 2
 *
 * HTML5: 4.8.12 The map element
 * http://dev.w3.org/html5/spec/Overview.html#the-map-element
 */
HTMLLinkElement = function(ownerDocument) {
    HTMLElement.apply(this, arguments);
};
HTMLLinkElement.prototype = new HTMLElement();
__extend__(HTMLLinkElement.prototype, {
    get disabled(){
        return this.getAttribute('disabled');
    },
    set disabled(value){
        this.setAttribute('disabled',value);
    },
    get charset(){
        return this.getAttribute('charset');
    },
    set charset(value){
        this.setAttribute('charset',value);
    },
    get href(){
        return this.getAttribute('href');
    },
    set href(value){
        this.setAttribute('href',value);
    },
    get hreflang(){
        return this.getAttribute('hreflang');
    },
    set hreflang(value){
        this.setAttribute('hreflang',value);
    },
    get media(){
        return this.getAttribute('media');
    },
    set media(value){
        this.setAttribute('media',value);
    },
    get rel(){
        return this.getAttribute('rel');
    },
    set rel(value){
        this.setAttribute('rel',value);
    },
    get rev(){
        return this.getAttribute('rev');
    },
    set rev(value){
        this.setAttribute('rev',value);
    },
    get target(){
        return this.getAttribute('target');
    },
    set target(value){
        this.setAttribute('target',value);
    },
    get type(){
        return this.getAttribute('type');
    },
    set type(value){
        this.setAttribute('type',value);
    },
    toString: function() {
        return '[object HTMLLinkElement]';
    }
});

__loadLink__ = function(node, value) {
    var event;
    var owner = node.ownerDocument;

    if (owner.fragment) {
        /**
         * if we are in an innerHTML fragment parsing step
         * then ignore.  It will be handled once the fragment is
         * added to the real doco
         */
        return;
    }

    if (node.parentNode === null) {
        /*
         * if a <link> is parentless (normally by create a new link
         * via document.createElement('link'), then do *not* fire an
         * event, even if it has a valid 'href' attribute.
         */
        return;
    }
    if (value != '' && (!Envjs.loadLink ||
                        (Envjs.loadLink &&
                         Envjs.loadLink(node, value)))) {
        // value has to be something (easy)
        // if the user-land API doesn't exist
        // Or if the API exists and it returns true, then ok:
        event = document.createEvent('Events');
        event.initEvent('load');
    } else {
        // oops
        event = document.createEvent('Events');
        event.initEvent('error');
    }
    node.dispatchEvent(event, false);
};

__extend__(HTMLLinkElement.prototype, {
    setAttribute: function(name, value) {
        var result = HTMLElement.prototype.setAttribute.apply(this, arguments);
        if (name === 'href') {
            __loadLink__(this, value);
        }
        return result;
    },
    setAttributeNS: function(namespaceURI, name, value) {
        var result = HTMLElement.prototype.setAttributeNS.apply(this, arguments);
        if (name === 'href') {
            __loadLink__(this, value);
        }
        return result;
    },
    setAttributeNode: function(newnode) {
        var result = HTMLElement.prototype.setAttributeNode.apply(this, arguments);
        var src = this.getAttribute('href');
        if (src) {
            __loadLink__(this, src);
        }
        return result;
    },
    setAttributeNodeNS: function(newnode) {
        var result = HTMLElement.prototype.setAttributeNodeNS.apply(this, arguments);
        var src = this.getAttribute('href');
        if (src) {
            __loadLink__(this, src);
        }
        return result;
    },
    onload: function(event){
        __eval__(this.getAttribute('onload')||'', this);
    },
});
