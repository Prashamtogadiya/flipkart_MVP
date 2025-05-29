const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  imageUrl: [String],
  category: String
},
{
    collection:'productList',
    timestamps:true
});

module.exports = mongoose.model('Product', productSchema);
