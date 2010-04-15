
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
load('dist/css.js');
load('dist/window.js');

load('specs/qunit.js');
load('specs/env.qunit.js');
load('specs/helpers.js');
load('local_settings.js');


location =  'specs/frame/index.html';
Envjs.wait();
