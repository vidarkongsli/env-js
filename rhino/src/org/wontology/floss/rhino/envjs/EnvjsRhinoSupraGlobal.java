/*
 * This file is a component of env.js, 
 *     http://github.com/gleneivey/env-js/commits/master/README
 * a Pure JavaScript Browser Environment
 * Copyright 2009 John Resig, licensed under the MIT License
 *     http://www.opensource.org/licenses/mit-license.php
 */


package org.wontology.floss.rhino.envjs;

import java.lang.reflect.*;
import org.mozilla.javascript.*;
import org.mozilla.javascript.tools.shell.Global;
import org.mozilla.javascript.tools.shell.Environment;

public class EnvjsRhinoSupraGlobal extends Global
{
    public void init(Context cx)
    {
        // let the Rhino shell base class do its init
        super.init(cx);

        // now, we add the JavaScript methods we want to provide for env.js
        String[] names = {
            "createAGlobalObject",
            "getThisScopesGlobalObject",
            "whereAmI",
            "setThisScopesGlobalObject"
        };
        defineFunctionProperties(names, EnvjsRhinoSupraGlobal.class,
                                 ScriptableObject.DONTENUM);


        // defineFunctionProperties assigns the scope of new function objects
        //   to its caller ("this"), which isn't what we want.  So, find all
        //   of them and reassign their parent scope object.
        Object[] propIds = this.getAllIds();
        for (Object anId: propIds) {
            try {
                Scriptable aProp = (Scriptable) (this.get((String) anId, this));
                if (aProp.getClassName() == "Function")
                    aProp.setParentScope(EnvjsRhinoMain.global);
            }
            catch (ClassCastException ccExcept) {
                ; // ignore properties that don't cast to Scriptable
            }
        }


        // env.js needs access to this array on both sides of a change
        // in global object, and won't be able to create new properties
        // on "this" object by the time we start executing JS code
        NativeArray envjsGlobalStack = (NativeArray) cx.newArray(this, 0);
        defineProperty("_$envjs$globalObjectStack$_", envjsGlobalStack,
                       ScriptableObject.DONTENUM);
    }


    /* class methods intended to be called as JavaScript global functions */

    public static Scriptable createAGlobalObject(Context cx, Scriptable thisObj,
                                                 Object[] args, Function funObj)
    {
        Global gObj = (Global) (ScriptableObject.getTopLevelScope(funObj));
        Class c = EnvjsRhinoSupraGlobal.class;
        while (gObj != null && gObj.getClass() != c)
            gObj = (Global) gObj.getPrototype();
        if (gObj == null)
            throw new IllegalStateException("EnvjsRhinoSupraGlobal.createAGlobalObject: couldn't find our Global scope obj.");
        return new EnvjsRhinoGlobal(gObj);
    }

    public static Scriptable getThisScopesGlobalObject(Context cx,
                                                       Scriptable thisObj,
                                                       Object[] args,
                                                       Function funObj)
    {
        return ScriptableObject.getTopLevelScope(funObj);
    }

    public static void setThisScopesGlobalObject(Context cx, Scriptable thisObj,
                                                 Object[] args, Function funObj)
    {
        Scriptable previousObj = funObj;
        Scriptable currentObj = funObj.getParentScope();
        Scriptable nextObj;
        while ((nextObj = currentObj.getParentScope()) != null) {
            previousObj = currentObj;
            currentObj = nextObj;
        }

        if (args.length != 1)
            throw new IllegalArgumentException("EnvjsRhinoSupraGlobal.setThisScropesGlobalObject: wrong argument count.");
        else if (args[0].getClass() != EnvjsRhinoGlobal.class)
            throw new IllegalArgumentException("EnvjsRhinoSupraGlobal.setThisScropesGlobalObject: new scope object isn't an EnvjsRhinoGlobal.");
        else if (currentObj.getClass() != EnvjsRhinoGlobal.class)
            throw new IllegalStateException("EnvjsRhinoSupraGlobal.setThisScropesGlobalObject: existing scope object isn't an EnvjsRhinoGlobal.");
        else
            previousObj.setParentScope((Scriptable) args[0]);
    }


    public static void whereAmI(Context cx,
                                                       Scriptable thisObj,
                                                       Object[] args,
                                                       Function funObj)
    {
        System.out.println("whereAmI : " + Context.toString(args[0]));
	System.out.println("    **** function is " + ((FunctionObject) funObj).getFunctionName());
        System.out.println("  scope:");
        Scriptable temp = thisObj;
        while (temp != null){
         System.out.println("    this " + temp.getClass().getName() +
                            " (" + temp.hashCode() + ")");
         temp = temp.getParentScope();
        }
        temp = funObj;
        while (temp != null){
         System.out.println("    fun  " + temp.getClass().getName() +
                            " (" + temp.hashCode() + ")");
         temp = temp.getParentScope();
        }
        System.out.println("  prototypes:");
        temp = thisObj;
        while (temp != null){
         System.out.println("    this " + temp.getClass().getName() +
                            " (" + temp.hashCode() + ")");
         temp = temp.getPrototype();
        }
        temp = funObj;
        while (temp != null){
         System.out.println("    fun  " + temp.getClass().getName() +
                            " (" + temp.hashCode() + ")");
         temp = temp.getPrototype();
        }


        System.out.println("  function parameters:");
        Object[] allIds = ((ScriptableObject) funObj).getAllIds();
	for (Object anObj: allIds){
            System.out.println("    " + anObj);
        }

        Object argumentsObj = funObj.get("arguments",funObj);
	if (argumentsObj == null)
	    System.out.println("  'arguments' is null");
        else {
	    ScriptableObject argumentsProperty = (ScriptableObject) argumentsObj;
	    System.out.println("  'arguments' parameters:");
	    allIds = argumentsProperty.getAllIds();
	    for (Object anObj: allIds){
		System.out.println("    " + anObj);
	    }
        }


/*
        Object anObj = thisObj.get("arguments",thisObj);
        if (anObj == Scriptable.NOT_FOUND)
            System.out.println("      thisObj.arguments not found");
        else {
            System.out.println("      thisObj.arguments is " +
              anObj.getClass().getName());

            Scriptable argumentsProperty = (Scriptable) anObj;
            anObj = argumentsProperty.get("callee",argumentsProperty);
            if (anObj == null)
                System.out.println("         arguments.callee is null");
            else if (anObj == Scriptable.NOT_FOUND)
                System.out.println("         arguments.callee not found");
            else
                System.out.println("         arguments.callee is " +
                  anObj.getClass().getName());
	    
            anObj = argumentsProperty.get("caller",argumentsProperty);
            if (anObj == null)
                System.out.println("         arguments.caller is null");
            else if (anObj == Scriptable.NOT_FOUND)
                System.out.println("         arguments.caller not found");
            else
                System.out.println("         arguments.caller is " +
                  anObj.getClass().getName());
        }

        if (funObj == null)
            System.out.println("      funObj is null");
        else {
            anObj = funObj.get("arguments",funObj);
            if (anObj == null)
                System.out.println("      funObj.arguments is null");
            else if (anObj == Scriptable.NOT_FOUND)
                System.out.println("      funObj.arguments not found");
            else
                System.out.println("      funObj.arguments is " +
                  anObj.getClass().getName());
        }
*/
    }
}
