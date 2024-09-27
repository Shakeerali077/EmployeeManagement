import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        // console.log('Mongo URI:', process.env.MONGO_URI);
        await mongoose.connect(process.env.MONGO_URI, {
            // Options no longer needed for new versions of Mongoose
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
        });
        console.log('MongoDB connected');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
};

export default connectDB;
