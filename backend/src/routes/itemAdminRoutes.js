
const express = require("express");
const router = express.Router();

const { getAllItems, updateItemStatus } = require("../controllers/itemAdminController");
const { authenticateUser, requireAdmin } = require("../middleware/authMiddleware");

router.use(authenticateUser);
router.use(requireAdmin);

router.get("/", getAllItems);
router.put("/:id/status", updateItemStatus);

module.exports = router;
