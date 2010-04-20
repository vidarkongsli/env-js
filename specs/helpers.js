/*
 *
 * This file is a component of env.js,
 *     http://github.com/thatcher/env-js/
 * a Pure JavaScript Browser Environment
 * Copyright 2010 John Resig, licensed under the MIT License
 *     http://www.opensource.org/licenses/mit-license.php
 *
 */


// helpers available to all tests

function runningUnderEnvjs(){
    return (typeof navigator === 'object') &&
        navigator.userAgent.search( /Envjs/ ) > -1;
}
