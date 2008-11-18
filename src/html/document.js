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
var HTMLDocument = function(node){
  var $url, 
      $domain, 
      $title = "", 
      $lastModified = "",
      $refferer = "",
      $open = false;
  __extend__(this, new Document(node));
  return __extend__(this, {
    get anchors(){return new HTMLCollection(this.getElementsByName('a'), 'Anchor');},
    get applets(){return new HTMLCollection(this.getElementsByName('applet'), 'Applet');},
    get body(){ return this.getElementsByName('body')[0];},
    set body(html){return this.replaceNode(this.body,html);},
    //set/get cookie see cookie.js
    get domain(){return $domain||$w.location.domain;},
    set domain(){return; /* TODO - requires a bit of thought to enforce domain restrictions */ },
    get forms(){
      $log("document.forms");
      return new HTMLCollection(this.getElementsByName('form'), 'Form');
    },
    get images(){return new HTMLCollection(this.getElementsByName('img'), 'Image');},
    get lastModified(){ return $lastModified; /* TODO */},
    get links(){return new HTMLCollection(this.getElementsByName('link'), 'Link');},
    get referrer(){return $refferer; /* TODO */},
    get title(){return $title; /* TODO */},
    set title(title){$title = title;},
    get URL(){return $url; /* TODO*/},
		close : function(){ $open = false;/* TODO */ },
		getElementsByName : function(name){
		  $debug("document.getElementsByName ( "+name+" )");
		  return this.getElementsByTagName(name);
	  },
	  open : function(){ $open = true; /* TODO */ },
	  write: function(htmlstring){ return;/* TODO */ },
	  writeln: function(htmlstring){ this.write(htmlstring+'\n'); },
		toString: function(){ return "Document" +  (typeof $url == "string" ? ": " + $url : ""); },
		get innerHTML(){ return this.documentElement.outerHTML; },
		get __html__(){return true;}
  });
};

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