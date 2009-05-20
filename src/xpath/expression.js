/**
 * @author thatcher
 */
$debug("Defining XPathExpression");
/*
* XPathExpression 
*/
$w.__defineGetter__("XPathExpression", function(){
    throw new Error("Object cannot be created in this context");
});

var XPathExpression = function() {};
__extend__(XPathExpression.prototype, {
    evaluate: function(){
        //TODO
    }
});