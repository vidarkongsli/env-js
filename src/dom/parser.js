$log("Defining DOMParser");
/*
* DOMParser
*/
$w.__defineGetter__('DOMParser', function(){
  return function(){
    return __extend__(this, {
      parseFromString: function(xmlString){
        $debug("Parsing XML String: " +xmlString);
        return document.implementation.createDocument().loadXML(xmlString);
      }
    });
  };
});

$log("Initializing Internal DOMParser.");
//keep one around for internal use
$domparser = new DOMParser();
