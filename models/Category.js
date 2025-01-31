const mongoose = require("mongoose");

const CategoryScheme = new mongoose.Schema({
  name: {
    type: String,
  },
});

module.exports = mongoose.model("Category", CategoryScheme);
