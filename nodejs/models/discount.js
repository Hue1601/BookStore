const mongoose = require('mongoose')

const discountSchemale = new  mongoose.Schema({
   name: { type: String, required: true },
    discountRate: { type: Number, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    status: { type: String, required: true },
},{
    timestamps: true
})
const Discount = mongoose.model('discount', discountSchemale)
module.exports= Discount
