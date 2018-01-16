const express        = require('express');
const morgan         = require('morgan');
const expressLayouts = require('express-ejs-layouts');
const routes         = require('./config/routes');
const mongoose       = require('mongoose');
const bodyParser     = require('body-parser');
mongoose.Promise     = require('bluebird');
const { port, env, dbURI, secret } = require('./config/environment');
const session = require('express-session');
const flash = require('express-flash');


const app = express();

mongoose.connect(dbURI);

app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);

app.use(expressLayouts);
app.use(express.static(`${__dirname}/public`));
if(env === 'development') app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  secret: secret,
  resave: false,
  saveUninitialized: false
}));

app.use(flash());

app.use(routes);

app.listen(port, () => console.log(`Express is listening on port ${port}`));
