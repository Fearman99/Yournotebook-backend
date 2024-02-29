
const mongoose = require('mongoose');
const {Schema} = mongoose;
const NotesSchema = new Schema({
    // added as a foreign from models/User.js to fetch certain notes for certain user
    user:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user'
    },
    //
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true,
    },
    tag:{
        type: String,
        default:'general'
    },
    pinned:{
        type: Boolean,
        default:false
    },
   
   
    
});

module.exports = mongoose.model('notes',NotesSchema);