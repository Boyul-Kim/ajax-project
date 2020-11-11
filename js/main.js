var addButton = document.querySelector('.fa-plus');
var dataView = document.querySelectorAll('[data-view]');
var $homepageForm = document.querySelector('.homepageForm');
var $homepageSearch = document.querySelector('.homepage-form-search');
var $header = document.querySelector('.header-profile-list');
var $playerName = document.querySelector('.playerName');
var $position = document.querySelector('.position');
var $tableDraftListBody = document.querySelector('.table-draft-list-body');

console.log(dataView);
$homepageForm.addEventListener('submit', function(e) {
  e.preventDefault();
  ballDontLie($homepageSearch.value);
  dataView[0].classList.add('hidden');
  dataView[1].classList.remove('hidden');
  $header.classList.remove('hidden');
  if($playerName.textContent === 'Player Name') {
    $playerName.textContent = 'Player not found. Please try again.'
  }
});

var $option = document.querySelector('.topPlayerForm');
$option.addEventListener('click', function(e) {
  console.log(e.target.value);
});

function addPlayer() {
  //console.log($playerName.textContent);
  // console.log($position.textContent);
  var positionCut = $position.textContent.split(' ');
  //console.log(positionCut[1]);

  var $trAdd = document.createElement('tr');

  var $tdAddName = document.createElement('td');
  $tdAddName.textContent = $playerName.textContent;
  $trAdd.appendChild($tdAddName);

  var $tdAddPosition = document.createElement('td');
  $tdAddPosition.textContent = positionCut[1];
  $trAdd.appendChild($tdAddPosition);

  var removeButton = document.createElement('button')
  removeButton.textContent = 'Remove';
  $trAdd.appendChild(removeButton);

  $tableDraftListBody.appendChild($trAdd);
}
addButton.addEventListener('click', addPlayer);
