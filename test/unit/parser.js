// environment mocking for parser
$w = { }
$env = { debug: function() {} }
$openingWindow = $parentWindow = $initTop = null;

load("src/window/window.js", "src/dom/parser.js", "src/dom/entities.js");

module("parser");

test("HTML Standard Entities: Spot Check", function() {
    
    expect(3);
    
    var htmlstr = 
        "<div id='xmlentity'>&lt;Hello&gt;, &quot;W&apos;rld&quot;!</div>",
        domParser = new DOMParser(),
        doc = domParser.parseFromString(htmlstr),
        actual,
        expected;
    
    actual = doc.
        getElementById('xmlentity').
        childNodes[0].
        nodeValue;
    expected = '<Hello>, "W\'rld"!';  
    equals(
        actual, 
        expected, 
        "parser replaces entities"
    );
        
    actual = doc.
        getElementById('xmlentity').
        innerHTML;
    expected = '&lt;Hello&gt;, "W\'rld"!';  
    equals(
        actual, 
        expected, 
        "innerHTML serializes back only &amp;, &lt; and &gt; for TextNode"
    );

    htmlstr  = "<div id='htmlentity'>&quot; &amp; &lt; &gt; "+
                   "&nbsp; &copy; &reg; &yen; &para; " +
                   "&Ecirc; &Otilde; &aelig; &divide; &Kappa; &theta; "+
                   "&bull; &hellip; &trade; &rArr; &sum; &clubs; " +
                   "&ensp; &mdash;</body></html>";
    expected = '" &amp; &lt; &gt; '+
               '\xA0 \xA9 \xAE \xA5 \xB6 '+
               '\xCA \xD5 \xE6 \xF7 \u039A \u03B8 '+
               '\u2022 \u2026 \u2122 \u21D2 \u2211 \u2663 '+
               '\u2002 \u2014';

    domParser = new DOMParser();
    doc = domParser.parseFromString(htmlstr);
    actual = doc.
        getElementById('htmlentity').
        innerHTML;

    equals(
        actual, 
        expected, 
        "html entities are not serialized back with innerHTML"
    );
});

test("HTML Serialization Convention", function(){
    
});


test("Ugly HTML", function() {
    expect(1);
    //setup
    var domParser = new DOMParser(),
    	html = '<div id="pig"><p>this is a pig... &apos;oink! oink!&apos;</div>',
        doc = domParser.parseFromString(html),
        expected = '<div id="pig"><p>this is a pig... \'oink! oink!\'</p></div>',
        actual   = doc.getElementById('pig').xml;
        
    equals(
        actual, 
        expected,
        'got expected well formed html'
    );

});
