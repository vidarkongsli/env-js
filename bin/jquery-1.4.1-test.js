//debugger;
load("dist/env.rhino.js");

Envjs({
    //let it load the script from the html
    scriptTypes: {
        "text/javascript"   :true
    },
    afterScriptLoad:{
        'data/testrunner.js': function(){
            console.log('loaded test runner');
            //hook into qunit.log
            var count = 0;
            QUnit.log = function(result, message){
                console.log('(' + (count++) + ')[' + 
                    ((!!result) ? 'PASS' : 'FAIL') + '] ' + message);
            };
            //hook into qunit.done
            QUnit.done = function(pass, fail){
                console.log('Writing Results to File');
                jQuery('script').each(function(){
                    this.type = 'text/envjs';
                });
                Envjs.writeToFile(
                    document.documentElement.xml, 
                    Envjs.location('jqenv-'+Date.now()+'.html')
                );
            };
            
            //allow jquery to run ajax
            isLocal = false;
            jQuery.ajaxSetup({async : false});
            
            
            var unsafeStop = stop,
                unsafeStart = start,
                isStopped = null;

            var config_timeout;
            stop = function(timeout){
                if(isStopped === null || isStopped === false){
                    console.log('PAUSING QUNIT');
                    isStopped = true;
                    unsafeStop.call(this);
                    timeout = ( timeout && timeout > 0 ) ? timeout : 10000;
                    start();
                    Envjs.wait()
                }
            };
            start = function(){
                if(isStopped === null || isStopped === true ){
                    console.log('RESTARTING QUNIT');
                    isStopped = false;
                    if(config_timeout) {
                      clearTimeout(config_timeout);
                      config_timeout = undefined;
                    }
                    unsafeStart.call(this);
                }
            };
            //we know some ajax calls will fail becuase
            //we are not running against a running server
            //for php files
            var handleError = jQuery.handleError;
            jQuery.handleError = function(){
                ok(false, 'Ajax may have failed while running locally');
                try{
                    handleError(arguments);
                }catch(e){
                    console.log(e);
                }
                //allow tests to gracefully continue
                start();
            };
            //allow unanticipated xhr error with no ajax.handleError 
            //callback (eg jQuery.getScript) to exit gracefully
            Envjs.onInterrupt = function(){
                console.log('thread interupt: gracefully continuing test');
                start();
            };
            
           
            Envjs.onScriptLoadError = function(script){
                Envjs.error("failed to load script \n"+script.text);    
                ok(false, 'Ajax may have failed to load correct script while running locally');
                //allow tests to gracefully continue
                start();
            };
        }
    }
});

window.document.async = false;
window.location = 'test/vendor/jQuery/1.4.1/test/index.html';
Envjs.wait();

