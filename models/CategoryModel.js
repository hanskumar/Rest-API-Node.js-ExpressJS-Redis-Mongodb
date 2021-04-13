require("dotenv").config();
var mongoose    = require("mongoose");

const CategorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    icon: { type: String, required: true, get: (image) => {
        // http://localhost:5000/uploads/1616443169266-52350494.png
        return `${process.env.APP_URL}/${image}`;
    }},
    status: { type:String,default:'active'},
}, { timestamps: true, toJSON: { getters: true }, id: false });


module.exports = mongoose.model('Category', CategorySchema, 'categories');