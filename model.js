const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const UserSchema  = new mongoose.Schema({
    name :{
        type  : String,
        required : true
    } ,
    email :{
        type  : String,
        required : true
        } ,
    password :{
        type  : String,
        required : true
    } ,
    date :{
        type : Date,
        default : Date.now
    }
});

UserSchema.methods.isValidPassword = async function(password) {
    const user = this;
    const compare = await bcrypt.compare(password, user.password);
    return compare;
}

const User= mongoose.model('User',UserSchema);



module.exports = User;