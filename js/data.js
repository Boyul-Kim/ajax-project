/* exported data */
var $tableHistorical = document.querySelector('.table-historical');
var $tableHistoricalBody = document.querySelector('.table-historical-body');
var $playerName = document.querySelector('.playerName');
var $team = document.querySelector('.team');
var $position = document.querySelector('.position');

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

function ballDontLie(player) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://www.balldontlie.io/api/v1/players?search=' + player);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    if(xhr.status === 200) {
      var firstLast = player.split(' ');
      if ((firstLast[0].toLowerCase() === xhr.response.data[0].first_name.toLowerCase()) && (firstLast[1].toLowerCase() === xhr.response.data[0].last_name.toLowerCase())) {
        var playerID
        playerID = xhr.response.data[0].id;
        $playerName.textContent = xhr.response.data[0].first_name + ' ' + xhr.response.data[0].last_name;
        $team.textContent = 'Team: ' + xhr.response.data[0].team.abbreviation;
        $position.textContent = 'Position: ' + xhr.response.data[0].position;
        for(var i = 2015; i<=2020; i++) {
          ballDontLieSeasonAvg(i, playerID);
        }
      }else {
        $playerName.textContent = 'Player Name';
      }

    }

  });
  xhr.send();
}


function ballDontLieSeasonAvg(season, id) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://www.balldontlie.io/api/v1/season_averages?season=' + season + '&player_ids[]=' + id);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    console.log(xhr.response);
    var queryData = ['season', 'pts', 'ast', 'reb', 'stl', 'blk', 'ft_pct', 'fg3_pct', 'turnover'];
    console.log(xhr.response.data[0][queryData[1]]);
    var $tr = document.createElement('tr');
    for(var i = 0; i<=queryData.length-1; i++) {
      var $td = document.createElement('td');
      $td.textContent = xhr.response.data[0][queryData[i]];
      $tr.appendChild($td);
    }
    $tableHistoricalBody.appendChild($tr);

  });
  xhr.send();
}
