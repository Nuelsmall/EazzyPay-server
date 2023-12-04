const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const jwt = require('jsonwebtoken');

const userSchema = new Schema ({
    username: {type: String, require: true, min: 4, unique: true},
    password: {type: String, require: true}
});
userSchema.methods.generateAuthToken = function () {
  const payload = {
    _id: this._id,
    username: this.username
  }
  const token = jwt.sign(payload, process.env.JWT_PRIVATE_KEY);
  return token;
}
const UserModel = model('User', userSchema);

module.exports = UserModel;