
QUnit.module('frame');


asyncTest("Wait for sub-tests to finish...", function(){
    setTimeout(function(){ start(); }, 2500);
});


// 'listOfTests' defined at the top of index.html
for (var c=0; c < listOfTests.length; c++){

    (function(testName) {
        test("Run " + testName + " spec",
            function(){
                if (testName == 'window')
                    expect(4);
                else
                    expect(2);

                var targetIFrame = document.
                    getElementById( "iframe-" + testName );
                var doc = targetIFrame.contentDocument;
                var resultPara;

                ok( resultPara = doc.getElementById('qunit-testresult'),
                    'qunit in iframe produced a result paragraph' );
                ok( resultPara.innerHTML.search( /0[^0-9]+failed\.$/ ) > -1,
                    'sub-test has zero failures' );

                // bonus test-within-test in 'window'
                if (testName == 'window'){
                    var innerIFrame = doc.getElementById( 'iframe-proxy' );
                    doc = innerIFrame.contentDocument;
                    ok( resultPara = doc.getElementById('qunit-testresult'),
                        'qunit in 2*iframe produced a result paragraph' );
                    ok( resultPara.innerHTML.search( /0[^0-9]+failed\.$/ ) > -1,
                        'sub-test has zero failures' );
                }
            }
        );
    })( listOfTests[c] );
}
