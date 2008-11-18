/*
*	html.js
*
*	DOM Level 2 HTML
*/

var correctHTMLIds = function (node){
  var children;
  try{
    if(node.nodeType === Node.ELEMENT_NODE){
        //$log("Setting ID Attribute " + node);
        if(node.hasAttribute('id'))
          node.setIdAttribute('id',true);
      children = node.childNodes;
      for(var i=0;i<children.length;i++){
        correctHTMLIds(children.item(i));
      }
    }
  }catch(e){$log(e);}
};
			
//This extends makeNode by allowing HTML<T>Elements to be defined
function makeHTMLElement(name, node){
  //This is an html document so we need to use explicit interfaces per the 
  if(     name.match(/A/)){cacheNode(node, HTMLAnchorElement);}
  else if(name.match(/AREA/)){cacheNode(node, HTMLElement);}
  else if(name.match(/BASE/)){cacheNode(node, HTMLElement);}
  else if(name.match(/BLOCKQUOTE|Q/)){cacheNode(node, HTMLElement);}
  else if(name.match(/BODY/)){cacheNode(node, HTMLElement);}
  else if(name.match(/BR/)){cacheNode(node, HTMLElement);}
  else if(name.match(/BUTTON/)){cacheNode(node, HTMLElement);}
  else if(name.match(/CAPTION/)){cacheNode(node, HTMLElement);}
  else if(name.match(/COL|COLGROUP/)){cacheNode(node, HTMLElement);}
  else if(name.match(/DEL|INS/)){cacheNode(node, HTMLElement);}
  else if(name.match(/DIV/)){cacheNode(node, HTMLElement);}
  else if(name.match(/DL/)){cacheNode(node, HTMLElement);}
  else if(name.match(/FIELDSET/)){cacheNode(node, HTMLElement);}
  else if(name.match(/FORM/)){cacheNode(node, HTMLFormElement);}
  else if(name.match(/FRAME/)){cacheNode(node, HTMLElement);}
  else if(name.match(/FRAMESET/)){cacheNode(node, HTMLElement);}
  else if(name.match(/H1|H2|H3|H4|H5|H6/)){cacheNode(node, HTMLElement);}
  else if(name.match(/HEAD/)){cacheNode(node, HTMLElement);}
  else if(name.match(/HR/)){cacheNode(node, HTMLElement);}
  else if(name.match(/HTML/)){cacheNode(node, HTMLElement);}
  else if(name.match(/IFRAME/)){cacheNode(node, HTMLElement);}
  else if(name.match(/IMG/)){cacheNode(node, HTMLElement);}
  else if(name.match(/INPUT/)){cacheNode(node, HTMLElement);}
  else if(name.match(/LABEL/)){cacheNode(node, HTMLElement);}
  else if(name.match(/LEGEND/)){cacheNode(node, HTMLElement);}
  else if(name.match(/LI/)){cacheNode(node, HTMLElement);}
  else if(name.match(/LINK/)){cacheNode(node, HTMLElement);}
  else if(name.match(/MAP/)){cacheNode(node, HTMLElement);}
  else if(name.match(/META/)){cacheNode(node, HTMLElement);}
  else if(name.match(/OBJECT/)){cacheNode(node, HTMLElement);}
  else if(name.match(/OL/)){cacheNode(node, HTMLElement);}
  else if(name.match(/OPTGROUP/)){cacheNode(node, HTMLElement);}
  else if(name.match(/OPTION/)){cacheNode(node, HTMLElement);}
  else if(name.match(/P/)){cacheNode(node, HTMLElement);}
  else if(name.match(/PARAM/)){cacheNode(node, HTMLElement);}
  else if(name.match(/PRE/)){cacheNode(node, HTMLElement);}
  else if(name.match(/SCRIPT/)){cacheNode(node, HTMLElement);}
  else if(name.match(/SELECT/)){cacheNode(node, HTMLElement);}
  else if(name.match(/STYLE/)){cacheNode(node, HTMLElement);}
  else if(name.match(/TABLE/)){cacheNode(node, HTMLElement);}
  else if(name.match(/TBODY|TFOOT|THEAD/)){cacheNode(node, HTMLElement);}
  else if(name.match(/TD|TH/)){cacheNode(node, HTMLElement);}
  else if(name.match(/TEXTAREA/)){cacheNode(node, HTMLElement);}
  else if(name.match(/TITLE/)){cacheNode(node, HTMLElement);}
  else if(name.match(/TR/)){cacheNode(node, HTMLElement);}
  else if(name.match(/UL/)){cacheNode(node, HTMLElement);}
  else{
    $debug("Caching HTML Element " + name);
    cacheNode(node, HTMLElement);
  }
};
	
