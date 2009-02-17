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
