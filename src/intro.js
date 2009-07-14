/*
 * Pure JavaScript Browser Environment
 *   By John Resig <http://ejohn.org/>
 * Copyright 2008 John Resig, under the MIT License
 */


try {
        // this goes into the global namespace, but less likely to collide with
        //   client JS code than methods in Rhino shell (load, print, etc.)
    _$envjs$makeObjectIntoWindow$_ = function($w, $env,
                                              $parentWindow, $initTop){

        // The Window Object
        var __this__ = $w;
        $w.__defineGetter__('window', function(){
            return __this__;
        });

