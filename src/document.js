/*
*	document.js
*
*	DOM Level 2 /DOM level 3 (partial)
*	
*	This file adds the document object to the window and allows you
*	you to set the window.document using an html string or dom object.
*
*/

// read only reference to the Document object
var $document =  new DOMDocument();
var $implementation =  new DOMImplementation();
var $async = false;

$w.__defineGetter__("document", function(){
	return __extend__($document, {
		get async(){ return $async;},
		set async(async){ $async = async; },
		get baseURI(){ return $env.location('./'); },
		get implementation(){ return $implementation; },
		get URL(){ return $w.location.href;  }
	});
});

	
	