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

    var gotAnException = false;
    window.onload = function(){;};
    try{         window.location = "html/trivial.html";    }
    catch (e){   gotAnException = true;                         }
    try{ ok(gotAnException, "prohibited window.location setter call fails");
    }catch(e){print(e);}
});

test("navigation-related window members", function() {
    expect(25);

    var anotherWin;
    try{ ok(anotherWin = window.open("html/trivial.html"),
        "'window.open' returns new object");
    }catch(e){print(e);}

    try{ ok(anotherWin.closed == false,
        "2nd window knows that it is not-closed");
    }catch(e){print(e);}

    var mtch = anotherWin.document.getElementById('oneP').innerHTML.
        match(/Nearly-empty HTML/);
    try{ ok(mtch && mtch.length > 0,
        "2nd window has correct contents");
    }catch(e){print(e);}

    try{ ok(anotherWin.opener == this,
        "2nd window's .opener is original window");
    }catch(e){print(e);}

    try{ ok(anotherWin.top == anotherWin,
        "2nd window's .top is itself");
    }catch(e){print(e);}

    try{ ok(anotherWin.parent == anotherWin,
        "2nd window's .parent is itself");
    }catch(e){print(e);}


    try{ ok((anotherWin.location = "html/with_js.html") || true,
        "1st explicit '.location=' completes without exception");
    }catch(e){print(e);}

    mtch = anotherWin.document.getElementById('HeaderLevel1').
        innerHTML.match(/Hello/);
    try{ ok(mtch && mtch.length > 0,
        "location setter-loaded content is correct");
    }catch(e){print(e);}


    try{ ok((anotherWin.location = "html/trivial.html") || true,
        "2nd explicit '.location=' completes without exception");
    }catch(e){print(e);}

    mtch = anotherWin.document.getElementById('oneP').innerHTML.
        match(/Nearly-empty HTML/);
    try{ ok(mtch && mtch.length > 0,
        "2nd location setter-loaded content is correct");
    }catch(e){print(e);}


    var thirdWin;
    try{ ok(thirdWin = window.open("html/with_js.html"),
        "2nd 'window.open' returns 3rd window");
    }catch(e){print(e);}

    mtch = thirdWin.document.getElementById('HeaderLevel1').
        innerHTML.match(/Hello/);
    try{ ok(mtch && mtch.length > 0,
        "3rd window's content is correct");
    }catch(e){print(e);}

    mtch = anotherWin.document.getElementById('oneP').innerHTML.
        match(/Nearly-empty HTML/);
    try{ ok(mtch && mtch.length > 0,
        "after 3rd window, 2nd's content still correct");
    }catch(e){print(e);}

    try{ ok(document.title == "jQuery Test Suite",
        "after 3rd window, original's content still correct");
    }catch(e){print(e);}


    try{ ok(thirdWin.getTestVariables()[0] == "hello, scope",
        "function from open()'ed window's scope callable");
    }catch(e){print(e);}

    try{ ok(thirdWin.getTestVariables()[1] == undefined ||
            thirdWin.getTestVariables()[1] == null,
        "dynamically-created test variable in 3rd win doesn't exist yet");
    }catch(e){print(e);}

    try{ ok(thirdWin.setTestVariable(42) || true,
        "call to fn to create variable in other window's scope w/o exception");
    }catch(e){print(e);}

    try{ ok(thirdWin.getTestVariables()[1] == 42,
        "variable in other window's scope created correctly");
    }catch(e){print(e);}

    try{ ok(thirdWin.notAlwaysPresentVariable == 42,
        "variable in other window's scope accessible directly, too");
    }catch(e){print(e);}

    try{ ok((thirdWin.location = "html/with_js.html") || true,
        "3rd window's '.location=' worked without exception");
    }catch(e){print(e);}

    try{ ok(thirdWin.getTestVariables()[1] == undefined ||
            thirdWin.getTestVariables()[1] == null,
        "reloaded window has clean variable scope");
    }catch(e){print(e);}

    try{ ok(thirdWin.notAlwaysPresentVariable = 55,
        "setting variable in other window's scope executes without exception");
    }catch(e){print(e);}

    try{ ok(thirdWin.getTestVariables()[1] == 55,
        "directly-set variable visible to code executing in other scope");
    }catch(e){print(e);}

    try{ ok(window.notAlwaysPresentVariable == undefined ||
            window.notAlwaysPresentVariable == null,
        "creating variable in 3rd window scope doesn't affect original window");
    }catch(e){print(e);}

    try{ ok(anotherWin.notAlwaysPresentVariable == undefined ||
            anotherWin.notAlwaysPresentVariable == null,
        "creating variable in 3rd window scope doesn't affect 2nd window");
    }catch(e){print(e);}

/*

    try{ ok(
        "");
    }catch(e){print(e);}

    try{ ok(
        "");
    }catch(e){print(e);}



    try{ ok(anotherWindow.close() || true,
        "'.close()' executed without exception");
    }catch(e){print(e);}

    try{ ok(anotherWindow.closed == true,
        "after closing window, '.closed' is true");
    }catch(e){print(e);}

    try{ ok(window.closed == false,
        "closing 2nd window doesn't affect original window");
    }catch(e){print(e);}

    try{ ok(thirdWin.closed == false,
        "closing 2nd window doesn't affect 3rd window");
    }catch(e){print(e);}
*/
});

