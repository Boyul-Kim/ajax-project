var addButton = document.querySelector('.fa-plus');
var dataView = document.querySelectorAll('[data-view]');
var dataButton = document.querySelectorAll('[data-button]');
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
var $rankButton = document.querySelector('.homepage-form-search-rank');
var $rankIcon = document.querySelector('.fa-sort-numeric-down');


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
  addButton.classList.remove('red-color');
});

function headerShow(index) {
  viewSwap(index);
  $header.classList.remove('hidden');
  addButton.classList.remove('red-color');
}

$chartIcon.addEventListener('click', function() {
  headerShow(2);
})

$depthButton.addEventListener('click', function (e) {
  headerShow(Number(e.target.value));
})

$draftButton.addEventListener('click', function () {
  headerShow(3);
  draftList();
});

$listIcon.addEventListener('click', function ()  {
  headerShow(3);
  draftList();
});

$rankButton.addEventListener('click', function () {
  headerShow(4);
});

$rankIcon.addEventListener('click', function () {
  headerShow(4);
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
  var playerProfile = [];
  playerProfile.push(data.profile.name);
  playerProfile.push(data.profile.position);
  data.entries.push(playerProfile);
  draftList();
}
addButton.addEventListener('click', addPlayer);

function draftList() {
  $tableDraftListBody.innerHTML = '';
  for(var i = 0; i<=data.entries.length-1; i++) {
    var $trAdd = document.createElement('tr');
    var $tdAddName = document.createElement('td');
    $tdAddName.textContent = data.entries[i][0];
    $trAdd.appendChild($tdAddName);

    var $tdAddPosition = document.createElement('td');
    $tdAddPosition.textContent = data.entries[i][1];
    $trAdd.appendChild($tdAddPosition);

    var removeButton = document.createElement('button')
    removeButton.textContent = 'Remove';
    $trAdd.appendChild(removeButton);

    $tableDraftListBody.appendChild($trAdd);
  }

}
