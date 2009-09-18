/*
*	outro.js
*/


    };// close function definition begun in 'intro.js'


    // turn "original" JS interpreter global object into the
    // "root" window object
    Envjs.window(this,    // object to "window-ify"
                 Envjs,   // our scope for globals
                 this,    // a root window's parent is itself
                 null,    // "opener" for new window
                 this,    // "top" for new window
                 true     // identify this as the original (not reloadable) win
                );

} catch(e){
    Envjs.error("ERROR LOADING ENV : " + e + "\nLINE SOURCE:\n" +
        Envjs.lineSource(e));
}
