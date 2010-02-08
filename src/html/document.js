
/**
 * @class  HTMLDocument
 *      The Document interface represents the entire HTML or XML document.
 *      Conceptually, it is the root of the document tree, and provides 
 *      the primary access to the document's data.
 *
 * @extends Document
 */
HTMLDocument = function(implementation, docParentWindow, docReferrer) {
  this.Document = Document;
  this.Document(implementation, docParentWindow);
  this._referrer = docReferrer;
  this.async = false;
  this.baseURI = "about:blank";
};

HTMLDocument.prototype = new Document;
__extend__(HTMLDocument.prototype, {
    createElement: function(tagName){
        tagName = tagName.toUpperCase();
        // create Element specifying 'this' as ownerDocument
        // This is an html document so we need to use explicit interfaces per the 
        //TODO: would be much faster as a big switch
        switch(tagName){
            case "A":
                node = new HTMLAnchorElement(this);break;
            case "AREA":
                node = new HTMLAreaElement(this);break;
            case "BASE":
                node = new HTMLBaseElement(this);break;
            case "BLOCKQUOTE":
                node = new HTMLQuoteElement(this);break;
            case "Q":
                node = new HTMLQuoteElement(this);break;
            case "BODY":
                node = new HTMLBodyElement(this);break;
            case "BR":
                node = new HTMLElement(this);break;
            case "BUTTON":
                node = new HTMLButtonElement(this);break;
            case "CAPTION":
                node = new HTMLElement(this);break;
            case "COL":
                node = new HTMLTableColElement(this);break;
            case "COLGROUP":
                node = new HTMLTableColElement(this);break;
            case "DEL":
                node = new HTMLModElement(this);break;
            case "INS":
                node = new HTMLModElement(this);break;
            case "DIV":
                node = new HTMLDivElement(this);break;
            case "DL":
                node = new HTMLElement(this);break;
            case "FIELDSET":
                node = new HTMLFieldSetElement(this);break;
            case "FORM":
                node = new HTMLFormElement(this);break;
            case "FRAME":
                node = new HTMLFrameElement(this);break;
            case "H1":
                node = new HTMLHeadElement(this);break;
            case "H2":
                node = new HTMLHeadElement(this);break;
            case "H3":
                node = new HTMLHeadElement(this);break;
            case "H4":
                node = new HTMLHeadElement(this);break;
            case "H5":
                node = new HTMLHeadElement(this);break;
            case "H6":
                node = new HTMLHeadElement(this);break;
            case "HR":
                node = new HTMLElement(this);break;
            case "HTML":
                node = new HTMLElement(this);break;
            case "IFRAME":
                node = new HTMLIFrameElement(this);break;
            case "IMG":
                node = new HTMLImageElement(this);break;
            case "INPUT":
                node = new HTMLInputElement(this);break;
            case "LABEL":
                node = new HTMLLabelElement(this);break;
            case "LEGEND":
                node = new HTMLLegendElement(this);break;
            case "LI":
                node = new HTMLElement(this);break;
            case "LINK":
                node = new HTMLLinkElement(this);break;
            case "MAP":
                node = new HTMLMapElement(this);break;
            case "META":
                node = new HTMLObjectElement(this);break;
            case "OBJECT":
                node = new HTMLMapElement(this);break;
            case "OPTGROUP":
                node = new HTMLOptGroupElement(this);break;
            case "OPTION":
                node = new HTMLOptionElement(this);break;
            case "P":
                node = new HTMLParagraphElement(this);break;
            case "PARAM":
                node = new HTMLParamElement(this);break;
            case "PRE":
                node = new HTMLElement(this);break;
            case "SCRIPT":
                node = new HTMLScriptElement(this);break;
            case "SELECT":
                node = new HTMLSelectElement(this);break;
            case "STYLE":
                node = new HTMLStyleElement(this);break;
            case "TABLE":
                node = new HTMLTableElement(this);break;
            case "TBODY":
                node = new HTMLTableSectionElement(this);break;
            case "TFOOT":
                node = new HTMLTableSectionElement(this);break;
            case "THEAD":
                node = new HTMLTableSectionElement(this);break;
            case "TD":
                node = new HTMLTableCellElement(this);break;
            case "TH":
                node = new HTMLTableCellElement(this);break;
            case "TEXTAREA":
                node = new HTMLTextAreaElement(this);break;
            case "TITLE":
                node = new HTMLTitleElement(this);break;
            case "TR":
                node = new HTMLTableRowElement(this);break;
            case "UL":
                node = new HTMLElement(this);break;
            default:
                node = new HTMLUnknownElement(this);
        }
        // assign values to properties (and aliases)
        node.nodeName  = tagName;
        return node;
    },
    createElementNS : function (uri, local) {
        //print('createElementNS :'+uri+" "+local);
        if(!uri){
            return this.createElement(local);
        }else if ("http://www.w3.org/1999/xhtml" == uri) {
            return this.createElement(local);
        } else if ("http://www.w3.org/1998/Math/MathML" == uri) {
            return this.createElement(local);
        } else {
            return Document.prototype.createElementNS.apply(this,[uri, local]);
        }
    },
    get anchors(){
        return new HTMLCollection(this.getElementsByTagName('a'));
        
    },
    get applets(){
        return new HTMLCollection(this.getElementsByTagName('applet'));
        
    },
    get body(){ 
        var nodelist = this.getElementsByTagName('body');
        return nodelist.item(0);
        
    },
    set body(html){
        return this.replaceNode(this.body,html);
        
    },

    get title(){
        var titleArray = this.getElementsByTagName('title');
        if (titleArray.length < 1)
            return "";
        return titleArray[0].textContent;
    },
    set title(titleStr){
        var titleArray = this.getElementsByTagName('title'),
            titleElem,
            headArray;
        if (titleArray.length < 1){
            // need to make a new element and add it to "head"
            titleElem = new HTMLTitleElement(this);
            titleElem.text = titleStr;
            headArray = this.getElementsByTagName('head');
    	    if (headArray.length < 1)
                return;  // ill-formed, just give up.....
            headArray[0].appendChild(titleElem);
        } else {
            titleArray[0].textContent = titleStr;
        }
    },

    get cookie(){
        return Cookies.get(this);
    },
    set cookie(cookie){
        return Cookies.set(this, cookie);
    },
    get location(){
        return this.baseURI;
    },
    set location(url){
        this.baseURI = url;
    },
    get domain(){
        var HOSTNAME = new RegExp('\/\/([^\:\/]+)'),
            matches = HOSTNAME.exec(this.baseURI);
        return matches&&matches.length>1?matches[1]:"";
    },
    set domain(value){
        var i,
            domainParts = this.domain.splt('.').reverse(),
            newDomainParts = value.split('.').reverse();
        if(newDomainParts.length > 1){
            for(i=0;i<newDomainParts.length;i++){
                if(!(newDomainParts[i] == domainParts[i])){
                    return;
                }
            }
            this.baseURI = this.baseURI.replace(domainParts.join('.'), value);
        }
    },
    get forms(){
      return new HTMLCollection(this.getElementsByTagName('form'));
    },
    get images(){
        return new HTMLCollection(this.getElementsByTagName('img'));
    },
    get lastModified(){ 
        /* TODO */
        return this._lastModified; 
    },
    get links(){
        return new HTMLCollection(this.getElementsByTagName('a'));
    },
    get referrer(){
        return this._referrer;
    },
	getElementsByName : function(name){
        //returns a real Array + the NodeList
        var retNodes = __extend__([],new NodeList(this, this.documentElement)),
          node;
        // loop through all Elements in the 'all' collection
        var all = this.all;
        for (var i=0; i < all.length; i++) {
            node = all[i];
            if (node.nodeType == Node.ELEMENT_NODE && node.getAttribute('name') == name) {
                retNodes.push(node);
            }
        }
        return retNodes;
	},
	toString: function(){ 
	    return "[object HTMLDocument]"; 
    },
	get innerHTML(){ 
	    return this.documentElement.outerHTML; 
    },
    get URL(){ 
        return this.location;  
    },
    set URL(url){
        this.location = url;  
    }
});

