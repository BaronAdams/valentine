import { mongoose } from "./db";

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    valentine_name:{
        type: String,
        required: true
    },
    valentine_img:{
        type: String,
        required: true
    },
    message:{
        type: String,
        default:"Every beat of my heart resonates with the love I have for you, my dearest Valentine. You are the light that illuminates my world. Happy Valentine's Day, my forever love"
    }
},{ timestamps: true })

export const User = mongoose.models?.User || mongoose.model('User',userSchema)
// mongoose.models?.User || 