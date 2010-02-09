
//Since we're running in rhino I guess we can safely assume
//java is 'enabled'.  I'm sure this requires more thought
//than I've given it here
Envjs.javaEnabled = true;   

Envjs.tmpdir         = java.lang.System.getProperty("java.io.tmpdir"); 
Envjs.os_name        = java.lang.System.getProperty("os.name"); 
Envjs.os_arch        = java.lang.System.getProperty("os.arch"); 
Envjs.os_version     = java.lang.System.getProperty("os.version"); 
Envjs.lang           = java.lang.System.getProperty("user.lang"); 
Envjs.platform       = "Rhino ";//how do we get the version
    
/**
 * Makes an object window-like by proxying object accessors
 * @param {Object} scope
 * @param {Object} parent
 */
Envjs.proxy = function(scope, parent){
    
    
    var _scope = scope;
        _parent = parent||null,
        _this = this,
        _undefined = Packages.org.mozilla.javascript.Scriptable.NOT_FOUND,
        _proxy = new Packages.org.mozilla.javascript.ScriptableObject({
            getClassName: function(){
                return 'envjs.platform.rhino.Proxy';
            },
            has: function(nameOrIndex, start){
                var has;
                //print('proxy has '+nameOrIndex+" ("+nameOrIndex['class']+")");
                if(nameOrIndex['class'] == java.lang.String){
                    switch(nameOrIndex+''){
                        case '__iterator__':
                            return _proxy.__iterator__;
                            break;
                        default:
                            has = (nameOrIndex+'') in _scope;
                            //print('has as string :'+has);
                            return has;
                    }
                }else if(nameOrIndex['class'] == java.lang.Integer){
                    has = Number(nameOrIndex+'') in _scope;
                    //print('has as index :'+has);
                    return has;
                }else{
                    //print('has not');
                    return false;
                }
            },
            put: function(nameOrIndex,  start,  value){
                //print('proxy put '+nameOrIndex+" = "+value+" ("+nameOrIndex['class']+")");
                if(nameOrIndex['class'] == java.lang.String){
                    //print("put as string");
                    _scope[nameOrIndex+''] = value;
                }else if(nameOrIndex['class'] == java.lang.Integer){
                    //print("put as index");
                    _scope[Number(nameOrIndex+'')] = value;
                }else{
                    //print('put not');
                    return _undefined;
                }
            },
            get: function(nameOrIndex, start){
                //print('proxy get '+nameOrIndex+" ("+nameOrIndex['class']+")");
                var value;
                if(nameOrIndex['class'] == java.lang.String){
                    //print("get as string");
                    value = _scope[nameOrIndex+''];
                    if(value+'' === "undefined"){
                        return _undefined;
                    }else{
                        return value;
                    }
                }else if(nameOrIndex['class'] == java.lang.Integer){
                    //print("get as index");
                    value = _scope[Number(nameOrIndex+'')];
                    if(value == 'undefined')
                        return  _undefined;
                    else
                        return value;
                }else{
                    //print('get not');
                    return _undefined;
                }
            },
            'delete': function(nameOrIndex){
                _scope['delete'](nameOrIndex);
            },
            get parentScope(){
                return _parent;
            },
            set parentScope(parent){
                _parent = parent;
            },
            get topLevelScope(){
                return _scope;
            },
            equivalentValues: function(value){
                return (value == _scope || value == this );
            },
            equals: function(value){
                return (value === _scope || value === this );
            }
        });
        
    return _proxy;
};
