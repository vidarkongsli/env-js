module('timer');
test('Timer Interfaces Available', function(){
    
    expect(4);
    ok(setTimeout,      'setTimeout');
    ok(setInterval,     'setInterval');
    ok(clearTimeout,    'clearTimeout');
    ok(clearInterval,   'clearInterval');
    
});

