const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, trim: true, unique: true },
  username: { type: String, required: true, trim: true, unique: true },
  password: { type: String, required: true },
  favourites: [{type: mongoose.Schema.ObjectId, ref: 'Food'}]

});

// hashes the password and prevents it from being rehashed when username or email is updated
userSchema.pre('save', function hashPassword(next) {
  if(this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
  }
  next();
});

// creates password confirmation virtual property which will be accesible in the prehook stage but not get stored in the DB
userSchema
  .virtual('passwordConfirmation')
  .set(function setPasswordConfirmation(passwordConfirmation) {
    this._passwordConfirmation = passwordConfirmation;
  });


// pre validation hook before actual validation stage this function runs whcich checks if user modified their password. If so, and doesnt match passwordConfirmation, then error is thrown
userSchema.pre('validate', function checkPassword(next) {
  if(this.isModified('password') && this._passwordConfirmation !== this.password) this.invalidate('passwordConfirmation', 'does not match');
  next();
});

// hashes password user enters when logging in and then compares it to the password in the DB that was stored when user registered (returns boolean)
userSchema.methods.validatePassword = function validatePassword(password) {
  return bcrypt.compareSync(password, this.password);
};


userSchema.methods.addFavourite = function addFavourite(food) {
  this.favourites.push(food);
};

module.exports = mongoose.model('User', userSchema);
