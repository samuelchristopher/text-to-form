var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });


router.get('/', function(req, res, next) {
  var array = fs.readFileSync('./files/test.txt').toString().split("\n");
  var line = array[1];
  var words = line.split(" ");
  var type = words[1].toLowerCase();
  var max = 0;
  if (type = 'float') {
    var type = 'number';
    var maximum = words[2];
  }

  res.render('index', {words, type, maximum});
});



module.exports = router;
