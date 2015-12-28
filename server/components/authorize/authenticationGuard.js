module.exports = function(req, res, next){
  console.log('Checking auth...', req.user);
  if(!req.user){
    res.status(403).json({
      error:"Missing Authentication"
    });
  } else {
    next();
  }
}
