var express = require('express');
var app = express();
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser');

app.use(cookieParser());
var auth = require('./controllers/user');
var {requireSignin ,renderHome} = require('./controllers/blog')

app.set('view engine', 'ejs');
app.use('/views', express.static('views'))

app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/authentication',{ useNewUrlParser: true }).then(() => {console.log('Database Connected')});

app.get('/',requireSignin,renderHome);

app.get('/signup', function(req,res){
    var popup = {show:false}
    res.render('signup',{popup:popup});   
})

app.get('/login', function(req,res){
    res.render('login');   
})

app.post('/signup', auth.signup);
app.post('/login', auth.signin);
app.post('/signout',auth.signout);


app.listen('3000', function(){
    console.log('Successful');
})
