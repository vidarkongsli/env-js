
/**
 * @todo: document
 */
var _load,
    _start,
    _count = 1,
    _starttime = new Date().getTime(),
    _endtime;

try{
    _load = load;
    _load('test/specs/qunit.js');
    _start = QUnit.start;

}catch(e){
    _load = _start = function(){};
}

QUnit.log = function(result, message){
    if(console)console.log('(' + (_count++) + ')[' + 
        ((!!result) ? 'PASS' : 'FAIL') + '] ' + message);
};
QUnit.done = function( fail, pass){
    if(console){
        _endtime = new Date().getTime();
        console.log('\n\tRESULTS: ( of '+(pass+fail)+' total tests )');
        console.log('\t\tPASSED: ' +pass);
        console.log('\t\tFAILED: ' +fail);
        console.log('\tCompleted in '+(_endtime-_starttime)+' milliseconds.\n');
    }
};
QUnit.init();

_load('dist/platform/core.js');
_load('dist/platform/rhino.js');
_load('dist/console.js');
_load('dist/dom.js');
_load('dist/event.js');
_load('dist/html.js');
_load('dist/timer.js');
_load('dist/parser.js');

module('parser');

test('Parser Interfaces Available', function(){
    
    expect(1);
    ok(DOMParser,             'DOMParser defined');
    //These are non-standard
    //ok(XMLParser,             'XMLParser defined');
    //ok(HTMLParser,            'HTMLParser defined');
    
});

// mock the global document object if not available
try{
    document;
}catch(e){
    document = new HTMLDocument(new DOMImplementation());
}
var xmlserializer = new XMLSerializer();

test('DOMParser.parseFromString', function(){

    var domparser = new DOMParser(),
        xmlstring = '<root>oink, oink</root>',
        xmldoc = domparser.parseFromString(xmlstring, 'text/xml'),
        element,
        attribute,
        text;
       
    ok(xmldoc , 'parsed xml document');
    equals(xmldoc.attributes, null, '.attributes');
    //TODO: Should be true
    equals(xmldoc.async, false, '.async');
    //Not yet supported by Envjs
    //equals(xmldoc.characterSet, 'UTF-8', '.characterSet');
    equals(xmldoc.childNodes.length, 1, '.childNodes.length');
    //Not yet supported by Envjs
    //equals(xmldoc.contentType, 'text/xml', '.contentType');
    //equals(xmldoc.inputEncoding, 'UTF-8', '.inputEncoding');
    equals(xmldoc.localName, null, '.localName');
    equals(xmldoc.location, null, '.location');
    equals(xmldoc.namespaceURI, null, '.namespaceURI');
    equals(xmldoc.nodeName, "#document", '.nodeName');
    equals(xmldoc.nodeType, Node.DOCUMENT_NODE, '.nodeType');
    equals(xmldoc.nodeValue, null, '.nodeValue');
    equals(xmldoc.ownerDocument, null, '.ownerDocument');
    equals(xmldoc.parentNode, null, '.parentNode');
    equals(xmldoc.prefix, null, '.prefix');
    equals(xmldoc.textContent, null, '.textContent');
    
    element = xmldoc.documentElement;
    
    equals(element.attributes.length, 0, '.attributes.length');
    equals(element.childNodes.length, 1, '.childNodes.length');
    equals(element.localName, 'root', '.localName');
    equals(element.namespaceURI, null, '.namespaceURI');
    equals(element.nodeName, "root", '.nodeName');
    equals(element.nodeType, Node.ELEMENT_NODE, '.nodeType');
    equals(element.nodeValue, null, '.nodeValue');
    equals(element.ownerDocument, xmldoc, '.ownerDocument');
    equals(element.parentNode, xmldoc, '.parentNode');
    equals(element.prefix, null, '.prefix');
    equals(element.tagName, 'root', '.tagName');
    equals(element.textContent, 'oink, oink', '.textContent');
    
    text = element.childNodes[0];
    
    equals(text.attributes, null, '.attributes.length');
    equals(text.childNodes.length, 0, '.childNodes.length');
    equals(text.localName, null, '.localName');
    equals(text.namespaceURI, null, '.namespaceURI');
    equals(text.nodeName, "#text", '.nodeName');
    equals(text.nodeType, Node.TEXT_NODE, '.nodeType');
    equals(text.nodeValue, 'oink, oink', '.nodeValue');
    equals(text.ownerDocument, xmldoc, '.ownerDocument');
    equals(text.parentNode, element, '.parentNode');
    equals(text.prefix, null, '.prefix');
    equals(text.textContent, 'oink, oink', '.textContent');
    
    xmlstring = '<animals><pig>oink</pig><cow>moo</cow></animals>';
    xmldoc = domparser.parseFromString(xmlstring, 'text/xml');
       
    ok(xmldoc , 'parsed xml document');
    equals(xmldoc.documentElement.tagName, 'animals', 'documentElement.tagName');
    equals(xmldoc.getElementsByTagName('pig').length, 1, 'getElementsByTagName.length');
    equals(xmldoc.getElementsByTagName('cow').length, 1, 'getElementsByTagName.length');
    
    xmlstring = 
        '<root xmlns="pig" xmlns:apig="apig" type="pig">'+
            'oink, oink'+
         '</root>';
    xmldoc = domparser.parseFromString(xmlstring, 'text/xml');
       
    ok(xmldoc , 'parsed xml document');
    equals(xmldoc.documentElement.tagName, 'root', 'documentElement.tagName');
    equals(xmldoc.documentElement.getAttribute('type'), 'pig', 'documentElement.getAttribute');
    
    
    xmlstring = '<?xml version="1.0" encoding="utf-8"?>\n'+ 
        '<root xmlns="pig" xmlns:apig="apig" type="pig">'+
            'oink, oink'+
         '</root>';
    xmldoc = domparser.parseFromString(xmlstring, 'text/xml');
       
    ok(xmldoc , 'parsed xml document');
    equals(xmldoc.documentElement.tagName, 'root', 'documentElement.tagName');
    equals(xmldoc.documentElement.getAttribute('type'), 'pig', 'documentElement.getAttribute');
    
});

