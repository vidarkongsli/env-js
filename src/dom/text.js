$log("Defining Text");
/*
* Text - DOM Level 2
*/
$w.__defineGetter__("Text", function(){
  return function(){
    throw new Error("Object cannot be created in this context");
  };
});

var Text = function(node, id){
  var $dom = node, 
      $id = id?id:createGUID();
  $debug("Text " +$id);
  __extend__(this, new CharacterData($dom, $id));
  return __extend__(this, {
    splitText: function(offset){return makeNode($dom.splitText(offset));}
  });
};
