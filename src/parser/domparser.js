
/**
* DOMParser
*/

__defineParser__(function(e){
    console.log('Error loading html 5 parser implementation');
}, 'nu_validator_htmlparser_HtmlParser', '');

DOMParser = function(principle, documentURI, baseURI){};
__extend__(DOMParser.prototype,{
    parseFromString: function(xmlstring, mimetype){
        var xmldoc = new DOMImplementation().createDocument('','',null);
        return XMLParser.parseDocument(xmlstring, xmldoc, mimetype);
    }
});

XMLParser = {};
XMLParser.parseDocument = function(xmlstring, xmldoc, mimetype){
    var tmpdoc = new Document(new DOMImplementation()),
        parent,
        importedNode;
        
    if(mimetype && mimetype == 'text/xml'){
        tmpdoc.baseURI = 'http://envjs.com/xml';
        xmlstring = '<html><head></head><body>'+
            '<envjs_1234567890 xmlns="envjs_1234567890">'
                +xmlstring+
            '</envjs_1234567890>'+
        '</body></html>';
        Envjs.parseHtmlDocument(xmlstring, tmpdoc, false, null, null);  
        parent = tmpdoc.getElementsByTagName('envjs_1234567890')[0];
    }else{
        Envjs.parseHtmlDocument(xmlstring, tmpdoc, false, null, null);  
        parent = tmpdoc.documentElement;
    }
    
    while(xmldoc.firstChild != null){
        xmldoc.removeChild( xmldoc.firstChild );
    }
    while(parent.firstChild != null){
        importedNode = xmldoc.importNode( 
            parent.removeChild( parent.firstChild ), true);
        xmldoc.appendChild( importedNode );   
    }
    return xmldoc;
};

HTMLParser = {};
HTMLParser.parseDocument = function(htmlstring, htmldoc){
    Envjs.parseHtmlDocument(htmlstring, htmldoc, false, null, null);  
    //Envjs.wait(-1);
    return htmldoc;
};
HTMLParser.parseFragment = function(htmlstring, fragment){
    // fragment is allowed to be an element as well
    var tmpdoc = new HTMLDocument(new DOMImplementation()),
        parent,
        importedNode;
    
    Envjs.parseHtmlDocument(htmlstring,tmpdoc, false, null,null);
    
    parent = tmpdoc.body;
    while(fragment.firstChild != null){
        fragment.removeChild( fragment.firstChild );
    }
    while(parent.firstChild != null){
        importedNode = fragment.importNode( 
            parent.removeChild( parent.firstChild ), true);
        fragment.appendChild( importedNode );   
    }
    //Mark for garbage collection
    tmpdoc = null;    
    return fragment;
};

