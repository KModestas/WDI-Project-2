const mongoose = require('mongoose');
const { dbURI } = require('../config/environment');

mongoose.Promise = require('bluebird');
mongoose.connect(dbURI);

const Food = require('../models/food');
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
        calories: 250,
        description: 'You can get these at the local supermarket, really good source of protein and vitamins',
        createdBy: users[0]
      },{
        name: 'Chicken',
        image: 'http://subversify.com/wp-content/uploads/2017/04/chicken-011.jpg',
        protein: 10,
        carbs: 15,
        fat: 8,
        calories: 120,
        description: 'Who doesnt like chciken just stay away from those literally shitty battery chickens that will steal your gains',
        createdBy: users[0]
      }]);
  })
  .then((foods) => console.log(`${foods.length} foods created`))
  .catch((err) => console.log(err))
  .finally(() => mongoose.connection.close());
