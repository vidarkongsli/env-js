
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
_load('dist/timer.js');

module('timer');
test('Timer Interfaces Available', function(){
    
    expect(4);
    ok(setTimeout,      'setTimeout');
    ok(setInterval,     'setInterval');
    ok(clearTimeout,    'clearTimeout');
    ok(clearInterval,   'clearInterval');
    
});


_start();
Envjs.wait();
