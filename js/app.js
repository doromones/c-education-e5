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
var selectedCells = [];

window.addEventListener('load', function () {
  setVars();
  init();
});

function init() {
  build_table();
  fill_table();
  setTimeout(hideAllImg, 2000);
}

function hideAllImg(){
  getAllTd().map(function(el){
    return el.getElementsByTagName('img')[0]
  }).forEach(function(img){
    img.classList.add('hide');
  })
}

function setVars(){
  $rows = document.getElementById('rows');
  $cols = document.getElementById('cols');
  $setField = document.getElementById('setField');
  $curScore = document.getElementById('curScore');
  $bestScore = document.getElementById('bestScore');
  $startNewGame = document.getElementById('startNewGame');
  $table = document.getElementById('table');
}

function fill_table() {
  var tds = getAllTd();
  while (true) {
    if (tds.length === 0) {break;}
    var img_url = images[getRandomInt(0, images.length -1)];
    setImageToCol(tds.getRandomEl(), img_url);
    setImageToCol(tds.getRandomEl(), img_url);
  }
}

function setImageToCol($cell, img_url){
  var $img = document.createElement('img');
  $img.src = img_url;
  $cell.appendChild($img);
}

function getAllTd(){
  var rows = $table.rows;
  var td = [];
  for (var i=0; i < rows.length; i++) {
    var cells = rows[i].cells;
    for (var j=0; j < cells.length; j++) {
      td.push(cells[j]);
    }
  }
  return td;
}

function build_table() {
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
      var $td = document.createElement('td');
      $td.onclick = clickEvent;
      $tr.appendChild($td)
    }
    $table.appendChild($tr);
  }
}

function clickEvent(e){
  var $td = e.currentTarget;
  var $img = $td.children[0];
  if (selectedCells.length === 2){
    var first = selectedCells[0];
    var second = selectedCells[1];
    if (first.src === second.src) {
      alert('насчитываю бонусы');
    } else {
      first.classList.add('hide');
      second.classList.add('hide');
    }
    selectedCells = []
  } else {
    $img.classList.remove('hide');
    selectedCells.push($img);
  }
}

function checkNumberAndGteZero(value) {
  value = Number(value);
  if (isNaN(value) || value <= 0) {
    throw new Error(value + ' must be int and gte zero')
  }
  return value;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

Array.prototype.getRandomEl = function(){
  if (this.length === 0) return null;
  var index = getRandomInt(0, this.length -1);
  var el = this[index];
  this.splice(index, 1);
  return el;
};
