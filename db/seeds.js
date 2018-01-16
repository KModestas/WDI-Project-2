const mongoose = require('mongoose');
const { dbURI } = require('../config/environment');

mongoose.Promise = require('bluebird');
mongoose.connect(dbURI);

const Food = require('../models/hotel');
const User = require('../models/user');

Food.collection.drop();
User.collection.drop();

User
  .create([{
    username: 'mod',
    email: 'mod@ga.com',
    password: 'password',
    passwordConfirmation: 'password'
  }])
  .then((users) => {
    console.log(`${users.length} users created`);
    return Food
      .create([{
        name: 'Avocado',
        image: 'https://www.bbcgoodfood.com/sites/default/files/guide/guide-image/2017/01/avocado.jpg',
        protein: 5,
        carbs: 20,
        fat: 10,
        calories: 250
      },{
        name: 'Chicken',
        image: 'http://subversify.com/wp-content/uploads/2017/04/chicken-011.jpg',
        protein: 10,
        carbs: 15,
        fat: 8,
        calories: 120
      }]);
  })
  .then((hotels) => console.log(`${hotels.length} hotels created`))
  .catch((err) => console.log(err))
  .finally(() => mongoose.connection.close());
