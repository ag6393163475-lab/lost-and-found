const Item = require("../models/Item");
const { getApiError } = require("../utils/apiError");

const getAllItems = async (req, res) => {
    try {
        const filter = {};

        if (req.query.type) filter.type = req.query.type;
        if (req.query.status) filter.status = req.query.status;

        const items = await Item.find(filter)
            .populate("reportedBy", "name email")
            .sort({ createdAt: -1 });

        res.json({ count: items.length, items });
    } catch (error) {
        const { status, message } = getApiError(error);
        res.status(status).json({ message });
    }
};

const updateItemStatus = async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);

        if (!item) return res.status(404).json({ message: "Report not found" });

        if (!["OPEN", "CLAIMED", "CLOSED"].includes(req.body.status))
            return res.status(400).json({ message: "Invalid status" });

        item.status = req.body.status;
        await item.save();

        res.json({ message: "Status updated", item });
    } catch (error) {
        const { status, message } = getApiError(error);
        res.status(status).json({ message });
    }
};

module.exports = { getAllItems, updateItemStatus };
