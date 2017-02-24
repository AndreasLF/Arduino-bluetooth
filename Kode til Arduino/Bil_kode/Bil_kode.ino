#include <SoftwareSerial.h> //This includes the softwareSerial library, which allows us to make a software serial

int left[2] = {5,6}; //Left motor pins array

int right[2] = {9,10}; //Right motor pins array

int speedPinLeft = 3; //Controls speed on the left motor
int speedPinRight = 11; //Controls speed on the right motor

int bluetoothTx = 2; //Bluetooth transmitter pin
int bluetoothRx = 1; //Bluetooth receiver pin

int rate = 115; //Speed of the robot

int echoPin = 13; //Echo pin on ultra sound distance sensor
int triggerPin = 12; //Trigger pin on ultra sound distance sensor
unsigned long ultraSoundValue; //Value received from the ultra sound sensor
unsigned long distance; //Calculated distance from ultra sound sensor

const long interval = 1000; //The time interval for the data sent to smartphone 
unsigned long previousMillis = 0; //Previous time
unsigned long currentMillis = 0; //Current time 


SoftwareSerial bluetooth(bluetoothTx, bluetoothRx); //Sets up a bluetooth software serial

/*
 * Configures the device: Set pins and sets speed for serial communication
 * 
 */
void setup() {

 /* this initializes the motor pins*/
 pinMode(left[0],OUTPUT);
 pinMode(left[1],OUTPUT);
 pinMode(right[0],OUTPUT);
 pinMode(right[1],OUTPUT);

/*Initializes the ultra sound sensor pins*/
 pinMode(echoPin, INPUT);
 pinMode(triggerPin, OUTPUT);

 Serial.begin(9600); //Sets the baudrate
 bluetooth.begin(115200); //Standard Bluetooth sensor baudrate
}

/*
 * This function controls the left motor
 * 
 * param n is the desired direction of the motor. 0 is forward while 1 is backward
 */
void leftMotor(int n) {
  digitalWrite(left[n],HIGH); 
  }

/*
 * This function controls the right motor
 * 
 * param n is the desired direction of the motor. 0 is forward while 1 is backward
 */
void rightMotor(int n){
  digitalWrite(right[n],HIGH);
  }

/*
 * Makes both motors go forward
 */
void forward(){
  leftMotor(0);
  rightMotor(0);
  }

/*
 * Makes moth motors go backward
 */
void backward(){
  leftMotor(1);
  rightMotor(1);
  }

/*
 * Resets the motors
 * All pins are low
 */
void resetMotors(){
  digitalWrite(left[0],LOW);
  digitalWrite(left[1],LOW);
  digitalWrite(right[0],LOW);
  digitalWrite(right[1],LOW);
}

/*
 * Makes the robot brake
 */
void brake(){
  resetMotors(); //Sets all motor pins to low, which makes the stop
  }

/*
 * Makes the robot turn left
 */
void turnLeft() {
  rightMotor(0);
}

/*
 * Makes the robot turn right
 */
void turnRight() {
  leftMotor(0);
}

/*
 * Sets the speed of the robot
 * 
 * param left is the speed of the left motor. Takes integer from 0-255
 * param right is the speed of the right motor. Takes integer from 0-255
 */
void setRate(int left, int right){
  analogWrite(speedPinLeft, left); //Uses pwm to set the speed of the motor
  analogWrite(speedPinRight, right); //Uses pwm to set the speed of the motor
}

/*
 * Receives message from bluetooth
 * 
 * Reteurn value is a char 
 */
char receiveBluetooth() {
  char msg; 
  if(bluetooth.available()){ //if bluetooth is connected and available
    msg = (char)bluetooth.read(); //reads the received char from bluetooth  
    }      
  else { //if not
    //msg = 's'; //message is 's', which stops the robot
    }
  return msg; //returns the received char
  }

/*
 * This function controls the robot by looking at the receive char
 */
void controlRobot() {
  char control = receiveBluetooth(); //calls the recieve bluetooth function and sets the returned value to a char named 'control' 

  
   if (control == 's'){ 
          brake(); //calls the brake function
        }
        else if(control == 'f'){
          forward(); //calls the forward function
        }
        else if(control == 'b'){
          backward(); //calls the backward function
        }
        else if(control == 'r'){
          turnRight();  //calls the turnRight function
        }
        else if(control == 'l'){
          turnLeft(); //cals the turnLeft function
        }
        else if(control == 'i') {
          /*Only increse speed if below 250. Maimum pwm is 255*/
          if(rate < 250) { 
            rate = rate + 15; //Rate is increased by 15, which is 10% of the driving speed interval
            setRate(rate, rate); //The new speed is set on both motors
            
          }  
        }
        else if(control == 'd') {
          /*Only decrease speed if above 100. Motor wont work below 100*/
          if (rate > 100){
            rate = rate - 15; //Rate is decrease by 15, which is 10% of the driving speed interval
            setRate(rate, rate); //The new speed is set on both motors
            
          }
        }
  }


/*
 * Looped while Arduino receives power
 */
void loop() {
  bluetooth.listen(); //Listens to bluetooth
  Serial.println(rate); //Prints the rate. Used for debugging

 /* currentMillis = millis(); //Stores the current time

  /*If the difference is higher than the choosen interval the following cod is executed*/ /*
  if(currentMillis - previousMillis >= interval){
      bluetooth.println('p'); //'p' is sent to the phone
      Serial.println('p'); //'p' is printed to Serial monitor

      previousMillis = currentMillis; //previous time is now updated      
  }
  */
  
  digitalWrite(triggerPin, HIGH); //trigger pin is high. Ultra sound is transmitted
  delay(10); //Wait 10 milliseconds
  digitalWrite(triggerPin, LOW); //Trigger pin low
  
  ultraSoundValue = pulseIn(echoPin, HIGH); //looks for a pulse on the echo pin. Returns the travel time in milliseconds
  distance = ultraSoundValue / 58; //Milliseconds are converted into cm

  /*If the value received from the sensor is inside the optimal interval the following code will run*/
  if(116 < ultraSoundValue && ultraSoundValue < 23200) {
    /*If distance is below 30 cm the robot reacts*/
    if(distance < 30){
        backward(); //Robot goes backward
        delay(500); //For 500 milliseconds
        brake(); //Then it brakes
    }
    else { //Else the user will be allowed to control the robot
       controlRobot(); 
      }
  }
  else { //Else the user will be allowed to control the robot
     controlRobot();
  }
}




