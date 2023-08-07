import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        min: [1, "atleast contain one character"]
    },
    description: {
        type: String,
        min: [3, "description is mandatory"]
    },
    date: {
        type: String
    },
    userId:{
        type:mongoose.Types.ObjectId
    },
    isCompleted:{
        type:Boolean,
        default:false
    }
},{
    timestamps:true
})
todoSchema.plugin(mongoosePaginate);

export const Todo = mongoose.model('Todo',todoSchema);