/*
 * Envjs @VERSION@ 
 * Pure JavaScript Browser Environment
 * By John Resig <http://ejohn.org/> and the Envjs Team
 * Copyright 2008-2010 John Resig, under the MIT License
 */

var Envjs = function(){
    var i,
        name;
    for(i=0;i<arguments.length;i++){
        for ( name in arguments[i] ) {
            var g = arguments[i].__lookupGetter__(name), 
                s = arguments[i].__lookupSetter__(name);
            if ( g || s ) {
                if ( g ) Envjs.__defineGetter__(name, g);
                if ( s ) Envjs.__defineSetter__(name, s);
            } else
                Envjs[name] = arguments[i][name];
        }
    }
};

//eg "Mozilla"
Envjs.appCodeName  = "Envjs";
//eg "Gecko/20070309 Firefox/2.0.0.3"
Envjs.appName      = "Resig/20070309 PilotFish/1.2.0.1";
