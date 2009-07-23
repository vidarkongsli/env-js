/*
 * This file is a component of env.js,
 *     http://github.com/gleneivey/env-js/commits/master/README
 * a Pure JavaScript Browser Environment
 * Copyright 2009 John Resig, licensed under the MIT License
 *     http://www.opensource.org/licenses/mit-license.php
 */


module("window");

// depends on <script> block in test/index.html
test("Execution of body-onload in top-level document", function() {
        // top-level window-onload works, or test framework wouldn't run.....
    expect(1);

    var mtch = document.getElementById('pCreatedByBodyOnload').innerHTML.
      match(/dynamically-generated paragraph/);
    try{ ok(mtch && mtch.length > 0,
        "Got confirmation that body-onload handler executed");
    }catch(e){print(e);}
});
