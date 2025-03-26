const express = require('express');
const router = express.Router();
const Author = require('../models/Author');
const Category = require('../models/Category');
const Publisher = require('../models/Publisher');
//get list author
router.get("/author",async (req, res) => {
    try {
      const author = await Author.find()
        res.json(author);
    }catch (err){
        res.status(500).json({error: err.message});
    }
})
router.post("/author",async (req,res) =>{
    try {
        const {name} = req.body;
        const newAuthor = new Author ({name});
        await newAuthor.save();
        res.status(201).json(newAuthor);
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

//get list publisher
router.get("/publisher",async (req,res) =>{
    try {
        const publisher = await Publisher.find()
        res.json(publisher);
    }catch (err){
        res.status(500).json({error: err.message});
    }
})
module.exports = router;