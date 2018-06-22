var express = require('express');
var exp_hbs = require('express-handlebars');
var exp_hbs_sections = require('express-handlebars-sections');
var bodyParse = require('body-parser');
var path = require('path');
var homeControllers = require('./controllers/homeController');

var app = express();

app.engine('hbs', exp_hbs({
    defaultLayout: 'main',
    helpers: {
        section: exp_hbs_sections()
    }
}));

app.set('view engine', 'hbs');

app.use(express.static(path.resolve(__dirname, 'public')));
app.use(bodyParse.json());
app.use(bodyParse.urlencoded({
    extended: false
}));

app.get('/', (req, res) => {
    res.redirect('/home');
});

app.use('/home', homeControllers);

app.listen(3000, () => {
    console.log('Site running on port 3000')
});