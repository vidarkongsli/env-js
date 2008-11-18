//DOMImplementation
$log("Defining DOMImplementation");
$w.__defineGetter__("DOMImplementation", function(){
  return function(){
    throw new Error("Object cannot be created in this context");
  };
});

var DOMImplementation = function(){
	return {
		hasFeature: function(feature, version){
			//TODO
			return false;
		},
		createDocumentType: function(qname, publicid, systemid){
			return new __DocumentType__({
			  name:qname, publicId:publicid, systemId:systemid
			});
		},
		createDocument:function(nsuri, qname, doctype){
		  //TODO - this currently returns an empty doc
		  //but needs to handle the args
			return new HTMLDocument();
		},
		getFeature:function(feature, version){
			//TODO or TODONT?
		}
	};
};


$log("Initializing document.implementation");
var $implementation =  new DOMImplementation();