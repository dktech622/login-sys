import mongoose, { mongo } from 'mongoose';


const connectDB= async ()=>{
    try{
        await mongoose.connect(`mongodb://localhost/${process.env.DATABASE_NAME}`);
        console.log('MongoDB connected');
    }
    catch{
        console.error('Failed to connect to MongoDB')
        process.exit(1)
    }
}


export default connectDB;
