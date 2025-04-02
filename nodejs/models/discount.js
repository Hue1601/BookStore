const mongoose = require('mongoose')

const discountSchemale = new  mongoose.Schema({
    name: { type: String, required: [true, 'Tên khuyến mãi là bắt buộc'] },
    discountRate: { type: Number, required: [true,'Vui lòng nhập phần trăm giảm'] },
    startDate: { type: Date, required: [true, 'Vui lòng chọn ngày bắt đầu'] },
    endDate: { type: Date, required: [true, 'Vui lòng chọn ngày kết thúc'] },
    status: { type: String, required: [true,'Vui lòng không để tronnsg trạng thái'] },
},{
    timestamps: true
})
const Discount = mongoose.model('discount', discountSchemale)
module.exports= Discount
