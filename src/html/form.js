$log("Defining HTMLFormElement");
/* 
* HTMLAnchorElement - DOM Level 2
*/
$w.__defineGetter__("Form", function(){
  return function(){
    throw new Error("Object cannot be created in this context");
  };
});
$w.__defineGetter__("HTMLFormElement", function(){
  return function(){
    throw new Error("Object cannot be created in this context");
  };
});

var HTMLFormElement = function(node){
  __extend__(this, new HTMLElement(node));
  return __extend__(this,{
    get acceptCharset(){ return this.getAttribute('acceptCharset');},
    set acceptCharset(acceptCharset){this.setAttribute('acceptCharset', acceptCharset);},
    get action(){return this.getAttribute('action');},
    set action(action){this.setAttribute('action', action);},
    get elements() {return this.getElementsByTagName("*");},
    get enctype(){return this.getAttribute('enctype');},
    set enctype(enctype){this.setAttribute('enctype', enctype);},
    get length() {return this.elements.length;},
    get method(){return this.getAttribute('method');},
    set method(action){this.setAttribute('method', method);},
		get name() { return this.getAttribute("id") || ""; },
		set name(val) { return this.setAttribute("id",val); },
		get target() { return this.getAttribute("id") || ""; },
		set target(val) { return this.setAttribute("id",val); },
		submit:function(){submit(this);},
		reset:function(){reset(this);}
  });
};


			