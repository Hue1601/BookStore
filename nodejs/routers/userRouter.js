const express = require("express");
const router = express.Router();//Tạo một Router riêng biệt để quản lý API của User
const User = require("../models/User");

router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({username})

        if(!user) {
            return res.status(400).json({error: "Username or password is invalid"});
        }
        if(user.password !== password) {
            return res.status(400).json({error: "Passwords do not match"});
        }

        res.json({ message: "Đăng nhập thành công", user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
// //  Lấy danh sách Users
// router.get("/", async (req, res) => {
//     try {
//         const users = await User.find();
//         res.json(users);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });
// //lấy danh sách theo id
// router.get("/:id", async (req, res) => {
//     try {
//         const updatedUser = await User.findById(req.params.id);
//         res.json(updatedUser);
//     } catch (err) {
//
//         res.status(400).json({ error: err.message });
//     }
// });
// // Thêm User mới
// router.post("/", async (req, res) => {
//     try {
//         const { name, email, age } = req.body; // Lấy dữ liệu name, email, age từ request body (client gửi lên).
//         const newUser = new User({ name, email, age }); //Tạo một user mới từ dữ liệu nhận được.
//         await newUser.save(); // lưu vào mongoDB
//         res.status(201).json(newUser);
//     } catch (err) {
//         res.status(400).json({ error: err.message });
//     }
// });
//
//
// //  Cập nhật User
// router.put("/:id", async (req, res) => {
//     try {
//         const { name, email, age } = req.body;
//         const updatedUser = await User.findByIdAndUpdate(req.params.id, { name, email, age }, { new: true });
//         res.json(updatedUser);
//     } catch (err) {
//
//         res.status(400).json({ error: err.message });
//     }
// });
// //  Xóa User
// router.delete("/:id", async (req, res) => {
//     try {
//         await User.findByIdAndDelete(req.params.id);
//         res.json({ message: "User deleted" });
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });


module.exports = router;
