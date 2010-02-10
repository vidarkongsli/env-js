
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
_load('dist/css.js');

// mock the global document object if not available
try{
    document;
}catch(e){
    console.log('mocking global document object.');
    document = new HTMLDocument(new DOMImplementation());
}

module('css');

test('CSS Interfaces Available', function(){
    
    expect(3);
    ok(CSS2Properties,      'CSS2Properties');
    ok(CSSRule,             'CSSRule');
    ok(CSSStyleSheet,       'CSSStyleSheet');
    
});



test('CSS2Properties', function(){
    

    var div = document.createElement('div');

    div.id = 'styleTest';
    equals(div.getAttribute('style'),null, '.getAttribute("style")');
    equals(div.style.length, 0, '.style.length');
    equals(div.style.getPropertyValue('height'), '', ".style.getPropertyValue('height')");

    div.setAttribute('style','display:block;height:300px;width:400px;');
    equals(div.style.length, 3, '.style.length');
    equals(div.style[0], 'display', '.style[0]');
    equals(div.style[1], 'height', '.style[1]');
    equals(div.style[2], 'width', '.style[2]');
    equals(div.style.display, 'block', '.style.display');
    equals(div.style.height, '300px', '.style.height');
    equals(div.style.width, '400px', '.style.width');
    equals(div.style.getPropertyValue('display'), 'block', ".style.getPropertyValue('display')");
    equals(div.style.getPropertyValue('height'), '300px', ".style.getPropertyValue('height')");
    equals(div.style.getPropertyValue('width'), '400px', ".style.getPropertyValue('width')");
    equals(div.style.cssText, 'display: block; height: 300px; width: 400px;', '.style.cssText');
    
    div.style.setProperty('position','absolute', '');
    equals(div.style.length, 4, '.style.length');
    equals(div.style[3], 'position', '.style[3]');
    equals(div.style.position, 'absolute', '.style.position');
    equals(div.style.getPropertyValue('position'), 'absolute', ".style.getPropertyValue('position')");
    equals(div.style.cssText, 'display: block; height: 300px; width: 400px; position: absolute;', '.style.cssText');
});


_start();

