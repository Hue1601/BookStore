const express = require('express');
const router = express.Router();
const Author = require('../models/Author');
const Category = require('../models/Category');
const Publisher = require('../models/Publisher');
//get list author
router.get("/author", async (req, res) => {
    try {
        const author = await Author.find()
        res.json(author);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
})

//get list category
router.get("/category", async (req, res) => {
    try {
        const category = await Category.find()
        res.json(category);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
})

//get list publisher
router.get("/publisher", async (req, res) => {
    try {
        const publisher = await Publisher.find()
        res.json(publisher);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
})

router.post("/author", async (req, res) => {
    try {
        const {name} = req.body;
        const newAuthor = new Author({name});
        await newAuthor.save();
        res.status(201).json(newAuthor);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
})

router.post("/publisher", async (req, res) => {
    try {
        const {name} = req.body
        const newPublisher = new Publisher({name});
        await newPublisher.save();
        res.status(201).json(newPublisher);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
})
router.post("/category", async (req, res) => {
    try {
        const {name} = req.body;
        const newCategory = new Category({name});
        await newCategory.save();
        res.status(201).json(newCategory);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
})
// get by id
router.get("/author/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const updatedAuthor = await Author.findById(id);
        res.json(updatedAuthor);
    } catch (err) {

        res.status(500).json({error: err.message});
    }
});
router.get("/publisher/:id", async (req, res) => {
    try {
        const updatePublisher = await Publisher.findById(req.params.id);
        res.json(updatePublisher);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
})
router.get("/category/:id", async (req, res) => {
    try {
        const updateCategory = await Category.findById(req.params.id);
        res.json(updateCategory);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
})

//update
router.put("/author/:id", async (req, res) => {
    try {
        const {name} = req.body
        const update = await Author.findByIdAndUpdate(req.params.id, {name}, {new: true});
        res.status(200).json(update);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
})
router.put("/category/:id", async (req, res) => {
    try {
        const {name} = req.body
        const category = await Category.findByIdAndUpdate(req.params.id, {name}, {new: true})
        res.status(200).json(category)
    } catch (err) {
        res.status(500).json({error: err.message});
    }
})
router.put("/publisher/:id", async (req, res) => {
    try {
        const {name} = req.body
        const publisher = await Publisher.findByIdAndUpdate(req.params.id,{name},{new:true})
        res.status(200).json(publisher);
    }catch (err){
        res.status(500).json({error:err.message});
    }
})

//
module.exports = router;