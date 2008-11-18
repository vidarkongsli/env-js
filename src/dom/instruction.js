$log("Defining ProcessingInstruction");
/*
* ProcessingInstruction - DOM Level 2
*/
$w.__defineGetter__('ProcessingInstruction', function(){
  return function(){
    throw new Error("Object cannot be created in this context");
  };
});

var ProcessingInstruction = function(node, id){
  var $dom = node, 
      $id = id?id:createGUID();
  $debug("ProcessingInstruction " +$id);
  __extend__(this, new Node($dom, $id));
  return __extend__(this, {
    get data(){return $dom.getData();},
    set data(data){return $dom.setData(data);},
    get target(){return $dom.getTarget();}
  });
};