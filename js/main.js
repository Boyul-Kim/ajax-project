var addButton = document.querySelector('.fa-plus');
var dataView = document.querySelectorAll('[data-view]');
var $homepageForm = document.querySelector('.homepageForm');
var $homepageSearch = document.querySelector('.homepage-form-search');
var $header = document.querySelector('.header-profile-list');
var $playerName = document.querySelector('.playerName');
var $position = document.querySelector('.position');
var $tableDraftListBody = document.querySelector('.table-draft-list-body');

console.log(dataView);
//when user enters player name in search bar, then page will change to profile view
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




//for dropdown menu
var $option = document.querySelector('.topPlayerForm');
$option.addEventListener('click', function(e) {
  console.log(e.target.value);
});

//add player to local storage
function addPlayer() {

  addButton.classList.add('red-color');
  var positionCut = $position.textContent.split(' ');
  //console.log(positionCut[1]);
  data.profile.name = $playerName.textContent;
  data.profile.position = positionCut[1];
  data.entries.push(data.profile);

  // var $trAdd = document.createElement('tr');

  // var $tdAddName = document.createElement('td');
  // $tdAddName.textContent = $playerName.textContent;
  // $trAdd.appendChild($tdAddName);

  // var $tdAddPosition = document.createElement('td');
  // $tdAddPosition.textContent = positionCut[1];
  // $trAdd.appendChild($tdAddPosition);

  // var removeButton = document.createElement('button')
  // removeButton.textContent = 'Remove';
  // $trAdd.appendChild(removeButton);

  // $tableDraftListBody.appendChild($trAdd);
}
addButton.addEventListener('click', addPlayer);
