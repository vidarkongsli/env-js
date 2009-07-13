/*
*	outro.js
*/


    };        // close function definition begun in 'intro.js'


        // turn "original" JS interpreter global object into the
        //   "root" window object
    _$envjs$makeObjectIntoWindow$_(this, Envjs);

} catch(e){
    Envjs.error("ERROR LOADING ENV : " + e + "\nLINE SOURCE:\n" +
        Envjs.lineSource(e));
}
