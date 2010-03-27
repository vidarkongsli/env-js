/**
 *
 * DOM Level 2: http://www.w3.org/TR/DOM-Level-2-Events/events.html
 * DOM Level 3: http://www.w3.org/TR/DOM-Level-3-Events/
 *
 * interface DocumentEvent {
 *   Event createEvent (in DOMString eventType)
 *      raises (DOMException);
 * };
 */
DocumentEvent = function(){};
DocumentEvent.prototype.createEvent = function(eventType) {
    //console.debug('createEvent(%s)', eventType);
    switch (eventType) {
    case 'Event':
    case 'Events':
        return new Event();
        break;
    case 'HTMLEvent':
    case 'HTMLEvents':
        // Safari4: accepts HTMLEvents, but not HTMLEvent
        // Firefox3.6: accepts HTMLEvents, but not HTMLEvent
        return new Event();
        break;
    case 'UIEvent':
    case 'UIEvents':
        return new UIEvent();
        break;
    case 'MouseEvent':
    case 'MouseEvents':
        return new MouseEvent();
        break;
    case 'KeyEvent':
    case 'KeyEvents':
        // Safari4: both not accepted
        // Firefox3.6, only KeyEvents is accepted
        return new KeyboardEvent();
        break;
    case 'KeyboardEvent':
    case 'KeyboardEvents':
        // Safari4: both accepted
        // Firefox3.6: none accepted
        return new KeyboardEvent();
        break;
    case
    case 'MutationEvent':
    case 'MutationEvents':
        return new MutationEvent();
        break;
    default:
        throw(new DOMException(DOMException.NOT_SUPPORTED_ERR));
    }
};

Document.prototype.createEvent = DocumentEvent.prototype.createEvent;
