/*
* CSS2Properties - DOM Level 2 CSS
*/
$w.__defineGetter__("CSS2Properties", function(){
  return function(){
    throw new Error("Object cannot be created in this context");
  };
});


var CSS2Properties = function(options){
  var $styles = [];
  var $styleMap = {};
  for (var prop in $supportedStyles){
    $styleMap[prop] = "";
    this.__defineGetter__(prop, function(){return $styleMap[prop];});
    if(!options.readonly){
      //because the window.getComputedStyle return a CSS2Properties
      //object that is read only we make the setter optional
      this.__defineSetter__(prop, function(value){$styleMap[prop] = value;});
    }
  }
  if(options.cssText){cssTextToStyles(options.cssText);}
  function cssTextToStyles(cssText){
    $styles=[];
    var style, styles = cssText.split(';');
    for ( var i = 0; i < styles.length; i++ ) {
    	style = styles[i].split(':');
    	if ( style.length == 2 ){
  	    //keep a reference to the original name of the style which was set
  	    $styles[i]=styles[i];
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
    	  if($styleMap[style[0]]){
    	    //set the value internally with camelcase name so its exposed via the 'get'.
    	    $styleMap[style[0]] = trim(style[1]);
    	  };
    	}
    }
    setArray(this, $styles);
  };
  
  return __extend__(this, {
    get cssText(){$styles.join(';');},
    set cssText(cssText){ cssTextToStyles(cssText); }
  });
};

//Obviously these arent all supported but by commenting out various sections
//this provides a single location to configure what is exposed as supported.
var $supportedStyles = {
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