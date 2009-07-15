/*
 * This file is a component of env.js, 
 *     http://github.com/gleneivey/env-js/commits/master/README
 * a Pure JavaScript Browser Environment
 * Copyright 2009 John Resig, licensed under the MIT License
 *     http://www.opensource.org/licenses/mit-license.php
 */


module("frame");


// all tests to next comment rely on content of ../html/iframe.html
test("IFRAMEs load with accessible content", function() {
    expect(5);

    var iframe = document.getElementById('loadediframe');
    try{ok (iframe.src == "html/iframe.html",
        "Initial iframe src matches test page source");
    }catch(e){print(e);}

    var idoc = iframe.contentDocument;
    var mtch = idoc.title.match(/IFRAME/);
    try{ok (mtch && mtch.length > 0,
        "Can get 'document' object from test iframe");
    }catch(e){print(e);}

    var para = idoc.getElementById('anElementWithText');
    mtch = para.innerHTML.match(/content of a paragraph/);
    try{ok (mtch && mtch.length > 0,
        "Can get text from element in an iframe");
    }catch(e){print(e);}

    try{ok (idoc.parentWindow.parent == window,
        "Can follow chain from iframe's doc to containing window");
    }catch(e){print(e);}

    try{ok (iframe.contentWindow.top == window,
        "'.top' from iframe does point to top window");
    }catch(e){print(e);}
});


test("Global scope for JS code in an iframe refers to that iframe's window/document", function() {
    expect(1);

    var idoc = document.getElementById('loadediframe').contentDocument;
    mtch = idoc.getElementById('js_generated_p').innerHTML.match(/Dynamic/);
    try{ ok(mtch && mtch.length > 0,
        "Can get content from dynamically-generate p element");
    }catch(e){print(e);}
});


// all tests to next comment rely on content of ../html/iframe2.html
test("IFRAMEs reload on assignment to 'src'", function() {
    expect(2);

    var iframe = document.getElementById('loadediframe');
    iframe.src = "html/iframe2.html";
    try{ok (iframe.src == "html/iframe2.html",
        "iframe.src matches value assigned");
    }catch(e){print(e);}

    var para = iframe.contentDocument.getElementById('aParaInAnIframe');
    mtch = para.innerHTML.match(/short paragraph/);
    try{ok (mtch && mtch.length > 0,
        "IFRAME reloaded from correct source");
    }catch(e){print(e);}
});