test('HTMLElement.innerHTML', function(){

    var htmlstring = '<p id="envjs">oink, oink</p>',
        tmp = document.createElement('div'),
        element,
        attribute,
        text;
    
    ok(tmp.innerHTML = htmlstring, 'parsed html into node');
    equals(tmp.childNodes.length, 1, '.childNodes.length');
    
    element = tmp.childNodes[0];
    equals(element.attributes.length, 1, '.attributes.length');
    equals(element.tagName, 'P', '.name');
    equals(element.childNodes.length, 1, '.childNodes');
    equals(element.localName, 'P', '.localName');
    equals(element.namespaceURI, null, '.namespaceURI');
    equals(element.nodeName, 'P', '.nodeName');
    equals(element.nodeType, Node.ELEMENT_NODE, 'nodeType');
    equals(element.ownerDocument, document, '.ownerDocument');
    equals(element.parentNode, tmp, '.parentNode');
    equals(element.prefix, null, '.prefix');    
    equals(element.tagName, 'P', '.tagName');    
    equals(element.toString(), '[object HTMLParagraphElement]', '.toString');
    equals(tmp.innerHTML, '<p id="envjs">oink, oink</p>', '.innerHTML');
    
    
    equals(element.id, element.getAttribute('id'), '.id');
    equals(element.id, 'envjs', '.id');
    
    attribute = element.attributes[0];    
    equals(attribute.attributes, null, '.attributes.length');
    //TODO: this is a known failure for Envjs because our
    //      dom doesnt make text nodes for attribute values
    //      FIX ME!!
    //equals(attribute.childNodes.length, 1, '.childNodes');
    
    equals(attribute.localName, 'id', '.localName');
    equals(attribute.name, 'id', '.name');
    equals(attribute.namespaceURI, null, '.namespaceURI');
    equals(attribute.nodeName, "id", '.nodeName');
    equals(attribute.nodeType, Node.ATTRIBUTE_NODE, '.nodeType');
    equals(attribute.nodeValue, 'envjs', '.nodeValue');
    equals(attribute.ownerDocument, document, '.ownerDocument');
    equals(attribute.parentNode, null, '.parentNode');
    equals(attribute.prefix, null, '.prefix');
    equals(attribute.textContent, 'envjs', '.textContent');
    equals(attribute.value, 'envjs', '.value');
    
    text = element.childNodes[0];
    equals(text.attributes, null, '.attributes.length');
    equals(text.childNodes.length, 0, '.childNodes.length');
    equals(text.localName, null, '.localName');
    equals(text.namespaceURI, null, '.namespaceURI');
    equals(text.nodeName, "#text", '.nodeName');
    equals(text.nodeType, Node.TEXT_NODE, '.nodeType');
    equals(text.nodeValue, 'oink, oink', '.nodeValue');
    equals(text.ownerDocument, document, '.ownerDocument');
    equals(text.parentNode, element, '.parentNode');
    equals(text.prefix, null, '.prefix');
    equals(text.textContent, 'oink, oink', '.textContent');
    
});


_start();
Envjs.wait();

