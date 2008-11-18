$log("Defining DocumentType");
;/*
* DocumentType - DOM Level 2
*/
$w.__defineGetter__('DocumentType', function(){
  return function(){
    throw new Error("Object cannot be created in this context");
  };
});

var DocumentType = function(node, id){
  var $dom = node, 
      $id = id?id:createGUID();
  $debug("DocumentType "+$id);
  __extend__(this, new Node($dom, $id));
  return __extend__(this, {
    get internalSubset(){return $dom.getInternalSubset();},
    get name(){return $dom.getName();},
    get publicId(){return $dom.getPublicId();},
    get systemId(){return $dom.getSystemId();},
    get xml(){return '<!DOCTYPE ' +this.name+ ' PUBLIC "'+this.publicId+'" "'+this.systemId+'">';}
  });
};

var __DocumentType__ = function(doctype){
  $domparser.parseString('<!DOCTYPE ' +doctype.name||''+ 
    ' PUBLIC "'+doctype.publicId||''+' '+'"'+
    doctype.systemId||''+'"><asdf></asdf>').doctype;
};