
QUnit.module('scope');

test("Basic window object/global scope identity", function(){

    fred = "This is a known string with a sentence in it.";
    ok( window.fred === fred, 'Global variables appear as window members' );
    delete window.fred;

    window.barney = "This is another known string.";
    ok( window.barney === barney, 'Window members appear as global variables' );
    delete window.barney;

    ok( Math, 'Standard JavaScript language built-in objects are globals' );
    ok( window.Math, 'JS language built-ins also appear as window members' );

    // defined in specs/fixtures/define-some-variables.js, loaded in index.html
    ok( aGlobalVariable == "is aGlobalVariable",
        'global variables defined in external files visible' );
    ok( window.aGlobalVariable == "is aGlobalVariable",
        'global variables defined in external files are window members' );
    ok( aTopLevelVarVariable == "is aTopLevelVarVariable",
        '"var" variables defined in external files visible' );
    ok( window.aTopLevelVarVariable == "is aTopLevelVarVariable",
        '"var" variables defined in external files are window members' );
});

test("Basic iframe behaviors", function(){
/* should be this
    expect( 8+8+8 + 0 );
 * but asserts commented out in ok_accessToIFrame1x() mean we do this for now:
*/  expect( 7+7+7 + 0 );

    // iframe1a.html loaded via src= attribute when index.html was parsed
    var iframe = document.getElementById('loaded-iframe');
    ok_accessToIFrame1x(iframe, contentOfIFrameA,
        'iframe loads with page load');

    iframe = document.getElementById('empty-iframe');
    iframe.src = "../fixtures/scope/iframe1a.html";
    ok_accessToIFrame1x(iframe, contentOfIFrameA,
        'empty iframe loads on .src=');

    iframe.src = "../fixtures/scope/iframe1b.html";
    ok_accessToIFrame1x(iframe, contentOfIFrameB,
        'iframe reloads on .src=');
});

// iframe1a and iframe1b are identical in structure (so we can use the
//   same assertions against both), but different in content text (so
//   that we can tell which one is currently loaded).  So, create an
//   object (associative array) that is specific to the content of each.
contentOfIFrameA = {
    urlRE : /scope.iframe1a.html$/,
    titleRE : /IFRAME/,
    elementId : 'anElementWithText',
    elementRE : /content of a paragraph/
};
contentOfIFrameB = {
    urlRE : /scope.iframe1b.html$/,
    titleRE : /iframe1b.html/,
    elementId : 'anotherElementWithText',
    elementRE : /block-quote element/
};


// add 8 to your expect() call's argument for each call to this function
function ok_accessToIFrame1x(iframe, contentOf, message) {
    ok( iframe.src.match(contentOf.urlRE),
        message + ": Initial iframe src matches test page source" );

    var idoc = iframe.contentDocument;
    ok( idoc, message + ": Can get 'document' object from test iframe" );
    ok( idoc.title.match(contentOf.titleRE),
        message + ": iframe's title is correct" );

    var para = idoc.getElementById(contentOf.elementId);
    ok( para, message + ": can get paragraph by ID" );
    ok( para.innerHTML.match(contentOf.elementRE),
        message + ": iframe's conent is correct" );


    equals( iframe.contentWindow.top, window, message +
        ": '.top' from iframe does point to top window");
    equals( idoc.parentWindow, iframe.contentWindow, message +
        ": iframe doc's .parentWindow points to iframe's .contentWindow");
/* re-enable this once the preceding passes
    equals( idoc.parentWindow.parent, window, message +
        ": Can follow chain from iframe's doc to containing window");
*/
};
