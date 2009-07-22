// dependencies for the tests
$w = { }
$env = { debug: function() {} }
load("src/window/window.js", "src/dom/node.js");


module("dom");

test("Basic requirements", function() {
	expect(5);
	ok( Array.prototype.push, "Array.push()" );
	ok( Function.prototype.apply, "Function.apply()" );
	ok( document.getElementById, "getElementById" );
	ok( document.getElementsByTagName, "getElementsByTagName" );
	ok( RegExp, "RegExp" );
});

test("document.getElementById", function() {
	expect(14);
  try{ok (document.getElementById('body').id == "body", "Can get Element by id, expected id='body'");}catch(e){print(e);}
  try{ok (document.getElementById('header').id == "header", "Can get Element by id, expected id='header'");}catch(e){print(e);}
  try{ok (document.getElementById('banner').id == "banner", "Can get Element by id, expected id='banner'");}catch(e){print(e);}
  try{ok (document.getElementById('userAgent').id == "userAgent", "Can get Element by id, expected id='userAgent'");}catch(e){print(e);}
  try{ok (document.getElementById('nothiddendiv').id == "nothiddendiv", "Can get Element by id, expected id='nothiddendiv'");}catch(e){print(e);}
  try{ok (document.getElementById('nothiddendivchild').id == "nothiddendivchild", "Can get Element by id, expected id='nothiddendivchild'");}catch(e){print(e);}
  try{ok (document.getElementById('dl').id == "dl", "Can get Element by id, expected id='dl'");}catch(e){print(e);}
  try{ok (document.getElementById('main').id == "main", "Can get Element by id, expected id='main'");}catch(e){print(e);}
  try{ok (document.getElementById('firstp').id == "firstp", "Can get Element by id, expected id='firstp");}catch(e){print(e);}
  try{ok (document.getElementById('simon1').id == "simon1", "Can get Element by id, expected id='simon1'");}catch(e){print(e);}
  try{ok (document.getElementById('ap').id == "ap", "Can get Element by id, expected id='ap'");}catch(e){print(e);}
  try{ok (document.getElementById('google').id == "google", "Can get Element by id, expected id='google'");}catch(e){print(e);}
  try{ok (document.getElementById('groups').id == "groups", "Can get Element by id, expected id='groups'");}catch(e){print(e);}
  try{ok (document.getElementById('台北Táiběi').id == "台北Táiběi", "Can get Element by UTF-8 id, expected id='台北Táiběi'");}catch(e){print(e);}
});

test("element.getElementsByTagName", function() {
	expect(1);
  var body = document.getElementById('body');
  try{ok (body.getElementsByTagName('h1').length == 1, "Can get NodeList length : Expected 1 , Got " + body.getElementsByTagName('h1').length);}catch(e){print(e);}
});

test("handling of iframes", function() {
        expect(3);

  iElement = document.getElementById('loadediframe');
  try{ok (iElement.id == "loadediframe",
	  "Can get an IFRAME Element by id, expected id='loadediframe'");
     }catch(e){print(e);}

  iDocument = iElement.contentDocument;
  try{ok (iDocument.nodeType == DOMNode.DOCUMENT_NODE,
          "Can get 'document' object from IFRAME");
     }catch(e){print(e);}

  iContent = iDocument.getElementById('anElementWithText');
  try{ok (iContent.innerHTML.match(/text content/).length > 0,
          "Can get element from DOM inside of IFRAME");
     }catch(e){print(e);}
});

test("handling of inline CSS styles", function() {
  expect(6);

  var node = document.createElement("A");
  node.style.marginTop = "10px";
  node.style.marginBottom = "10px";
  try{ok (node.getAttribute("style") == "margin-top: 10px;\nmargin-bottom: 10px", "Setting CSS2Properties values puts CSS text in style attribute");
     }catch(e){printe(e);}
  node.setAttribute("style", "left: auto");
  try{ok (node.style.marginTop == "", "Setting attribute 'style' overwrites CSS2Properties values");
      ok (node.style.marginBottom == "", "Setting attribute 'style' overwrites CSS2Properties values");
      ok (node.style.left == "auto", "Setting attribute 'style' properly sets CSS2Properties values");
     }catch(e){print(e);}
  node.removeAttribute("style");
  try{ok (node.style.left == "", "Removing attribute 'style' properly removes CSS2Properties values");
     }catch(e){print(e);}
  node.innerHTML = "<span style='font-size: medium;'></span>";
  var innerNode = node.childNodes[0];
  try{ok (innerNode.style.fontSize == "medium", "Parsing inline styles into CSS2Properties values");
     }catch(e){print(e);}
});
