import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { number } from 'mathjs';

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        default:"0426414113",
        // required: true,
        validate: {
            validator: function (v) {
                // Check if the phone number is exactly 10 digits long
                return /^[0-9]{10}$/.test(v);
            },
            message: props => `${props.value} is not a valid 10-digit phone number!`
        }
    },
    password: {
        type: String,
        required: true
    } ,
    isAdmin: {
        type: Boolean,
        required: true,
        default: false,
    }
}, { timestamps: true });

userSchema.pre('save', async function(next) {
    if(!this.isModified('password')) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

const User = mongoose.model('User', userSchema);

export default User;