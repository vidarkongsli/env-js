/*
 * This file is a component of env.js, 
 *     http://github.com/gleneivey/env-js/commits/master/README
 * a Pure JavaScript Browser Environment
 * Copyright 2009 John Resig, licensed under the MIT License
 *     http://www.opensource.org/licenses/mit-license.php
 */


package org.wontology.floss.rhino.envjs;

import org.mozilla.javascript.*;


public class EnvjsRhinoGlobal extends
        org.mozilla.javascript.tools.shell.Global
{

    Scriptable initialGlobalScope;


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

        // env.js needs access to this array on both sides of a change
        // in global object, and won't be able to create new properties
        // on "this" object by the time we start executing JS code
        NativeArray envjsGlobalStack = (NativeArray) cx.newArray(this, 0);
        defineProperty("_$envjs$globalObjectStack$_", envjsGlobalStack,
                       ScriptableObject.DONTENUM);



        // now, create a new empty object to serve as the execution
        // context's "global", and change this object into a cross-
        // environment, uber-global object see "Sharing Scopes" in
        // https://developer.mozilla.org/En/
        //             Rhino_documentation/Scopes_and_Contexts

//        initialGlobalScope = cx.newObject(this);
//        initialGlobalScope.setPrototype(this);
//        initialGlobalScope.setParentScope(null);
    }


    /* class methods intended to be called as JavaScript global functions */

    public static Scriptable createAGlobalObject(Context cx, Scriptable thisObj,
                                                 Object[] args, Function funObj)
    {
        return cx.newObject(thisObj);
    }

    public static Scriptable getThisScopesGlobalObject(Context cx,
                                                       Scriptable thisObj,
                                                       Object[] args,
                                                       Function funObj)
    {
        return cx.newObject(thisObj);
    }

    public static void setThisScopesGlobalObject(Context cx, Scriptable thisObj,
                                                 Object[] args, Function funObj)
    {
    }
}
