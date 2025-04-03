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
    const currentDate = new Date();
    const errors = {};

    if (startDate >= endDate) {
        errors.startDate = 'Ngày bắt đầu phải nhỏ hơn ngày kết thúc';
    }
    if (new Date(endDate) < currentDate) {
        errors.endDate = 'Ngày kết thúc phải bằng hoặc lớn hơn ngày hiện tại';
    }

    if (Object.keys(errors).length > 0) {
        return errors;
    }
    return null;
};

router.post("/add", async (req, res) => {
    try {
        const { name, discountRate, startDate, endDate, status } = req.body;
        const newDiscount = new Discount({ name, discountRate, startDate, endDate, status });

        await newDiscount.validate();
        const dateErrors= validateDiscountDates(new Date(startDate), new Date(endDate));
        if (dateErrors) {
            return res.status(400).json({ errors: dateErrors });
        }

        await newDiscount.save();
        res.status(200).json(newDiscount);
    } catch (e) {
        alertError(e,res)
    }
});
const alertError=(e,res) =>{
    if (e instanceof mongoose.Error.ValidationError) {
        const errors = Object.keys(e.errors).reduce((acc, field) => {
            acc[field] = e.errors[field].message;
            return acc;
        }, {});

        return res.status(400).json({ errors });
    }

    res.status(500).json({ message: e.message });
}

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
        await discount.validate();
        const dateErrors= validateDiscountDates(new Date(startDate), new Date(endDate));
        if (dateErrors) {
            return res.status(400).json({ errors: dateErrors });
        }

            res.status(200).json(discount)
    } catch (e) {
       alertError(e,res)
        res.status(500).json({message: e.message});
    }
})
module.exports = router;