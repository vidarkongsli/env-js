/*
*	env.xhr.js
*/
// XMLHttpRequest
// Originally implemented by Yehuda Katz
function($env, $w){
	$w.XMLHttpRequest = function(){
		this.headers = {};
		this.responseHeaders = {};
	};
	
	XMLHttpRequest.prototype = {
		open: function(method, url, async, user, password){ 
			this.readyState = 1;
			if (async)
				this.async = true;
			this.method = method || "GET";
			this.url = url;
			this.onreadystatechange();
		},
		setRequestHeader: function(header, value){
			this.headers[header] = value;
		},
		getResponseHeader: function(header){ },
		send: function(data){
			var self = this;
			
			function makeRequest(){
				var url = $env.location(self.url, $w.location);
				
				if ( /^file\:/.test(url) ) {
					if ( self.method == "PUT" ) {
						var text =  data || "" ;
						$env.write(text, url);
					} else if ( self.method == "DELETE" ) {
						$env._delete(url);
					} else {
						var connection = url.openConnection();
						connection.connect();
						handleResponse();
					}
				} else { 
					var connection = url.openConnection();
					
					connection.setRequestMethod( self.method );
					
					// Add headers to Java connection
					for (var header in self.headers)
						connection.addRequestProperty(header, self.headers[header]);
				
					connection.connect();
					
					// Stick the response headers into responseHeaders
					for (var i = 0; ; i++) { 
						var headerName = connection.getHeaderFieldKey(i); 
						var headerValue = connection.getHeaderField(i); 
						if (!headerName && !headerValue) break; 
						if (headerName)
							self.responseHeaders[headerName] = headerValue;
					}
					
					handleResponse();
				}
				
				function handleResponse(){
					self.readyState = 4;
					self.status = parseInt(connection.responseCode) || undefined;
					self.statusText = connection.responseMessage || "";
	
					var contentEncoding = connection.getContentEncoding() || "utf-8",
						stream = (contentEncoding.equalsIgnoreCase("gzip") || contentEncoding.equalsIgnoreCase("decompress") )?
	   							new java.util.zip.GZIPInputStream(connection.getInputStream()) :
	   							connection.getInputStream(),
						baos = new java.io.ByteArrayOutputStream(),
	   						buffer = java.lang.reflect.Array.newInstance(java.lang.Byte.TYPE, 1024),
						length,
						responseXML = null;
	
					while ((length = stream.read(buffer)) != -1) {
						baos.write(buffer, 0, length);
					}
	
					baos.close();
					stream.close();
	
					self.responseText = java.nio.charset.Charset.forName(contentEncoding)
						.decode(java.nio.ByteBuffer.wrap(baos.toByteArray())).toString();
					
					self.__defineGetter__("responseXML", function(){
						return responseXML;
					});
					
					if ( self.responseText.match(/^\s*</) ) {
						try {
							var doc = $w.document.implementation.createDocument();
							doc._dom = $env.parseXML(responseText)
							responseXML = doc;
						} catch(e) {
							//TODO: need to flag an error here
						}
					}
				}
				
				self.onreadystatechange();
			}
	
			if (this.async)
				$env.runAsync(makeRequest);
			else
				makeRequest();
		},
		abort: function(){
			//TODO
		},
		onreadystatechange: function(){
			//TODO
		},
		getResponseHeader: function(header){
			if (this.readyState < 3)
				throw new Error("INVALID_STATE_ERR");
			else {
				var returnedHeaders = [];
				for (var rHeader in this.responseHeaders) {
					if (rHeader.match(new RegExp(header, "i")))
						returnedHeaders.push(this.responseHeaders[rHeader]);
				}
			
				if (returnedHeaders.length)
					return returnedHeaders.join(", ");
			}
			
			return null;
		},
		getAllResponseHeaders: function(header){
			if (this.readyState < 3)
				throw new Error("INVALID_STATE_ERR");
			else {
				var returnedHeaders = [];
				
				for (var header in this.responseHeaders)
					returnedHeaders.push( header + ": " + this.responseHeaders[header] );
				
				return returnedHeaders.join("\r\n");
			}
		},
		async: true,
		readyState: 0,
		responseText: "",
		status: 0
	};
}(env, window);