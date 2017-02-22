var macAddress = "00:06:66:7D:83:DF"; //BLuetooth Mate mac adress, pasword 1234
var forwardButton, backwardButton, rightButton, leftButton, increaseButton, decreaseButton, speedCounterDiv;
var speed = 110; //Robot default speed
var themeButtonClicked = false; //variable containing information on whether or not the theme button is clicked
var menuButtonClicked = false; //variable containing information on whether or not the menu button is clicked

/*
 *  These are the objects containing theme colors
 */
var blueTheme = {
    darkPrimary: "#1976D2",
    primary: "#2196F3",
    lightPrimary: "#BBDEFB",
    accent: "#607D8B"
};
var orangeTheme = {
    darkPrimary: "#F57C00",
    primary: "#FF9800",
    lightPrimary: "#FFE0B2",
    accent: "#FF5252"
};
var indigoTheme = {
    darkPrimary: "#303F9F",
    primary: "#3F51B5",
    lightPrimary: "#C5CAE9",
    accent: "#FF4081"
};
var purpleTheme = {
    darkPrimary: "#512DA8",
    primary: "#673AB7",
    lightPrimary: "#D1C4E9",
    accent: "#E040FB"
};
var greenTheme = {
    darkPrimary: "#388E3C",
    primary: "#4CAF50",
    lightPrimary: "#C8E6C9",
    accent: "#CDDC39"
};
var tealTheme = {
    darkPrimary: "#00796B",
    primary: "#009688",
    lightPrimary: "#B2DFDB",
    accent: "#FFC107"
};


/*
 * Configures the app
 * Called when body is loaded
 */
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

    rightButton.style.marginLeft = (controllerWidth - 48) / 2 + 48 + "px";
    leftButton.style.marginLeft = (controllerWidth - 48) / 2 - 48 + "px";

    decreaseButton.style.marginLeft = (controllerWidth - 3 * 48) / 2 + "px";


    console.log(macAddress); //prints the macAddress to console. Used for bug fixing
    document.getElementById("macAddressChangerDiv").innerHTML = "BT device mac address: <br>'" + macAddress + "'";


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
    increaseButton.addEventListener("touchend", setButtonStyleDefault, false);

    decreaseButton.addEventListener("touchstart", decreaseSpeed, false);
    decreaseButton.addEventListener("touchend", setButtonStyleDefault, false);

}

/*
 * Configures the bluetooth plugin, when device is ready
 */
function onDeviceReady() {
    bluetoothSerial.connect(macAddress, onConnect, onDisconnect);
}

/* I onConnect kaldes bluetoothSerial.subscribe, der kaldes når data modtages
 * data skal sendes med et slut tegn i dette eksempel er det \n, der indgår i
 * Arduino-kommandoen println()
 */
function onConnect() {
//    alert("connected");
//    statusDiv.innerHTML = "Connected to ";
    statusDiv.innerHTML = "Connected to " + macAddress + ".";        		
    bluetoothSerial.subscribe("\n", onMessage, subscribeFailed);
//        bluetoothSerial.read(onSucces, onFailure);
}

//function onSucces(data) {
//    alert(data);
//}
//
//function onFailure() {
//    alert("error");
//}

/*
 * Data vises i "message"
 */
function onMessage(data) {
//    alert("receiving data from arduino")
//    alert(data);
    document.getElementById("messageDiv").innerHTML = "Hastighed: "+ data;       
}

function subscribeFailed(){
    alert("failed to receive data from Arduino");
}


/*
 * Send data to arduino
 * Param data contains a single character 'char'
 */
function sendToArduino(data) {
    bluetoothSerial.write(data);
}


/*
 * Robot is disconnected
 */
function onDisconnect() {
    alert("Disconnected");
    statusDiv.innerHTML = "Disconnected.";
}

//function subscribeFailed() {
//        alert("subscribe failed");
//}

/*
 * Makes the robot drive forward
 */
function moveForward() {
    forwardButton.style.color = "rgba(255, 255, 255, 0.5)";
    forwardButton.style.boxShadow = "0px 3px 17px -1px rgba(0, 0, 0, 0.3)";

    sendToArduino("f"); 
}

/*
 * Makes the robot reverse
 */
function moveBackward() {
    backwardButton.style.color = "rgba(255, 255, 255, 0.5)";
    backwardButton.style.boxShadow = "0px 3px 17px -1px rgba(0, 0, 0, 0.3)";

    sendToArduino("b");
}


/*
 * Makes the robot turn right
 */
function moveRight() {
    rightButton.style.color = "rgba(255, 255, 255, 0.5)";
    rightButton.style.boxShadow = "0px 3px 17px -1px rgba(0, 0, 0, 0.3)";

    sendToArduino("r");
}

/*
 * Makes the robot turn left
 */
function moveLeft() {
    leftButton.style.color = "rgba(255, 255, 255, 0.5)";
    leftButton.style.boxShadow = "0px 3px 17px -1px rgba(0, 0, 0, 0.3)";

    sendToArduino("l");
}

/*
 * Stops the robot. Executed on touchend
 */
