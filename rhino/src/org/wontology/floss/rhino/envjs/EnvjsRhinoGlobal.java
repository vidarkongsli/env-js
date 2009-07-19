/*
 * This file is a component of env.js, 
 *     http://github.com/gleneivey/env-js/commits/master/README
 * a Pure JavaScript Browser Environment
 * Copyright 2009 John Resig, licensed under the MIT License
 *     http://www.opensource.org/licenses/mit-license.php
 */


package org.wontology.floss.rhino.envjs;

import org.mozilla.javascript.*;
import org.mozilla.javascript.tools.shell.Global;

public class EnvjsRhinoGlobal extends Global
{

    public EnvjsRhinoGlobal(Global parentSharedScope)
    {
        this.setPrototype(parentSharedScope);
        this.setParentScope(null);
    }

    public void init(Context cx)
    {
        // we don't init, but make sure our parent is
        Global uberGlobal = (Global) this.getPrototype();
        if (!uberGlobal.isInitialized())
            uberGlobal.init(cx);
    }

    public boolean isInitialized()
    {
        return ((Global) this.getPrototype()).isInitialized();
        // some users of Global access .initialized directly (bad class, bad!),
        //   and will be confused by the fact that we don't set it.  However,
        //   unnecessary calls to .init() will simply do nothing, so....
    }
}
