const express = require('express');
const Category = require('../models/category');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();

router.post("/add", async (req, res) => {
  const { name } = req.body;
  let model = new Category({
    _id: uuidv4(),
    name: name,
  });
  try {
    let checkCategoryName = await Category.findOne({ name: model.name });
    if (checkCategoryName !== null) {
      return res
        .status(403)
        .json({ message: "Bu kategori adı daha önce kullanılmış" });
    } else {
      await model.save();
      res.status(201).json({ message: "Kategori başarıyla eklendi" }, model);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.get('/getAllCategory', async (req, res) => {
  try {
    const categories = await Category.find().sort({ name: 1 });
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
    }
});

router.get('/getCategory/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const category = await Category.findById(id);
        if (!category) {
            return res.status(404).json({ message: "Kategori bulunamadı" });
        }
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post("/updateCategory", async(req, res)=>{
   
        const {_id,name} = req.body;
        const category = await Category.findOne({_id:_id});

        if(category.name != name){
            const checkName = await Category.findOne({name: name});
            if(checkName != null){
                res.status(403).json({message: "Bu kategori adı daha önce kullanılmış!"});
            }else{
                category.name = name;
                await Category.findByIdAndUpdate(_id, category);
                res.json({message: "Kategori kaydı başarıyla güncellendi!"});
            }
        } 
});

router.post('/removeById', async (req, res) => {
    const { _id } = req.body;
    try {
        const category = await Category.findByIdAndDelete(_id);
        if (!category) {
            return res.status(404).json({ message: "Kategori bulunamadı" });
        }
        res.status(200).json({ message: "Kategori başarıyla silindi" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


module.exports = router;