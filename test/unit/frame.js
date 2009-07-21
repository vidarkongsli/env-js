/*
 * This file is a component of env.js,
 *     http://github.com/gleneivey/env-js/commits/master/README
 * a Pure JavaScript Browser Environment
 * Copyright 2009 John Resig, licensed under the MIT License
 *     http://www.opensource.org/licenses/mit-license.php
 */


module("frame");


// all tests to next comment rely on content of ../html/iframe1.html and
//                                              ../html/iframe1a.html and

    // iframe1 and iframe1a are identical in structure (so we can use the
    //   same assertions against both), but different in content text (so
    //   that we can tell which one is currently loaded).  So, create an
    //   object (associative array) that is specific to the content of each.
contentOfIframe1 = {
    url : "html/iframe1.html",
    titleRE : /IFRAME/,
    elementId : 'anElementWithText',
    elementRE : /content of a paragraph/
};
contentOfIframe1a = {
    url : "html/iframe1a.html",
    titleRE : /iframe1a.html/,
    elementId : 'anotherElementWithText',
    elementRE : /block-quote element/
};

var accessChecksForIframe1 = function(flag, iframe, contentOf) {
    expect(6);

    try{ok (iframe.src == contentOf.url,
        flag + ": Initial iframe src matches test page source");
    }catch(e){print(e);}

    var idoc = iframe.contentDocument;
    var mtch = idoc.title.match(contentOf.titleRE);
    try{ok (mtch && mtch.length > 0,
        flag + ": Can get 'document' object from test iframe");
    }catch(e){print(e);}

    var para = idoc.getElementById(contentOf.elementId);
    mtch = para.innerHTML.match(contentOf.elementRE);
    try{ok (mtch && mtch.length > 0,
        flag + ": Can get text from element in an iframe");
    }catch(e){print(e);}

    try{ok (idoc.parentWindow == iframe.contentWindow,
        flag + ": doc's .parentWindow points to iframe's .contentWindow");
    }catch(e){print(e);}

    try{ok (idoc.parentWindow.parent == window,
        flag + ": Can follow chain from iframe's doc to containing window");
    }catch(e){print(e);}

    try{ok (iframe.contentWindow.top == window,
        flag + ": '.top' from iframe does point to top window");
    }catch(e){print(e);}
};

test("IFRAMEs load with accessible content", function() {
    var iframe = document.getElementById('loadediframe');
    // iframe1.html loaded via src= attribute when index.html was parsed
    accessChecksForIframe1("1", iframe, contentOfIframe1);
});


test("Global scope for JS code in an iframe refers to that iframe's window/document", function() {
    expect(2);

    var idoc = document.getElementById('loadediframe').contentDocument;
    mtch = idoc.getElementById('js_generated_p').innerHTML.match(/Dynamic/);
    try{ ok(mtch && mtch.length > 0,
        "Can get content from dynamically-generate p element");
    }catch(e){print(e);}

    mtch = idoc.getElementById('internalDocRefResult').innerHTML.
                  match(/exists-found/);
    try{ ok(mtch && mtch.length > 0,
        "Got confirmation of access to 'document' object in iframe");
    }catch(e){print(e);}

/*
    mtch = idoc.getElementById('appended').innerHTML.match(/appended para/);
    try{ ok(mtch && mtch.length > 0,
        "Got confirmation of body-onload execution in iframe");
    }catch(e){print(e);}
*/
});


test("IFRAMEs still load when .src is set after the page is parsed",function() {
    var iframe = document.getElementById('emptyiframe');
    iframe.src = "html/iframe1.html";
    accessChecksForIframe1("2", iframe, contentOfIframe1);
});

test("IFRAMEs reload with accessible content", function() {
    var iframe = document.getElementById('loadediframe');
    iframe.src = "html/iframe1a.html";
    accessChecksForIframe1("3", iframe, contentOfIframe1a);
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
