QUnit.module('parser');

test('Parser Interfaces Available', function(){

    expect(1);
    ok(DOMParser,             'DOMParser defined');
    //These are non-standard but used internally by envjs
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
    equals(xmldoc.async, true, '.async');
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

test('HTMLParser.parseDocument / simple content', function(){
    //one of the easiest way to test the HTMLParser is using frames and
    //writing the document directly
    expect(4);
    var iframe = document.createElement("iframe");
    document.body.appendChild(iframe);
    iframe.addEventListener('load', function(){
        var doc;
        ok(true, 'frame loaded');

        doc = iframe.contentDocument;
        ok(doc, 'frame has contentDocument');
        equals(doc+'', '[object HTMLDocument]', 'doc is HTMLDocument')
        equals(doc.body.innerHTML,'<p id="p1">this is a pig</p>', 'innerHTML');
        document.body.removeChild( iframe );
        start();
    }, false);

    var doc = iframe.contentDocument;
    doc.write("<body><p id='p1'>this is a pig</p></body>");
    doc.close();
    stop();
});

test('HTMLParser.parseDocument / malformed content', function(){
    //one of the easiest way to test the HTMLParser is using frames and
    //writing the document directly
    expect(4);
    var iframe = document.createElement("iframe");
    document.body.appendChild(iframe);

    iframe.addEventListener('load', function(){
        var doc;
        ok(true, 'frame loaded');

        doc = iframe.contentDocument;
        ok(doc, 'frame has contentDocument');
        equals(doc+'', '[object HTMLDocument]', 'doc is HTMLDocument')
        equals(doc.body.innerHTML,'<p id="p1">this is a pig</p>', 'innerHTML');
        document.body.removeChild( iframe );
        start();
    }, false);

    var doc = iframe.contentDocument;
    doc.write("<body><p id='p1'>this is a pig</body>");
    doc.close();
    stop();

});

/**
 * Test that image loading works in various contexts
 *
 */
test('Image Loading', function(){
    var node;
    if ((typeof Envjs == 'undefined') || !Envjs) {
        Envjs = {};
    }

    // This is the callback
    var counter = 0;
    Envjs.loadImage = function() {
        counter += 1;
        return true;
    }

    // Part 1 -- img triggered in normal parsing
    var iframe = document.createElement("iframe");
    document.body.appendChild(iframe);

    iframe.addEventListener('load', function(){
        var doc = iframe.contentDocument;
        ok(true, 'frame loaded');

        // part 1 - continued
        equals(counter, 1, "Image fired in full document parsing");

        // Part 2 -- triggered by using setAttribute
        node = doc.body.firstChild;
        node.setAttribute('src', 'dingbat');
        equals(counter, 2, "Image fired in SetAttribute");
        equals(node.src, 'dingbat');

        // Part 3 -- change the src attribute directly
        node = doc.body.firstChild;
        node.src = 'dingbat2';
        equals(counter, 3, "Image fired by src setter");
        equals(node.src, 'dingbat2');

        // Part 4 -- triggered by using innerHTML
        doc.body.innerHTML = '<img src="dingbat3">';
        equals(counter, 4, "Image fired in inner html");
        node = doc.body.firstChild;
        equals(node.src, 'dingbat3');

        // Part 5 -- check that a "parentless" image fires
        var img = new Image();
        img.src ="dingbat5";
        equals(counter, 5, "Image fired in 'new Image'");
        // TODO check that appendChild does NOT fire

        // appendChild does not fire again (since we fired already)
        doc.body.appendChild(img);
        equals(counter, 5, "appendChild(img) does *not* fire");

        document.body.removeChild(iframe);
        start();
    }, false);

    var doc = iframe.contentDocument;
    doc.write('<html><head></head><body><img src="/foo"></body></html>');
    doc.close();
    stop();
});

/**
 * Test that image loading works in various contexts
 *
 */
test('Link Loading', function(){
    var node;
    if ((typeof Envjs == 'undefined') || !Envjs) {
        Envjs = {};
    }

    // This is the callback
    var counter = 0;
    Envjs.loadLink = function() {
        counter += 1;
        return true;
    }

    // Part 1 -- img triggered in normal parsing
    var iframe = document.createElement("iframe");
    document.body.appendChild(iframe);

    iframe.addEventListener('load', function(){
        var doc = iframe.contentDocument;
        ok(true, 'frame loaded');

        // part 1 - continued
        equals(counter, 1, "Link fired in full document parsing");

        // Part 2 -- triggered by using setAttribute
        node = doc.body.firstChild;
        node.setAttribute('href', 'dingbat');
        equals(counter, 2, "Link fired in SetAttribute");
        equals(node.href, 'dingbat');

        // Part 3 -- change the src attribute directly
        node = doc.body.firstChild;
        node.href = 'dingbat2';
        equals(counter, 3, "Link fired by href setter");
        equals(node.href, 'dingbat2');

        // Part 4 -- triggered by using innerHTML
        doc.body.innerHTML = '<link rel="stylesheet" type="text/css" href="dingbat3">';
        equals(counter, 4, "Link fired in inner html");
        node = doc.body.firstChild;
        equals(node.href, 'dingbat3');

        // Part 5 -- parentless Link does NOT fire
        var newnode = doc.createElement('link');
        newnode.setAttribute('type', 'text/css');
        newnode.setAttribute('rel', 'stylesheet');
        newnode.setAttribute('href', 'dingbat4');
        equals(counter, 4, "Link *not* fired if parentless");

        /*
         * Ok here, the spec falls down - it's not clear what should
         * happen.  Firefox 3.6 does NOT fire an event on appendChild,
         * while Safari/Chrome DOES I went with
         * lower-common-demoninator.
         */
        equals(counter, 4, "Link *not* fired during appendChild");

        document.body.removeChild(iframe);
        start();
    }, false);

    var doc = iframe.contentDocument;
    doc.write('<html><head></head><body><link rel="stylesheet" type="text/css" href="/foo"></body></html>');
    doc.close();
    stop();
});