const Item = require("../models/Item");
const { getApiError } = require("../utils/apiError");

const createItem = async (req, res) => {
    try {
        const { title, description, category, location, date, type } = req.body;
        const item = await Item.create({
            title,
            description,
            category,
            location,
            date,
            type,
            reportedBy: req.user.id
        });
        res.status(201).json({ message: "Report created", item });
    } catch (error) {
        const { status, message } = getApiError(error);
        res.status(status).json({ message });
    }
};

const getMyItems = async (req, res) => {
    try {
        const items = await Item.find({ reportedBy: req.user.id }).sort({ createdAt: -1 });
        res.json({ count: items.length, items });
    } catch (error) {
        const { status, message } = getApiError(error);
        res.status(status).json({ message });
    }
};

const getItem = async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) return res.status(404).json({ message: "Report not found" });

        // ownership check populate se PEHLE - populate ke baad reportedBy pura
        // object ho jata hai aur uska toString() user id se match karna band kar deta hai
        if (item.reportedBy.toString() !== req.user.id && req.user.role !== "admin")
            return res.status(403).json({ message: "You can only view your own reports" });

        await item.populate("reportedBy", "name email");
        res.json({ item });
    } catch (error) {
        const { status, message } = getApiError(error);
        res.status(status).json({ message });
    }
};

const updateItem = async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) return res.status(404).json({ message: "Report not found" });

        if (item.reportedBy.toString() !== req.user.id)
            return res.status(403).json({ message: "You can only edit your own reports" });

        ["title", "description", "category", "location", "date", "type"].forEach((field) => {
            if (req.body[field] !== undefined) item[field] = req.body[field];
        });

        await item.save();
        res.json({ message: "Report updated", item });
    } catch (error) {
        const { status, message } = getApiError(error);
        res.status(status).json({ message });
    }
};

const deleteItem = async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) return res.status(404).json({ message: "Report not found" });

        if (item.reportedBy.toString() !== req.user.id && req.user.role !== "admin")
            return res.status(403).json({ message: "You can only delete your own reports" });

        await item.deleteOne();
        res.json({ message: "Report deleted" });
    } catch (error) {
        const { status, message } = getApiError(error);
        res.status(status).json({ message });
    }
};

module.exports = { createItem, getMyItems, getItem, updateItem, deleteItem };