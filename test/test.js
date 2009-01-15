// Init
load("dist/env.rhino.js");


window.onload = function(){
  print("Handling onload for test.js");
  // Load the test runner
  load("test/testrunner.js", "test/jquery.js");
  print("Loaded test runner.");
  
  var start = new Date().getTime();
  print("Loading tests.");
  // Load the tests
  load(
    "test/unit/dom.js",
    "test/unit/core.js",
    "test/unit/selector.js",
    "test/unit/event.js"
  );
  var end = new Date().getTime();
  
  
  // Display the results
  results();
  
  print("Tests took : " + (end - start)/1000 + "seconds");
};

window.location = "test/index.html";