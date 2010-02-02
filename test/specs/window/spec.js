
/**
 * @todo: document
 */
var _load,
    _start,
    _count = 1,
    _starttime = new Date().getTime(),
    _endtime,
    Envjs;
    
var __this__ = this,
    expected_path = 'test/specs/window/spec.html';

try{
    _load = load;
    _load('dist/platform/core.js');
    _load('dist/platform/rhino.js');
    _load('dist/console.js');
    _load('dist/dom.js');
    _load('dist/event.js');
    _load('dist/html.js');
    _load('dist/timer.js');
    _load('dist/parser.js');
    _load('dist/xhr.js');
    _load('dist/window.js');
    _load('settings.js');
    _load('local_settings.js');
    
    //mock the window and document in envjs
    new Window(__this__, __this__);
    document.async = false;
    
    _load('test/specs/qunit.js');
    location = SETTINGS.AJAX_BASE + expected_path;
    
}catch(e){
    _load = function(){};
    Envjs = {};
    Envjs.wait = function(){};
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


// id used to check this windows id from frames
window.ABC1234567890 = "abc!@#$%^&*()";

function pollute(){
    abc = 123;
};
function giveAHoot(){
    var def = 456;
}

module('window');

test('Window Interfaces Available', function(){
    
    ok(Window,      'Window available');
    ok(History,     'History available');
    ok(Navigator,   'Navigator available');
    ok(Screen,      'Screen available');
    
});
    
test('window proxy', function(){
    equals(window.document, document, 'window.document('+window.document+') is document('+document+')');
    equals(document.nodeType, Node.DOCUMENT_NODE, 'document.nodeType is correct');
    
    pollute();
    equals(abc, 123, 'unscoped variables pollute the global scope');
    
    giveAHoot();
    try{
        def;
        ok(false, 'scoped variables dont pollute the global scope');
    }catch(e){
        //rhino adds double quotes around the bad variable eg "def" instead of just def 
        //rhino also adds a period at the end
        ok(e.toString().match(/^ReferenceError:\s\"?def\"?\sis\snot\sdefined\.?$/), 'got ReferenceError');
        ok(true, 'scoped variables dont pollute the global scope');
    }
    
});

test('window properties', function(){

    expect(23);
    ok(window,              'window');
    ok(self,                'self');
    ok(top,                 'top');
    ok(parent,              'parent');
    ok(window.toString(),   '[object Window]');
    
    //these values are usually the empty string ''
    //so we just verify the property is available
    ok('name' in window,            'name');
    ok('status' in window,          'status');
    ok('closed' in window,          'closed');
    ok('defaultStatus' in window,   'defaultStatus');
    ok('length' in window,          'length');
    ok('opener' in window,          'opener');
    
    ok(frames,              'frames');
    ok(open,                'open');
    ok(close,               'close');
    ok(innerHeight,         'innerHeight');
    ok(outerHeight,         'outerHeight');
    ok(outerWidth,          'outerWidth');
    ok(Number(screenX) !== undefined,             'screenX');
    ok(Number(screenY) !== undefined,             'screenY');
    
    equals( window, __this__,   'window is the global scope "this"');
    equals( window, self,       'self is an alias for window');
    equals( window, top,        'top is an alias for window when the window is not in a frame');
    equals( window, window.parent, 'window parent is itself');
    
});

test('window event target', function(){
    
    ok(window.addEventListener, '.addEventListener');
    ok(window.removeEventListener, '.removeEventListener');
    ok(window.dispatchEvent, '.dispatchEvent');
    
});

test("window.navigator", function(){
    expect(9);
    ok(navigator === window.navigator, 'navigator is window.navigator');
    ok(navigator.userAgent,         '.userAgent is defined');
    ok(navigator.appCodeName,       '.appCodeName is defined');
    ok(navigator.appName,           '.appName is defined');
    ok(navigator.appVersion,        '.appVersion is defined');
    //ok(navigator.language,          '.language is defined');
    ok(navigator.mimeTypes,         '.mimeTypes is defined');
    //ok(navigator.platform,          '.platform is defined');
    //ok(navigator.oscpu,             '.oscpu is defined');
    //ok(navigator.product,           '.product is defined');
    //ok(navigator.productSub,        '.productSub is defined');
    ok(navigator.plugins,           '.plugins is defined');
    ok(navigator.cookieEnabled,     '.cookieEnabled is defined');
    //ok(navigator.buildID,           '.buildID is defined');
    ok(navigator.javaEnabled,       '.javaEnabled is defined');
    //ok(navigator.taintEnabled,      '.taintEnabled is defined');
    //ok(navigator.preference,        '.preference is defined');
    //ok(navigator.geolocation,       '.geolocation is defined');
    //ok(navigator.registerContentHandler, '.registerContentHandler is defined');
    //ok(navigator.registerProtocolHandler, '.registerProtocolHandler is defined');
    
    /*
     * several properties will throw a security exception if they 
     * are accessed, so we only check that they exist
     */
    //ok("vendor" in navigator,            '.vendor is defined');
    //ok("vendorSub" in navigator,         '.vendorSub is defined');
    //ok("securityPolicy" in navigator,    '.securityPolicy is defined');
    //ok("onLine" in navigator,            '.onLine is defined');
});

test('window.getComputedStyle', function(){

    expect(1);
    ok(window.getComputedStyle, 'window.getComputedStyle');
    
});


test('window.dialog', function(){

    expect(3);
    ok(alert,   'alert');
    ok(confirm, 'confirm');
    ok(prompt,  'prompt');
    
});

test('window.history', function(){
    
    expect(8);
    ok(history === window.history, "history is window.history");
    ok(history.length,   'history.length');
    ok(history.back,     'history.back');
    ok(history.forward,  'history.forward');
    ok(history.go,       'history.go');
    ok(history.item,     'history.item');
    
    //these are generally secured properties of the history
    //object so we only check that the are defined since
    //trying to access them will throw an exception
    ok('current'  in history,  'history.current');
    ok('previous' in history,  'history.previous');
    
});


test('window.event', function(){
    
    expect(3);
    ok(addEventListener,    'addEventListener');
    ok(removeEventListener, 'removeEventListener');
    ok(dispatchEvent,       'dispatchEvent');
    
});

test('window.location', function(){
    
    expect(12);
    ok(location === window.location, "location is window.location");
    ok('href' in location,      'location.href');
    ok('hash' in location,      'location.hash');
    ok('host' in location,      'location.host');
    ok('hostname' in location,  'location.hostname');
    ok('pathname' in location,  'location.pathname');
    ok('port' in location,      'location.port');
    ok('search' in location,    'location.search');
    ok(location.protocol,       'location.protocol');
    ok(location.reload,         'location.reload');
    ok(location.replace,        'location.replace');
    ok(location.assign,         'location.assign');
    
});

test('window.screen', function(){
    
    expect(18);
    ok(screen === window.screen , 'screen is window screen');
    ok("top" in screen,          'top');
    ok(screen.height,       'height');
    ok(screen.width,        'width');
    ok("left" in screen,         'left');
    ok(screen.pixelDepth,   'pixelDepth');
    ok(screen.colorDepth,   'colorDepth');
    ok(screen.availWidth,   'availWidth');
    ok(screen.availHeight,  'availHeight');
    ok("availLeft" in screen,    'availLeft');
    ok("availTop" in screen,     'availTop');
    
    //closely related function available at window
    ok(moveBy,              'moveBy');
    ok(moveTo,              'moveTo');
    ok(resizeBy,            'resizeBy');
    ok(resizeTo,            'resizeTo');
    ok(scroll,              'scroll');
    ok(scrollBy,            'scrollBy');
    ok(scrollTo,            'scrollTo');
    
});


test('frame proxy', function(){

    var frame,
        doc;
    
    expect(4);
    frame = document.createElement('iframe');
    frame.width = '100%';
    frame.height = '300px';
    frame.frameBorder = '0';
    frame.addEventListener('load', function(){

        equals(frame.contentWindow.parent, window, '.contentWindow.parent')
        equals(frame.contentWindow.top, window, '.contentWindow.top')
        
        doc = frame.contentDocument;
        equals(doc.title, 'Envjs Proxy Spec', '.contentDocument.title');
        equals(doc.toString(), '[object HTMLDocument]', '.contentDocument.toString()');
        start();
        Envjs.wait();
        
    }, false);
    //This only works because we set src after the event listener is added
    //in reality the frame should use a mutation event to trigger load
    //and document.body.append would be the real trigger
    frame.src = 'proxy.html';
    document.body.appendChild(frame);
    stop();
});

start();
Envjs.wait();