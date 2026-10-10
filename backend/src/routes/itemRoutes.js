const express = require("express");
const router = express.Router();

const { createItem, getMyItems, getItem, updateItem, deleteItem } = require("../controllers/itemController");
const { authenticateUser } = require("../middleware/authMiddleware");

router.use(authenticateUser);

router.get("/mine", getMyItems);
router.post("/", createItem);
router.get("/:id", getItem);
router.put("/:id", updateItem);
router.delete("/:id", deleteItem);

module.exports = router;
itemsRoutes.js