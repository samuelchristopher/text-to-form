var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });


router.get('/', function(req, res, next) {
  var array = fs.readFileSync('./files/test.txt').toString().split("\n");
  var line = array[3];
  var words = line.split(" ");
  var type = words[1].toLowerCase();
  var max = 0;
  if (type === "float") {
    var type = 'number';
    var maxNumber = words[2];
  } else if (type === "slider") {
    var type = 'range';
    var minRange = words[2];
    var maxRange = words[4];
  } else if (type === "drop-down") {
    var type = 'select';
    var selectOptions = words.splice(2);
    var optionsLenght = selectOptions.length;
    for(var i = 0; i < optionsLenght; i++) {
      selectOptions[i] =  selectOptions[i].replace(/,/g, '');
    }
  }

  res.render('index', {words, type, maxNumber, minRange, maxRange, selectOptions});
});



module.exports = router;
