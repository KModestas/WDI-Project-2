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
    username: 'modestas',
    email: 'modestas@ga.com',
    password: '123',
    passwordConfirmation: '123'
  }])
  .then((users) => {
    console.log(`${users.length} users created`);
    return Food
      .create([{
        name: 'Buckwheat',
        image: 'https://images.huffingtonpost.com/2015-07-08-1436374933-6373539-Buckwheat_600_x_450-thumb.jpg',
        protein: 13,
        carbs: 72,
        fat: 3.4,
        calories: 343,
        description: 'If you’re a vegetarian or vegan, buckwheat is a great food to regularly include in your diet because it provides two types of essential amino acids — types you cannot make on your own and must get from the foods you eat. Buckwheat nutrition contains essential amino acids called lysine and arginine. What’s important about this? These specific amino acids aren’t found in many other common cereal or whole grains, so getting them from buckwheat ensures you cover the full range of essential proteins your body needs.',
        createdBy: users[0]
      },{
        name: 'Sugar Free Jell-O',
        image: 'http://mydiet-shop.co.uk/1959-large_default/jell-o-sugar-free-black-cherry-jelly.jpg',
        protein: 2,
        carbs: 0,
        fat: 0,
        calories: 20,
        description: 'Amazing for weight loss, has extremely little calories and satisfies your sweet tooth, making your weight loss journey that much less agonising. You can find this in most american supermarkets however, if you\'re in the UK you can easily order some from amazon for cheap.',
        createdBy: users[0]
      },{
        name: 'Uncle Ben\'s Brown Rice',
        image: 'https://www.unclebens.com/images/default-source/products/instant-brown.png?sfvrsn=ab7c000f_2',
        protein: 2.6,
        carbs: 23,
        fat: 0.9,
        calories: 111,
        description: 'Really easy to make and contains lots of carbohydrates to keep you pumped and energised for your workout. Can get them at any local supermarket at a very cheap price',
        createdBy: users[0]
      },
      {
        name: 'Princes Skinless Boneless Mackerel Fillets In Tomato Sauce ',
        image: 'https://img.tesco.com/Groceries/pi/013/5000232213013/IDShot_540x540.jpg',
        protein: 13,
        carbs: 3.9,
        fat: 11.1,
        calories: 169,
        description: 'These tiny tin cans provide alot of protein and taste great. They are easy to carry around and also very cheap. Make sure to have a napkin as they can be messy.',
        createdBy: users[0]
      },
      {
        name: 'Cottage Cheese',
        image: 'https://nazjedenie.sk/wp-content/uploads/2015/01/Linessa-Cottage-cheese-small.jpg',
        protein: 11,
        carbs: 3.4,
        fat: 4.3,
        calories: 98,
        description: 'very filling and high in protein. Also very cheap and can be gotten at any Lidl. Would recommend adding some honey as it can be a little dry and flavourless',
        createdBy: users[0]
      },
      {
        name: 'Avocado',
        image: 'https://www.bbcgoodfood.com/sites/default/files/guide/guide-image/2017/01/avocado.jpg',
        protein: 2,
        carbs: 9,
        fat: 15,
        calories: 160,
        description: 'Avocados are a great source of vitamins C, E, K, and B-6, as well as riboflavin, niacin, folate, pantothenic acid, magnesium, and potassium. They also provide lutein, beta-carotene, and omega-3 fatty acids.Although most of the calories in an avocado come from fat, don\'t shy away! Avocados are full of healthy, beneficial fats that help to keep you full and satiated.',
        createdBy: users[0]
      },
      {
        name: 'Cedar\'s Hommus - Roated Red Pepper',
        image: 'https://i.pinimg.com/736x/8b/52/d2/8b52d2c846508c9cf87095f0294aaa42--thank-you-boyfriend-hummus-brands.jpg',
        protein: 0,
        carbs: 0,
        fat: 25,
        calories: 310,
        description: 'This Hummus tastes amazing and is really filling. Good for when you\'re bulking and need to get some calories in - especially from fats. Would recommend eating with carrots. Lovely combination.',
        createdBy: users[0]
      },
      {
        name: 'Casbah Quinoa',
        image: 'https://images-na.ssl-images-amazon.com/images/I/51BB2-aCSAL.jpg',
        protein: 6,
        carbs: 34,
        fat: 3,
        calories: 199,
        description: 'Amazing for weight loss, has extremely little calories and satisfies your sweet tooth, making your weight loss journey that much less agonising. You can find this in most american supermarkets however, if you\'re in the UK you can easily order some from amazon for cheap.',
        createdBy: users[0]
      },
      {
        name: 'Quest Bar - Apple Pie',
        image: 'https://target.scene7.com/is/image/Target/52048022_Alt01?wid=520&hei=520&fmt=pjpeg',
        protein: 20,
        carbs: 25,
        fat: 5,
        calories: 225,
        description: 'These protein bars taster great and are obviously packed with protein. Really easy to consume and curbs your sweettooth. I like to take these right after a workout as a snack and they do the job just find. Can find them on amazon',
        createdBy: users[0]
      },
      {
        name: 'Whole Earth Crunchy Peanut Butter' ,
        image: 'http://wholeearthfoods.com/wp-content/uploads/2015/06/1_PB-Crunchy.png',
        protein: 4.15,
        carbs: 1.68,
        fat: 8.4,
        calories: 99,
        description: 'Amazing for weight loss, has extremely little calories and satisfies your sweet tooth, making your weight loss journey that much less agonising. You can find this in most american supermarkets however, if you\'re in the UK you can easily order some from amazon for cheap.',
        createdBy: users[0]
      }]);
  })
  .then((foods) => console.log(`${foods.length} foods created`))
  .catch((err) => console.log(err))
  .finally(() => mongoose.connection.close());
