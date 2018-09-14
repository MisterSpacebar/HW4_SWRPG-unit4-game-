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

//-----------characters------------
var wizard = {
    HP: 20,
    AC: 12,
    AB: 20,
    ATK: function(){
        return d4()+d4()-1;
    },
    cATK: function(){
        return d4()+d4()-1;
    }
};
var fighter = {
    HP: 35,
    AC: 17,
    AB: 3,
    ATK: function(){
        return d8();
    },
    cATK: function(){
        return d8();
    },
};
var ranger = {
    HP: 30,
    AC: 15,
    AB: 2,
    ATK: function(){
        return d6()+1
    },
    cATK: function(){
        return d6();
    },
};
var paladin = {
    HP: 40,
    AC: 13,
    AB: 3,
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
    if(attackRoll==20){
        var firstDamage = damage;
        var criticalConfirm = d20();
        console.log("You've hit a critical!");
        if((criticalConfirm+attackBonus) >= armorClass){
            console.log("You did " + (firstDamage+damage) + " damage!");
            return (firstDamage+damage);
        } else {
            console.log("You did not confirm critical");
            return firstDamage;
        }
    } else if((attackRoll+attackBonus) >= armorClass){
        console.log("You hit your target for " + damage + " damage!");
        return damage;
    } else {
        console.log("You've failed your attack roll.");
        return 0;
    }
}
