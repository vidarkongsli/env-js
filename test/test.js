// Init
load("dist/env.rhino.js");


window.onload = function(){
  print("Handling onload for test.js");
  // Load the test runner
  load("test/testrunner.js", "test/jquery.js");
    
  // Load the tests
  load(
    "test/unit/core.js",
    "test/unit/selector.js",
    "test/unit/event.js"
  );
  
  
  // Display the results
  results();
};

window.location = "test/index.html";