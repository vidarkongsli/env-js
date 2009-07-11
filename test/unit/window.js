module("window");

test("Window Global Scope Equivalence", function() {
	expect(5);
	
	window.foo = "abc";
	ok( window.foo == foo, "Property created on the window is available in global scope." );
	delete window.foo;
	
	try{
        $$$$$;    
	}catch(e){
	    ok( true, "Property is not in global scope." );
    }
	ok( window.$$$$$ === undefined, "Property is not in window scope." );
	load("test/unit/fixtures/external_script.js");
	ok( $$$$$ === "12345", "Property is in global scope." );
	ok( window.$$$$$ === "12345", "Property is in window scope." );
    
});


test("Window scope in iframe isolated", function() {
    expect(1);

    // test cases here rely on JS in ../html/iframe.html
    var idoc = document.getElementById('loadediframe').contentDocument;
    var mtch = idoc.title.match(/IFRAME/);
	try{ok (mtch && mtch.length > 0,
            "Can get 'document' object from test iframe");
        }catch(e){print(e);}
});