function stopMove() {
    setButtonStyleDefault();
    sendToArduino("s");
}

/*
 * This function increases the robot speed
 */
function increaseSpeed() {
    increaseButton.style.color = "rgba(255, 255, 255, 0.5)";
    increaseButton.style.boxShadow = "0px 3px 17px -1px rgba(0, 0, 0, 0.3)";

    /*The speed will only increase if it is below the maximum*/
    if (speed < 250) {
        speed = speed + 10;
        speedCounterDiv.innerHTML = speed;

        sendToArduino("i");
    }
}

/*
 * This function decreases the robot speed
 */
function decreaseSpeed() {
    decreaseButton.style.color = "rgba(255, 255, 255, 0.5)";
    decreaseButton.style.boxShadow = "0px 3px 17px -1px rgba(0, 0, 0, 0.3)";

    /*The speed will only decrease if it is above the minimum*/
    if (speed > 100) {
        speed = speed - 10;
        speedCounterDiv.innerHTML = speed;

        sendToArduino("d");
    }

}

/*
 * Changes the button style back to default. 
 * Called by stopMove(), which is executed on 'touchend'
 */
function setButtonStyleDefault() {
    forwardButton.style.color = "#FFFFFF";
    forwardButton.style.boxShadow = "0px 3px 17px -1px rgba(0, 0, 0, 0.15)";
    backwardButton.style.color = "#FFFFFF";
    backwardButton.style.boxShadow = "0px 3px 17px -1px rgba(0, 0, 0, 0.15)";
    rightButton.style.color = "#FFFFFF";
    rightButton.style.boxShadow = "0px 3px 17px -1px rgba(0, 0, 0, 0.15)";
    leftButton.style.color = "#FFFFFF";
    leftButton.style.boxShadow = "0px 3px 17px -1px rgba(0, 0, 0, 0.15)";

    /*Makes sure the buttons will still be greyed out, when it wont the speed wont go higher or lower*/
    if (speed > 100 && speed < 250) {
        increaseButton.style.color = "#FFFFFF";
        increaseButton.style.boxShadow = "0px 3px 17px -1px rgba(0, 0, 0, 0.15)";
        decreaseButton.style.color = "#FFFFFF";
        decreaseButton.style.boxShadow = "0px 3px 17px -1px rgba(0, 0, 0, 0.15)";
    }
}

/*
 * This function opens or closes the themeMenu
 */
function openThemeMenu() {

    /*If the theme button is not clicked the menu will open, else it will close*/
    if (themeButtonClicked == false) {
        document.getElementById("themeMenu").style.height = "48px";
        document.getElementById("content").style.backgroundColor = "rgba(0, 0, 0, 0.5)";
        themeButtonClicked = true;
    } else if (themeButtonClicked == true) {
        document.getElementById("themeMenu").style.height = "0px";
        document.getElementById("content").style.backgroundColor = "rgba(0, 0, 0, 0)";
        themeButtonClicked = false;
    }

}


/*
 * This function changes the app theme
 *
 * param desired theme
 */
function changeTheme(theme) {
    document.getElementById("body").style.backgroundColor = theme.primary; //set body bg-color to the primary color of the theme
    document.getElementById("menuBar").style.backgroundColor = theme.darkPrimary; //sets menuBar bg-color to the darkPrimary of the theme
    document.getElementById("macAddressChangerDiv").style.backgroundColor = theme.accent; //sets macAddressChangerDiv bg-color to accent color of the theme

    var leftMenuButtonClass = document.getElementsByClassName("leftMenuButton"); //creates a variable containing all elements with the leftMenuButtonClass class
    for (var i = 0; i < leftMenuButtonClass.length; i++) { //Loop needed to apply new color to all elements with the class
        leftMenuButtonClass[i].style.backgroundColor = theme.accent; //changes element number i to the new theme
    }

    var buttonClass = document.getElementsByClassName("button"); //creates a variable containing all elements with the button class
    for (var i = 0; i < buttonClass.length; i++) { //Loop needed to apply new color to all elements with the class
        buttonClass[i].style.backgroundColor = theme.accent; //changes element number i to the new theme
    }
}

/*
 * This function opens or closes the left menu
 */
function openMenu() {
    /*If the menu button is not clicked the menu will open, else it will close*/
    if (menuButtonClicked == false) {
        document.getElementById("leftMenu").style.width = "250px";
        document.getElementById("content").style.backgroundColor = "rgba(0, 0, 0, 0.5)";
        menuButtonClicked = true;
    } else if (menuButtonClicked == true) {
        document.getElementById("leftMenu").style.width = "0px";
        document.getElementById("content").style.backgroundColor = "rgba(0, 0, 0, 0)";
        menuButtonClicked = false;
    }

}

function changeMacAddress() {
    var mac = prompt("Enter a mac address to connect to another bluetooth device", macAddress);

    if (mac != null) {
        if (confirm("Are you sure you want to change the mac address to the following: '" + mac + "'") == true) {
            macAddress = mac;
            onLoad();
        } else {

        }
    }

}