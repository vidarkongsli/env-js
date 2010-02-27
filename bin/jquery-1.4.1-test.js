//debugger;
load("dist/env.rhino.js");
var _starttime = new Date().getTime(),
    _endtime;

Envjs({
    //let it load the script from the html
    scriptTypes: {
        "text/javascript"   :true
    },
    afterScriptLoad:{
        'data/testrunner.js': function(){
            console.log('loaded test runner');
            //hook into qunit.log
            var count = 0,
                module;
            
            QUnit.moduleStart = function(name, testEnvironment) {
                module = name;
            };
            QUnit.log = function(result, message){
                console.log('{'+module+'}(' + (count++) + ')[' + 
                    ((!!result) ? 'PASS' : 'FAIL') + '] ' + message);
            };
            //hook into qunit.done
            QUnit.done = function(fail, pass){
                _endtime = new Date().getTime();
                console.log('\n\tRESULTS: ( of '+(pass+fail)+' total tests )');
                console.log('\t\tPASSED: ' +pass);
                console.log('\t\tFAILED: ' +fail);
                console.log('\tCompleted in '+(_endtime-_starttime)+' milliseconds.\n');
                
                console.log('Writing Results to File');
                jQuery('script').each(function(){
                    this.type = 'text/envjs';
                });
                Envjs.writeToFile(
                    document.documentElement.outerHTML, 
                    Envjs.uri('Envjs.jQuery.1.4.1.html')
                );
            };
            //spidermonkey and rhino enumerate properties in different orders.
            //qunit.equiv produces an infinite loop if properties are checked
            //in the wrong order (eg parentNode before childNodes) This patch
            //has been submitted to QUnit
            /*QUnit.equiv.callbacks['object'] = function(b,a){
                return b === a;
            };*/
            
            //allow jquery to run ajax
            isLocal = false;
            jQuery.ajaxSetup({async : false});
            
            //we are breaking becuase our inheritence pattern causes infinite
            //recursion somewhere in jsDump;
            /*QUnit.jsDump = {
                parse: function(thing){
                    return 'envjs qunit jsdump bug';//thing+"";
                }
            }*/

            var _start = start;
            start = function(){
                _start();
                Envjs.wait();
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
            
           
            Envjs.onScriptLoadError = function(script, e){
                console.log("failed to load script %s %s", script.src, script.text, e);    
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
