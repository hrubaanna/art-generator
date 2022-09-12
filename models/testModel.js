import { Schema, model, models } from "mongoose";

//models aren't usually imported in an express app, but in next.js we need to check
//if the model exists before importing it.

const testSchema = new Schema({
  name: String,
  email: {
    type: String,
    unique: true,
    required: true,
  },
});

//only create if Test model doesn't exist
const Test = models.Test || model("Test", testSchema);

export default Test;
