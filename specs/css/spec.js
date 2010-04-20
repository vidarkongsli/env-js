QUnit.module('css');

// mock the global document object if not available
try {
    document;
} catch(e) {
    console.log('mocking global document object.');
    document = new HTMLDocument(new DOMImplementation());
}


test('CSS Interfaces Available', function(){

    expect(11);
    ok(CSSRule,             'CSSRule');
    ok(CSSStyleRule,        'CSSStyleRule');
    ok(CSSImportRule,       'CSSImportRule');
    ok(CSSMediaRule,        'CSSMediaRule');
    ok(CSSPageRule,         'CSSPageRule');
    ok(CSSFontFaceRule,     'CSSFontFaceRule');

    ok(CSSRuleList,         'CSSRuleList');

    ok(CSS2Properties,      'CSS2Properties');

    // http://dev.w3.org/csswg/cssom/#cssstylesheet
    ok(CSSStyleSheet,       'CSSStyleSheet');

    // XML Base Interfaces

    // http://dev.w3.org/csswg/cssom/#the-stylesheet-interface
    // http://www.w3.org/TR/2000/REC-DOM-Level-2-Style-20001113/stylesheets.html#StyleSheets-StyleSheet
    ok(StyleSheet,       'StyleSheet');

    // http://dev.w3.org/csswg/cssom/#stylesheetlist
    // http://www.w3.org/TR/2000/REC-DOM-Level-2-Style-20001113/stylesheets.html#StyleSheets-StyleSheetList
    ok(StyleSheetList,       'StyleSheetList');

    // http://www.w3.org/TR/2000/REC-DOM-Level-2-Style-20001113/stylesheets.html#StyleSheets-MediaList
    // TBD
    //ok(MediaList,       'MediaList');

});

test('CSSRule', function() {
    equals(CSSRule.STYLE_RULE,      1, 'CSSRule.STYLE_RULE');
    equals(CSSRule.IMPORT_RULE,     3, 'CSSRule.IMPORT_RULE');
    equals(CSSRule.MEDIA_RULE,      4, 'CSSRule.MEDIA_RULE');
    equals(CSSRule.FONT_FACE_RULE,  5, 'CSSRule.FONT_FACE_RULE');
    equals(CSSRule.PAGE_RULE,       6, 'CSSRule.PAGE_RULE');

    // not in FF
    //equals(CSSRule.NAMESPACE_RULE, 10, 'CSSRule.NAMESPACE_RULE');
});

test('CSS2Properties', function(){


    var div = document.createElement('div');

    div.id = 'styleTest';
    equals(div.getAttribute('style'),null, '.getAttribute("style")');
    equals(div.style.length, 0, '.style.length');
    equals(div.style.getPropertyValue('height'), '', ".style.getPropertyValue('height')");

    div.setAttribute('style','display:block;height:300px;width:400px;opacity:.5;');
    equals(div.style.length, 4, '.style.length');
    equals(div.style[0], 'display', '.style[0]');
    equals(div.style[1], 'height', '.style[1]');
    equals(div.style[2], 'width', '.style[2]');
    equals(div.style[3], 'opacity', '.style[2]');
    equals(div.style.display, 'block', '.style.display');
    equals(div.style.height, '300px', '.style.height');
    equals(div.style.width, '400px', '.style.width');
    equals(div.style.opacity, '0.5', '.style.opacity');
    equals(div.style.getPropertyValue('display'), 'block', ".style.getPropertyValue('display')");
    equals(div.style.getPropertyValue('height'), '300px', ".style.getPropertyValue('height')");
    equals(div.style.getPropertyValue('width'), '400px', ".style.getPropertyValue('width')");
    equals(div.style.cssText, 'display: block; height: 300px; width: 400px; opacity: 0.5;', '.style.cssText');

    div.style.setProperty('position','absolute', '');
    equals(div.style.length, 5, '.style.length');
    equals(div.style[4], 'position', '.style[4]');
    equals(div.style.position, 'absolute', '.style.position');
    equals(div.style.getPropertyValue('position'), 'absolute', ".style.getPropertyValue('position')");
    equals(div.style.cssText, 'display: block; height: 300px; width: 400px; opacity: 0.5; position: absolute;', '.style.cssText');
});

test('document.styleSheets', function() {
    ok(document.styleSheets, 'document.styleSheets exists');
    equals(document.styleSheets.toString(), '[object StyleSheetList]', 'StyleSheetsList.toString()');
});