$log("Defining Attr");
/*
* Attr - DOM Level 2
*/
$w.__defineGetter__("Attr", function(){
  return function(){
    throw new Error("Object cannot be created in this context");
  };
});

var Attr = function(node, id){
  var $dom = node, 
      $id = id?id:createGUID();
  $debug("Attr "+$id);
  __extend__(this, new Node($dom, $id));
  return __extend__(this, {
    get name(){return String($dom.getName()); },
    get ownerElement(){ return makeNode( $dom.getOwnerElement() );},
    get specified(){ return makeNode( $dom.getSpecified() );},
    get value(){return String($dom.getValue()); },
    set value(value){return $dom.setValue(value); },
    get xml(){return this.nodeName + "='" + this.nodeValue + "' ";}
  });
};