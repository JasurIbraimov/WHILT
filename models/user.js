import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
    email: {
        type: String,
        unique: [true, "Email already exits!"],
        required: [true, "Email is required!"],
    },
    username: {
        type: String,
        unique: [true, "Username already exits!"],
        required: [true, "Username is required!"],
        match: [
            /^(?=.{4,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Zа-яА-Я0-9._]+(?<![_.])$/,
            "Username invalid, it should contain 4-20 alphanumeric letters!",
        ],
    },
    image: {
        type: String
    }
});

const User = models.User || model("User", userSchema)

export default User;