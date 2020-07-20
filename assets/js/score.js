let scoreArea = document.getElementById('score');
let click = document.getElementById('click');

let autoBtn = document.getElementById('auto');
let aCost = document.getElementById('a-cost');

let multiplierBtn = document.getElementById('multiplier');
let mCost = document.getElementById('m-cost');

let bonusBtn = document.getElementById('bonus');
let bCost = document.getElementById('b-cost');

let bonusMultiplier = 200;
let bonusPrice = 1000;
let bonusTime = 30;

let isBonusActive = false;


click.addEventListener('click', increaseScore);
autoBtn.addEventListener('click', buyAuto);
multiplierBtn.addEventListener('click', buyMultiplier);
bonusBtn.addEventListener('click', bonusEnable);

// Initialisation
if (window.localStorage.length === 0) {
    localStorage.setItem('score', '0');
    localStorage.setItem('auto', '0');
    localStorage.setItem('multiplier', '0');
}
refreshDisplay();
setInterval(autoClick, 1000);


/**
 * Updates all the values on the page.
 */
function refreshDisplay() {
    scoreArea.innerHTML = localStorage.getItem('score');
    autoBtn.value = 'Autoclick/sec: ' + localStorage.getItem('auto');
    autoBtn.disabled = isNotAffordable('auto');
    aCost.innerHTML = 'Cost ' + getCost(localStorage.getItem('auto')) + ' point(s)';
    multiplierBtn.value = 'Score multiplier: ' + localStorage.getItem('multiplier');
    multiplierBtn.disabled = isNotAffordable('multiplier');
    mCost.innerHTML = 'Cost ' + getCost(localStorage.getItem('multiplier')) + ' point(s)';
    parseInt(localStorage.getItem('score'), 10) >= bonusPrice ? bonusBtn.disabled = false : bonusBtn.disabled = true;
}


/**
 * Check if an upgrade is not affordable.
 * 
 * @param {*} upgradeName the name of the upgrade
 * 
 * @return {boolean}
 */
function isNotAffordable(upgradeName) {
    let score = parseInt(localStorage.getItem('score'), 10);
    let upgrade = parseInt(localStorage.getItem(upgradeName), 10);
    if (score >= getCost(upgrade)) {
        return false;
    } else {
        return true;
    }
}


/**
 * Calculates the cost of the next upgrade.
 * 
 * @param {number} x the number of upgrade owned
 * 
 * @return {number} the cost of the next upgrade
 */
function getCost(x) {
    return Math.pow(2, parseInt(x, 10));
}


/**
 * Increases the score an amount of time equals to the number of autoclick upgrade.
 */
function autoClick() {
    let auto = localStorage.getItem('auto');
    for (let i = 1; i <= auto; i++) {
        increaseScore();
    }
}


function increaseScore() {
    let score = parseInt(localStorage.getItem('score'), 10);
    let multiplier = parseInt(localStorage.getItem('multiplier'), 10);
    let bonus;
    isBonusActive ? bonus = bonusMultiplier : bonus = 1;
    let gain = 1 * (multiplier + 1) * bonus;
    score = score + gain;
    localStorage.setItem('score', score);
    refreshDisplay();
}



function buyAuto() {

}



function buyMultiplier() {

}


// ===================================================== Bonus button part
function bonusDisp() {
    bCost.innerHTML = "The bonus costs : " + bonusPrice;
  }

function bonusTimeDisp(){
    bonusBtn.value = "Bonus remaining time : "+ bonusTime + " seconds!"
}

function bonusActivator() {
    if (score>=bonusPrice && !isBonusActive){
        bonusBtn.disabled = false;
    } else {
        bonusBtn.disabled = true;
    }
}

function bonusEnable() {
    score -= bonusPrice;
    isBonusActive = true;
    bonusBtn.disabled = true;
    //put here the display function ! 
    //put the value of bonus here ! 
    bonusTimeDisp();
  }
  
function bonusDisable() {
    bonusOn = false;
    bonusTime = 30;
    //should the click value = multiplier?
    bonusDisp();
  }

function bonusTimer() {
    if (isBonusActive) {
      --bonusTime;
      bonusTimeDisp();
      if (bonusTime === 0) {
        bonusDisable();
      }
    }
  }

window.setInterval(bonusTimer, 1000);

// ===================================================== End of bonus button part