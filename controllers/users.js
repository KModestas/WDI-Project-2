const User = require('../models/user');

function showFavouritesRoute(req, res, next) {
  User
    .findById(req.user.id)
    .populate('favourites')
    .then((user) => {
      console.log(user);
      res.render('statics/favourites', { foods: user.favourites});
    })
    .catch(next);
}

module.exports = {
  favourites: showFavouritesRoute
};
