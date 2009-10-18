if(!this.whichJarFile){
  whichJarFile = "rhino"
}
whichInterpreter = whichJarFile + " interpreter jar";
if(!this.multiwindow){
  multiwindow = false;
}
load("dist/env.rhino.js");
load("test/qunit.js");

window.addEventListener("load",function(){
  print("\n\nTesting with " + whichInterpreter);
  print("Handling onload for test.js");
  print("Loading tests.");

  load("test/unit/prototypecompat.js");

  print("Load complete. Running tests.");
});

window.location = "test/index.html";

Envjs.wait();