/* exported data */
var $tableHistorical = document.querySelector('.table-historical');
var $tableHistoricalBody = document.querySelector('.table-historical-body');
var $playerName = document.querySelector('.playerName');
var $team = document.querySelector('.team');
var $position = document.querySelector('.position');
var $tableProjectionBody = document.querySelector('.table-projections-body');
var $tableProjectionBodyRow = document.querySelector('.table-projections-body-row');
var $draftProjection = document.querySelector('.projection');
var storage = []

var data = {
  profile: {
    name: '',
    position: '',
    depth: '',
  },
  entries: []
}

var previousDataJson = localStorage.getItem('playerData');
if(previousDataJson !== null) {
  data = JSON.parse(previousDataJson);
}

function profileStorage(event) {
  var dataJson =  JSON.stringify(data);
  localStorage.setItem('playerData', dataJson);
}
window.addEventListener('beforeunload', profileStorage);

//used for fantasybasektballnerd api
var xml = null;
var jsonParse = null;
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
    jsonParse = JSON.parse(jsonString)
    console.log('to JSON', jsonParse);
  });
  xhr.send();
}
ballProjections();

function ballProjectionsFindPlayer(player) { //will look through draft projection list and match from profile text content
  var playerDB = jsonParse.FantasyBasketballNerd.Player;
  for (var i = 0; i <= playerDB.length - 1; i++) {
    if(playerDB[i].name['#text'] === player) {
      var queryData = ['Games', 'pts', 'ast', 'reb', 'stl', 'blk', 'ft_pct', 'fg3_pct', 'turnover'];
      console.log('success');
      console.log(playerDB[i]); //player stats
      $draftProjection.textContent = 'Draft Rank: ' + (playerDB.indexOf(playerDB[i]) + 1);
      var games = Number(playerDB[i].Games["#text"]);
      var points = document.createElement('td');
      points.textContent = Math.round(((Number(playerDB[i].PTS["#text"]) / games) + Number.EPSILON) * 100) / 100;
      $tableProjectionBodyRow.appendChild(points);

      var assists = document.createElement('td');
      assists.textContent = Math.round(((Number(playerDB[i].AST["#text"]) / games) + Number.EPSILON) * 100) / 100;
      $tableProjectionBodyRow.appendChild(assists);

      var rebounds = document.createElement('td');
      rebounds.textContent = Math.round(((Number(playerDB[i].REB["#text"]) / games) + Number.EPSILON) * 100) / 100;
      $tableProjectionBodyRow.appendChild(rebounds);

      var steals = document.createElement('td');
      steals.textContent = Math.round(((Number(playerDB[i].STL["#text"]) / games) + Number.EPSILON) * 100) / 100;
      $tableProjectionBodyRow.appendChild(steals);

      var blocks = document.createElement('td');
      blocks.textContent = Math.round(((Number(playerDB[i].BLK["#text"]) / games) + Number.EPSILON) * 100) / 100;
      $tableProjectionBodyRow.appendChild(blocks);

      var freethrow = document.createElement('td');
      freethrow.textContent = Math.round(((Number(playerDB[i].FT["#text"])) + Number.EPSILON) * 100) / 100;
      $tableProjectionBodyRow.appendChild(freethrow);

      var threepoint = document.createElement('td');
      threepoint.textContent = Math.round(((Number(playerDB[i].THREES["#text"]) / games) + Number.EPSILON) * 100) / 100;
      $tableProjectionBodyRow.appendChild(threepoint);

      var turnover = document.createElement('td');
      turnover.textContent = Math.round(((Number(playerDB[i].TO["#text"]) / games) + Number.EPSILON) * 100) / 100;
      $tableProjectionBodyRow.appendChild(turnover);
    }
  }
}



function ballDontLie(player) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://www.balldontlie.io/api/v1/players?search=' + player);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    var storage = [];
    if(xhr.status === 200) {
      $tableHistoricalBody.innerHTML = '';
      $tableProjectionBodyRow.innerHTML = '';
      var firstLast = player.split(' ');
      if ((firstLast[0].toLowerCase() === xhr.response.data[0].first_name.toLowerCase()) && (firstLast[1].toLowerCase() === xhr.response.data[0].last_name.toLowerCase())) {
        var playerID
        playerID = xhr.response.data[0].id;
        $playerName.textContent = xhr.response.data[0].first_name + ' ' + xhr.response.data[0].last_name;
        // data.profile.name = xhr.response.data[0].first_name + ' ' + xhr.response.data[0].last_name;
        // data.profile.position = xhr.response.data[0].position;
        $team.textContent = 'Team: ' + xhr.response.data[0].team.abbreviation;
        $position.textContent = 'Position: ' + xhr.response.data[0].position;
        ballProjectionsFindPlayer($playerName.textContent);
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
    //console.log(xhr.response);
    var queryData = ['season', 'pts', 'ast', 'reb', 'stl', 'blk', 'ft_pct', 'fg3_pct', 'turnover'];
    var $tr = document.createElement('tr');
    $tr.classList.add(queryData[0]);
    for(var i = 0; i<=queryData.length-1; i++) {
      var $td = document.createElement('td');
      $td.textContent = xhr.response.data[0][queryData[i]];
      $td.classList.add(queryData[i]);
      $tr.appendChild($td);
    }
    $tableHistoricalBody.appendChild($tr);


    for(var x = 1; x<=queryData.length-1; x++) {
      var name = '.' + queryData[x];
      var statClass = document.querySelectorAll(name);
      storage.push(statClass);
    }
  });
  xhr.send();
}
