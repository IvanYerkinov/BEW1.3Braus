// Initialize express
const bodyParser = require('body-parser');
const express = require('express')
const app = express()
const methodOverride = require('method-override')

app.use(bodyParser.urlencoded({ extended: true }));

const models = require('./db/models');

const events = require('./controllers/events')(app, models);

// require handlebars
var exphbs = require('express-handlebars');

// Use "main" as our default layout
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
// Use handlebars to render
app.set('view engine', 'handlebars');

// override with POST having ?_method=DELETE or ?_method=PUT
app.use(methodOverride('_method'))


// Choose a port to listen on
const port = process.env.PORT || 3000;

// Tell the app what port to listen on
app.listen(port, () => {
  console.log('App listening on port 3000!')
})
