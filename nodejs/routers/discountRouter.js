const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Discount = require('../models/Discount');

router.get('/', async (req, res) => {
    try {
        const discount = await Discount.find()
        res.status(200).json(discount)
    } catch (e) {
        res.status(500).json({message: e.message});
    }
})
const validateDiscountDates = (startDate, endDate) => {
   const currentDate= new Date();
    if (startDate >= endDate) {
        throw new Error('Ngày bắt đầu phải nhỏ hơn ngày kết thúc');
    }
    if(new Date(endDate) < currentDate) {
        throw new Error('Ngày kết thúc phải bằng hoặ lớn hơn ngày hiện tại');
    }
};
router.post("/add", async (req, res) => {
    try {
        const {name, discountRate, startDate, endDate,status} = req.body;
        const newDiscount = new Discount({name, discountRate, startDate, endDate,status});
        validateDiscountDates(new Date(startDate), new Date(endDate));
        await newDiscount.save();
        res.status(200).json(newDiscount);
    } catch (e) {
        if (e instanceof mongoose.Error.ValidationError) {
            const errors = Object.keys(e.errors).reduce((acc, field) => {
                acc[field] = e.errors[field].message;
                return acc;
            }, {});

            return res.status(400).json({ errors });
        }

         res.status(500).json({message: e.message});
    }
})

router.get('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const discount = await Discount.findById(id)
        res.status(200).json(discount)
    } catch (e) {
        res.status(500).json({message: e.message});
    }
})

router.put("/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const {name, discountRate, startDate, endDate,status} = req.body;
        const discount = await Discount.findByIdAndUpdate(id, {name, discountRate, startDate, endDate,status}, {new: true})
        res.status(200).json(discount)
    } catch (e) {
        res.status(500).json({message: e.message});
    }
})
module.exports = router;