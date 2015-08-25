window.document.body.innerHTML = '<div id="app">Combat Simulator</div>'

function randomPosInt(max){
  var min = 1;
  return Math.floor(Math.random() * (max - 0)) + min;
}

var Die = {
  face: 6,
  count: 1,
  roll: function(){
    return randomPosInt(this.face);
  },
  toString: function(){
    return 'd'+this.face;
  }
};

var d2 = $.extend({}, Die, {face: 2});
var d4 = $.extend({}, Die, {face: 4});
var d6 = $.extend({}, Die, {face: 6});
var d8 = $.extend({}, Die, {face: 8});
var d10 = $.extend({}, Die, {face: 10});
var d12 = $.extend({}, Die, {face: 12});
var d20 = $.extend({}, Die, {face: 20});
var d100 = $.extend({}, Die, {face: 100});

var Attack = {
  name: 'Generic Attack',
  die: d6,
  mod: 0,
  count: 1,
  attacks: [],
  desc: function(abilityMod){
    var finalMod = abilityMod || this.mod;
    return this.name + ' (' + this.count + this.die.toString() + '+' + finalMod + ')';
  },
  swing: function(abilityMod){
    var finalMod = abilityMod || this.mod;
    var total = 0;
    for(var i=0; i<this.count; i++){
      total += this.die.roll();
    }
    // console.log('total:', total, 'mod:', this.mod);
    return total + finalMod;
  }
};

var Punch = $.extend({}, Attack, {
  name: 'Punch',
  die: d4,
  mod: 2,
  count: 1,
});

var Scimitar = $.extend({}, Attack, {
  name: 'Scimitar',
  die: d6,
  mod: 2,
  count: 2
});

var Shortbow = $.extend({}, Attack, {
  name: 'Shortbow',
  die: d6,
  mod: 2,
  count: 2
});

var Club = $.extend({}, Attack, {
  name: 'Club',
  die: d10,
  mod: 8,
  count: 3
});

var Character = {
  name: 'Some Monster',
  AC: 0,
  hitDie: d4,
  hitDieCount: 1,
  abilityMod: 0,
  attacks: [Attack],
  attack: function(){
    if(this.attacks.length <= 0){ return; }
    var idx = randomPosInt(this.attacks.length)-1;
    var att = this.attacks[idx];
    // console.log(this.name, 'attacks with', att, '(index:', idx, ')');
    printAttack(att.desc(this.abilityMod), att.swing(this.abilityMod));
  }
}

var Goblin = $.extend({}, Character, {
  name: 'Goblin',
  AC: 13,
  hitDie: d8,
  abilityMod: 2,
  attacks: [Scimitar, Shortbow]
});

var Ogre = $.extend({}, Character, {
  name: 'Ogre',
  AC: 11,
  hitDie: d10,
  hitDieCount: 4,
  abilityMod: 6,
  attacks: [Punch, Club, Club]
});

var BigOgre = $.extend({}, Ogre, {
  abilityMod: 10
});

print('<br><b>Attacks</b>');
Character.attack();
Character.attack();

print('<br><b>Goblin Attacks</b>');
Goblin.attack();
Goblin.attack();
Goblin.attack();
Goblin.attack();
Goblin.attack();
Goblin.attack();
Goblin.attack();
Goblin.attack();
Goblin.attack();
Goblin.attack();
Goblin.attack();
Goblin.attack();
Goblin.attack();
Goblin.attack();
Goblin.attack();
Goblin.attack();
Goblin.attack();
Goblin.attack();
Goblin.attack();

print('<br><b>Ogre Attacks</b>');
Ogre.attack();
Ogre.attack();
Ogre.attack();
Ogre.attack();
Ogre.attack();
Ogre.attack();
Ogre.attack();
Ogre.attack();
Ogre.attack();

print('<br><b>Big Ogre Attacks</b>');
BigOgre.attack();
BigOgre.attack();
BigOgre.attack();
BigOgre.attack();
BigOgre.attack();


print('<br>');
print('<b>Die Rolls</b>');
printDie(d2);
printDie(d4);
printDie(d6);
printDie(d8);
printDie(d10);
printDie(d12);
printDie(d20);
printDie(d100);

function printAttack(name, dmg){
  print('<div>' + name + ':' + dmg + '</div>');
}

function printDie(die){
  print('<div>' + die.toString() + ' rolled a:' + die.roll() + '.</div>');
}

function print(msg){
  $('#app').append(msg);
}
