//Adressen på Bluetooth Mate, Password er 1234
var macAddress = "00:06:66:7D:83:DF";

function onLoad(){
	document.addEventListener("deviceready", onDeviceReady, false);
}

function onDeviceReady(){
	bluetoothSerial.connect(macAddress, onConnect, onDisconnect);
}

/* I onConnect kaldes bluetoothSerial.subscribe, der kaldes når data modtages
 * data skal sendes med et slut tegn i dette eksempel er det \n, der indgår i
 * Arduino-kommandoen println()
 */
function onConnect() {
    bluetoothSerial.subscribe("\n", onMessage, subscribeFailed);
    document.getElementByID("statusDiv").innerHTML="Connected to " + macAddress + ".";        		
}

/*
 * Data vises i "fraArduino"
 */
function onMessage(data) {
    document.getElementById("fraArduino").innerHTML =""+ data;       
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
	