var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });


router.get('/', function(req, res, next) {
  var array = fs.readFileSync('./files/test.txt').toString().split("\n");
  var line = array[5];
  var words = line.split(" ");
  var type = words[1].toLowerCase();
  var nameId = words[0].toLowerCase();
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
  } else if (type === "file") {
    function endsWith(str, suffix) {
        return str.indexOf(suffix, str.length - suffix.length) !== -1;
    }
    var type = 'file';
    var fileLimit = words[2];
    if (endsWith(fileLimit, 'GB')) {
      var limitArray = fileLimit.split("GB");
      var limitInGB = limitArray[0];

      // Convert limit in gb to limit in bytes
      var limitInBytes = limitInGB * 1024 * 1024 * 1024;
    }

  } else if (type === "text") {
    var type = 'text';
    var maxCharacters = words[2];
  }

  res.render('index', {
    nameId,
    words,
    type,
    maxNumber,
    minRange,
    maxRange,
    selectOptions,
    checkboxTrue,
    checkboxFalse,
    limitInBytes,
    fileLimit,
    maxCharacters
  });
});



module.exports = router;
