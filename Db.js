import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.JWT_SECRET);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};

export default connectDB;
