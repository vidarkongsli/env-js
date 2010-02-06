
/**
 * @todo: document
 */
var _load,
    _start,
    _count = 1,
    _starttime = new Date().getTime(),
    _endtime,
    Envjs;

try{
    _load = load;
    _load('test/specs/qunit.js');
    _start = QUnit.start;

}catch(e){
    _load = _start = function(){};
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
QUnit.init();

_load('dist/platform/core.js');
_load('dist/platform/rhino.js');
_load('dist/console.js');
_load('dist/dom.js');
_load('dist/event.js');
_load('dist/timer.js');
_load('dist/html.js');
_load('dist/xhr.js');
_load('dist/window.js');

var __this__ = this;
try{
    window;
}catch(e){
    //mock the window and document in envjs
    new Window(__this__, __this__);
    //document = new Document(new DOMImplementation());
}

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

    expect(26);
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
    
    equals( window, __this__,       'window is the global scope "this"');
    equals( window, self,           'self is an alias for window');
    
    //This is how a proxy window differs from the top level window
    ok( window !== top,        'top is not this window when the window is in a frame');
    ok( window !== parent,     'window parent is not itself');
    equals(window.top, window.parent, 'top is parent one frame deep');
    
    // now we finally prove the top level window is the window 
    // we expected it to be.
    equals(parent.ABC1234567890, ABC1234567890, 'parent has unique id');
    
    parent.ABC1234567890 = 'QWERTYUIOP{}|';
    equals(parent.ABC1234567890, 'QWERTYUIOP{}|', 'parent scope can be modified');
    
    equals(parent.Array, Array, 'Array');
});



_start();
Envjs.wait();
