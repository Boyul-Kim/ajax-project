var addButton = document.querySelector('.fa-plus');
var dataView = document.querySelectorAll('[data-view]');
var $homepageForm = document.querySelector('.homepageForm');
var $homepageSearch = document.querySelector('.homepage-form-search');
var $header = document.querySelector('.header-profile-list');
var $playerName = document.querySelector('.playerName');
var $position = document.querySelector('.position');
var $tableDraftListBody = document.querySelector('.table-draft-list-body');
var $homeIcon = document.querySelector('.fa-home');
var $chartIcon = document.querySelector('.fa-chart-line');
var $listIcon = document.querySelector('.fa-list');
var $depthButton = document.querySelector('.homepage-form-search-button');
var $draftButton = document.querySelector('.homepage-form-search-list');

function viewSwap(index) {
  for(var i = 0; i<=dataView.length-1; i++) {
    if(i === index) {
      dataView[i].classList.remove('hidden');
    }else {
      dataView[i].classList.add('hidden');
    }
  }
}

$homeIcon.addEventListener('click', function()  {
  viewSwap(0);
  $header.classList.add('hidden');
});

$chartIcon.addEventListener('click', function() {
  viewSwap(2);
  $header.classList.remove('hidden');
})

$depthButton.addEventListener('click', function () {
  viewSwap(2);
  $header.classList.remove('hidden');
})

$draftButton.addEventListener('click', function () {
  viewSwap(3);
  $header.classList.remove('hidden');
  //draftList();
});

$listIcon.addEventListener('click', function ()  {
  viewSwap(3);
  $header.classList.remove('hidden');
  //draftList();
});

//when user enters player name in search bar, then page will change to profile view
$homepageForm.addEventListener('submit', function(e) {
  $tableHistoricalBody.innerHTML = '';
  $tableProjectionBodyRow.innerHTML = '';
  e.preventDefault();
  ballDontLie($homepageSearch.value);
  storage = [];
  dataView[0].classList.add('hidden');
  dataView[1].classList.remove('hidden');
  $header.classList.remove('hidden');
  if($playerName.textContent === 'Player Name') {
    $playerName.textContent = 'Player not found. Please try again.'
  }
  $homepageSearch.value = '';
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
  data.profile.name = $playerName.textContent;
  data.profile.position = positionCut[1];
  data.entries.push(data.profile);
  draftList();
}
addButton.addEventListener('click', addPlayer);

function draftList() {
  $tableDraftListBody.innerHTML = '';
  for(var i = 0; i<=data.entries.length-1; i++) {
    var $trAdd = document.createElement('tr');
    var $tdAddName = document.createElement('td');
    $tdAddName.textContent = data.entries[i].name;
    $trAdd.appendChild($tdAddName);

    var $tdAddPosition = document.createElement('td');
    $tdAddPosition.textContent = data.entries[i].position;
    $trAdd.appendChild($tdAddPosition);

    var removeButton = document.createElement('button')
    removeButton.textContent = 'Remove';
    $trAdd.appendChild(removeButton);

    $tableDraftListBody.appendChild($trAdd);
  }

}
