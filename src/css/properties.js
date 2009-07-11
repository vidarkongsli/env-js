/*
* CSS2Properties - DOM Level 2 CSS
*/
var CSS2Properties = function(options){
    __extend__(this, __supportedStyles__);
    this.onSetCallback = options.onSet?options.onSet:(function(){});
    this.styleIndices = {};
    __cssTextToStyles__(this, options.cssText?options.cssText:"");
};
__extend__(CSS2Properties.prototype, {
    get cssText(){
        return Array.prototype.join.apply(this,[';\n']);
    },
    set cssText(cssText){ 
        __cssTextToStyles__(this, cssText); 
    },
    getPropertyCSSValue : function(){
        
    },
    getPropertyPriority : function(){
        
    },
    getPropertyValue : function(name){
		var camelCase = name.replace(/\-(\w)/g, function(all, letter){
			return letter.toUpperCase();
		});
        var i, value = this[camelCase];
        if(value === undefined){
            for(i=0;i<this.length;i++){
                if(this[i]===name){
                    return this[i];
                }
            }
        }
        return value;
    },
    item : function(index){
        return this[index];
    },
    removeProperty: function(){
        
    },
    setProperty: function(){
        
    },
    toString:function(){
        if (this.length >0){
            return "{\n\t"+Array.prototype.join.apply(this,[';\n\t'])+"}\n";
        }else{
            return '';
        }
    },
    onSet:function(camelCaseName, value){
        var dashedName = camelCaseName.replace(/[A-Z]/g, function(all) {
            return "-" + all.toLowerCase();
        });
        var definition = dashedName + ": " + value;
        if (this.styleIndices[camelCaseName] !== undefined)
            this[this.styleIndices[camelCaseName]] = definition;
        else {
            Array.prototype.push.apply(this, [definition]);
            this.styleIndices[camelCaseName] = this.length - 1;
        }
        this.onSetCallback();
    },
});

