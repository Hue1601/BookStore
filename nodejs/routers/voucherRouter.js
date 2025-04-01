const express = require('express')
const router = express.Router()
const Voucher = require('../models/Voucher')

router.get("/", async (req, res) => {
    try {
        const response = await Voucher.find()
        res.json(response)
    } catch (e) {
        res.status(500).json({message: e.message});
    }
})

router.post("/add", async (req, res) => {
    const {code, condition, type, value, maxValue, quantity, startDate, endDate, status} = req.body;
    const voucher = new Voucher({code, condition, type, value, maxValue, quantity, startDate, endDate, status});
    await voucher.save();
    res.status(200).json(voucher);
})
router.get("/:id", async (req, res) => {
   try {
       const {id} = req.params;
       const response = await Voucher.findById(id)
       res.json(response)
   }catch(err) {
       res.status(404).json({error: err.message});
   }

})
router.put("/:id", async (req, res) => {
    const {code, condition, type, value, maxValue, quantity, startDate, endDate, status} = req.body;
    const voucher = await Voucher.findByIdAndUpdate(req.params.id, {
        code,
        condition,
        type,
        value,
        maxValue,
        quantity,
        startDate,
        endDate,
        status
    }, {new: true})
    res.status(200).json(voucher);
})
module.exports = router