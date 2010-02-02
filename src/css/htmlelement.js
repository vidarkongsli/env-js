
/**
 * @author envjs team
 */
$css2properties = [{}];

__extend__(HTMLElement.prototype, {
    get style(){
        if ( !this.css2uuid ) {
            this.css2uuid = $css2properties.length;
            $css2properties[this.css2uuid] = new CSS2Properties(this);
        }
        return $css2properties[this.css2uuid];
    },
    set style(values){
        __updateCss2Props__(this, values);
    },
    setAttribute: function (name, value) {
        HTMLElement.prototype.setAttribute.apply(this,[name, value]);
        if (name === "style") {
            __updateCss2Props__(this, value);
        }
    }
});

var __updateCss2Props__ = function(elem, values){
    if ( !this.css2uuid ) {
        this.css2uuid = $css2properties.length;
        $css2properties[this.css2uuid] = new CSS2Properties(this);
    }
    __cssTextToStyles__(e$css2properties[this.css2uuid], values);
};
