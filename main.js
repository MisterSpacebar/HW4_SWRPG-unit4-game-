//-------------dice------------
function coinFlip(){
    var coin = Math.floor(Math.random()*6)+1;
    if(coin>3){
        return "heads";
    } else {
        return "tails";
    }
}
function d4(){
    var roll4 = Math.floor(Math.random()*4)+1;
    return roll4;
}
function d6(){
    var roll6 = Math.floor(Math.random()*6)+1;
    return roll6;
}
function d8(){
    var roll8 = Math.floor(Math.random()*8)+1;
    return roll8;
}
function d10(){
    var roll10 = Math.floor(Math.random()*10)+1;
    return roll10;
}
function d12(){
    var roll12 = Math.floor(Math.random()*12)+1;
    return roll12;
}
function d20(){
    var roll20 = Math.floor(Math.random()*20)+1;
    return roll20;
}
function RNG(upperBound){
    var randomNumber = Math.floor(Math.random()*upperBound);
    return randomNumber;
}

//-----------characters------------
var wizard = {
    HP: 40,
    AC: 12,
    AB: 20,
    cAB: 20,
    XP: 0,
    ATK: function(){
        return d4();
    },
    cATK: function(){
        return d4();
    }
};
var fighter = {
    HP: 70,
    AC: 17,
    AB: 4,
    cAB: 4,
    XP: 0,
    ATK: function(){
        return d8();
    },
    cATK: function(){
        return d8();
    },
};
var ranger = {
    HP: 60,
    AC: 15,
    AB: 3,
    cAB: 7,
    XP: 0,
    ATK: function(){
        return d6()+1
    },
    cATK: function(){
        return d6();
    },
};
var paladin = {
    HP: 90,
    AC: 13,
    AB: 3,
    cAB: 0,
    XP: 0,
    ATK: function(){
        return d12();
    },
    cATK: function(){
        return d10();
    },
};

//-------------combat---------------
function combatCheck(attackBonus,armorClass,damage){
    var attackRoll = d20();

    if(attackRoll==20){ //--- critical hit
        var firstDamage = damage;
        var criticalConfirm = d20();
        console.log("You've hit a critical!");

        if((criticalConfirm+attackBonus) >= armorClass){ //--- critical confirm
            console.log("You did " + (firstDamage+damage) + " damage!");
            $("#combatLogTop").text("You've hit a critical for "+(firstDamage+damage)+" damage!");
            return (firstDamage+damage);
        } else {
            console.log("You did not confirm critical and did "+firstDamage+" damage");
            $("#combatLogTop").text("You've hit for target for "+firstDamage+" damage!");
            return firstDamage;
        }
    } else if((attackRoll+attackBonus) >= armorClass){ //--- return damage
        console.log("You hit your target for " + damage + " damage!");
        $("#combatLogTop").text("You've hit for target for "+damage+" damage!");
        return damage;
    } else {
        console.log("You've failed your attack roll.");
        $("#combatLogTop").text("You've failed for combat roll");
        return 0;
    }
}
function counterAttack(counterBonus,armorClass,damage){ //--- return damage
    var attackRoll = d20();

    if(attackRoll==20){
        var firstDamage = damage;
        var criticalConfirm = d20();
        console.log("Enemy has rolled a critical!");

        if((criticalConfirm+counterBonus)>=armorClass){ //--- critical confirm
            console.log("The enemy confirmed critical and dealt you "+(firstDamage+damage)+" damage!");
            $("#combatLogBottom").text("The enemy confirmed critical and dealt you "+(firstDamage+damage)+" damage!")
            return (firstDamage+damage);
        } else {
            console.log("The enemy did not confirm the critical hit and did "+firstDamage+" damage");
            $("#combatLogBottom").text("The enemy hits you for "+firstDamage+" damage!");
            return firstDamage;
        }
    } else if((attackRoll+counterBonus)>=armorClass){
        console.log("The enemy hits you for "+damage+" damage!");
        $("#combatLogBottom").text("The enemy hits you for "+damage+" damage!");
        return damage;
    } else {
        console.log("The enemy failed its attack roll!");
        $("#combatLogBottom").text("The enemy failed their attack roll");
        return 0;
    }
}

//-----------------make characters-------------------
var wizChar = $("<img>").attr({
    "class":"player-characters",
    "id":"wizard",
    "src":"assets/characters/alert_2.png",
});
var fightChar = $("<img>").attr({
    "class":"player-characters",
    "id":"fighter",
    "src":"assets/characters/alert_2.png",
});
var rangChar = $("<img>").attr({
    "class":"player-characters",
    "id":"ranger",
    "src":"assets/characters/alert_2.png",
});
var palaChar = $("<img>").attr({
    "class":"player-characters",
    "id":"paladin",
    "src":"assets/characters/alert_2.png",
});
var characterFrame = $("<figure>").attr({
    "class":"character",
});
var mainCharacter = $("<figcaption>").attr({
    "id":"main_character",
});
var enemyCharacter = $("<figcaption>").attr({
    "id":"enemy_character",
});

