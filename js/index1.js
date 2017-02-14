//Adressen på Bluetooth Mate, Password er 1234
var macAddress = "00:06:66:7D:83:DF";
var forwardButton, backwardButton, rightButton, leftButton, increaseButton, decreaseButton, speedCounterDiv;
var speed = 110;


function onLoad() {    
    forwardButton = document.getElementById("forwardButton"); //Gets the foward button element
    backwardButton = document.getElementById("backwardButton"); //Gets the backward button element
    rightButton = document.getElementById("rightButton"); //Gets the right button element
    leftButton = document.getElementById("leftButton"); //Gets the left button element

    increaseButton = document.getElementById("increaseButton"); 
    decreaseButton = document.getElementById("decreaseButton");
    speedCounterDiv = document.getElementById("speedCounterDiv");
    
    var controllerWidth = document.getElementById("controllerDiv").offsetWidth; //This retrieves the width of the controllerDiv
    console.log(controllerWidth); //prints controllerWidth to console. Useful for testing and debugging
    
    rightButton.style.marginLeft = (controllerWidth - 48)/2 + 48 + "px"; 
    leftButton.style.marginLeft = (controllerWidth - 48)/2 -48 + "px";
    
    decreaseButton.style.marginLeft = (controllerWidth - 3*48)/2 + "px";

    
    
    
	document.addEventListener("deviceready", onDeviceReady, false); //eventlistener; calls the onDeviceReady() function, when device is ready
    
    forwardButton.addEventListener("touchstart", moveForward, false); //calls the moveForward() function on touchstart
    forwardButton.addEventListener("touchend", stopMove, false); //calls the stopMove() function on touchend
    backwardButton.addEventListener("touchstart", moveBackward, false); //calls the moveBackward() function on touchstart
    backwardButton.addEventListener("touchend", stopMove, false); //calls the stopMove() function on touchend
    rightButton.addEventListener("touchstart", moveRight, false); //calls the moveRight() function on touchstart
    rightButton.addEventListener("touchend", stopMove, false); //calls the stopMove() function on touchend
    leftButton.addEventListener("touchstart", moveLeft, false); //calls the moveLeft() functionon on touchstart
    leftButton.addEventListener("touchend", stopMove, false); //calls the stopMove() function when on touchend
    
    increaseButton.addEventListener("touchstart", increaseSpeed, false);
    increaseButton.addEventListener("touchend", setButtonStyleDefault ,false);
    
    decreaseButton.addEventListener("touchstart", decreaseSpeed, false);
    decreaseButton.addEventListener("touchend", setButtonStyleDefault ,false);    
    
}

function onDeviceReady(){
	bluetoothSerial.connect(macAddress, onConnect, onDisconnect);
}

/* I onConnect kaldes bluetoothSerial.subscribe, der kaldes når data modtages
 * data skal sendes med et slut tegn i dette eksempel er det \n, der indgår i
 * Arduino-kommandoen println()
 */
function onConnect() {
    alert("connected");
    statusDiv.innerHTML="Connected to ";
    //statusDiv.innerHTML="Connected to " + macAddress + ".";        		
    //bluetoothSerial.subscribe("\n", onMessage, subscribeFailed);
    bluetoothSerial.read(onSucces,onFailure);
}


function onSucces(data) {
    alert(data);
}

function onFailure() {
    alert("error");
}

/*
 * Data vises i "message"
 */
//function onMessage(data) {
//    alert(data);
//    document.getElementById("message").innerHTML ="Hastighed: "+ data;       
//}

/*
 * bluetoothSerial.write sender data af formen 
 * ArrayBuffer, string, array of integers, or a Uint8Array.
 * I dette eksempel sendes en streng 
 */
function sendToArduino(data) {
        bluetoothSerial.write(data);
}


function onDisconnect() {
        alert("Disconnected");
        statusDiv.innerHTML="Disconnected.";
}

//function subscribeFailed() {
//        alert("subscribe failed");
//}
	
function moveForward() { 
    forwardButton.style.color = "rgba(255, 255, 255, 0.5)";
    forwardButton.style.boxShadow = "0px 3px 17px -1px rgba(0, 0, 0, 0.3)";

   // sendToArduino("f"); 
}
    
function moveBackward() { 
    backwardButton.style.color = "rgba(255, 255, 255, 0.5)";
    backwardButton.style.boxShadow = "0px 3px 17px -1px rgba(0, 0, 0, 0.3)";
    
    sendToArduino("b");
}

function moveRight() {  
    rightButton.style.color = "rgba(255, 255, 255, 0.5)";
    rightButton.style.boxShadow = "0px 3px 17px -1px rgba(0, 0, 0, 0.3)";
    
    sendToArduino("r");
}

function moveLeft() {   
    leftButton.style.color = "rgba(255, 255, 255, 0.5)";
    leftButton.style.boxShadow = "0px 3px 17px -1px rgba(0, 0, 0, 0.3)";
    
    sendToArduino("l");
}

function stopMove() {
    setButtonStyleDefault();
    sendToArduino("s");
}

function increaseSpeed() {
    increaseButton.style.color = "rgba(255, 255, 255, 0.5)";
    increaseButton.style.boxShadow = "0px 3px 17px -1px rgba(0, 0, 0, 0.3)";
    if(speed < 250) {
        speed = speed + 10;
        speedCounterDiv.innerHTML = speed;
            
        sendToArduino("i");
    }    
}

function decreaseSpeed() {
    decreaseButton.style.color = "rgba(255, 255, 255, 0.5)";
    decreaseButton.style.boxShadow = "0px 3px 17px -1px rgba(0, 0, 0, 0.3)";
    
    
    if(speed > 100) {        
        speed = speed - 10;
        speedCounterDiv.innerHTML = speed;
        
        sendToArduino("d");
    }
    
}

function setButtonStyleDefault() {
    forwardButton.style.color = "#FFFFFF";
    forwardButton.style.boxShadow = "0px 3px 17px -1px rgba(0, 0, 0, 0.15)";
    backwardButton.style.color = "#FFFFFF";
    backwardButton.style.boxShadow = "0px 3px 17px -1px rgba(0, 0, 0, 0.15)";
    rightButton.style.color = "#FFFFFF";
    rightButton.style.boxShadow = "0px 3px 17px -1px rgba(0, 0, 0, 0.15)";
    leftButton.style.color = "#FFFFFF";
    leftButton.style.boxShadow = "0px 3px 17px -1px rgba(0, 0, 0, 0.15)";
    
    if(speed > 100 && speed < 250) {
    increaseButton.style.color = "#FFFFFF";
    increaseButton.style.boxShadow = "0px 3px 17px -1px rgba(0, 0, 0, 0.15)";
    decreaseButton.style.color = "#FFFFFF";
    decreaseButton.style.boxShadow = "0px 3px 17px -1px rgba(0, 0, 0, 0.15)";
    }


}