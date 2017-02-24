int echoPin = 13;
int triggerPin = 8;
int ledPin = 10;
unsigned long ultraSoundValue;
unsigned long distance;

void setup() {
  pinMode(echoPin, INPUT);
  pinMode(triggerPin, OUTPUT);
  pinMode(ledPin, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  digitalWrite(triggerPin, HIGH);
  delay(10);
  digitalWrite(triggerPin, LOW);
  
  ultraSoundValue = pulseIn(echoPin, HIGH);
  distance = ultraSoundValue / 58;

  if(116 < ultraSoundValue && ultraSoundValue < 23200) {
    Serial.print(distance);
    Serial.println(" cm");
    if(distance < 30){
      digitalWrite(ledPin, HIGH);
    }
    else {
      digitalWrite(ledPin, LOW);
    }
    
  }
  else {
    Serial.println("error! The sensor only works within the range of 2 cm to 400 cm");
  }
  

}
