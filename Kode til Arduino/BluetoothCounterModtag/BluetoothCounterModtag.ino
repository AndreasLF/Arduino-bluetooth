/*
 * Test af bluetooth
 * af Lone Østerlund
 */

#include <SoftwareSerial.h>
int bluetoothTx = 3;
int bluetoothRx = 4;

SoftwareSerial bluetooth(bluetoothTx, bluetoothRx);//Arduino RX,Tx
char msg;
int counter = 0;
void setup(){
  Serial.begin(9600);
  pinMode(13,OUTPUT);
  digitalWrite(13,LOW);
  bluetooth.begin(115200);//standard bluetooth mate
}

void loop(){
  bluetooth.listen();
  modtagFraBluetooth();
  Serial.println(counter);
  bluetooth.println(counter);
  counter++;
  delay(1000);
}

/*
 *Denne funktion modtager på
 * SoftwarerSeriel porten
 * navngivet bluetooth.
 * modtages 't' tændes diode på ben 13
 * modtages 's' slukkes dioden
 */
void modtagFraBluetooth(){
  char msg;
  if(bluetooth.available()){ 
    msg= (char)bluetooth.read(); 
    if(msg=='t')
      digitalWrite(13,HIGH);
     else if(msg =='s'){
      digitalWrite(13,LOW);  
    }      
    bluetooth.print(msg); //returner det modtagne
  }
}

