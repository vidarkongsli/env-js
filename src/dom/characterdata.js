$debug("Defining CharacterData");
/*
* CharacterData - DOM Level 2
*/
$w.__defineGetter__("CharacterData", function(){
  return function(){
    throw new Error("Object cannot be created in this context");
  };
});

var CharacterData = function(node, id){
  var $dom = node, 
      $id = id?id:createGUID();
  $debug("CharacterData "+$id);
  __extend__(this, new Node($dom, $id));
  return __extend__(this, {
    get data(){return $dom.getData();},
    set data(data){return $dom.setData(data);},
    get length(){return $dom.getLength();},
    appendData: function(arg){return $dom.appendData(arg);},
    deleteData: function(offset, count){ return $dom.deleteData(offset, count);},
    insertData: function(offset, arg){return $dom.insertData(offset, arg);},
    replaceData: function(offset, count, arg){return $dom.replaceData(offset, count, arg);},
    substringData: function(offset, count){return $dom.substringData(offset, count);}
  });
};