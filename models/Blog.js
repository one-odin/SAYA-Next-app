const mongoose = require("mongoose");
const schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    publish: {
      type: Boolean,
      default: true,
    },
  },
  {timestamps: true}
);

const model = mongoose.models.Blog || mongoose.model("Blog", schema);

module.exports = model;
