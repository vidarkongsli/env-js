
/**
 * @name MutationEvent
 * @param {Object} options
 */
MutationEvent = function(options) {
    var state = __extend__({
        cancelable : false,
        timeStamp : 0,
    }, options||{});
    return __extend__(new Event(state),{
        get relatedNode(){
            return state.relatedNode;
        },
        get prevValue(){
            return state.prevValue;
        },
        get newValue(){
            return state.newValue;
        },
        get attrName(){
            return state.attrName;
        },
        get attrChange(){
            return state.attrChange;
        },
        initMutationEvent: function( type, bubbles, cancelable, 
                relatedNode, prevValue, newValue, attrName, attrChange ){
            state.relatedNode = relatedNode;
            state.prevValue = prevValue;
            state.newValue = newValue;
            state.attrName = attrName;
            state.attrChange = attrChange;
            switch(type){
                case "DOMSubtreeModified":
                    this.initEvent(type, true, false);
                    break;
                case "DOMNodeInserted":
                    this.initEvent(type, true, false);
                    break;
                case "DOMNodeRemoved":
                    this.initEvent(type, true, false);
                    break;
                case "DOMNodeRemovedFromDocument":
                    this.initEvent(type, false, false);
                    break;
                case "DOMNodeInsertedIntoDocument":
                    this.initEvent(type, false, false);
                    break;
                case "DOMAttrModified":
                    this.initEvent(type, true, false);
                    break;
                case "DOMCharacterDataModified":
                    this.initEvent(type, true, false);
                    break;
                default:
                    this.initEvent(type, bubbles, cancelable);
            }
        }
    });
};
MutationEvent.prototype = new Event;

// constants
MutationEvent.ADDITION = 0;
MutationEvent.MODIFICATION = 1;
MutationEvent.REMOVAL = 2;
