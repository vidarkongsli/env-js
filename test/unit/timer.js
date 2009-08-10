module("timer");

test("runnable callbacks are run until wait", function() {
	expect(1);
	var occurred = 0;
	setTimeout(function(){ occurred = Date.now(); }, 0);
// don't execute the following any more--have reverted window/timer.js changes
// so that setTimeout/Interval functions with time=0 *are* executed prior
// within the call to setTimeout/Interval
//	ok( occurred === 0, "Timeout should not have been executed" );
	$wait();
	ok( occurred !== 0, "Timeout was not executed" );
});

test("wait() executes runnable callbacks", function() {
	expect(1);
	var occurred = 0;
	setTimeout(function(){ occurred = Date.now(); }, 0);
	$wait();
	ok( occurred !== 0, "Timeout was not executed" );
});

test("wait() does not execute nonrunnable callbacks", function() {
	expect(1);
	var occurred = 0;
	setTimeout(function(){ occurred = Date.now(); }, 100);
	$wait();
	ok( occurred === 0, "Timeout should not have been executed" );
});

test("wait(0) executes nonrunnable callbacks", function() {
	expect(1);
	var occurred = 0;
	setTimeout(function(){ occurred = Date.now(); }, 100);
	$wait(0);
	ok( occurred !== 0, "Timeout should have been executed" );
});

test("wait(n) does not execute nonrunnable callbacks", function() {
	expect(2);
	var occurred = 0;
	setTimeout(function(){ occurred = Date.now(); }, 1000);
	$wait(500);
	ok( occurred === 0, "Timeout should not have been executed" );
	$wait(0);
	ok( occurred !== 0, "Timeout should have been executed" );
});

// don't execute the following any more--have reverted window/timer.js changes
// so that setTimeout/Interval functions with time=0 *are* executed prior
// within the call to setTimeout/Interval
/*
test("cleared callbacks don't get executed", function() {
	expect(1);
	var occurred = 0;
	timeout = setTimeout(function(){ occurred = Date.now(); }, 0);
	clearTimeout( timeout );
	$wait();
	ok( occurred === 0, "Timeout should not have executed" );
});
*/
