import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: String,
        birthDate: { type: Date, required: true },
        schedulingDay: { type: Date, required: true },
        schedulingTime: { type: Date, required: true },
        wasAttended: { type: Boolean, default: false },
    },
    {
        timestamps: true,
    }
);

const UserModel = mongoose.model("user", UserSchema);

export default UserModel;
