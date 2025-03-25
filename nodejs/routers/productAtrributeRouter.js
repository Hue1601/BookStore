const express = require('express');
const router = express.Router();
const Author = require('../models/Author');
const Category = require('../models/Category');

//get list author
router.get("/author",async (req, res) => {
    try {
      const author = await Author.find()
        res.json(author);
    }catch (err){
        res.status(500).json({error: err.message});
    }
})

//get list category
router.get("/category",async (req, res) => {
    try {
        const category = await Category.find()
        res.json(category);
    }catch (err){
        res.status(500).json({error: err.message});
    }
})
module.exports = router;