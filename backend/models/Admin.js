const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: { type: String, default: 'admin' },
    hotels:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Hotel"
    }]
});
 
const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
