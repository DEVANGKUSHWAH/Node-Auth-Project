import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
{
email: {
type: String,
required: true,
unique: true,
},
password: {
type: String,
required: true,
},
token:{type:String},
},
{
timestamps: true, // Add timestamp fields
}
);

export const User = mongoose.model("User", userSchema);

