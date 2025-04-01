require("dotenv").config(); // Tải các biến môi trường từ .env file (ví dụ: MONGO_URI, PORT).
const express = require("express"); // Framework giúp tạo API server dễ dàng.
const cors = require("cors");
const bodyParser = require("body-parser"); //Dùng để xử lý JSON request body.
const connectDB = require("./config/db");
const userRoutes = require("./routers/userRouter"); // Định nghĩa các API endpoint cho user.

const attributeRoutes = require("./routers/productAtrributeRouter");
const voucherRouters = require("./routers/voucherRouter");
const discountRouters = require("./routers/discountRouter");

const app = express();
connectDB();

app.use(cors());// Cho phép tất cả domain truy cập API
app.use(bodyParser.json());// Cho phép nhận dữ liệu JSON từ client
app.use("/api/users", userRoutes);// Định nghĩa API user (base URL: /api/users)

app.use("/attribute", attributeRoutes);
app.use("/voucher", voucherRouters);
app.use("/discount", discountRouters);

const PORT = process.env.PORT || 5000; //Lấy PORT từ biến môi trường hoặc mặc định 5000.
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); //Chạy server và lắng nghe kết nối từ client trên port 5000.
