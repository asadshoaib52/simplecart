const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema(


    
    {
    order_name:{type: String, required: true, unique:true},
    customer_id:{type: String, required: true, unique: false},
    created_at:{type:Date, required: true, unique: false},
    login:{type: String, required: true, unique: false},
    password:{type: String, required: true, unique: false},
    name:{type: String, required: true, unique: false},
    credit_cards:{type: Array, required: true, unique:false},
    company_name:{type: String, required: true, unique: false},
    }

    

);

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;