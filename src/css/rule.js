/* 
* CSSRule - DOM Level 2
*/
$w.__defineGetter__("CSSRule", function(){
  return function(){
    throw new Error("Object cannot be created in this context");
  };
});

var CSSRule = function(options){
  var $style, 
      $selectorText = options.selectorText?options.selectorText:"";
      $style = new CSS2Properties({
          cssText:options.cssText?options.cssText:null
      });
    return __extend__(this, {
      get style(){
          return $style;
      },
      get selectorText(){
          return $selectorText;
      },
      set selectorText(selectorText){
          $selectorText = selectorText;
      }
    });
};
