
var Model= require('../model/user');


exports.signup = function(req, res){
  Model.findOne({username:req.body.user.username},function(err,user){    
    console.log(req.body.user.password);
    console.log(req.body.confirmPass);
    if(user === null){
      if(req.body.user.password == req.body.confirmPass){  
        Model.create(req.body.user,function(err,newuser){
          if(!err){
            console.log('Successful');
            res.redirect('/login');
          }else{
            console.log(err);
          }
        })
      }else{
        var popup = {confPass:true}
        res.render('signup',{popup:popup});
        console.log("Password do not match");
      }
    }else{
      console.log("Already have an account. Please go to login page");
      var newuser = req.body.user;
      console.log(newuser);
    
      var popup = {duplicateUser:true}
      res.render('signup',{popup:popup,newuser:newuser});
    }
  });
}

exports.signin = function(req,res){
    console.log(req.body);

    Model.findOne({username:req.body.username},function(err,user){
        if(user == null){          
          console.log('No Such User');
          var popup1 = {incorrectuser:true}
          res.render('login',{popup1:popup1});
        }else{
          if(user.authenticate(req.body.password)){
            res.cookie('id',user._id, { expires: new Date(Date.now() + 1800000), httpOnly: true });
            res.cookie('firstname',user.firstname, { expires: new Date(Date.now() + 1800000), httpOnly: true });
            res.redirect('/');
          }else{
            console.log('Incorrect Password');
            var popup1 = {incorrectpassword:true}
            res.render('login',{popup1:popup1});
          }
        }
    })
}

exports.signout = function(req,res){
  res.clearCookie("id");
  res.clearCookie("firstname");
  res.redirect('/login');
}
