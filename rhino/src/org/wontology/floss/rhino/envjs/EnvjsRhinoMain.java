/*
 * This file is a component of env.js, 
 *     http://github.com/gleneivey/env-js/commits/master/README
 * a Pure JavaScript Browser Environment
 * Copyright 2009 John Resig, licensed under the MIT License
 *     http://www.opensource.org/licenses/mit-license.php
 */


package org.wontology.floss.rhino.envjs;

import org.mozilla.javascript.*;
import org.mozilla.javascript.tools.shell.*;


public class EnvjsRhinoMain extends Main
{

    // don't really care that this is singleton, but many methods that
    // use it are static, so...
    private static Global sharedSupraGlobal;

    static
    {           // replace the generic Global object, instantiated in
                // Main.java's static initializer, with our extended version

        sharedSupraGlobal = new EnvjsRhinoSupraGlobal();
        // not calling global.initQuitAction()  Doesn't matter because env.js
        // doesn't call the "quit" JS method provided by the Rhino shell app


        // now, create a new empty object to serve as the execution
        // context's "global", and change the preceding "global"
        // object into a cross-environment, uber-global object see
        // "Sharing Scopes" in
        // https://developer.mozilla.org/En/
        //             Rhino_documentation/Scopes_and_Contexts
        global = new EnvjsRhinoGlobal(sharedSupraGlobal);
    }
}
