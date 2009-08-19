/*
* CSS2Properties - DOM Level 2 CSS
*/
var CSS2Properties = function(element){
    //this.onSetCallback = options.onSet?options.onSet:(function(){});
    this.styleIndex = __supportedStyles__();
    this.nameMap = {};
    this.__previous__ = {};
    this.__element__ = element
    __cssTextToStyles__(this, element.getAttribute('style')||'');
};
__extend__(CSS2Properties.prototype, {
    get cssText(){
        var css = '';
        for(var i=0;i<this.length;i++){
            css+=this[i]+":"+this.getPropertyValue(this[i])+';'
        }
        return css;
    },
    set cssText(cssText){ 
        __cssTextToStyles__(this, cssText); 
    },
    getPropertyCSSValue : function(name){
        //?
    },
    getPropertyPriority : function(){
        
    },
    getPropertyValue : function(name){
        if(name in this.styleIndex){
            //$info(name +' in style index');
            return this.styleIndex[name]===null?
                "":this.styleIndex[name];
        }else if(name in this.nameMap){
            return this.styleIndex[__toCamelCase__(name)];
        }
        //$info(name +' not found');
        return "";
    },
    item : function(index){
        return this[index];
    },
    removeProperty: function(name){
        this.styleIndex[name] = null;
    },
    setProperty: function(name, value){
        //$info('setting css property '+name+' : '+value);
        if (value!==undefined){
            __parseStyle__(this, name, value);
        }
    },
    toString:function(){
        if (this.length >0){
            return "{\n\t"+Array.prototype.join.apply(this,[';\n\t'])+"}\n";
        }else{
            return '';
        }
    }
});

var __parseStyle__ = function(css2prop, name, value){
    css2prop.styleIndex[name] = value;
    var definition = __toDashed__(name);
    if(css2prop.length===undefined){
        Array.prototype.push.apply(css2prop, [definition]);
        css2prop.nameMap[definition] = 0;
    }else{
        if(definition in css2prop.nameMap){
            css2prop[css2prop.nameMap[definition]] = definition;
        }else{
            Array.prototype.push.apply(css2prop, [definition]);
            css2prop.nameMap[definition] = css2prop.length;
        }
    }
};


var __cssTextToStyles__ = function(css2props, cssText){
    //var styleArray=[];
    var style, name, value, camelCaseName, w3cName, styles = cssText.split(';');
    for ( var i = 0; i < styles.length; i++ ) {
        //$log("Adding style property " + styles[i]);
    	style = styles[i].split(':');
        //$log(" style  " + style[0]);
    	if ( style.length == 2 ){
            //$log(" value  " + style[1]);
    	    __parseStyle__(css2props, style[0].replace(" ",'','g'), style[1].replace(" ",'','g'));
    	}
    }
};

var __toCamelCase__ = function(name) {
    //$info('__toCamelCase__'+name);
    if(name){
    	return name.replace(/\-(\w)/g, function(all, letter){
    		return letter.toUpperCase();
    	});
    }
    return name;
};

var __toDashed__ = function(camelCaseName) {
    //$info("__toDashed__"+camelCaseName);
    if(camelCaseName){
    	return camelCaseName.replace(/[A-Z]/g, function(all) {
    		return "-" + all.toLowerCase();
    	});
    }
    return camelCaseName;
};

