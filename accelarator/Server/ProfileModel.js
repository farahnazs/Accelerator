const mongoose = require('mongoose');


const profileSchema = new mongoose.Schema({
    name: { type: String, require: true },
    role: { type: String, require: true },

});

const Profile = mongoose.model('Profile', profileSchema);
module.exports = Profile;