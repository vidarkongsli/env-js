load('test/specs/qunit.js');
load('test/specs/env.qunit.js');
QUnit.init();

load('dist/platform/core.js');
load('dist/platform/rhino.js');
load('dist/console.js');
load('src/common/__extend__.js');
load('settings.js');

module('rhino');

test('Envjs Platform Interfaces Available', function(){
    
    ok(Envjs,                                       'Envjs defined');
    ok(Envjs.log.toString() !== 'function(){};',    'Envjs.log defined');
    ok(Envjs.proxy.toString() !== 'function(){};',  'Envjs.proxy defined');
    
});

var document = null,
    path = 'specs/env/spec.html';

test('Envjs.location', function(){
    
    location = Envjs.location('specs/env/spec.html', 'http://envjs.com/abc123/');
    ok(location, 'Able to create Location');
    equals(location, 'http://envjs.com/abc123/'+path, 'location');
    equals(location.toString(), 'http://envjs.com/abc123/'+path, 'location');
    
    document = {baseURI:'http://envjs.com/'};
    
    location = Envjs.location('specs/env/spec.html');
    ok(location, 'Able to create Location');
    equals(location, 'http://envjs.com/specs/env/spec.html', 'location');
    equals(location.toString(), 'http://envjs.com/specs/env/spec.html', 'location');
    
    
    location = Envjs.location('specs/env/spec.html', 'http://envjs.com/');
    ok(location, 'Able to create Location');
    equals(location, 'http://envjs.com/specs/env/spec.html', 'location');
    equals(location.toString(), 'http://envjs.com/specs/env/spec.html', 'location');
    
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

/*test('qunit same', function(){
    
    var top = {owner:null, parent:null, children:[], type:1};
    var a = {owner:top, parent:top, children:[], type:2};
    var b = {owner:top, parent:top, children:[], type:2};
    var c = {owner:top, parent:a, children:[], type:3};
    var d = {owner:top, parent:b, children:[], type:4};
    
    top.children.push(a, b);
    a.children.push(c);
    b.children.push(d);
    
    //prevent jsDump stack overflow
    QUnit.jsDump.parse=function(thing){return thing+'';};
    
    //this will cause its own overflow
    same(a, b, 'will this ever return?');
    
    //This will cause a stack overflow
    //QUnit.jsDump.parse(a);
    
});*/

Envjs.onExit(function(){
    console.log('onExit!');
});


start();