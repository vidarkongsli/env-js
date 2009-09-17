


try {

    Envjs.window = function($w,
                            $env,
                            $parentWindow,
                            $initTop,
                            $thisIsTheOriginalWindow){

        // The Window Object
        var __this__ = $w;
        $w.__defineGetter__('window', function(){
            return __this__;
        });
        $w.$isOriginalWindow = $thisIsTheOriginalWindow;
        $w.$haveCalledWindowLocationSetter = false;

