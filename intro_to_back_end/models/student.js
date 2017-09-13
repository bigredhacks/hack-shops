const mongoose = require("mongoose");

let Student = mongoose.model("Student",
    new mongoose.Schema({
        netid:           { type: String, required: true, index: true, unique: true },
        popularityCount: { type: Number, default: 0 }
    })
);

module.exports = Student;
