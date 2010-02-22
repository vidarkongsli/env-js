
/**
 * load and execute script tag text content
 * @param {Object} script
 */
Envjs.loadInlineScript = function(script){
    if(script.ownerDocument.ownerWindow){
        __context__.evaluateString(
            script.ownerDocument.ownerWindow,
            script.text,
            'eval('+script.text.substring(0,16)+'...):'+new Date().getTime(),
            0,
            null
        );
    }else{
        __context__.evaluateString(
            __this__,
            script.text,
            'eval('+script.text.substring(0,16)+'...):'+new Date().getTime(),
            0,
            null
        );
    }
    //console.log('evaluated at scope %s \n%s', 
    //    script.ownerDocument.ownerWindow.guid, script.text);
};
