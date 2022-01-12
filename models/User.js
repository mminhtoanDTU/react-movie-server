import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            unique: true,
            trim: true,
            required: [true, "Name must be required."],
        },
        email: {
            type: String,
            unique: true,
            trim: true,
            required: [true, "Email must be required."],
        },
        password: {
            type: String,
            trim: true,
            required: [true, "Password must be required."],
            minlength: [6, "Password must be at least 6 characters."],
        },
        photoId: {
            type: String,
            default: null,
        },
        bio: {
            type: String,
            default: null,
        },
    },
    { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

//Hash password before save to DB
userSchema.pre("save", function (next) {
    let user = this;
    bcrypt.hash(user.password, 10, function (error, hash) {
        if (error) {
            return next(error);
        } else {
            user.password = hash;
            next();
        }
    });
});

userSchema.virtual("posts", {
    ref: "Post",
    localField: "_id",
    foreignField: "author",
    count: true, //Bo dong nay de lay duoc full post
});

export const UserModel = mongoose.model("User", userSchema);
