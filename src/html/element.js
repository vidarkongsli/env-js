$log("Defining HTMLElement");
/*
* HTMLElement - DOM Level 2
*/
$w.__defineGetter__("HTMLElement", function(){
    return function(){
        throw new Error("Object cannot be created in this context");
    };
});

var HTMLElement = function(ownerDocument) {
    //$log("\tcreating html element");
    this.DOMElement = DOMElement;
    this.DOMElement(ownerDocument);
    //$log("\nfinished creating html element");
    
    this.$css2props = null;
};
HTMLElement.prototype = new DOMElement;
__extend__(HTMLElement.prototype, {
		get className() { 
		    return this.getAttribute("class")||""; 
		    
	    },
		set className(val) { 
		    return this.setAttribute("class",trim(val)); 
		    
	    },
		get dir() { 
		    return this.getAttribute("dir")||"ltr"; 
		    
	    },
		set dir(val) { 
		    return this.setAttribute("dir",val); 
		    
	    },
		get innerHTML(){  
		    return this.childNodes.xml; 
		    
	    },
		set innerHTML(html){
		    //$debug("htmlElement.innerHTML("+html+")");
		    //Should be replaced with HTMLPARSER usage
		    var doc = new DOMParser().
			  parseFromString('<div>'+html+'</div>');
            var parent = this.ownerDocument.importNode(doc.documentElement, true);
            
			//$log("\n\nIMPORTED HTML:\n\n"+nodes.xml);
			while(this.firstChild != null){
			    //$log('innerHTML - removing child '+ this.firstChild.xml);
			    this.removeChild( this.firstChild );
			}
			while(parent.firstChild != null){
			    //$log('innerHTML - appending child '+ parent.firstChild.xml);
			    this.appendChild( parent.removeChild( parent.firstChild ) );
		    }
		    //Mark for garbage collection
		    doc = null;
		},
		get lang() { 
		    return this.getAttribute("lang")||""; 
		    
	    },
		set lang(val) { 
		    return this.setAttribute("lang",val); 
		    
	    },
		get offsetHeight(){
		    return Number(this.style["height"].replace("px",""));
		},
		get offsetWidth(){
		    return Number(this.style["width"].replace("px",""));
		},
		offsetLeft: 0,
		offsetRight: 0,
		get offsetParent(){
		    /* TODO */
		    return;
	    },
		set offsetParent(element){
		    /* TODO */
		    return;
	    },
		scrollHeight: 0,
		scrollWidth: 0,
		scrollLeft: 0, 
		scrollRight: 0,
		get style(){
		    if(this.$css2props === null){
		        $log("Initializing new css2props for html element : " + this.getAttribute("style"));
		        this.$css2props = new CSS2Properties({
    		        cssText:this.getAttribute("style")
    	        });
	        }
	        return this.$css2props
		},
		get title() { 
		    return this.getAttribute("title")||""; 
		    
	    },
		set title(val) { 
		    return this.setAttribute("title",val); 
		    
	    },
		//Not in the specs but I'll leave it here for now.
		get outerHTML(){ 
		    return this.xml; 
		    
	    },
	    scrollIntoView: function(){
	        /*TODO*/
	        return;
	    
        },
		onclick: function(event){
		    try{
		        eval(this.getAttribute('onclick'));
		    }catch(e){
		        $error(e);
	        }
	    },
		ondblclick: function(event){
		    try{
		        eval(this.getAttribute('ondblclick'));
		    }catch(e){
		        $error(e)
		    }
	    },
		onkeydown: function(event){
		    try{
		        eval(this.getAttribute('onkeydown'));
		    }catch(e){
		        $error(e);
		    }
	    },
		onkeypress: function(event){
		    try{
		        eval(this.getAttribute('onkeypress'));
		    }catch(e){
		        $error(e);}},
		onkeyup: function(event){
		    try{
		        eval(this.getAttribute('onkeyup'));
		    }catch(e){
		        $error(e);}},
		onmousedown: function(event){
		    try{
		        eval(this.getAttribute('onmousedown'));
		    }catch(e){
		        $error(e);}},
		onmousemove: function(event){
		    try{
		        eval(this.getAttribute('onmousemove'));
		    }catch(e){
		        $error(e);}},
		onmouseout: function(event){
		    try{
		        eval(this.getAttribute('onmouseout'));
		    }catch(e){
		        $error(e);}},
		onmouseover: function(event){
		    try{
		        eval(this.getAttribute('onmouseover'));
		    }catch(e){
		        $error(e);}},
		onmouseup: function(event){
		    try{
		        eval(this.getAttribute('onmouseup'));
		    }catch(e){
		        $error(e);}}
});

var __registerEventAttrs__ = function(elm){
    if(elm.hasAttribute('onclick')){ 
        elm.addEventListener('click', elm.onclick ); 
    }
    if(elm.hasAttribute('ondblclick')){ 
        elm.addEventListener('dblclick', elm.onclick ); 
    }
    if(elm.hasAttribute('onkeydown')){ 
        elm.addEventListener('keydown', elm.onclick ); 
    }
    if(elm.hasAttribute('onkeypress')){ 
        elm.addEventListener('keypress', elm.onclick ); 
    }
    if(elm.hasAttribute('onkeyup')){ 
        elm.addEventListener('keyup', elm.onclick ); 
    }
    if(elm.hasAttribute('onmousedown')){ 
        elm.addEventListener('mousedown', elm.onclick ); 
    }
    if(elm.hasAttribute('onmousemove')){ 
        elm.addEventListener('mousemove', elm.onclick ); 
    }
    if(elm.hasAttribute('onmouseout')){ 
        elm.addEventListener('mouseout', elm.onclick ); 
    }
    if(elm.hasAttribute('onmouseover')){ 
        elm.addEventListener('mouseover', elm.onclick ); 
    }
    if(elm.hasAttribute('onmouseup')){ 
        elm.addEventListener('mouseup', elm.onclick ); 
    }
    return elm;
};
	
var __click__ = function(element){
	var event = new Event({
	  target:element,
	  currentTarget:element
	});
	event.initEvent("click");
	element.dispatchEvent(event);
};
var __submit__ = function(element){
	var event = new Event({
	  target:element,
	  currentTarget:element
	});
	event.initEvent("submit");
	element.dispatchEvent(event);
};
var __focus__ = function(element){
	var event = new Event({
	  target:element,
	  currentTarget:element
	});
	event.initEvent("focus");
	element.dispatchEvent(event);
};
var __blur__ = function(element){
	var event = new Event({
	  target:element,
	  currentTarget:element
	});
	event.initEvent("blur");
	element.dispatchEvent(event);
};
