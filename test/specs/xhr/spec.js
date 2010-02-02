
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
_load('dist/xhr.js');
_load('settings.js');
_load('local_settings.js');

module('xhr');

test('XMLHttpRequest Interfaces Available', function(){
    
    expect(2);
    ok(Location,           'Location defined');
    ok(XMLHttpRequest,     'XMLHttpRequest defined');
    
});

// mock the global document object if not available
var expected_path = 'test/specs/xhr/spec.html';
try{
    document;
}catch(e){
    console.log('mocking global document object.');
    document = new HTMLDocument(new DOMImplementation());
    document.async = false;
    
    console.log('mocking global document location.');
    location = new Location(Envjs.location(expected_path, SETTINGS.AJAX_BASE), document);
    document.baseURI = location.href;
    location.reload();
}

test('Location', function(){
    
    var href = SETTINGS.AJAX_BASE+expected_path;
    
    equals(location.toString(), href, '.toString()');
    equals(location.hash, '', '.hash');
    equals(location.host, 'localhost:8080', '.host');
    equals(location.hostname, 'localhost', '.hostname');
    equals(location.href, href, '.href');
    equals(location.pathname, '/env-js/'+expected_path, '.pathname');
    equals(location.port, '8080', '.port');
    equals(location.protocol, 'http:', '.protocol');
    equals(location.search, '', '.search');
    
});

test('XMLHttpRequest sync', function(){
    var xhr,
        url;
        
    url = SETTINGS.AJAX_BASE +'test/fixtures/simple.txt';
    
    xhr = new XMLHttpRequest();
    equals(xhr.readyState, 0, '.readyState');
    
    xhr.open("GET", url, false);
    equals(xhr.readyState, 1, '.readyState');
    
    xhr.send();
    equals(xhr.readyState, 4, '.readyState');
    equals(xhr.responseText, 'Hello World', '.responseText');
    equals(xhr.responseXML, null, '.responseXML');
    equals(xhr.status, 200, '.status');
    equals(xhr.statusText, 'OK', '.statusText');
});


test('XMLHttpRequest async', function(){
    var xhr,
        url;
        
    url = SETTINGS.AJAX_BASE +'test/fixtures/simple.txt';
    xhr = new XMLHttpRequest();
    equals(xhr.readyState, 0, '.readyState');
    equals(xhr.responseText, '', '.responseText');
    equals(xhr.responseXML, null, '.responseXML');
    equals(xhr.status, 0, '.status');
    equals(xhr.statusText, '', '.statusText');
    
    xhr.open("GET", url, true);
    equals(xhr.readyState, 1, '.readyState');
    
    xhr.onreadystatechange = function(){
        if(xhr.readyState === 1){
            equals(xhr.responseText, '', '.responseText');
            equals(xhr.responseXML, null, '.responseXML');
            equals(xhr.status, 200, '.status');
            equals(xhr.statusText, 'OK', '.statusText');
         }else if(xhr.readyState === 2){
            equals(xhr.responseXML, null, '.responseXML');
            equals(xhr.status, 200, '.status');
            equals(xhr.statusText, 'OK', '.statusText');
         }else if(xhr.readyState === 3){
            equals(xhr.responseText, 'Hello World', '.responseText');
            equals(xhr.responseXML, null, '.responseXML');
            equals(xhr.status, 200, '.status');
            equals(xhr.statusText, 'OK', '.statusText');
         }else if(xhr.readyState === 4){
            equals(xhr.readyState, 4, '.readyState');
            equals(xhr.responseText, 'Hello World', '.responseText');
            equals(xhr.responseXML, null, '.responseXML');
            equals(xhr.status, 200, '.status');
            equals(xhr.statusText, 'OK', '.statusText');
            _start();
            Envjs.wait();
         }else {
            ok(false, 'xhr failed');
            _start();
            Envjs.wait();
         }
    };
        
    xhr.send();
    stop();
});

_start();
Envjs.wait();