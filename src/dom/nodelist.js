$log("Defining NodeList");
/*
* NodeList - DOM Level 2
*/
$w.__defineGetter__('NodeList', function(){
  return function(){
    throw new Error("Object cannot be created in this context");
  };
});

var NodeList = function(nodes){
  function toArray(nodelist){
    if(nodelist&&nodelist.getLength){
      var node, nodeArray = [];
  		for ( var i = 0; i < nodelist.getLength(); i++ ) {
  		  node = makeNode( nodelist.item(i) );
  		  if(node === null){$log(node + " = makeNode("+nodelist.item(i)+"); : NodeList");}
  			nodeArray.push(node);
  		}return nodeArray;
	  }else{return [];}
  };
	setArray(this,toArray(nodes));
	__extend__(this,{
		toString: function(){ return "[ " + Array.prototype.join.apply(this,[","]) + " ]"; },
  	item: function(index){return  this[index] ;},
  	get xml(){
  	  var xml = "";
		  for(var i=0;i<this.length;i++){ xml +=  this[i].xml; }
		  return xml;
		}
	});
	return this;
};