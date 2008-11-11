/*
*	xhr.js
*/
// XMLHttpRequest
// Originally implemented by Yehuda Katz
$w.XMLHttpRequest = function(){
	this.headers = {};
	this.responseHeaders = {};
};

XMLHttpRequest.prototype = {
	open: function(method, url, async, user, password){ 
		this.readyState = 1;
		if (async === false ){
			this.async = false;
		}else{ this.async = true; }
		this.method = method || "GET";
		this.url = $env.location(url);
		this.onreadystatechange();
	},
	setRequestHeader: function(header, value){
		this.headers[header] = value;
	},
	getResponseHeader: function(header){ },
	send: function(data){
		var self = this;
		
		function makeRequest(){
			$env.connection(self, function(){
				self.__defineGetter__("responseXML", function(){
					return responseXML;
				});
				if ( self.responseText.match(/^\s*</) ) {
					try {
						var doc = $w.document.implementation.createDocument();
						doc._dom = $env.parseXML(responseText);
						responseXML = doc;
					} catch(e) { /*TODO: need to flag an error here*/}
				}
			});
			self.onreadystatechange();
		}
		if (this.async){
		  $log("XHR sending asynch;");
			$env.runAsync(makeRequest);
		}else{
		  $log("XHR sending synch;");
			makeRequest();
		}
	},
	abort: function(){
		//TODO
	},
	onreadystatechange: function(){
		//TODO
	},
	getResponseHeader: function(header){
	  var rHeader, returnedHeaders;
		if (this.readyState < 3){
			throw new Error("INVALID_STATE_ERR");
		} else {
			returnedHeaders = [];
			for (rHeader in this.responseHeaders) {
				if (rHeader.match(new RegExp(header, "i")))
					returnedHeaders.push(this.responseHeaders[rHeader]);
			}
			if (returnedHeaders.length){ return returnedHeaders.join(", "); }
		}return null;
	},
	getAllResponseHeaders: function(){
	  var header;
		if (this.readyState < 3){
			throw new Error("INVALID_STATE_ERR");
		} else {
			var returnedHeaders = [];
			for (header in this.responseHeaders){
				returnedHeaders.push( header + ": " + this.responseHeaders[header] );
			}return returnedHeaders.join("\r\n");
		}
	},
	async: true,
	readyState: 0,
	responseText: "",
	status: 0
};