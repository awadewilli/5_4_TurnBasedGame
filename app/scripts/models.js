var players = [{name:playerOne, type:rock, health:300, attack:25, speed:50},
              {name:playerTwo, type:paper, health:200, attack:15, speed:200},
              {name:playerThree, type:scissors, health:100, attack:50, speed:100}
              ];
var enemies = [ {name:enemyOne, type:rock, health:300, attack:25, speed:50},
                {name:enemyTwo, type:paper, health:200, attack:15, speed:200},
                {name:enemyThree, type:scissors, health:100, attack:50, speed:100}
              ];
var chosenPlayerNum;

function Player(num){
  this.prototype = players[num];
}

var newPlayer = new Player(chosenPlayerNum);
