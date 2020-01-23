var myObj = {

    specialFunction: function () {
        console.log('specialFunction');
    },

    anotherSpecialFunction: function () {
        console.log('anotherSpecialFunction');
    },

    getAsyncData: function (cb) {
        cb();
    },

    render: function () {
        var that = this;
        this.getAsyncData(function () {
            that.specialFunction();
            that.anotherSpecialFunction();
        });
    }
};

myObj.render();
