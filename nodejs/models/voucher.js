const mongoose = require('mongoose');

const voucherSchema = new mongoose.Schema({
    code:{type:String,required: true},
    condition:{type:Number,required: true},
    type: { type: Boolean,default: false },
    value:{type:Number},
    maxValue:{type:Number},
    quantity:{type:Number},
    startDate:{type:Date},
    endDate:{type:Date},
    status:{type:String},
},{ timestamps: true }
)

const Voucher = mongoose.model('Voucher', voucherSchema);
module.exports = Voucher;