//--------------------set the game----------------------
window.onload = function startGame(){
    gameReset();
    $("#selectionScreen").append(wizChar);
    $("#selectionScreen").append(fightChar);
    $("#selectionScreen").append(rangChar);
    $("#selectionScreen").append(palaChar);

    $("#combatLogTop").text("Select a character");
}
if(wizard.HP<1){
    $("#hideStuff").append(wizChar);
}
if(fighter.HP<1){
    $("#hideStuff").append(fightChar);
}
if(ranger.HP<1){
    $("#hideStuff").append(rangChar);
}
if(paladin.HP<1){
    $("#hideStuff").append(palaChar);
}

//-------------------character data---------------------
var isMCSelected = false;
//---check main character---
var isMCWizard = false;
var isMCFighter = false;
var isMCRanger = false;
var isMCPaladin = false;
//---confirm enemy characters---
var isEnemyWizard = true;
var isEnemyFighter = true;
var isEnemyRanger = true;
var isEnemyPaladin = true;
//---check active enemy---
var isWizardActiveEnemy = false;
var isFighterActiveEnemy = false;
var isRangerActiveEnemy = false;
var isPaladinActiveEnemy = false;
//---character selection---
$(wizChar).on("click",function(){ //---wizard
    if(isMCSelected==false){
        $("#MC").prepend(wizChar);
        $("#combatLogTop").text("Selected Wizard! Get ready for combat");
        $("#mainCharacter").text("HP:"+wizard.HP+" XP:"+wizard.XP);
        isMCSelected = true;
        isMCWizard = true;
        isEnemyWizard = false;
    } else {
        $("#combatLogBottom").text("A character is already selected!");
    }
});
$(fightChar).on("click",function(){ //---fighter
    if(isMCSelected==false){
        $("#MC").prepend(fightChar);
        $("#combatLogTop").text("Selected Fighter! Get ready for combat");
        $("#mainCharacter").text("HP:"+fighter.HP+" XP:"+fighter.XP);
        isMCSelected = true;
        isMCFighter = true;
        isEnemyFighter = false;
    } else {
        $("#combatLogBottom").text("A character is already selected!");
    }
});
$(rangChar).on("click",function(){ //---ranger
    if(isMCSelected==false){
        $("#MC").prepend(rangChar);
        $("#combatLogTop").text("Selected Ranger! Get ready for combat");
        $("#mainCharacter").text("HP:"+ranger.HP+" XP:"+ranger.XP);
        isMCSelected = true;
        isMCRanger = true;
        isEnemyRanger = false;
    } else {
        $("#combatLogBottom").text("A character is already selected!");
    }
});
$(palaChar).on("click",function(){ //---paladin
    if(isMCSelected==false){
        $("#MC").prepend(palaChar);
        $("#combatLogTop").text("Selected Paladin! Get ready for combat");
        $("#mainCharacter").text("HP:"+paladin.HP+" XP:"+paladin.XP);
        isMCSelected = true;
        isMCPaladin = true;
        isEnemyPaladin = false;
    } else {
        $("#combatLogBottom").text("A character is already selected!");
    }
});
//--------------------select enemies-----------------------
var enemyArray = [isMCWizard,isMCFighter,isMCRanger,isMCPaladin];
var activeEnemy = [isPaladinActiveEnemy,isFighterActiveEnemy,isRangerActiveEnemy,isWizardActiveEnemy];


function selectEnemy(){
    var enemyArrayArray = enemyArray;
    for(var i=0; i<enemyArrayArray.length; i++){
        if(enemyArrayArray[i]==true){ //---pops out player character
            enemyArrayArray = enemyArrayArray.splice(pos,i);
        }
    }

    var enemyMan = enemyArrayArray[RNG(enemyArrayArray.length)];
    
}

//--------------------reset the game-----------------------
function resetGame(){
    var confirmReset = confirm("Reset the game?");
    if(confirmReset==true){
        gameReset();
        newGame();
    }
}
function newGame(){
    isMCSelected = false;

    $("#selectionScreen").append(wizChar);
    $("#selectionScreen").append(fightChar);
    $("#selectionScreen").append(rangChar);
    $("#selectionScreen").append(palaChar);

    $("#combatLogTop").text("Select a character");
    $("#combatLogBottom").text("");
    $("#mainCharacter").text("");
}
function gameReset(){
    wizard.HP = 40;
    wizard.XP = 0;

    fighter.HP = 70;
    fighter.XP = 0;

    ranger.HP = 60;
    ranger.XP = 0;

    paladin.HP = 90;
    paladin.XP = 0;

    isMCSelected = false;

    isMCWizard = false;
    isMCFighter = false;
    isMCRanger = false;
    isMCPaladin = false;

    isEnemyFighter = true;
    isEnemyPaladin = true;
    isEnemyRanger = true;
    isEnemyWizard = true;
    
    isWizardActiveEnemy = false;
    isFighterActiveEnemy = false;
    isRangerActiveEnemy = false;
    isPaladinActiveEnemy = false;
}
$("#resetButton").on("click",function(){
    resetGame();
});