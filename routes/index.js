var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });


router.get('/', function(req, res, next) {
  var array = fs.readFileSync('./files/test.txt').toString().split("\n");
  var line = array[4];
  var words = line.split(" ");
  var type = words[1].toLowerCase();
  var max = 0;

  function removeCommaFromArray(array) {
    var smallArray = array.length;
    for(var i = 0; i < smallArray; i++) {
      array[i] =  array[i].replace(/,/g, '');
    }

  }

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
    removeCommaFromArray(selectOptions);
  } else if (type === "checkbox") {
    var type = 'checkbox';
    var answers = words.splice(2);
    removeCommaFromArray(answers);
    var checkboxTrue = answers[0];
    var checkboxFalse = answers[1];
  }

  res.render('index', {words, type, maxNumber, minRange, maxRange, selectOptions, checkboxTrue, checkboxFalse});
});



module.exports = router;
