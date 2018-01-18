const router = require('express').Router();
const registrations = require('../controllers/registrations');
const sessions = require('../controllers/sessions');
const foods = require('../controllers/foods');
// secureRoute can be passed as an argument first to only allow user access to page if logged in
const secureRoute = require('../lib/secureRoute');

// landing page
router.get('/', (req, res) => res.render('statics/index'));

// About Page
router.get('/about', (req, res) => res.render('statics/about'));

// profile page
router.get('/profile', (req, res) => res.render('statics/profile'));

// index of all foods
router.route('/foods')
  .get(foods.index)
  .post(secureRoute, foods.create);

// create form for foods
router.route('/foods/new')
  .get(secureRoute, foods.new);

// individual food page
router.route('/foods/:id')
  .get(foods.show)
  .put(secureRoute, foods.update)
  .delete(secureRoute, foods.delete);

// edit form for individual food
router.route('/foods/:id/edit')
  .get( foods.edit);

// create comment for individual food
router.route('/foods/:id/comments')
  .post(foods.createComment);

// delete individual comment of individual food
router.route('/foods/:id/comments/:commentId')
  .delete(foods.deleteComment);

// registration page
router.route('/register')
  .get(registrations.new)
  .post(registrations.create);

// login page
router.route('/login')
  .get(sessions.new)
  .post(sessions.create);

// logout
router.route('/logout')
  .get(sessions.delete);

router.all('*', (req, res) => res.notFound());

module.exports = router;
