/**
* Link - HTMLElement 
*/
$w.__defineGetter__("Link", function(){
  return function(){
    throw new Error("Object cannot be created in this context");
  };
});