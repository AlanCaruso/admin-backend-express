const mongoose = require("mongoose");
const Item = require("../models/Item");
const Category = require("../models/Category");

exports.createItem = async (req, res) => {
  try {
    const { name, description, category } = req.body;

    let categoryId = null;

    if (category) {
      if (!mongoose.Types.ObjectId.isValid(category)) {
        return res.status(400).json({ error: "Invalid category ID format" });
      }

      const existingCategory = await Category.findById(category);
      if (!existingCategory) {
        return res.status(400).json({ error: "Category not found" });
      }

      categoryId = existingCategory._id;
    }

    const newItem = new Item({
      name,
      description,
      category: categoryId,
    });

    const savedItem = await newItem.save();
    return res.status(201).json(savedItem);
  } catch (error) {
    console.error("Error al crear el ítem:", error); // Log detallado del error
    return res
      .status(500)
      .json({ message: "Error creating item", error: error.message });
  }
};

exports.getItems = async (req, res) => {
  try {
    const { searchTerm, category, startDate, endDate } = req.query;
    let filter = {};

    if (searchTerm) {
      filter.name = { $regex: searchTerm, $options: "i" };
    }
    if (category) {
      filter.category = category;
    }
    if (startDate && endDate) {
      filter.createdAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    const items = await Item.find(filter).populate("category");

    res.json(items);
  } catch (error) {
    res.status(500).json({ message: "Error fetching items", error });
  }
};

exports.getItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id).populate("category");
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ message: "Error fetching item", error });
  }
};

exports.updateItem = async (req, res) => {
  try {
    const { name, description, category } = req.body;

    let categoryId = null;

    if (category) {
      if (!mongoose.Types.ObjectId.isValid(category)) {
        return res.status(400).json({ error: "Invalid category ID format" });
      }

      const existingCategory = await Category.findById(category);
      if (!existingCategory) {
        return res.status(400).json({ error: "Category not found" });
      }

      categoryId = existingCategory._id;
    }

    const updatedItem = await Item.findByIdAndUpdate(
      req.params.id,
      { name, description, category: categoryId },
      { new: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(500).json({ message: "Error updating item", error });
  }
};

exports.deleteItem = async (req, res) => {
  try {
    const deletedItem = await Item.findByIdAndDelete(req.params.id);
    if (!deletedItem) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.status(200).json({ message: "Item deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting item", error });
  }
};
