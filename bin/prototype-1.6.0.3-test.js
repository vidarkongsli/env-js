//debugger;
load("env.js");

(function($env){
    
    $env("test/index.html", {
        //let it load the script from the html
        scriptTypes: {
            "text/javascript"   :true
        }
    });
    
})(Envjs);
