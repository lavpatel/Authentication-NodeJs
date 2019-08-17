
exports.requireSignin = (req,res,next) => {
    if(!req.cookies.id){  
       res.redirect('/login');
    }else{
        next();
    }
}
exports.renderHome = (req,res) => {
    console.log(req.cookies.id);
    res.render('home');
}