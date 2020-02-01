class GS {
    constructor(key, value, autoLoad = false) {
        if (typeof key != 'undefined') {
            // 加底線讓開發者知道為私有成員或方法，與程式語言特性無關(公開)
            this['_' + key] = value;
        }
        this.autoLoad = autoLoad;
    }

    get color(){
        if(this._color !== undefined){
            return this._color;
        }else{
            return 'no color prop';
        }
    }

    set color(value){
        this._color = value;
    }
}

module.exports = GS;