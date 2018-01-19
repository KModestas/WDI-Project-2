const Food = require('../models/food');
const User = require('../models/user');


function indexRoute(req, res, next) {
  Food
    .find()
    .exec()
    .then((foods) => res.render('foods/index', { foods }))
    .catch(next);
}

function newRoute(req, res) {
  return res.render('foods/new');
}

function createRoute(req, res, next) {
  // create a new property called createdby and make it equal to the logged in user
  req.body.createdBy = req.user;

  Food
    .create(req.body)
    .then(() => res.redirect('/foods'))
    .catch((err) => {
      if(err.name === 'ValidationError') {
        return res.badRequest('/foods/new', err.toString());
      }
      next(err);
    });
}

function showRoute(req, res, next) {
  Food
    .findById(req.params.id)
    .populate('createdBy comments.createdBy') // populates field with the whole object
    .exec()
    .then((food) => {
      if(!food) return res.notFound();
      return res.render('foods/show', { food });
    })
    .catch(next);
}

function editRoute(req, res, next) {
  Food
    .findById(req.params.id)
    .populate('createdBy')
    .exec()
    .then((food) => {
      console.log(food);
      console.log(food.belongsTo(req.user));
      if(!food) return res.redirect();
      if(!food.belongsTo(req.user)) return res.unauthorized(`/foods/${food.id}`, 'You do not have permission to edit that resource');
      return res.render('foods/edit', { food });
    })
    .catch(next);
}

function updateRoute(req, res, next) {
  Food
    .findById(req.params.id)
    .exec()
    .then((food) => {
      if(!food) return res.notFound();

      food = Object.assign(food, req.body);

      return food.save();
    })
    .then(() => res.redirect(`/foods/${req.params.id}`))
    .catch((err) => {
      if(err.name === 'ValidationError') {
        return res.badRequest(`/foods/${req.params.id}/edit`, err.toString());
      }
      next(err);
    });
}

function deleteRoute(req, res, next) {
  Food
    .findById(req.params.id)
    .exec()
    .then((food) => {
      if(!food) return res.notFound();
      return food.remove();
    })
    .then(() => res.redirect('/foods'))
    .catch(next);
}



function createCommentRoute(req, res, next) {
  // attach the logged in user to the body of the request
  req.body.createdBy = req.user;
  Food
    .findById(req.params.id)
    .exec()
    .then((food) => {
      if(!food) return res.notFound();

      food.comments.push(req.body);
      return food.save();
    })
    .then((food) => {
      res.redirect(`/foods/${food.id}`);
    })
    .catch(next);
}


function deleteCommentRoute(req, res, next) {
  Food
    .findById(req.params.id)
    .exec()
    .then((food) => {
      if(!food) return res.notFound();

      const comment = food.comments.id(req.params.commentId);
      comment.remove();

      return food.save();
    })
    .then((food) => {
      res.redirect(`/foods/${food.id}`);
    })
    .catch(next);
}


function addFavouriteRoute(req, res, next) {
  Food
    .findById(req.params.id)
    .exec()
    .then((food) => {
      return User
        .findById(req.user.id)
        .exec()
        .then((user) => {
          console.log(user);
          user.favourites.push(food.id);
          return user.save();
        })
        .then(() => {
          res.redirect('/favourites');
        });
    })
    .catch(next);

    // populate the food so that you have access to the full Object
    // loop over favourites in favourites.ejs and display them

}

module.exports = {
  index: indexRoute,
  new: newRoute,
  create: createRoute,
  show: showRoute,
  edit: editRoute,
  update: updateRoute,
  delete: deleteRoute,
  createComment: createCommentRoute,
  deleteComment: deleteCommentRoute,
  favourite: addFavouriteRoute
};
