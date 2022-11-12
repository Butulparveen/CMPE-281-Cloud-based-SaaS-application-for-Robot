const mongoose = require("mongoose");
const Schema = mongoose.Schema;


var robotPath = new Schema({
  x: { type: Number },
  y: { type: Number }
});

var robotsSchema = new Schema(
  {
    _id: { type: Schema.ObjectId, auto: true },
    roboName: { type: String, required: true },
    roboId: { type: String, required: true },
    roboPath: [robotPath],
    roboState: { type: String },
    userId: { type: String },
    runTime: { type: Number },
    startSessionTime: { type: Date },
    endSessionTime: { type: Date },
  },
  {
    versionKey: false,
  }
);
module.exports = mongoose.model("robots", robotsSchema);
