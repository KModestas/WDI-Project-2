function customResponses(req, res, next) {

  res.notFound = function notFound() {
    const err = new Error('notFound');
    err.status = 404;
    throw err;
  };

  res.badRequest = function badRequest(url, error) {
    req.flash('alert', error);
    return res.redirect(url);
  };

  //protects controllers from unauthroised users accessing edit and delete via url
  res.unauthorized = function unauthorized(url='/login', message='You must be logged in') {
    req.flash('alert', message);
    return res.redirect(url);
  };

  next();
}

module.exports = customResponses;
