/*
*	policy.js
*/
var __policy__ = {};
(function($policy, $env){
    
    //you can change these to $env.safeScript to avoid loading scripts
    //or change to $env.loadLocalScripts to load local scripts
    //$policy.loadScript    = $env.safeScript;
    $policy.loadScript    = $env.loadLocalScript;
    
})(__policy__, __env__);