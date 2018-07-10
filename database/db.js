mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/tron').then(()=>{
    console.log('connected to database');
}).catch((err)=> {
    console.log(err);
})

const userSchema = mongoose.Schema({
    userName: String,
    password: String
})

const User = mongoose.model('User', userSchema);

const save = (userInfo) => {
    newUser = new User(userInfo);
    newUser.save();
}

const find = (userName, callback) => {
    User.findOne({ userName: userName }).exec((err, data) => {
        if (err) callback(err, null);
        else callback(null, data);
    })
}

module.exports.save = save;
module.exports.find = find;
