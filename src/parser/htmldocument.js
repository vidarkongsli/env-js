
__extend__(HTMLDocument.prototype,{

    open : function(){ 
        this._open = true;  
        this._writebuffer = [];
    },
    close : function(){ 
        if(!!this._open){
            new HTMLParser().parseFromString(this, this._writebuffer.join('\n'));
            delete this._open;
            delete this._writebuffer;
        }
    },
    write: function(htmlstring){ 
         this._writebuffer = [htmlstring];
    },
    writeln: function(htmlstring){ 
        this._writebuffer.push(htmlstring); 
    }
    
});

var __elementPopped__ = function(ns, name, node){
    //console.log('error loading html element %s %s %s %e', ns, name, node);
    var doc = node.ownerDocument,
        okay,
        event;
    // SMP: subtle issue here: we're currently getting two kinds of script nodes from the html5 parser.
    // The "fake" nodes come with a type of undefined. The "real" nodes come with the type that's given,
    // or null if not given. So the following check has the side-effect of ignoring the "fake" nodes. So
    // something to watch for if this code changes.
    var type = ( node.type === null ) ? "text/javascript" : node.type;
    try{
        if(node.nodeName.toLowerCase() == 'script' && type == "text/javascript" 
            && (node.src || node.childNodes.length > 0)){
            //$env.debug("element popped: script\n"+node.xml);
            // unless we're parsing in a window context, don't execute scripts
            if (doc.toString() === '[object HTMLDocument]'){
                
                okay = Envjs.loadLocalScript(node, null);
                //console.log('loaded script? %s %s', node.uuid, okay);
                // only fire event if we actually had something to load
                if (node.src && node.src.length > 0){
                    event = doc.createEvent('HTMLEvents');
                    event.initEvent( okay ? "load" : "error", false, false );
                    node.dispatchEvent( event, false );
                }
            }
        }
        else if (node.nodeName.toLowerCase() == 'frame' ||
                 node.nodeName.toLowerCase() == 'iframe'   ){
            
            if (node.src && node.src.length > 0){
                //console.log("getting content document for (i)frame from %s", node.src);
    
                Envjs.loadFrame(node, Envjs.location(node.src));
    
                event = doc.createEvent('HTMLEvents');
                event.initEvent("load", false, false);
                node.dispatchEvent( event, false );
            }
        }
        else if (node.nodeName.toLowerCase() == 'link'){
            //$env.debug("element popped: link\n"+node.xml);
            if (node.href && node.href.length > 0){
                // don't actually load anything, so we're "done" immediately:
                event = doc.createEvent('HTMLEvents');
                event.initEvent("load", false, false);
                node.dispatchEvent( event, false );
            }
        }
        else if (node.nodeName.toLowerCase() == 'img'){
            //$env.debug("element popped: img \n"+node.xml);
            if (node.src && node.src.length > 0){
                // don't actually load anything, so we're "done" immediately:
                event = doc.createEvent('HTMLEvents');
                event.initEvent("load", false, false);
                node.dispatchEvent( event, false );
            }
        }
    }catch(e){
        console.log('error loading html element %s %s %s %e', ns, name, node, e.toString());
    }
};
