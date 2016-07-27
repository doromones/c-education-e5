"use strict";

var images = [
  'https://goo.gl/qj0ksu',
  'https://goo.gl/Uz5j6c',
  'https://goo.gl/7F1Fx2',
  'https://vermilion1.github.io/presentations/grunt/images/grunt-logo.png',
  'https://goo.gl/L11FEv',
  'https://goo.gl/YkorhO'
];
var $rows, $cols, $setField, $curScore, $bestScore, $startNewGame, $table;

window.addEventListener('load', function () {
  $rows = document.getElementById('rows');
  $cols = document.getElementById('cols');
  $setField = document.getElementById('setField');
  $curScore = document.getElementById('curScore');
  $bestScore = document.getElementById('bestScore');
  $startNewGame = document.getElementById('startNewGame');
  $table = document.getElementById('table');

  build_fields();
});

function build_fields() {
  var rows = checkNumberAndGteZero($rows.value);
  var columns = checkNumberAndGteZero($cols.value);
  var total_fields = rows * columns;
  if (total_fields % 2 !== 0) {
    throw new Error('Total fields must be an even')
  }

  $table.innerHTML= '';
  for (var i = 0; i < rows; i++) {
    var $tr = document.createElement('tr');
    for (var j = 0; j < columns; j++) {
      var $td = document.createElement('tr');
      $tr.appendChild($td)
    }
    $table.appendChild($tr);
  }
}

function checkNumberAndGteZero(value) {
  value = Number(value);
  if (isNaN(value) || value <= 0) {
    throw new Error(value + ' must be int and gte zero')
  }
  return value;
}