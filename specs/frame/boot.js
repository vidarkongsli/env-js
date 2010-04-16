
/**
 * @author thatcher
 */
load('dist/env.rhino.js');

load('specs/qunit.js');
load('specs/env.qunit.js');
load('specs/helpers.js');

load('local_settings.js');
// "load('specs/frame/spec.js');" is in the "index.html" file


location = 'specs/frame/index.html';
Envjs.wait();
