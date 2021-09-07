//Elements 
var numberBtnElement;
var numberTxtElement;
var fingerDivElement;
var fingerBtnElement;
var fingerTxtElement;
var fingerCostTxtElement;
var helpersDiv;

numberBtnElement  =     document.getElementById("numberBtnElement")
numberTxtElement  =     document.getElementById("numberTxtElement")
fingerDivElement  =     document.getElementById("fingerDivElement")
fingerBtnElement  =     document.getElementById("fingerBtnElement")
fingerTxtElement  =     document.getElementById("fingerTxtElement")
fingerCostTxtElement =  document.getElementById("fingerCostTxtElement")
helpersDiv        =     document.getElementById("helpersDiv")

fingerDivElement.style.display="none"
helpersDiv.style.display="none"

GamePrefs = {}
GamePrefs.fps = 30;

function setCostDisplay( toSet, amount) {
    toSet.innerHTML=`Cost: ${amount.toString()}`
}

setCostDisplay(fingerCostTxtElement, fingerCounterBaseCost)


const getCost = (item) => {
    let tempCost;
    switch(item) {
        case "fingerCounter":
            tempCost = fingerCounterCurrentCost
            break;
        default:
            tempCost= 0;
            break;
    }

    //Do whatever calculus
    return tempCost;
}

const formatNumberTotal = ( amount ) => {
    return(Math.floor(amount))
}

const numberBtnClick = (amount) => {

    addToNumberTotal(amount)
}

const fingerBtnClick = (amount) => {
    spendNumbers(getCost("fingerCounter"))
    fingerTotal += amount;
    fingerTxtElement.innerHTML=fingerTotal;
    fingerCounterCurrentCost = Math.floor(fingerCounterCurrentCost + Math.pow(1.1, fingerTotal))
    setCostDisplay(fingerCostTxtElement, fingerCounterCurrentCost)
}

const buttonUpdate = () => {
    if(helpersDivFlag === 0){
        if(numberTotal >= 10){
            helpersDiv.style.display=""
            helpersDivFlag = 1;
        } else {
            helpersDiv.style.display="none"
        }
    }
    //FINGER COUNTER
    if (fingerFlag === 0) {
        if(numberTotal >= fingerCounterBaseCost) {
            fingerFlag = 1;
            fingerDivElement.style.display=""
        } else {
            fingerDivElement.style.display="none"
        }
    } else {
        if (numberTotal >= getCost("fingerCounter")) {
            fingerBtnElement.disabled = false;
        } else {
            fingerBtnElement.disabled = true;
        }
    }
}

const addToNumberTotal = (amount) => {
    numberTotal += amount;
    numberTxtElement.innerHTML=formatNumberTotal(numberTotal);
}

const spendNumbers = (amount) => {
    numberTotal -=amount;
    numberTxtElement.innerHTML=formatNumberTotal(numberTotal);
}

function getCookieAmounts(){
    let tempCookies = 0;
    //FINGERS
    tempCookies += fingerCurrentRate * fingerTotal * deltaTime / 1000
    return tempCookies;
    
}

//Game Logic
function GameLogic(){
    deltaTime = Date.now() - lastFrameTime;
    console.log(deltaTime)
    //update the divs
    //update the buttons
    buttonUpdate();
    let newCookies = getCookieAmounts()
    numberTotal += newCookies
    numberTxtElement.innerHTML=formatNumberTotal(numberTotal);
    lastFrameTime = Date.now();
}

//MAIN LOOP
function GameLoop(){
    GameLogic()
    ticks++;
    setTimeout(GameLoop,1000/GamePrefs.fps)
}

lastFrameTime = Date.now();
GameLoop()