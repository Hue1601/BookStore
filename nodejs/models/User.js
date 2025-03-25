const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password:{type:String,required: true}
}, { timestamps: true });
//Tạo một Model tên "User", ánh xạ vào Collection "users" trong MongoDB.
const User = mongoose.model("User", userSchema);
module.exports = User;

