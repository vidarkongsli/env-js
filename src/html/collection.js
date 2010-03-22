
/* HTML "Collections"
 * http://dev.w3.org/html5/spec/Overview.html#collections
 */

/*
 * HTMLCollection - DOM Level 2
 * Implementation Provided by Steven Wood
 *
 * HTML5 -- 2.7.2.1 HTMLCollection
 * http://dev.w3.org/html5/spec/Overview.html#htmlcollection
 */
HTMLCollection = function(nodelist, type) {

    __setArray__(this, []);

    for (var i=0; i<nodelist.length; i++) {
        this[i] = nodelist[i];
        if('name' in nodelist[i]){
            this[nodelist[i].name] = nodelist[i];
        }
    }

    this.length = nodelist.length;
}

HTMLCollection.prototype = {

    item: function (idx) {
        var ret = null;
        if ((idx >= 0) && (idx < this.length)) {
            ret = this[idx];
        }
        return ret;
    },

    namedItem: function (name) {
        if (name in this) {
            return this[name];
        }
        return null;
    }
};
