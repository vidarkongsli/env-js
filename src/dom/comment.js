$log("Defining Comment");
/* 
* Comment - DOM Level 2
*/
$w.__defineGetter__("Comment", function(){
  return function(){
    throw new Error("Object cannot be created in this context");
  };
});

var Comment = function(node, id){
  var $dom = node, 
      $id = id?id:createGUID();
  $debug("Comment "+$id);
  __extend__(this, new CharacterData($dom, $id));
  return __extend__(this,{
    get xml(){return "<!-- " + this.nodeValue + " -->";}
  });
};

	