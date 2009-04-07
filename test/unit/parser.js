// environment mocking for parser
$w = ""
$env = { debug: function() {} }

load("src/window/window.js", "src/dom/parser.js");

module("parser");

test("Entity replaced", function() {
    expect(14);
    var htmlstr = "<html><body>Hello, &quot;World&quot;!</body></html>";
    var p = new XMLP(htmlstr);
    equals(XMLP._ELM_B, p.next(), "Opening html tag"); // _ELM_B <html>
    equals(XMLP._ELM_B, p.next(), "Opening body tag"); // _ELM_B <body>

    equals(XMLP._TEXT, p.next(), "Parser emits text event");
    var actual = p.getContent().substring(p.getContentBegin(), p.getContentEnd());
    equals("Hello, ", actual, "Parser content set");
    equals(XMLP._ENTITY, p.next(), "Parser emits entity event");

    actual = p.getContent().substring(p.getContentBegin(), p.getContentEnd());
    equals('"', actual, "Parser replaces &quot; entity");

    equals(XMLP._TEXT, p.next(), "Parser emits second text event");
    actual = p.getContent().substring(p.getContentBegin(), p.getContentEnd());
    equals("World", actual, "Parser content set");

    equals(XMLP._ENTITY, p.next(), "Parser emits second entity event");
    actual = p.getContent().substring(p.getContentBegin(), p.getContentEnd());
    equals('"', actual, "Parser replaces second &quot; entity");

    equals(XMLP._TEXT, p.next(), "Parser emits third text event");
    actual = p.getContent().substring(p.getContentBegin(), p.getContentEnd());
    equals('!', actual, "Parser content set");

    equals(XMLP._ELM_E, p.next(), "Closing body tag"); // _ELM_E </body>
    equals(XMLP._ELM_E, p.next(), "Closing html tag"); // _ELM_E </html>
});
