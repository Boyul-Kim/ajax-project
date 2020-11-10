/* exported data */
var xml = null;
function ballProjections() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://cors-anywhere.herokuapp.com/https://www.fantasybasketballnerd.com/service/draft-projections');
  xhr.responseType = 'document';
  xhr.addEventListener('load', function () {
    console.log(xhr.status);
    console.log(xhr.response);
    xml = xhr.response;
    console.log('xml', xml);
    var jsonString = JSON.stringify(xmlToJson(xml));
    console.log('to JSON', JSON.parse(jsonString));
  });
  xhr.send();
}
//ballProjections();
var $playerName = document.querySelector('.playerName');
function ballDontLie(player) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://www.balldontlie.io/api/v1/players?search=' + player);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    if(xhr.status === 200) {
      var firstLast = player.split(' ');
      if ((firstLast[0].toLowerCase() === xhr.response.data[0].first_name.toLowerCase()) && (firstLast[1].toLowerCase() === xhr.response.data[0].last_name.toLowerCase())) {
        console.log('match');
        $playerName.textContent = xhr.response.data[0].first_name + ' ' + xhr.response.data[0].last_name
      }else {
        $playerName.textContent = 'Player Name';
      }

    }

  });
  xhr.send();
}
