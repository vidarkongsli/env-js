$log("Defining DocumentFragment");
/* 
* DocumentFragment - DOM Level 2
*/
$w.__defineGetter__("DocumentFragment", function(){
  return function(){
    throw new Error("Object cannot be created in this context");
  };
});

var DocumentFragment = function(node, id){
  var $dom = node, 
      $id = id?id:createGUID();
  $debug("DocumentFragment " +$id);
  __extend__(this, new Node($dom, $id));
  // Nothing to extend as far as I know.  This and several other
  // classes need to be moved off of window as the constructor, though available
  // (by this I mean it wont throw a 'no such method') are not meant
  // to be used directly. Instead the document.create* is meant to be used.
  // Not perfectly sure how to implement this.  perhaps we have to examine
  // the context inside the constructor
};
