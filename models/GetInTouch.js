import { Schema, model } from 'mongoose';

const getInTouchSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const GetInTouch = model('GetInTouch', getInTouchSchema);
export default GetInTouch;
