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
        this.getAsyncData(function () {
            this.specialFunction();
            this.anotherSpecialFunction();
        }.bind(this));
    }
};

myObj.render();
