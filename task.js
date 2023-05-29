const mongoose = require("mongoose");
const TaskSchema = new mongoose.Schema({
    name:{
        type:String,
        required: [true, "Must Provide A Task Name"],
        maxLength: [50, "Name Can Not Be More Than 50 Characters"]
    },
    completed:{
        type: Boolean,
        default: false
    }
});

// connect to a model
module.exports = mongoose.model("tasks", TaskSchema);