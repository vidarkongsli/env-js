
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
_load('src/common/__extend__.js');
try{
    _load('local_settings.js');
}catch(e){
    _load('settings.js');
}

module('rhino');

test('Envjs Platform Interfaces Available', function(){
    
    ok(Envjs,                                       'Envjs defined');
    ok(Envjs.log.toString() !== 'function(){};',    'Envjs.log defined');
    ok(Envjs.proxy.toString() !== 'function(){};',  'Envjs.proxy defined');
    
});


var document = null;

test('Envjs.location', function(){
    
    var path = 'specs/env/spec.html',
        base = SETTINGS.BASE_URI;
    
    location = Envjs.location('specs/env/spec.html');
    ok(location, 'Able to create Location');
    equals(location, SETTINGS.BASE_URI+path, 'location');
    equals(location.toString(), SETTINGS.BASE_URI+path, 'location');
    
    location = Envjs.location('specs/env/spec.html', 'http://envjs.com/abc123/');
    ok(location, 'Able to create Location');
    equals(location, 'http://envjs.com/abc123/'+path, 'location');
    equals(location.toString(), 'http://envjs.com/abc123/'+path, 'location');
    
    document = {baseURI:'http://envjs.com/'};
    
    location = Envjs.location('specs/env/spec.html');
    ok(location, 'Able to create Location');
    equals(location, document.baseURI+path, 'location');
    equals(location.toString(), document.baseURI+path, 'location');
    
    document = null;
    
    location = Envjs.location('http://envjs.com/specs/env/spec.html');
    ok(location, 'Able to create Location');
    equals(location, 'http://envjs.com/specs/env/spec.html', 'location');
    equals(location.toString(), 'http://envjs.com/specs/env/spec.html', 'location');
    
});

//Foo is a minimal window implementation
var Foo =  function(scope, parent){
    var $proxy = new Envjs.proxy(scope, parent),
        $parent = parent;
    scope.__proxy__ = $proxy;
    return __extend__(scope,{
        get parent(){
            return parent;
        },
        get top(){
            var _parent = $parent;
            while(scope && _parent && scope !== _parent){
                if(_parent === _parent.parent)break;
                _parent = _parent.parent;
            }
            return _parent || null;
        },
        get abcdefghi(){
            return $proxy;
        }
    });
};
    
var _this = this;

test('Envjs.proxy', function(){

     var frame = {},
         subframe = {};
        
    new Foo(_this, _this);
    equals(abcdefghi.parent, abcdefghi, '.parent');
    equals(abcdefghi.top, abcdefghi, '.top');
    
    new Foo(frame, abcdefghi);
    equals(frame.parent, abcdefghi, '.parent');
    
    new Foo(subframe, frame);
    equals(subframe.parent, frame, '.parent');
    equals(subframe.parent.parent, abcdefghi, '.parent.parent');
    equals(subframe.top, abcdefghi, '.top');
        

});

_start();