var __cssTextToStyles__ = function(css2props, cssText){
    var styleArray=[];
    var style, name, value, camelCaseName, w3cName, styles = cssText.split(';');
    this.styleIndices = {};
    for ( var i = 0; i < styles.length; i++ ) {
        //$log("Adding style property " + styles[i]);
    	style = styles[i].split(':');
    	if ( style.length == 2 ){
    	    //keep a reference to the original name of the style which was set
    	    //this is the w3c style setting method.
    	    var idx = styleArray.length;
    	    styleArray[idx] = w3cName = styles[i];
            //camel case for dash case
    	    value = trim(style[1]);
            camelCaseName = trim(style[0].replace(/\-(\w)/g, function(all, letter){
				return letter.toUpperCase();
			}));
            this.styleIndices[camelCaseName] = idx;
            $debug('CSS Style Name:  ' + camelCaseName);
            if(css2props["_" + camelCaseName]!==undefined){
                //set the value internally with camelcase name 
                $debug('Setting css ' + camelCaseName + ' to ' + value);
                css2props["_" + camelCaseName] = value;
            };
    	}
    }
    __setArray__(css2props, styleArray);
};
//Obviously these arent all supported but by commenting out various sections
//this provides a single location to configure what is exposed as supported.
//These getters/setters will need to get fine-tuned in the future to deal with
//the variation on input formulations
var __supportedStyles__ = (function(){
    return{
        _azimuth: "",
        get azimuth() {
            return this._azimuth;
        },
        set azimuth(val) {
            this._azimuth = val;
            this.onSet("azimuth", val);
        },
        _background:	"",
        get background() {
            return this._background;
        },
        set background(val) {
            this._background = val;
            this.onSet("background", val);
        },
        _backgroundAttachment:	"",
        get backgroundAttachment() {
            return this._backgroundAttachment;
        },
        set backgroundAttachment(val) {
            this._backgroundAttachment = val;
            this.onSet("backgroundAttachment", val);
        },
        _backgroundColor:	"",
        get backgroundColor() {
            return this._backgroundColor;
        },
        set backgroundColor(val) {
            this._backgroundColor = val;
            this.onSet("backgroundColor", val);
        },
        _backgroundImage:	"",
        get backgroundImage() {
            return this._backgroundImage;
        },
        set backgroundImage(val) {
            this._backgroundImage = val;
            this.onSet("backgroundImage", val);
        },
        _backgroundPosition:	"",
        get backgroundPosition() {
            return this._backgroundPosition;
        },
        set backgroundPosition(val) {
            this._backgroundPosition = val;
            this.onSet("backgroundPosition", val);
        },
        _backgroundRepeat:	"",
        get backgroundRepeat() {
            return this._backgroundRepeat;
        },
        set backgroundRepeat(val) {
            this._backgroundRepeat = val;
            this.onSet("backgroundRepeat", val);
        },
        _border:	"",
        get border() {
            return this._border;
        },
        set border(val) {
            this._border = val;
            this.onSet("border", val);
        },
        _borderBottom:	"",
        get borderBottom() {
            return this._borderBottom;
        },
        set borderBottom(val) {
            this._borderBottom = val;
            this.onSet("borderBottom", val);
        },
        _borderBottomColor:	"",
        get borderBottomColor() {
            return this._borderBottomColor;
        },
        set borderBottomColor(val) {
            this._borderBottomColor = val;
            this.onSet("borderBottomColor", val);
        },
        _borderBottomStyle:	"",
        get borderBottomStyle() {
            return this._borderBottomStyle;
        },
        set borderBottomStyle(val) {
            this._borderBottomStyle = val;
            this.onSet("borderBottomStyle", val);
        },
        _borderBottomWidth:	"",
        get borderBottomWidth() {
            return this._borderBottomWidth;
        },
        set borderBottomWidth(val) {
            this._borderBottomWidth = val;
            this.onSet("borderBottomWidth", val);
        },
        _borderCollapse:	"",
        get borderCollapse() {
            return this._borderCollapse;
        },
        set borderCollapse(val) {
            this._borderCollapse = val;
            this.onSet("borderCollapse", val);
        },
        _borderColor:	"",
        get borderColor() {
            return this._borderColor;
        },
        set borderColor(val) {
            this._borderColor = val;
            this.onSet("borderColor", val);
        },
        _borderLeft:	"",
        get borderLeft() {
            return this._borderLeft;
        },
        set borderLeft(val) {
            this._borderLeft = val;
            this.onSet("borderLeft", val);
        },
        _borderLeftColor:	"",
        get borderLeftColor() {
            return this._borderLeftColor;
        },
        set borderLeftColor(val) {
            this._borderLeftColor = val;
            this.onSet("borderLeftColor", val);
        },
        _borderLeftStyle:	"",
        get borderLeftStyle() {
            return this._borderLeftStyle;
        },
        set borderLeftStyle(val) {
            this._borderLeftStyle = val;
            this.onSet("borderLeftStyle", val);
        },
        _borderLeftWidth:	"",
        get borderLeftWidth() {
            return this._borderLeftWidth;
        },
        set borderLeftWidth(val) {
            this._borderLeftWidth = val;
            this.onSet("borderLeftWidth", val);
        },
        _borderRight:	"",
        get borderRight() {
            return this._borderRight;
        },
        set borderRight(val) {
            this._borderRight = val;
            this.onSet("borderRight", val);
        },
        _borderRightColor:	"",
        get borderRightColor() {
            return this._borderRightColor;
        },
        set borderRightColor(val) {
            this._borderRightColor = val;
            this.onSet("borderRightColor", val);
        },
        _borderRightStyle:	"",
        get borderRightStyle() {
            return this._borderRightStyle;
        },
        set borderRightStyle(val) {
            this._borderRightStyle = val;
            this.onSet("borderRightStyle", val);
        },
        _borderRightWidth:	"",
        get borderRightWidth() {
            return this._borderRightWidth;
        },
        set borderRightWidth(val) {
            this._borderRightWidth = val;
            this.onSet("borderRightWidth", val);
        },
        _borderSpacing:	"",
        get borderSpacing() {
            return this._borderSpacing;
        },
        set borderSpacing(val) {
            this._borderSpacing = val;
            this.onSet("borderSpacing", val);
        },
        _borderStyle:	"",
        get borderStyle() {
            return this._borderStyle;
        },
        set borderStyle(val) {
            this._borderStyle = val;
            this.onSet("borderStyle", val);
        },
        _borderTop:	"",
        get borderTop() {
            return this._borderTop;
        },
        set borderTop(val) {
            this._borderTop = val;
            this.onSet("borderTop", val);
        },
        _borderTopColor:	"",
        get borderTopColor() {
            return this._borderTopColor;
        },
        set borderTopColor(val) {
            this._borderTopColor = val;
            this.onSet("borderTopColor", val);
        },
        _borderTopStyle:	"",
        get borderTopStyle() {
            return this._borderTopStyle;
        },
        set borderTopStyle(val) {
            this._borderTopStyle = val;
            this.onSet("borderTopStyle", val);
        },
        _borderTopWidth:	"",
        get borderTopWidth() {
            return this._borderTopWidth;
        },
        set borderTopWidth(val) {
            this._borderTopWidth = val;
            this.onSet("borderTopWidth", val);
        },
        _borderWidth:	"",
        get borderWidth() {
            return this._borderWidth;
        },
        set borderWidth(val) {
            this._borderWidth = val;
            this.onSet("borderWidth", val);
        },
        _bottom:	"",
        get bottom() {
            return this._bottom;
        },
        set bottom(val) {
            this._bottom = val;
            this.onSet("bottom", val);
        },
        _captionSide:	"",
        get captionSide() {
            return this._captionSide;
        },
        set captionSide(val) {
            this._captionSide = val;
            this.onSet("captionSide", val);
        },
        _clear:	"",
        get clear() {
            return this._clear;
        },
        set clear(val) {
            this._clear = val;
            this.onSet("clear", val);
        },
        _clip:	"",
        get clip() {
            return this._clip;
        },
        set clip(val) {
            this._clip = val;
            this.onSet("clip", val);
        },
        _color:	"",
        get color() {
            return this._color;
        },
        set color(val) {
            this._color = val;
            this.onSet("color", val);
        },
        _content:	"",
        get content() {
            return this._content;
        },
        set content(val) {
            this._content = val;
            this.onSet("content", val);
        },
        _counterIncrement:	"",
        get counterIncrement() {
            return this._counterIncrement;
        },
        set counterIncrement(val) {
            this._counterIncrement = val;
            this.onSet("counterIncrement", val);
        },
        _counterReset:	"",
        get counterReset() {
            return this._counterReset;
        },
        set counterReset(val) {
            this._counterReset = val;
            this.onSet("counterReset", val);
        },
        _cssFloat:	"",
        get cssFloat() {
            return this._cssFloat;
        },
        set cssFloat(val) {
            this._cssFloat = val;
            this.onSet("cssFloat", val);
        },
        _cue:	"",
        get cue() {
            return this._cue;
        },
        set cue(val) {
            this._cue = val;
            this.onSet("cue", val);
        },
        _cueAfter:	"",
        get cueAfter() {
            return this._cueAfter;
        },
        set cueAfter(val) {
            this._cueAfter = val;
            this.onSet("cueAfter", val);
        },
        _cueBefore:	"",
        get cueBefore() {
            return this._cueBefore;
        },
        set cueBefore(val) {
            this._cueBefore = val;
            this.onSet("cueBefore", val);
        },
        _cursor:	"",
        get cursor() {
            return this._cursor;
        },
        set cursor(val) {
            this._cursor = val;
            this.onSet("cursor", val);
        },
        _direction:	"",
        get direction() {
            return this._direction;
        },
        set direction(val) {
            this._direction = val;
            this.onSet("direction", val);
        },
        _display:	"",
        get display() {
            return this._display;
        },
        set display(val) {
            this._display = val;
            this.onSet("display", val);
        },
        _elevation:	"",
        get elevation() {
            return this._elevation;
        },
        set elevation(val) {
            this._elevation = val;
            this.onSet("elevation", val);
        },
        _emptyCells:	"",
        get emptyCells() {
            return this._emptyCells;
        },
        set emptyCells(val) {
            this._emptyCells = val;
            this.onSet("emptyCells", val);
        },
        _font:	"",
        get font() {
            return this._font;
        },
        set font(val) {
            this._font = val;
            this.onSet("font", val);
        },
        _fontFamily:	"",
        get fontFamily() {
            return this._fontFamily;
        },
        set fontFamily(val) {
            this._fontFamily = val;
            this.onSet("fontFamily", val);
        },
        _fontSize:	"",
        get fontSize() {
            return this._fontSize;
        },
        set fontSize(val) {
            this._fontSize = val;
            this.onSet("fontSize", val);
        },
        _fontSizeAdjust:	"",
        get fontSizeAdjust() {
            return this._fontSizeAdjust;
        },
        set fontSizeAdjust(val) {
            this._fontSizeAdjust = val;
            this.onSet("fontSizeAdjust", val);
        },
        _fontStretch:	"",
        get fontStretch() {
            return this._fontStretch;
        },
        set fontStretch(val) {
            this._fontStretch = val;
            this.onSet("fontStretch", val);
        },
        _fontStyle:	"",
        get fontStyle() {
            return this._fontStyle;
        },
        set fontStyle(val) {
            this._fontStyle = val;
            this.onSet("fontStyle", val);
        },
        _fontVariant:	"",
        get fontVariant() {
            return this._fontVariant;
        },
        set fontVariant(val) {
            this._fontVariant = val;
            this.onSet("fontVariant", val);
        },
        _fontWeight:	"",
        get fontWeight() {
            return this._fontWeight;
        },
        set fontWeight(val) {
            this._fontWeight = val;
            this.onSet("fontWeight", val);
        },
        _height:	"",
        get height() {
            return this._height;
        },
        set height(val) {
            this._height = val;
            this.onSet("height", val);
        },
        _left:	"",
        get left() {
            return this._left;
        },
        set left(val) {
            this._left = val;
            this.onSet("left", val);
        },
        _letterSpacing:	"",
        get letterSpacing() {
            return this._letterSpacing;
        },
        set letterSpacing(val) {
            this._letterSpacing = val;
            this.onSet("letterSpacing", val);
        },
        _lineHeight:	"",
        get lineHeight() {
            return this._lineHeight;
        },
        set lineHeight(val) {
            this._lineHeight = val;
            this.onSet("lineHeight", val);
        },
        _listStyle:	"",
        get listStyle() {
            return this._listStyle;
        },
        set listStyle(val) {
            this._listStyle = val;
            this.onSet("listStyle", val);
        },
        _listStyleImage:	"",
        get listStyleImage() {
            return this._listStyleImage;
        },
        set listStyleImage(val) {
            this._listStyleImage = val;
            this.onSet("listStyleImage", val);
        },
        _listStylePosition:	"",
        get listStylePosition() {
            return this._listStylePosition;
        },
        set listStylePosition(val) {
            this._listStylePosition = val;
            this.onSet("listStylePosition", val);
        },
        _listStyleType:	"",
        get listStyleType() {
            return this._listStyleType;
        },
        set listStyleType(val) {
            this._listStyleType = val;
            this.onSet("listStyleType", val);
        },
        _margin:	"",
        get margin() {
            return this._margin;
        },
        set margin(val) {
            this._margin = val;
            this.onSet("margin", val);
        },
        _marginBottom:	"",
        get marginBottom() {
            return this._marginBottom;
        },
        set marginBottom(val) {
            this._marginBottom = val;
            this.onSet("marginBottom", val);
        },
        _marginLeft:	"",
        get marginLeft() {
            return this._marginLeft;
        },
        set marginLeft(val) {
            this._marginLeft = val;
            this.onSet("marginLeft", val);
        },
        _marginRight:	"",
        get marginRight() {
            return this._marginRight;
        },
        set marginRight(val) {
            this._marginRight = val;
            this.onSet("marginRight", val);
        },
        _marginTop:	"",
        get marginTop() {
            return this._marginTop;
        },
        set marginTop(val) {
            this._marginTop = val;
            this.onSet("marginTop", val);
        },
        _markerOffset:	"",
        get markerOffset() {
            return this._markerOffset;
        },
        set markerOffset(val) {
            this._markerOffset = val;
            this.onSet("markerOffset", val);
        },
        _marks:	"",
        get marks() {
            return this._marks;
        },
        set marks(val) {
            this._marks = val;
            this.onSet("marks", val);
        },
        _maxHeight:	"",
        get maxHeight() {
            return this._maxHeight;
        },
        set maxHeight(val) {
            this._maxHeight = val;
            this.onSet("maxHeight", val);
        },
        _maxWidth:	"",
        get maxWidth() {
            return this._maxWidth;
        },
        set maxWidth(val) {
            this._maxWidth = val;
            this.onSet("maxWidth", val);
        },
        _minHeight:	"",
        get minHeight() {
            return this._minHeight;
        },
        set minHeight(val) {
            this._minHeight = val;
            this.onSet("minHeight", val);
        },
        _minWidth:	"",
        get minWidth() {
            return this._minWidth;
        },
        set minWidth(val) {
            this._minWidth = val;
            this.onSet("minWidth", val);
        },
        _opacity:	1,
        get opacity() {
            return this._opacity;
        },
        set opacity(val) {
            this._opacity = val;
            this.onSet("opacity", val);
        },
        _orphans:	"",
        get orphans() {
            return this._orphans;
        },
        set orphans(val) {
            this._orphans = val;
            this.onSet("orphans", val);
        },
        _outline:	"",
        get outline() {
            return this._outline;
        },
        set outline(val) {
            this._outline = val;
            this.onSet("outline", val);
        },
        _outlineColor:	"",
        get outlineColor() {
            return this._outlineColor;
        },
        set outlineColor(val) {
            this._outlineColor = val;
            this.onSet("outlineColor", val);
        },
        _outlineOffset:	"",
        get outlineOffset() {
            return this._outlineOffset;
        },
        set outlineOffset(val) {
            this._outlineOffset = val;
            this.onSet("outlineOffset", val);
        },
        _outlineStyle:	"",
        get outlineStyle() {
            return this._outlineStyle;
        },
        set outlineStyle(val) {
            this._outlineStyle = val;
            this.onSet("outlineStyle", val);
        },
        _outlineWidth:	"",
        get outlineWidth() {
            return this._outlineWidth;
        },
        set outlineWidth(val) {
            this._outlineWidth = val;
            this.onSet("outlineWidth", val);
        },
        _overflow:	"",
        get overflow() {
            return this._overflow;
        },
        set overflow(val) {
            this._overflow = val;
            this.onSet("overflow", val);
        },
        _overflowX:	"",
        get overflowX() {
            return this._overflowX;
        },
        set overflowX(val) {
            this._overflowX = val;
            this.onSet("overflowX", val);
        },
        _overflowY:	"",
        get overflowY() {
            return this._overflowY;
        },
        set overflowY(val) {
            this._overflowY = val;
            this.onSet("overflowY", val);
        },
        _padding:	"",
        get padding() {
            return this._padding;
        },
        set padding(val) {
            this._padding = val;
            this.onSet("padding", val);
        },
        _paddingBottom:	"",
        get paddingBottom() {
            return this._paddingBottom;
        },
        set paddingBottom(val) {
            this._paddingBottom = val;
            this.onSet("paddingBottom", val);
        },
        _paddingLeft:	"",
        get paddingLeft() {
            return this._paddingLeft;
        },
        set paddingLeft(val) {
            this._paddingLeft = val;
            this.onSet("paddingLeft", val);
        },
        _paddingRight:	"",
        get paddingRight() {
            return this._paddingRight;
        },
        set paddingRight(val) {
            this._paddingRight = val;
            this.onSet("paddingRight", val);
        },
        _paddingTop:	"",
        get paddingTop() {
            return this._paddingTop;
        },
        set paddingTop(val) {
            this._paddingTop = val;
            this.onSet("paddingTop", val);
        },
        _page:	"",
        get page() {
            return this._page;
        },
        set page(val) {
            this._page = val;
            this.onSet("page", val);
        },
        _pageBreakAfter:	"",
        get pageBreakAfter() {
            return this._pageBreakAfter;
        },
        set pageBreakAfter(val) {
            this._pageBreakAfter = val;
            this.onSet("pageBreakAfter", val);
        },
        _pageBreakBefore:	"",
        get pageBreakBefore() {
            return this._pageBreakBefore;
        },
        set pageBreakBefore(val) {
            this._pageBreakBefore = val;
            this.onSet("pageBreakBefore", val);
        },
        _pageBreakInside:	"",
        get pageBreakInside() {
            return this._pageBreakInside;
        },
        set pageBreakInside(val) {
            this._pageBreakInside = val;
            this.onSet("pageBreakInside", val);
        },
        _pause:	"",
        get pause() {
            return this._pause;
        },
        set pause(val) {
            this._pause = val;
            this.onSet("pause", val);
        },
        _pauseAfter:	"",
        get pauseAfter() {
            return this._pauseAfter;
        },
        set pauseAfter(val) {
            this._pauseAfter = val;
            this.onSet("pauseAfter", val);
        },
        _pauseBefore:	"",
        get pauseBefore() {
            return this._pauseBefore;
        },
        set pauseBefore(val) {
            this._pauseBefore = val;
            this.onSet("pauseBefore", val);
        },
        _pitch:	"",
        get pitch() {
            return this._pitch;
        },
        set pitch(val) {
            this._pitch = val;
            this.onSet("pitch", val);
        },
        _pitchRange:	"",
        get pitchRange() {
            return this._pitchRange;
        },
        set pitchRange(val) {
            this._pitchRange = val;
            this.onSet("pitchRange", val);
        },
        _position:	"",
        get position() {
            return this._position;
        },
        set position(val) {
            this._position = val;
            this.onSet("position", val);
        },
        _quotes:	"",
        get quotes() {
            return this._quotes;
        },
        set quotes(val) {
            this._quotes = val;
            this.onSet("quotes", val);
        },
        _richness:	"",
        get richness() {
            return this._richness;
        },
        set richness(val) {
            this._richness = val;
            this.onSet("richness", val);
        },
        _right:	"",
        get right() {
            return this._right;
        },
        set right(val) {
            this._right = val;
            this.onSet("right", val);
        },
        _size:	"",
        get size() {
            return this._size;
        },
        set size(val) {
            this._size = val;
            this.onSet("size", val);
        },
        _speak:	"",
        get speak() {
            return this._speak;
        },
        set speak(val) {
            this._speak = val;
            this.onSet("speak", val);
        },
        _speakHeader:	"",
        get speakHeader() {
            return this._speakHeader;
        },
        set speakHeader(val) {
            this._speakHeader = val;
            this.onSet("speakHeader", val);
        },
        _speakNumeral:	"",
        get speakNumeral() {
            return this._speakNumeral;
        },
        set speakNumeral(val) {
            this._speakNumeral = val;
            this.onSet("speakNumeral", val);
        },
        _speakPunctuation:	"",
        get speakPunctuation() {
            return this._speakPunctuation;
        },
        set speakPunctuation(val) {
            this._speakPunctuation = val;
            this.onSet("speakPunctuation", val);
        },
        _speechRate:	"",
        get speechRate() {
            return this._speechRate;
        },
        set speechRate(val) {
            this._speechRate = val;
            this.onSet("speechRate", val);
        },
        _stress:	"",
        get stress() {
            return this._stress;
        },
        set stress(val) {
            this._stress = val;
            this.onSet("stress", val);
        },
        _tableLayout:	"",
        get tableLayout() {
            return this._tableLayout;
        },
        set tableLayout(val) {
            this._tableLayout = val;
            this.onSet("tableLayout", val);
        },
        _textAlign:	"",
        get textAlign() {
            return this._textAlign;
        },
        set textAlign(val) {
            this._textAlign = val;
            this.onSet("textAlign", val);
        },
        _textDecoration:	"",
        get textDecoration() {
            return this._textDecoration;
        },
        set textDecoration(val) {
            this._textDecoration = val;
            this.onSet("textDecoration", val);
        },
        _textIndent:	"",
        get textIndent() {
            return this._textIndent;
        },
        set textIndent(val) {
            this._textIndent = val;
            this.onSet("textIndent", val);
        },
        _textShadow:	"",
        get textShadow() {
            return this._textShadow;
        },
        set textShadow(val) {
            this._textShadow = val;
            this.onSet("textShadow", val);
        },
        _textTransform:	"",
        get textTransform() {
            return this._textTransform;
        },
        set textTransform(val) {
            this._textTransform = val;
            this.onSet("textTransform", val);
        },
        _top:	"",
        get top() {
            return this._top;
        },
        set top(val) {
            this._top = val;
            this.onSet("top", val);
        },
        _unicodeBidi:	"",
        get unicodeBidi() {
            return this._unicodeBidi;
        },
        set unicodeBidi(val) {
            this._unicodeBidi = val;
            this.onSet("unicodeBidi", val);
        },
        _verticalAlign:	"",
        get verticalAlign() {
            return this._verticalAlign;
        },
        set verticalAlign(val) {
            this._verticalAlign = val;
            this.onSet("verticalAlign", val);
        },
        _visibility:	"",
        get visibility() {
            return this._visibility;
        },
        set visibility(val) {
            this._visibility = val;
            this.onSet("visibility", val);
        },
        _voiceFamily:	"",
        get voiceFamily() {
            return this._voiceFamily;
        },
        set voiceFamily(val) {
            this._voiceFamily = val;
            this.onSet("voiceFamily", val);
        },
        _volume:	"",
        get volume() {
            return this._volume;
        },
        set volume(val) {
            this._volume = val;
            this.onSet("volume", val);
        },
        _whiteSpace:	"",
        get whiteSpace() {
            return this._whiteSpace;
        },
        set whiteSpace(val) {
            this._whiteSpace = val;
            this.onSet("whiteSpace", val);
        },
        _widows:	"",
        get widows() {
            return this._widows;
        },
        set widows(val) {
            this._widows = val;
            this.onSet("widows", val);
        },
        _width:	"",
        get width() {
            return this._width;
        },
        set width(val) {
            this._width = val;
            this.onSet("width", val);
        },
        _wordSpacing:	"",
        get wordSpacing() {
            return this._wordSpacing;
        },
        set wordSpacing(val) {
            this._wordSpacing = val;
            this.onSet("wordSpacing", val);
        },
        _zIndex:	"",
        get zIndex() {
            return this._zIndex;
        },
        set zIndex(val) {
            this._zIndex = val;
            this.onSet("zIndex", val);
        }
    };
})()

$w.CSS2Properties = CSS2Properties;