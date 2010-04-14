
/**
 * @author thatcher
 */
load('dist/platform/core.js');
load('dist/platform/rhino.js');
load('dist/console.js');
load('dist/dom.js');
load('dist/event.js');
load('dist/html.js');
load('dist/timer.js');
load('dist/parser.js');
load('dist/xhr.js');
load('dist/window.js');
load('dist/css.js');

load('specs/qunit.js');
load('specs/env.qunit.js');

load('local_settings.js');
load('specs/frame/spec.js');


location =  'specs/frame/index.html';
Envjs.wait();
