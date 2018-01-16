const mongoose = require('mongoose');


const commentSchema = new mongoose.Schema({
  content: { type: String, required: true },
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
}, {
  timestamps: true
});

commentSchema.methods.belongsTo = function commentBelongsTo(user) {
  return this.createdBy.id === user.id;
};

const foodSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  protein: { type: Number, required: true },
  carbs: { type: Number, required: true },
  fat: { type: Number, required: true },
  calories: { type: Number, required: true },
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  // 'User' had to match watch the module.exports first argument is in the user model'
  comments: [ commentSchema ]
});

foodSchema.methods.belongsTo = function belongsTo(user) {
// check if the user who created the food is the same as the person who is logged in
// 'this' is the instance of the food that we are calling the belongs to method on
// 'user is the user object that we wll pass this method (the user who is logged in)'
  return this.createdBy.id === user.id;
};

module.exports = mongoose.model('Food', foodSchema);
