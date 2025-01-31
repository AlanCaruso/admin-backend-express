const Category = require("../models/Category.js");

exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: "Error fetching categories" });
  }
};

exports.postCategories = async (req, res) => {
  try {
    const newCategory = new Category(req.body);
    const savedCategory = await newCategory.save();
    res.json(savedCategory);
  } catch (error) {
    res.status(500).json({ error: "Error creating categories" });
  }
};
