/*
*	env.navigator.js
*/
(function($env, $w){

	// Browser Navigator
	$w.__defineGetter__("navigator", function(){	
		return {
			get appCodeName(){
				return "Mozilla";
			},
			get appName(){
				return "Gecko/20070309 Firefox/2.0.0.3";
			},
			get appVersion(){
				return "5.0 ("+ $w.navigator.platform +"; U; Intel Mac OS X; en-US; rv:1.8.1.3)";
			},
			get cookieEnabled(){
				return true;
			},
			get mimeTypes(){
				return [];
			},
			get platform(){
				return "Macintosh";
			},
			get plugins(){
				return [];
			},
			get userAgent(){
				return $w.navigator.appCodeName + "/" + $w.navigator.appVersion + " " + $w.navigator.appName;
			},
			javaEnabled : function(){
				return $env.navigator.javaEnabled;	
			}
		};
	});

	
	
})(env, window);
