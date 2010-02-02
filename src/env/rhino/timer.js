
/**
 * Rhino provides a very succinct 'sync'
 * @param {Function} fn
 */
Envjs.sync = sync;


/**
 * sleep thread for specified duration
 * @param {Object} millseconds
 */
Envjs.sleep = function(millseconds){
    java.lang.Thread.currentThread().sleep(millseconds);
};
