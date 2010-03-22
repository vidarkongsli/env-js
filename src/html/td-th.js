
/**
 * HTMLTableCellElement - DOM Level 2
 * Implementation Provided by Steven Wood
 */
HTMLTableCellElement = function(ownerDocument) {
    HTMLElement.apply(this, arguments);
};
HTMLTableCellElement.prototype = new HTMLElement;
__extend__(HTMLTableCellElement.prototype, {

    // TODO :

});

// NOTE:
// HTMLTableCellElement isn't directly used.
// http://dev.w3.org/html5/spec/Overview.html#the-th-element
// HTMLTableHeaderCellElement (td) inherits from it
//  and adds "scope"
//  remember to change the "toString"

//
// http://dev.w3.org/html5/spec/Overview.html#the-td-element
// td just inherits from HTMLTableCellElement, but adds nothing
//  remember to change the "toString"
//