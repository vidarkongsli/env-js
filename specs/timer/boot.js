
/**
 * @author thatcher
 */

load('specs/qunit.js');
load('specs/env.qunit.js');
QUnit.init();

load('dist/platform/core.js');
load('dist/platform/rhino.js');
load('dist/console.js');
load('dist/timer.js');
load('specs/timer/spec.js');

start();
Envjs.wait();