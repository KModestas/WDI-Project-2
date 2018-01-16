const router = require('express').Router();
const registrations = require('../controllers/registrations');
const sessions = require('../controllers/sessions');
const foods = require('../controllers/foods');
const secureRoute = require('../lib/secureRoute');

router.get('/', (req, res) => res.render('statics/index'));

router.route('/foods')
  .get(foods.index)
  .post(secureRoute, foods.create);

router.route('/foods/new')
  .get(secureRoute, foods.new);

router.route('/foods/:id')
  .get(foods.show)
  .put(secureRoute, foods.update)
  .delete(secureRoute, foods.delete);

router.route('/foods/:id/edit')
  .get(secureRoute, foods.edit);

router.route('/foods/:id/comments')
  .post(foods.createComment);

router.route('/foods/:id/comments/:commentId')
  .delete(foods.deleteComment);

router.route('/register')
  .get(registrations.new)
  .post(registrations.create);

router.route('/login')
  .get(sessions.new)
  .post(sessions.create);

router.route('/logout')
  .get(sessions.delete);

router.all('*', (req, res) => res.notFound());

module.exports = router;
