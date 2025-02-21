const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");

router.get("/", categoryController.getCategories);
router.post("/", categoryController.postCategories);
router.delete("/:id", categoryController.deleteCategories);

module.exports = router;
