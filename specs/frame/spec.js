
QUnit.module('frame');


asyncTest("Wait for sub-tests to finish...", function(){
    setTimeout(function(){ start(); }, 2500);
});


// 'listOfTests' defined at the top of index.html
for (var c=0; c < listOfTests.length; c++){

    (function(testName) {
	test("Run " + testName + " spec",
	    function(){
		expect(2);

		var targetIFrame = document.
		    getElementById( "iframe-" + testName );
		var doc = targetIFrame.contentDocument;
		var resultPara;

		ok( resultPara = doc.getElementById('qunit-testresult'),
		    'qunit in iframe produced a result paragraph' );
		ok( resultPara.innerHTML.search( /0[^0-9]+failed\.$/ ) > -1,
                    'sub-test has zero failures' );
	    });
    })( listOfTests[c] );
}