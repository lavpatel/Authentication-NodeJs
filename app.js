var express = require('express');
var app = express();
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser');

app.use(cookieParser());
var auth = require('./controllers/user');
var {requireSignin ,renderHome, create, showSingleBlog, deletePost, updateBlog,updateBlogget} = require('./controllers/blog')

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
    var popup1 = {incorrectuser:false,incorrectpassword:false}
    res.render('login',{popup1:popup1});   
})

app.get('/create', function(req,res){
    res.render('create');
})

app.get("/blog/:id",showSingleBlog);

app.get('/blog/:id/update',updateBlogget);
app.post('/blog/:id/update',updateBlog);


app.post('/signup', auth.signup);
app.post('/login', auth.signin);
app.post('/signout',auth.signout);
app.post('/create',create);
app.post('/blog/:id/delete',deletePost)


app.listen('3000', function(){
    console.log('Successful');
})
