import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    contact:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    }, 
    helpType: {
        type: String,
        enum: ['offer', 'seek'],
        required: true
    },
    author: {
        type:String,
        required: true
    }
    
},{ timestamps: true })

export default mongoose.model("Post",postSchema);