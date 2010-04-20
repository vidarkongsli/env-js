/**
 *
 * This file is a component of env.js,
 *     http://github.com/thatcher/env-js/
 * a Pure JavaScript Browser Environment
 * Copyright 2010 John Resig, licensed under the MIT License
 *     http://www.opensource.org/licenses/mit-license.php
 *
 * @author thatcher
 */

load('dist/env.rhino.js');

load('specs/qunit.js');
load('specs/env.qunit.js');
// "load('specs/helpers.js');" is in the "index.html" file

load('local_settings.js');
// "load('specs/scope/spec.js');" is in the "index.html" file


location = 'specs/scope/index.html';
