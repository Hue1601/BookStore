const express = require('express');
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

router.post("/add", async (req, res) => {
    try {
        const {name, discountRate, startDate, endDate,status} = req.body;
        const newDiscount = new Discount({name, discountRate, startDate, endDate,status});
        await newDiscount.save();
        res.status(200).json(newDiscount);
    } catch (e) {
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