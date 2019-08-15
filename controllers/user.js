var Model= require('../model/user');


exports.signup = function(req, res){
    Model.create(req.body.user,function(err,newuser){
      if(!err){
        console.log(req.body.user);
        console.log('Successful');
        res.redirect('/login');
      }else{
        console.log(err);
      }
    });
  }

exports.signin = function(req,res){
    console.log(req.body);
    
    Model.findOne({username:req.body.username,password:req.body.password},function(err,user){
        if(err){
            res.send('Password is incorrect')
        }else{
            res.cookie('t','mynameiskhan')
            res.redirect('/')
        }
    })
}

exports.signout = (req,res) =>{
    res.clearCookie('t')
    res.redirect('/login')
}