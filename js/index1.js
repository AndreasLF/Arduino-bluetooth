//Adressen på Bluetooth Mate, Password er 1234
var macAddress = "00:06:66:7D:83:DF";
var forwardButton, backwardButton, rightButton, leftButton, increaseButton, decreaseButton;
var buttonHoldDown = false;


function onLoad() {
    forwardButton = document.getElementById("forwardButton"); //Gets the foward button element
    backwardButton = document.getElementById("backwardButton"); //Gets the backward button element
    rightButton = document.getElementById("rightButton"); //Gets the right button element
    leftButton = document.getElementById("leftButton"); //Gets the left button element

    increaseButton = document.getElementById("increaseButton"); 
    decreaseButton = document.getElementById("decreaseButton");
    
    
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
    decreaseButton.addEventListener("touchstart", decreaseSpeed, false);
    
    
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
    document.getElementByID("statusDiv").innerHTML="Connected to " + macAddress + ".";        		
    bluetoothSerial.subscribe("\n", onMessage, subscribeFailed);
}

/*
 * Data vises i "fraArduino"
 */
function onMessage(data) {
       alert(data);
    document.getElementById("message").innerHTML ="Hastighed: "+ data;       
}

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

function subscribeFailed() {
        alert("subscribe failed");
}
	
function moveForward() {   
    sendToArduino("f"); 
}
    
function moveBackward() { 
    sendToArduino("b");
}

function moveRight() {   
    sendToArduino("r");
}

function moveLeft() {   
    sendToArduino("l");
}

function stopMove() {
    sendToArduino("s");
}

function increaseSpeed() {
    sendToArduino("i");
}

function decreaseSpeed() {
    sendToArduino("d");
}
