import mongoose from "mongoose";


const connectDB = async () =>{
    try{
        await mongoose.connect(process.env.MONGO_DB_URL, {});
        console.log("MongoDB connected");
    }catch(err){
        console.log("Error to connecting to MongoDB " + err);
    }
};

export default connectDB;