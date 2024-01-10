import mongoose from "mongoose"


const userSchema = new mongoose.Schema({
    name: {type:String , required:true , minLength:3 },
    email: {type:String , required:true , minLength:3 , unique:true },
    password : {type:String , unique:true , required:true , minLength:5}
},{
    timestamps:true
}

)

export const userModel =  mongoose.model("User" , userSchema)