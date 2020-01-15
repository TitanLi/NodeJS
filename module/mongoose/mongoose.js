const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true, useUnifiedTopology: true });
const schema = new Schema({
    name: { 
        type: String,
        // lowercase: true,
        required: true,
        // enum: ['Coffee', 'Tea'],
        // default: "Coffee"
    },
    number: {
        type: Number,
        // function, defines a custom getter for this property using Object.defineProperty()
        get: v => Math.round(v),
        // function, defines a custom setter for this property using Object.defineProperty()
        set: v => Math.round(v),
        // string, mongoose >= 4.10.0 only. Defines a virtual with the given name that gets/sets this path.
        alias: 'i'
    }
});
// mongoDB collection
var Thing = mongoose.model('Thing', schema);
var m = new Thing;
m.name = "Coffee";
m.number = 1234.1234;
console.log(m.number);
console.log(m.i);
m.save((callback) => {
    console.log(callback);
});