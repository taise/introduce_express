
/*
 * GET users listing.
 */

var db = require('mongoose');
    db.connect('mongodb://localhost/helloWold');

var schema = new db.Schema({
  id    : { type: String }
 ,name  : { type: String }
 ,age   : { type: Number }
});

var User = db.model('User', schema);

exports.create = function(req, res){
  User.create({
    id    : req.param('id')
   ,name  : req.param('name')
   ,age   : req.param('age')
  }, function(err) {
    res.redirect("/users")
  });
};

exports.list = function(req, res){
  User.find({}, function(err, users) {
    res.render('users', {
      users: users
    });
  })
};
