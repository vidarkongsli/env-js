
/*
 * HTMLLIElement
 * HTML5: 4.5.8 The li Element
 * http://dev.w3.org/html5/spec/Overview.html#the-li-element
 */
HTMLLIistElement = function(ownerDocument) {
    HTMLElement.apply(this, arguments);
};

HTMLLIistElement.prototype = new HTMLElement;
__extend__(HTMLLIistElement.prototype, {

    // TODO: attribute long value;

    toString: function() {
	return '[object HTMLLIElement]';
    }
});

