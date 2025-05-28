const mongoose = require('mongoose');
const categorySchema = new mongoose.Schema({
    _id: String,
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
});

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;
