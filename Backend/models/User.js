import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        min:[3,'username atleast contain 3 characters']
    },
    email:{
        type:String,
        unique:[true,"unique email is required"]
    },
    password:{
        type:String,
        min:[6,"password should contain six characters"]
    }
})

export const User = mongoose.model('User',userSchema);