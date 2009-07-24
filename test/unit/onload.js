/*
 * This file is a component of env.js,
 *     http://github.com/gleneivey/env-js/commits/master/README
 * a Pure JavaScript Browser Environment
 * Copyright 2009 John Resig, licensed under the MIT License
 *     http://www.opensource.org/licenses/mit-license.php
 */


module("onload-events");


test("Execution of onload events in top-level document",
  function() {

        // top-level window-onload works, or test framework wouldn't run.....
    expect(4);

    var mtch = document.getElementById('pCreatedByBodyOnload').innerHTML.
      match(/dynamically-generated paragraph/);
    try{ ok(mtch && mtch.length > 0,
        "Got confirmation that body-onload handler executed");
    }catch(e){print(e);}

    mtch = document.getElementById('pCreatedByIframeOnload').innerHTML.
      match(/iframe-onload event handler/);
    try{ ok(mtch && mtch.length > 0,
        "Got confirmation that iframe-onload handler executed");
    }catch(e){print(e);}

    var iframe = document.getElementById('loadediframe');
    var aCounter = 0;
    iframe.onload = function(){
        aCounter++;
    }
    iframe.src = "html/iframe1.html";
    try{ ok(aCounter == 1,
        "iframe-onload handler executes when iframe.src assigned");
    }catch(e){print(e);}

    mtch = document.getElementById('sCreatedByLinkOnload').innerHTML.
      match(/CreatedByLinkOnloadEvent/);
    try{ ok(mtch && mtch.length > 0, "link-onload handler executed");
    }catch(e){print(e);}
});


// still to test:  onload events for:  <frame>, <frameset>, <img>
//                                     image, layer

