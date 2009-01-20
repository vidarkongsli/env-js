/*
*	policy.js
*/
var __policy__ = {};
(function($policy, $env){
    
    //you can change these to $env.safeScript to avoid loading scripts
    //or change to $env.loadLocalScripts to load local scripts
    $policy.loadScripts    = $env.safeScript;
    
})(__policy__, __env__);