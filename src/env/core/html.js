

/**
 * describes which script src values will trigger Envjs to load
 * the script like a browser would
 */
Envjs.scriptTypes = {
    "text/javascript"   :false,
    "text/envjs"        :true
};
    
/**
 * will be called when loading a script throws an error
 * @param {Object} script
 * @param {Object} e
 */
Envjs.onScriptLoadError = function(script, e){};


/**
 * load and execute script tag text content
 * @param {Object} script
 */
Envjs.loadInlineScript = function(script){
    var tmpFile;
    try{
        if(Envjs.DEBUG_ENABLED){
            //
            Envjs.writeToTempFile(script.text, 'js') ;
            Envjs.load(tmpFile);
        }else{
            eval(script.text);
        }
    }catch(e){
        Envjs.onScriptLoadError(script, e);
    }
};


/**
 * Executes a script tag
 * @param {Object} script
 * @param {Object} parser
 */
Envjs.loadLocalScript = function(script){
    console.debug("loading script %s", script);
    var types, 
        src, 
        i, 
        base,
        // SMP: see also the note in html/document.js about script.type
        script_type = script.type === null ? 
            "text/javascript" : script.type;
    
    if(script_type){
        types = script_type?script_type.split(";"):[];
        for(i=0;i<types.length;i++){
            if(Envjs.scriptTypes[types[i]]){
                //ok this script type is allowed
                break;
            }
            if(i+1 == types.length)
                return false;
        }
    }else{
        try{
            //handle inline scripts
            if(!script.src)
                Envjs.loadInlineScript(script);
             return true
        }catch(e){
            //Envjs.error("Error loading script.", e);
            Envjs.onScriptLoadError(script, e);
            return false;
        }
    }
        
        
    if(script.src){
        //$env.info("loading allowed external script :" + script.src);
        //lets you register a function to execute 
        //before the script is loaded
        if(Envjs.beforeScriptLoad){
            for(src in Envjs.beforeScriptLoad){
                if(script.src.match(src)){
                    Envjs.beforeScriptLoad[src](script);
                }
            }
        }
        base = "" + script.ownerDocument.location;
        var filename = Envjs.location(script.src.match(/([^\?#]*)/)[1], base );
        try {                      
            load(filename);
            console.log('loaded %s', filename);
        } catch(e) {
            console.log("could not load script %s \n %s", filename, e );
            Envjs.onScriptLoadError(script, e);
            return false;
        }
        //lets you register a function to execute 
        //after the script is loaded
        if(Envjs.afterScriptLoad){
            for(src in Envjs.afterScriptLoad){
                if(script.src.match(src)){
                    Envjs.afterScriptLoad[src](script);
                }
            }
        }
    }
    return true;
};
    