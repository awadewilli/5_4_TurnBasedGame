console.log("Hello World!");
var $ = require('jquery');


// ########################################
// Models
// ########################################
function Character(config){
  config = config || {};
  this.role = config.role || 'ninja';
  this.health = config.health || 100;
  this.speed = config.speed || 50;
  this.strength = config.strength || 10;
}
Character.prototype.attack = function(enemy){
  enemy.health = enemy.health - this.strength;
  $(document).trigger('health:changed');
};

function Enemy(config){
  this.role = config.role || 'ninja';
  this.health = config.health || 100;
  this.speed = config.speed || 50;
  this.strength = config.strength || 10;

}
Enemy.prototype = new Character();


// ########################################
// Global vars
// ########################################

var classes = [{role:'viking', health:250, strength:25, speed:50},
              {role:'pirate', health:200, strength:15, speed:200},
              {role:'ninja', health:100, strength:50, speed:100}
              ];
var selectedChar;
var selectedEnemy;
var myTurn = true;
var charFullHealth;
var enemyFullHealth;
var swordMP3 = new Sound("images/swords.wav");
////////////////////////////////////////////////////////////////////////////
//This code allows the user to select a Character and randomly generates an
//enemy character.
////////////////////////////////////////////////////////////////////////////
$('.selectButton').click(function(){

  // Get the selected character
  var CharNum = this.value;
  var selectCharacter = classes[CharNum];
  console.log(classes[CharNum]);
  selectedChar = new Character(selectCharacter);
  charFullHealth = selectedChar.health;


  //Displays the selected character
  if (selectedChar.role === 'ninja'){
    $("#ninja").css('display','inline-block').append( ".player" );
    $("#ninja").css('transform','rotateY(180deg)');
  }
  else if (selectedChar.role === 'pirate') {
    $("#pirate").css('display','inline-block').append( ".player" );
  }
  else{
    $("#viking").css('display','inline-block').append( ".player" );
  }

  // Get a random enemy
  var EnemyNum = Math.floor(Math.random() * 3);
  var selectEnemy = classes[EnemyNum];
  selectedEnemy = new Enemy(selectEnemy);
  enemyFullHealth = selectedEnemy.health;

  //Displays the Enemy
  if (selectedEnemy.role === 'ninja'){
    $("#ninja").clone().appendTo( ".enemy" );
    $(".enemy img").css('display','inline-block');
  }
  else if (selectedEnemy.role === 'pirate') {
    $("#pirate").clone().appendTo( ".enemy" );
    $(".enemy img").css('display','inline-block');
  }
  else{
    $("#viking").clone().appendTo( ".enemy" );
    $(".enemy img").css('display','inline-block');
  }
  console.log(selectedChar);
  console.log(selectedEnemy);

  $('.selectButton').css('display','none');
  $('.player h1').addClass('hide');
});

////////////////////////////////////////////////////////////////////////////
//Makes the chosen Character attack then waits for the enemy to attack
////////////////////////////////////////////////////////////////////////////


$(document).on('attack:enemy', function(event) {
  selectedChar.attack(selectedEnemy);
  swordMP3.play();
  //////////////////////////////////////
  //decrements enemy health bar
  /////////////////////////////////////
  var newHealthPercent = (selectedEnemy.health/enemyFullHealth*100).toString()+'%';
  $('.enemy-health h5').css('width',(newHealthPercent));
});

  function attackSelected(event) {
  selectedEnemy.attack(selectedChar);
  $('.player img').toggleClass('charattack');
  $('.enemy img').toggleClass('enemyattack');
  //////////////////////////////////////
  //decrements enemy health bar
  /////////////////////////////////////
  var newHealthPercent = (selectedChar.health/charFullHealth*100).toString()+'%';
  $('.char-health h5').css('width',(newHealthPercent));
}

$('.attackButton').click(function(e){
// prevents default behavior; default click behavior is to reload the page
  e.preventDefault();

    $(document).trigger('attack:enemy');
    $('.player img').toggleClass('charattack');
    $('.enemy img').removeClass('enemyattack');



    setTimeout(attackSelected,1000);



  console.log("attacker", selectedChar);
  console.log("enemy", selectedEnemy);


  // ########################################
  // determines the winner
  // ########################################
  $(document).on('player:loses', function(){
    $('.player').addClass('overlay-loser');
    $('.enemy').addClass('overlay-winner');
  });
  $(document).on('player:wins', function(){
    $('.player').addClass('overlay-winner');
    $('.enemy').addClass('overlay-loser');
  });
  if(selectedChar.health<=0) {
    $(document).trigger('player:loses');}

  if(selectedEnemy.health<=0) {
    $(document).trigger('player:wins');
  }

});
