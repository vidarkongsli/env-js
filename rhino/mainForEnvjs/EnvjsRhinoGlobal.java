/*
 * This file is a component of env.js, 
 *     http://github.com/gleneivey/env-js/commits/master/README
 * a Pure JavaScript Browser Environment
 * Copyright 2009 John Resig, licensed under the MIT License
 *     http://www.opensource.org/licenses/mit-license.php
 */


import org.mozilla.javascript.*;

public class EnvjsRhinoGlobal extends
        org.mozilla.javascript.tools.shell.Global
{
    public void init(Context cx)
    {
        // first, let the Rhino shell base class do its init
        super.init(cx);

        // now, we add the JavaScript methods we want to provide for env.js
        String[] names = {
            "createAGlobalObject",
            "getThisScopesGlobalObject",
            "setThisScopesGlobalObject"
        };
        defineFunctionProperties(names, EnvjsRhinoGlobal.class,
                                 ScriptableObject.DONTENUM);
    }


    /* class methods intended to be called as JavaScript global functions */

    public static void createAGlobalObject(Context cx, Scriptable thisObj,
                                           Object[] args, Function funObj)
    {
    }

    public static void getThisScopesGlobalObject(Context cx, Scriptable thisObj,
                                                 Object[] args, Function funObj)
    {
    }

    public static void setThisScopesGlobalObject(Context cx, Scriptable thisObj,
                                                 Object[] args, Function funObj)
    {
    }
}
