/*
* CSS2Properties - DOM Level 2 CSS
*/
$w.__defineGetter__("CSS2Properties", function(){
  return function(){
    throw new Error("Object cannot be created in this context");
  };
});


var CSS2Properties = function(options){
    __cssTextToStyles__(this, options.cssText?options.cssText:"");
};
__extend__(CSS2Properties.prototype, __supportedStyles__);
__extend__(CSS2Properties.prototype, {
    get cssText(){
        Array.prototype.apply.join(this,';\n');
    },
    set cssText(cssText){ 
        __cssTextToStyles__(this, cssText); 
    },
    getPropertyCSSValue : function(){
        
    },
    getPropertyPriority : function(){
        
    },
    getPropertyValue : function(){
        
    },
    item : function(index){
        return this[index];
    },
    removeProperty: function(){
        
    },
    setProperty: function(){
        
    }
});

var __cssTextToStyles__ = function(css2props, cssText){
    var styleArray=[];
    var style, styles = cssText.split(';');
    for ( var i = 0; i < styles.length; i++ ) {
    	style = styles[i].split(':');
    	if ( style.length == 2 ){
    	    //keep a reference to the original name of the style which was set
    	    styleArray[i]=styles[i];
            //camel case for dash case
            //this could be done much better with a match with function arg
            //but I'm tearing through this just to get a first pass
    	    style[0] = trim(style[0]).split('-');
            if(style[0].length == 2){
                style[0] = style[0][0]+style[0][1].substring(0,1).toUpperCase()+
                    style[0][1].substring(1,style[0][1].length);
            }else{
                //No '-' dash present
                style[0] = style[0][0];
            }
            if(css2props[style[0]]){
                //set the value internally with camelcase name 
                css2props[style[0]] = trim(style[1]);
            };
    	}
    }
    __setArray__(css2props, styleArray);
};
//Obviously these arent all supported but by commenting out various sections
//this provides a single location to configure what is exposed as supported.
var __supportedStyles__ = {
    azimuth:	"",
    background:	"",
    backgroundAttachment:	"",
    backgroundColor:	"",
    backgroundImage:	"",
    backgroundPosition:	"",
    backgroundRepeat:	"",
    border:	"",
    borderBottom:	"",
    borderBottomColor:	"",
    borderBottomStyle:	"",
    borderBottomWidth:	"",
    borderCollapse:	"",
    borderColor:	"",
    borderLeft:	"",
    borderLeftColor:	"",
    borderLeftStyle:	"",
    borderLeftWidth:	"",
    borderRight:	"",
    borderRightColor:	"",
    borderRightStyle:	"",
    borderRightWidth:	"",
    borderSpacing:	"",
    borderStyle:	"",
    borderTop:	"",
    borderTopColor:	"",
    borderTopStyle:	"",
    borderTopWidth:	"",
    borderWidth:	"",
    bottom:	"",
    captionSide:	"",
    clear:	"",
    clip:	"",
    color:	"",
    content:	"",
    counterIncrement:	"",
    counterReset:	"",
    cssFloat:	"",
    cue:	"",
    cueAfter:	"",
    cueBefore:	"",
    cursor:	"",
    direction:	"",
    display:	"",
    elevation:	"",
    emptyCells:	"",
    font:	"",
    fontFamily:	"",
    fontSize:	"",
    fontSizeAdjust:	"",
    fontStretch:	"",
    fontStyle:	"",
    fontVariant:	"",
    fontWeight:	"",
    height:	"",
    left:	"",
    letterSpacing:	"",
    lineHeight:	"",
    listStyle:	"",
    listStyleImage:	"",
    listStylePosition:	"",
    listStyleType:	"",
    margin:	"",
    marginBottom:	"",
    marginLeft:	"",
    marginRight:	"",
    marginTop:	"",
    markerOffset:	"",
    marks:	"",
    maxHeight:	"",
    maxWidth:	"",
    minHeight:	"",
    minWidth:	"",
    opacity:	"",
    orphans:	"",
    outline:	"",
    outlineColor:	"",
    outlineOffset:	"",
    outlineStyle:	"",
    outlineWidth:	"",
    overflow:	"",
    overflowX:	"",
    overflowY:	"",
    padding:	"",
    paddingBottom:	"",
    paddingLeft:	"",
    paddingRight:	"",
    paddingTop:	"",
    page:	"",
    pageBreakAfter:	"",
    pageBreakBefore:	"",
    pageBreakInside:	"",
    pause:	"",
    pauseAfter:	"",
    pauseBefore:	"",
    pitch:	"",
    pitchRange:	"",
    position:	"",
    quotes:	"",
    richness:	"",
    right:	"",
    size:	"",
    speak:	"",
    speakHeader:	"",
    speakNumeral:	"",
    speakPunctuation:	"",
    speechRate:	"",
    stress:	"",
    tableLayout:	"",
    textAlign:	"",
    textDecoration:	"",
    textIndent:	"",
    textShadow:	"",
    textTransform:	"",
    top:	"",
    unicodeBidi:	"",
    verticalAlign:	"",
    visibility:	"",
    voiceFamily:	"",
    volume:	"",
    whiteSpace:	"",
    widows:	"",
    width:	"",
    wordSpacing:	"",
    zIndex:	""
};