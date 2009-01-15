$log("Defining DocumentType");
;/*
* DocumentType - DOM Level 2
*/
$w.__defineGetter__('DocumentType', function(){
  return function(){
    throw new Error("Object cannot be created in this context");
  };
});

var DOMDocumentType    = function() { $error("DOMDocumentType.constructor(): Not Implemented"   ); };