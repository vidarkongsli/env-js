/*
 * This file is a component of env.js, 
 *     http://github.com/gleneivey/env-js/commits/master/README
 * a Pure JavaScript Browser Environment
 * Copyright 2009 John Resig, licensed under the MIT License
 *     http://www.opensource.org/licenses/mit-license.php
 */


import org.mozilla.javascript.tools.shell.*;

public class EnvjsRhinoMain extends Main
{
    static
    {           // replace the generic Global object with our extended
        System.out.println("Hello from EnvjsRhinoMain-static-initializer");
        global = new EnvjsRhinoGlobal();
        // not calling global.initQuitAction()  Doesn't matter because env.js
        // doesn't call the "quit" JS method provided by the Rhino shell app
    }
}
