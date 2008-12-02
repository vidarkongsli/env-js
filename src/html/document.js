$log("Defining HTMLDocument");
/*
* HTMLDocument - DOM Level 2
*  The Document object is not directly 
*/
$w.__defineGetter__("HTMLDocument", function(){
  return function(){
    throw new Error("Object cannot be created in this context");
  };
});
/**
 * @class  HTMLDocument - The Document interface represents the entire HTML or XML document.
 *   Conceptually, it is the root of the document tree, and provides the primary access to the document's data.
 *
 * @extends DOMDocument
 */
var HTMLDocument = function(implementation) {
  this.DOMDocument = DOMDocument;
  this.DOMDocument(implementation);

  this.title = "";
  this._refferer = "";
  this._domain;
  this._open = false;
};
HTMLDocument.prototype = new DOMDocument;
__extend__(HTMLDocument.prototype, {
    createElement: function(tagName){
        //$log("HTMLDocument.createElement( "+tagName+" )");
        // throw Exception if the tagName string contains an illegal character
          if (this.ownerDocument.implementation.errorChecking && (!__isValidName__(tagName))) {
            throw(new DOMException(DOMException.INVALID_CHARACTER_ERR));
          }
          tagName = tagName.toUpperCase();
            //$log("HTMLDocument.createElement( "+tagName+" )");
          // create DOMElement specifying 'this' as ownerDocument
          //This is an html document so we need to use explicit interfaces per the 
          if(     tagName.match(/A/)){node = new HTMLAnchorElement(this);}
          else if(tagName.match(/AREA/)){node = new HTMLElement(this);}
          else if(tagName.match(/BASE/)){node = new HTMLElement(this);}
          else if(tagName.match(/BLOCKQUOTE|Q/)){node = new HTMLElement(this);}
          else if(tagName.match(/BODY/)){node = new HTMLElement(this);}
          else if(tagName.match(/BR/)){node = new HTMLElement(this);}
          else if(tagName.match(/BUTTON/)){node = new HTMLElement(this);}
          else if(tagName.match(/CAPTION/)){node = new HTMLElement(this);}
          else if(tagName.match(/COL|COLGROUP/)){node = new HTMLElement(this);}
          else if(tagName.match(/DEL|INS/)){node = new HTMLElement(this);}
          else if(tagName.match(/DIV/)){node = new HTMLElement(this);}
          else if(tagName.match(/DL/)){node = new HTMLElement(this);}
          else if(tagName.match(/FIELDSET/)){node = new HTMLElement(this);}
          else if(tagName.match(/FORM/)){node = new HTMLElement(this);}
          else if(tagName.match(/FRAME/)){node = new HTMLElement(this);}
          else if(tagName.match(/FRAMESET/)){node = new HTMLElement(this);}
          else if(tagName.match(/H1|H2|H3|H4|H5|H6/)){node = new HTMLElement(this);}
          else if(tagName.match(/HEAD/)){node = new HTMLElement(this);}
          else if(tagName.match(/HR/)){node = new HTMLElement(this);}
          else if(tagName.match(/HTML/)){node = new HTMLElement(this);}
          else if(tagName.match(/IFRAME/)){node = new HTMLElement(this);}
          else if(tagName.match(/IMG/)){node = new HTMLElement(this);}
          else if(tagName.match(/INPUT/)){node = new HTMLElement(this);}
          else if(tagName.match(/LABEL/)){node = new HTMLElement(this);}
          else if(tagName.match(/LEGEND/)){node = new HTMLElement(this);}
          else if(tagName.match(/LI/)){node = new HTMLElement(this);}
          else if(tagName.match(/LINK/)){node = new HTMLElement(this);}
          else if(tagName.match(/MAP/)){node = new HTMLElement(this);}
          else if(tagName.match(/META/)){node = new HTMLElement(this);}
          else if(tagName.match(/OBJECT/)){node = new HTMLElement(this);}
          else if(tagName.match(/OL/)){node = new HTMLElement(this);}
          else if(tagName.match(/OPTGROUP/)){node = new HTMLElement(this);}
          else if(tagName.match(/OPTION/)){node = new HTMLElement(this);;}
          else if(tagName.match(/P/)){node = new HTMLElement(this);}
          else if(tagName.match(/PARAM/)){node = new HTMLElement(this);}
          else if(tagName.match(/PRE/)){node = new HTMLElement(this);}
          else if(tagName.match(/SCRIPT/)){node = new HTMLElement(this);}
          else if(tagName.match(/SELECT/)){node = new HTMLElement(this);}
          else if(tagName.match(/STYLE/)){node = new HTMLElement(this);}
          else if(tagName.match(/TABLE/)){node = new HTMLElement(this);}
          else if(tagName.match(/TBODY|TFOOT|THEAD/)){node = new HTMLElement(this);}
          else if(tagName.match(/TD|TH/)){node = new HTMLElement(this);}
          else if(tagName.match(/TEXTAREA/)){node = new HTMLElement(this);}
          else if(tagName.match(/TITLE/)){node = new HTMLElement(this);}
          else if(tagName.match(/TR/)){node = new HTMLElement(this);}
          else if(tagName.match(/UL/)){node = new HTMLElement(this);}
          else{
            node = new HTMLElement(this);
          }
        
          // assign values to properties (and aliases)
          node.tagName  = tagName;
          node.nodeName = tagName;
        
          // add Element to 'all' collection
          //this.all[this.all.length] = node;
          //$log("Document.all.length " + this.all.length);
          return node;
    },
    get anchors(){
        return new HTMLCollection(this.getElementsByName('a'), 'Anchor');
        
    },
    get applets(){
        return new HTMLCollection(this.getElementsByName('applet'), 'Applet');
        
    },
    get body(){ 
        var nodelist = this.getElementsByName('body');
        return nodelist.item(0);
        
    },
    set body(html){
        return this.replaceNode(this.body,html);
        
    },
    //set/get cookie see cookie.js
    get domain(){
        return this._domain||window.location.domain;
        
    },
    set domain(){
        /* TODO - requires a bit of thought to enforce domain restrictions */ 
        return; 
        
    },
    get forms(){
      $log("document.forms");
      return new HTMLCollection(this.getElementsByName('form'), 'Form');
    },
    get images(){
        return new HTMLCollection(this.getElementsByName('img'), 'Image');
        
    },
    get lastModified(){ 
        /* TODO */
        return this._lastModified; 
    
    },
    get links(){
        return new HTMLCollection(this.getElementsByName('link'), 'Link');
        
    },
    get referrer(){
        /* TODO */
        return this._refferer; 
        
    },
    get URL(){
        /* TODO*/
        return this._url; 
        
    },
	close : function(){ 
	    /* TODO */ 
	    this._open = false;
    },
	getElementsByName : function(name){
		  $debug("document.getElementsByName ( "+name+" )");
		  return this.getElementsByTagName(name);
	},
	open : function(){ 
	    /* TODO */
	    this._open = true;  
    },
	write: function(htmlstring){ 
	    /* TODO */
	    return; 
	
    },
	writeln: function(htmlstring){ 
	    this.write(htmlstring+'\n'); 
    },
	toString: function(){ 
	    return "Document" +  (typeof this._url == "string" ? ": " + this._url : ""); 
    },
	get innerHTML(){ 
	    return this.documentElement.outerHTML; 
	    
    },
	get __html__(){
	    return true;
	    
    }
});

//This is useful as html elements that modify the dom must also run through the new 
//nodes and determine if they are javascript tags and load it.  This is really the fun 
//parts! ;)
function execScripts( node ) {
	if ( node.nodeName == "SCRIPT" ) {
		if ( !node.getAttribute("src") ) {
			eval.call( window, node.textContent );
		}
	} else {
		var scripts = node.getElementsByTagName("script");
		for ( var i = 0; i < scripts.length; i++ ) {
			execScripts( node );
		}
	}
};