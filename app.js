var express = require('express');
var exp_hbs = require('express-handlebars');
var exp_hbs_sections = require('express-handlebars-sections');
var bodyParse = require('body-parser');
var path = require('path');

var handleLayoutMDW = require('./middle-wares/handleLayout');

var homeControllers = require('./controllers/homeController');

var productControllers = require('./controllers/productController');

var userControllers = require('./controllers/userController');

var searchControllers = require('./controllers/searchController');

var adminControllers = require('./controllers/adminController');

var app = express();

app.engine('hbs', exp_hbs({
	defaultLayout: 'main',
	helpers: {
		section: exp_hbs_sections(),
		numberFormat: (number)=>{
			var rs = number.toString();
			for(var i = rs.length-3; i>0; i-=3){
				rs = rs.slice(0,i)+'.'+rs.slice(i);
			}
			return rs;
		},
		saleCal: (number, percent)=> Math.round(number*100/percent),
		slice: (array,start,end)=>array.slice(start,end),
		for: (pageNum)=> new Array(pageNum).fill(0),
		math: (lvalue, operator, rvalue, options) => {
			return {
				"+": lvalue + rvalue,
				"-": lvalue - rvalue,
				"*": lvalue * rvalue,
				"/": lvalue / rvalue,
				"%": lvalue % rvalue
			}[operator];
		}
	}
}));


app.set('view engine', 'hbs');

app.use(express.static(path.resolve(__dirname, 'public')));
app.use(bodyParse.json());
app.use(bodyParse.urlencoded({
	extended: false
}));

app.use(handleLayoutMDW);

//Routing using homeControllers
app.get('/', (req, res) => {
	res.redirect('/home');
});
app.use('/home', homeControllers);
app.use('/product', productControllers);
app.use('/user', userControllers);
app.use('/', searchControllers);
app.use('/admin', adminControllers);


app.listen(3000, () => {
	console.log('Site running on port 3000')
});