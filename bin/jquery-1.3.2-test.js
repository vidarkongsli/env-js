//debugger;
load("build/runtest/env.js");

(function($env){
    
    //let it load the script from the html
    $env.scriptTypes = {
        "text/javascript"   :true
    };
    
    var count = 0;
    window.log = function(result, message){
        $env.log('(' + (count++) + ')[' + ((!!result) ? 'PASS' : 'FAIL') + '] ' + message);
    };
    
    window.onload = function(){
        $env.warn('Defining QUnit.done');
        QUnit.done = function(pass, fail){
            $env.warn('Writing Results to File');
            jQuery('script').each(function(){
                this.type = 'text/envjs';
            });
            $env.writeToFile(
                document.documentElement.xml, 
                $env.location('jqenv.html')
            );
        };
        
    }
    
    window.location = "test/index.html";
    
})(__env__);
