const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    name: String,
    description: String,
    category: String,
    location: String,
    date: Date,
    type: String,
    status: String,
    // reportedBy: mongoose.Schema.Types.ObjectId

});

module.exports = mongoose.model("Student", studentSchema);

