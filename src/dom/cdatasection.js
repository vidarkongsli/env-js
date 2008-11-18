$log("Defining CDATASection");
/*
* CDATASection - DOM Level 2
*/
$w.__defineGetter__("CDATASection", function(){
  return function(){
    throw new Error("Object cannot be created in this context");
  };
});

var CDATASection = function(node, id){
  var $dom = node, 
      $id = id?id:createGUID();
  $debug("CDATASection "+$id);
  __extend__(this, new Text($dom, $id));
  return __extend__(this,{
    get xml(){return "<![CDATA[" + this.nodeValue + "]]>";}
  });
};
