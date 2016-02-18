var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

require('dotenv').load();
// console.log(process.env.NAME);
// console.log(process.env.NAME + " " + process.env.A + " " + process.env.B);

var request = require('request');
request('mongodb://localhost/products_api', function(err, response, body){
  if (err) {
    console.log(err);
    console.log(body);
    throw err;
  }
});

// res.json(json(parse().body));


app.use(express.static('./client'));

app.set('views', __dirname + '/client/views');
app.set('view engine', 'ejs');

// mongoose.connect('mongodb://localhost/products_api');
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/products_api' );

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// var indexRouter = require('/views/index.html');

var indexRouter = require('./server/routes/index');
var productsRouter = require('./server/routes/api/products');

app.get('/inventory', function(req, res){
  res.render('views/inventory');
});

app.use('/inventory', productsRouter);



app.use('/', indexRouter);
app.use('/api/products', productsRouter);

var port = 8080;
app.listen(port, function(){
  console.log("je t'écoute..." + port);
});
