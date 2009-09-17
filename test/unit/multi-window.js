/*
 * This file is a component of env.js,
 *     http://github.com/gleneivey/env-js/commits/master/README
 * a Pure JavaScript Browser Environment
 * Copyright 2009 John Resig, licensed under the MIT License
 *     http://www.opensource.org/licenses/mit-license.php
 */


module("multi-window");

test("2nd window.location= operation flagged as error", function() {
    expect(1);

    try{ ok(true,
        "");
    }catch(e){print(e);}
});

test("navigation-related window members", function() {
// closed, opener, parent, top, close(), open()
    expect(1);

    try{ ok(true,
        "");
    }catch(e){print(e);}
});

