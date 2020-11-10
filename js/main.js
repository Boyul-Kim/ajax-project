var addButton = document.querySelector('.fas');
function addPlayer() {
  //add code here to add player when plus button is pressed
}

var dataView = document.querySelectorAll('[data-view]');
var $form = document.querySelector('form');
var $homepageSearch = document.querySelector('.homepage-form-search');
var $header = document.querySelector('.header-profile-list');
var $playerName = document.querySelector('.playerName');
$form.addEventListener('submit', function(e) {
  e.preventDefault();
  ballDontLie($homepageSearch.value);
  dataView[0].classList.add('hidden');
  dataView[1].classList.remove('hidden');
  $header.classList.remove('hidden');
  if($playerName.textContent === 'Player Name') {
    $playerName.textContent = 'Player not found. Please try again.'
  }
});
