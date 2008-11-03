/*
*	env.rhino.js
*/
(function($env){
	
	//For Java the window.location object is a java.net.URL
	$env.location = function(path, location){
		if(!location){
			//return an absolute url
			return new java.io.File(path).toURL();
		}else{
			//return a path relative to the location
			return new java.net.URL(location, path);
		}
	};
	$env.locationHref = function(location){
		return location.toString();
	};
	
	//For Java the window.timer is created using the java.lang.Thread in combination
	//with the java.lang.Runnable
	$env.timer = function(fn, time){
		return new java.lang.Thread(new java.lang.Runnable({
			run: function(){
				while (true){
					java.lang.Thread.currentThread().sleep(time);
					fn();
				}
			}
		});
	};	
	
	//Since we're running in rhino I guess we can safely assume
	//java is 'enabled'.  I'm sure this requires more thought
	//than I've given it here
	$env.navigator.javaEnabled = true;	
	
	
	//Used in the XMLHttpRquest implementation to run a
	// request in a seperate thread
	$env.runAsync = function(fn){
		(new java.lang.Thread(new java.lang.Runnable({
			run: fn
		}))).start();
	};
	
	//Used to write to a local file
	$env.write = function(text, url){
		var out = new java.io.FileWriter( 
			new java.io.File( 
				new java.net.URI(url.toString())
			)
		);				
		out.write( text, 0, text.length );
		out.flush();
		out.close();
	};
	
	//Used to delete a local file
	$env._delete = function(url){
		var file = new java.io.File( new java.net.URI( url ) );
        file["delete"]();
	};
	
	$env.parseXML = function(xmlstring){
		return Packages.javax.xml.parsers.
			DocumentBuilderFactory.newInstance()
				.newDocumentBuilder().parse(xmlstring);
	};

	
})(env);