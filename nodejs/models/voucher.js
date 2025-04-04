const mongoose = require('mongoose');

const voucherSchema = new mongoose.Schema({
    code:{type:String,required: [true,"Vui lòng không để trống mã"]},
    condition:{type:Number,required: [true,"Vui lòng không để trống điều kiện giảm "]},
    type: { type: Boolean,default: false },
    value:{type:Number,required: [true,"Vui lòng không để trống giá trị giảm "] },
    maxValue:{type:Number},
    quantity:{type:Number,required: [true,"Vui lòng nhập số lương phiếu giảm giá "]},
    startDate:{type:Date,required: [true,"Vui lòng chọn ngày bắt đầu "]},
    endDate:{type:Date,required: [true,"Vui lòng chọn ngày kết thúc"]},
    status:{type:String,required: [true,"Vui lòng nhập trạng thái phiếu giảm giá "]},
},{ timestamps: true }
)

const Voucher = mongoose.model('Voucher', voucherSchema);
module.exports = Voucher;

