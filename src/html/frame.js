$debug("Defining HTMLFrameElement");
/* 
* HTMLFrameElement - DOM Level 2
*/
var HTMLFrameElement = function(ownerDocument) {
    this.HTMLElement = HTMLElement;
    this.HTMLElement(ownerDocument);
};
HTMLFrameElement.prototype = new HTMLElement;
__extend__(HTMLFrameElement.prototype, {
    get frameBorder(){
        return this.getAttribute('border')||"";
    },
    set frameBorder(value){
        this.setAttribute('border', value);
    },
    get longDesc(){
        return this.getAttribute('longdesc')||"";
    },
    set longDesc(value){
        this.setAttribute('longdesc', value);
    },
    get marginHeight(){
        return this.getAttribute('marginheight')||"";
    },
    set marginHeight(value){
        this.setAttribute('marginheight', value);
    },
    get marginWidth(){
        return this.getAttribute('marginwidth')||"";
    },
    set marginWidth(value){
        this.setAttribute('marginwidth', value);
    },
    get name(){
        return this.getAttribute('name')||"";
    },
    set name(value){
        this.setAttribute('name', value);
    },
    get noResize(){
        return this.getAttribute('noresize')||"";
    },
    set noResize(value){
        this.setAttribute('noresize', value);
    },
    get scrolling(){
        return this.getAttribute('scrolling')||"";
    },
    set scrolling(value){
        this.setAttribute('scrolling', value);
    },
    get src(){
        return this.getAttribute('src')||"";
    },
    set src(value){
        this.setAttribute('src', value);

        if (value && value.length > 0){
            try {

        /* this code semi-duplicated in dom/implementation.js -- sorry */
                var frameWindow;
                var makingNewWinFlag = !(this._content);
                if (makingNewWinFlag)
                            // a blank object, inherits from original global
                                  //  v EnvjsRhinoSupraGlobal.java
                    frameWindow = createAGlobalObject();
                else
                    frameWindow = this._content;


                // define local variables with content of things that are
                //   in current global/window, because when the following
                //   function executes we'll have a new/blank
                //   global/window and won't be able to get at them....
                var localCopy_mkWinFn    = _$envjs$makeObjectIntoWindow$_;
                var localCopy_$env       = $env;
                var localCopy_window     = window;

                // a local function gives us something whose scope
                //   is easy to change
                var mkAndLoadNewWindow   = function(){
                    if (makingNewWinFlag){
                        localCopy_mkWinFn(frameWindow, localCopy_$env,
                                          localCopy_window,
                                          localCopy_window.top);
                    }

                    frameWindow.location = value;
                }


                // change scope of window object creation
                //   functions, so that functions/code they create
                //   will be scoped to new window object
        // *FunctionObjectsScope() from EnvjsRhinoSupraGlobal.java
                var oldMalnwScope      = getFunctionObjectsScope(
                  mkAndLoadNewWindow);
                var oldMkWinScope      = getFunctionObjectsScope(
                  localCopy_mkWinFn);
                var oldLoadScope       = getFunctionObjectsScope(load);
                var oldLoadScriptScope = getFunctionObjectsScope(
                  $env.loadLocalScript);

                setFunctionObjectsScope(mkAndLoadNewWindow,    frameWindow);
                setFunctionObjectsScope(localCopy_mkWinFn,     frameWindow);
                setFunctionObjectsScope(load,                  frameWindow);
                setFunctionObjectsScope($env.loadLocalScript,  frameWindow);

                mkAndLoadNewWindow();
                this._content = frameWindow;

                // now restore the scope
                setFunctionObjectsScope(mkAndLoadNewWindow, oldMalnwScope);
                setFunctionObjectsScope(localCopy_mkWinFn, oldMkWinScope);
                setFunctionObjectsScope(load, oldLoadScope);
                setFunctionObjectsScope($env.loadLocalScript,
                  oldLoadScriptScope);
            } catch(e){
                $error("failed to load frame content: from " + value, e);
            }

            var event = document.createEvent();
            event.initEvent("load");
            this.dispatchEvent( event );
        }
    },
    get contentDocument(){
        if (!this._content)
            return null;
        return this._content.document;
    },
    get contentWindow(){
        return this._content;
    },
    onload: function(event){
        __eval__(this.getAttribute('onload')||'')
    }
});

$w.HTMLFrameElement = HTMLFrameElement;
