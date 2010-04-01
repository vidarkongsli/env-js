
/* This is an experimental attempt at pulling out all the
 * external calls into a single file for commonjs based engines
 *
 * This does not work yet, but is here for use by others as they work
 * through the issues # This is NOT the final location of this file too.
 *
 * TO USE:
 * load('env.js');
 * load('platform-commonjs.js');  // this file
 *
 * good luck!
 */
Envjs.platform = 'commonjs';
Envjs.revision = '1';

Envjs.log = require('system').print;
Envjs.lineSoruce = function(e) {
    // TBD -- what does this do again?
};

// default in core writes to disk.
//  not sure why this goes to disk
//Envjs.loadInlineScript

Envjs.eval = function(context, source, name) {
    // don't think the second arg is evaluated in JS anymore
    // need to investigate
    eval(source, context);
};

// DOn't think it's used
Envjs.profile = function(options) {
    throw new Error(this);
};

// This is only synchronous, so no locking is needed
Envjs.sync = function(fn) {
    return fn;
};

//Envjs.spawn  nothing -- not used

// commonjs doesn't spec a sleep
//  maybe return do nothing
Envjs.sleep = function(ms) {
    //require('gpsee').sleep(ms / 1000.0);
};

Envjs.javaEnabled = false;
Envjs.tmpdir         = '/tmp';
Envjs.os_name        = '';
Envjs.os_arch        = '';
Envjs.os_version     = '';
Envjs.lang           = 'en-US';

/**
 * Makes an object window-like by proxying object accessors
 * @param {Object} scope
 * @param {Object} parent
 */
Envjs.proxy = function(scope, parent) {
    try {
        if (scope + '' == '[object global]') {
            return scope;
        } else {
            // WRONG.. but not sure what to do yet
            return scope
            //return  __context__.initStandardObjects();
        }
    } catch(e) {
        console.log('failed to init standard objects %s %s \n%s', scope, parent, e);
    }
};


// THis can be moved to Envjs.platform.core
// this is all pure javascript
Envjs.loadFrame = function(frame, url) {
    try {
        if (frame.contentWindow) {
            //mark for garbage collection
            frame.contentWindow = null;
        }

        //create a new scope for the window proxy
        frame.contentWindow = Envjs.proxy();
        new Window(frame.contentWindow, window);

        //I dont think frames load asynchronously in firefox
        //and I think the tests have verified this but for
        //some reason I'm less than confident... Are there cases?
        frame.contentDocument = frame.contentWindow.document;
        frame.contentDocument.async = false;
        if(url){
            //console.log('envjs.loadFrame async %s', frame.contentDocument.async);
            frame.contentWindow.location = url;
        }
    } catch(e) {
        console.log("failed to load frame content: from %s %s", url, e);
    }

};

/**
 * unloadFrame
 * @param {Object} frame
 * MOVE TO ENVJs.platform.core
 */
Envjs.unloadFrame = function(frame){
    try {
        delete frame.contentDocument;
        frame.contentDocument = null;
        if (frame.contentWindow) {
            frame.contentWindow.close();
        }
    } catch (e) {
        console.log(e);
    }
};

/**
 * Actually run it synchronously
 */
Envjs.runAsync = function(fn, onInterrupt) {
    fn();
};

Envjs.getcwd = function() {
    return require('fs-base').workingDirectory();
};

Envjs.writeToFile = function(text, url) {
    var path = url;
    // TODO, strip 'file://'
    var fd = require('fs-base').openRaw(path, { write: true, create: true, exclusive: true });
    fd.write(text, 'utf-8');
    fd.close();
};

Envjs.writeToTempFile = function(text, suffix) {
    // TODO
    throw new Error("writeToTempFile!");
};

Envjs.deleteFile = function(url) {
    // TODO: remove starting "file://"
    require('fs-base').remove(url);
};

/**
 * establishes connection and calls responsehandler
 * @param {Object} xhr
 * @param {Object} responseHandler
 * @param {Object} data
 */
Envjs.connection = function(xhr, responseHandler, data) {
    throw new Error('Envjs.connection');
    // THIS WILL BE REPLACED WITH NATIVE XHR IMPL
};

// XHR is a confusing bit of code in envjs.  Need to simplify.
// if you are lucky your impl has a XHR already
XMLHttpRequest = require('xhr').XMLHttpRequest;
