$log("Defining HTMLCollection");
/*
* HTMLCollection - DOM Level 2
*/
$w.__defineGetter__("HTMLCollection", function(){
  return function(){
    throw new Error("Object cannot be created in this context");
  };
});

/*var HTMLCollection = function(nodelist, type){
  var $items = [], 
      $item, i;
  if(type === "Anchor" ){
    for(i=0;i<nodelist.length;i++){ 
      //The name property is required to be add to the collection
      if(nodelist.item(i).name){
        item = new nodelist.item(i);
        $items.push(item);
        this[nodelist.item(i).name] = item;
      }
    }
  }else if(type === "Link"){
    for(i=0;i<nodelist.length;i++){ 
      //The name property is required to be add to the collection
      if(nodelist.item(i).href){
        item = new nodelist.item(i);
        $items.push(item);
        this[nodelist.item(i).name] = item;
      }
    }
  }else if(type === "Form"){
    for(i=0;i<nodelist.length;i++){ 
      //The name property is required to be add to the collection
      if(nodelist.item(i).href){
        item = new nodelist.item(i);
        $items.push(item);
        this[nodelist.item(i).name] = item;
      }
    }
  }
  setArray(this, $items);
  return __extend__(this, {
    item : function(i){return this[i];},
    namedItem : function(name){return this[name];}
  });
};*/

	