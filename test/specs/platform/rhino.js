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

test('Envjs.uri', function(){
    var uri;

    uri = Envjs.uri('specs/env/spec.html', 'http://envjs.com/abc123/');
    ok(uri, 'Able to create uri');
    equals(uri, 'http://envjs.com/abc123/'+path, 'uri');
    equals(uri.toString(), 'http://envjs.com/abc123/'+path, 'uri');

    document = {baseURI:'http://envjs.com/'};

    uri = Envjs.uri('specs/env/spec.html');
    ok(uri, 'Able to create uri');
    equals(uri, 'http://envjs.com/specs/env/spec.html', 'uri');
    equals(uri.toString(), 'http://envjs.com/specs/env/spec.html', 'uri');


    uri = Envjs.uri('specs/env/spec.html', 'http://envjs.com/');
    ok(uri, 'Able to create uri');
    equals(uri, 'http://envjs.com/specs/env/spec.html', 'uri');
    equals(uri.toString(), 'http://envjs.com/specs/env/spec.html', 'uri');

    document = null;

    uri = Envjs.uri('http://envjs.com/specs/env/spec.html');
    ok(uri, 'Able to create uri');
    equals(uri, 'http://envjs.com/specs/env/spec.html', 'uri');
    equals(uri.toString(), 'http://envjs.com/specs/env/spec.html', 'uri');

    //
    // test normalization behavior
    // http://foo.com --> http://foo.com/, etc.
    //

    uri = Envjs.uri('file:///foo/bar');
    equals(uri, 'file:///foo/bar', 'File, absolute, without ending "/"');

    uri = Envjs.uri('file:///foo/bar/');
    equals(uri, 'file:///foo/bar/', 'File, absolute, with ending "/"');

    uri = Envjs.uri('http://foo.com');
    equals(uri, 'http://foo.com/', 'http, absolute, without path, without ending "/"');

    uri = Envjs.uri('http://foo.com/');
    equals(uri, 'http://foo.com/', 'http, absolute, without path, with ending "/"');

    uri = Envjs.uri('https://foo.com');
    equals(uri, 'https://foo.com/', 'https, absolute, without path, without ending "/"');

    uri = Envjs.uri('https://foo.com/');
    equals(uri, 'https://foo.com/', 'https, absolute, without path, with ending "/"');

    uri = Envjs.uri('http://foo.com/bar');
    equals(uri, 'http://foo.com/bar', 'http, absolute, with path, without ending "/"');

    uri = Envjs.uri('http://foo.com/bar/');
    equals(uri, 'http://foo.com/bar/', 'http, absolute, with path, with ending "/"');

    uri = Envjs.uri('https://foo.com/bar');
    equals(uri, 'https://foo.com/bar', 'https, absolute, with path, without ending "/"');

    uri = Envjs.uri('https://foo.com/bar/');
    equals(uri, 'https://foo.com/bar/', 'https, absolute, with path, with ending "/"');

    // weird degenerate case.  Starting with double slash implies HTTP
    //   not a file URL.  Used on Very Large websites.
    uri = Envjs.uri('//foo.com/bar');
    equals(uri, 'http://foo.com/bar', 'degenerate url case');

    // make sure whatever is parsing this doesn't choke on ip address
    // or localhost
    uri = Envjs.uri('http://127.0.0.1/');
    equals(uri, 'http://127.0.0.1/', 'http, ip address');

    uri = Envjs.uri('http://localhost/');
    equals(uri, 'http://localhost/', 'http, localhost');

    // cleanup on file URLs
    uri = Envjs.uri('file:///foo/bar?query');
    equals(uri, 'file:///foo/bar', 'file with query');

    uri = Envjs.uri('file:///foo/bar?query#frag');
    equals(uri, 'file:///foo/bar', 'file with query and frag');

    uri = Envjs.uri('file:///foo/bar#frag');
    equals(uri, 'file:///foo/bar', 'file with frag');

    // Oddballs
    uri = Envjs.uri('javascript:')
    equals(uri, '', 'js 1');

    uri = Envjs.uri('javascript:false')
    equals(uri, '', 'js 2');

    uri = Envjs.uri('javascript:void')
    equals(uri, '', 'js 3');

    // URL Joins
    uri = Envjs.uri('specs/env/spec.html', 'http://envjs.com/');
    equals(uri, 'http://envjs.com/specs/env/spec.html', 'join');

    uri = Envjs.uri('/specs/env/spec.html', 'http://envjs.com/');
    equals(uri, 'http://envjs.com/specs/env/spec.html', 'join');

    uri = Envjs.uri('specs/env/spec.html', 'http://envjs.com');
    equals(uri, 'http://envjs.com/specs/env/spec.html', 'join');

    uri = Envjs.uri('/specs/env/spec.html', 'http://envjs.com');
    equals(uri, 'http://envjs.com/specs/env/spec.html', 'join');

    uri = Envjs.uri('specs/env/spec.html', 'http://envjs.com/foo');
    equals(uri, 'http://envjs.com/specs/env/spec.html', 'join');

    uri = Envjs.uri('specs/env/spec.html', 'http://envjs.com/foo/');
    equals(uri, 'http://envjs.com/foo/specs/env/spec.html', 'join');

    uri = Envjs.uri('/specs/env/spec.html', 'http://envjs.com/foo');
    equals(uri, 'http://envjs.com/specs/env/spec.html', 'join');

    uri = Envjs.uri('/specs/env/spec.html', 'http://envjs.com/foo/');
    equals(uri, 'http://envjs.com/specs/env/spec.html', 'join');

    uri = Envjs.uri('/specs/env/spec.html', 'http://envjs.com/foo/../bar/');
    equals(uri, 'http://envjs.com/specs/env/spec.html', 'join');

    uri = Envjs.uri('specs/env/spec.html', 'http://envjs.com/foo/../bar/');
    equals(uri, 'http://envjs.com/bar/specs/env/spec.html', 'join');

    uri = Envjs.uri('specs/.././env/spec.html', 'http://envjs.com/foo/.././bar/');
    equals(uri, 'http://envjs.com/bar/env/spec.html', 'join');
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