//Obviously these arent all supported but by commenting out various sections
//this provides a single location to configure what is exposed as supported.
var __supportedStyles__ = function(){
    return {
            azimuth:                null,
            background:	            null,
            backgroundAttachment:	null,
            backgroundColor:	    null,
            backgroundImage:	    null,
            backgroundPosition:	    null,
            backgroundRepeat:	    null,
            border:	                null,
            borderBottom:	        null,
            borderBottomColor:	    null,
            borderBottomStyle:	    null,
            borderBottomWidth:	    null,
            borderCollapse:	        null,
            borderColor:	        null,
            borderLeft:	            null,
            borderLeftColor:	    null,
            borderLeftStyle:	    null,
            borderLeftWidth:	    null,
            borderRight:	        null,
            borderRightColor:	    null,
            borderRightStyle:	    null,
            borderRightWidth:	    null,
            borderSpacing:	        null,
            borderStyle:	        null,
            borderTop:	            null,
            borderTopColor:	        null,
            borderTopStyle:	        null,
            borderTopWidth:	        null,
            borderWidth:	        null,
            bottom:	                null,
            captionSide:	        null,
            clear:	                null,
            clip:	                null,
            color:	                null,
            content:	            null,
            counterIncrement:	    null,
            counterReset:	        null,
            cssFloat:	            null,
            cue:	                null,
            cueAfter:	            null,
            cueBefore:	            null,
            cursor:	                null,
            direction:	            'ltr',
            display:	            'block',
            elevation:	            null,
            emptyCells:	            null,
            font:	                null,
            fontFamily:	            null,
            fontSize:	            "1em",
            fontSizeAdjust:	null,
            fontStretch:	null,
            fontStyle:	null,
            fontVariant:	null,
            fontWeight:	null,
            height:	'1px',
            left:	null,
            letterSpacing:	null,
            lineHeight:	null,
            listStyle:	null,
            listStyleImage:	null,
            listStylePosition:	null,
            listStyleType:	null,
            margin:	null,
            marginBottom:	"0px",
            marginLeft:	"0px",
            marginRight:	"0px",
            marginTop:	"0px",
            markerOffset:	null,
            marks:	null,
            maxHeight:	null,
            maxWidth:	null,
            minHeight:	null,
            minWidth:	null,
            opacity:	1,
            orphans:	null,
            outline:	null,
            outlineColor:	null,
            outlineOffset:	null,
            outlineStyle:	null,
            outlineWidth:	null,
            overflow:	null,
            overflowX:	null,
            overflowY:	null,
            padding:	null,
            paddingBottom:	"0px",
            paddingLeft:	"0px",
            paddingRight:	"0px",
            paddingTop:	"0px",
            page:	null,
            pageBreakAfter:	null,
            pageBreakBefore:	null,
            pageBreakInside:	null,
            pause:	null,
            pauseAfter:	null,
            pauseBefore:	null,
            pitch:	null,
            pitchRange:	null,
            position:	null,
            quotes:	null,
            richness:	null,
            right:	null,
            size:	null,
            speak:	null,
            speakHeader:	null,
            speakNumeral:	null,
            speakPunctuation:	null,
            speechRate:	null,
            stress:	null,
            tableLayout:	null,
            textAlign:	null,
            textDecoration:	null,
            textIndent:	null,
            textShadow:	null,
            textTransform:	null,
            top:	null,
            unicodeBidi:	null,
            verticalAlign:	null,
            visibility:	null,
            voiceFamily:	null,
            volume:	null,
            whiteSpace:	null,
            widows:	null,
            width:	'1px',
            wordSpacing:	null,
            zIndex:	1
        };
};


for(var style in __supportedStyles__()){
    (function(name){
        if(name === 'width' || name === 'height'){
            CSS2Properties.prototype.__defineGetter__(name, function(){
                if(this.getPropertyValue('display')==='none'){
                    return '0px';
                }
                //$info(name+' = '+this.getPropertyValue(name));
                return this.getPropertyValue(name);
            });
            CSS2Properties.prototype.__defineSetter__(name, function(value){
                this.setProperty(name, value);
            });
        }else{
            CSS2Properties.prototype.__defineGetter__(name, function(){
                //$log(" css2properties.get  " + name);
                return this.getPropertyValue(name);
            });
            CSS2Properties.prototype.__defineSetter__(name, function(value){
                this.setProperty(name, value);
            });
       }
    })(style);
};


$w.CSS2Properties = CSS2Properties;