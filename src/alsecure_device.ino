int pirPin = 3;    //the digital pin connected to the PIR sensor's output

void setup(){
  Serial.begin(9600);
  pinMode(pirPin, INPUT);
}

void loop(){
  int saklar = digitalRead(pirPin);
  if (saklar == 1){
    Serial.println("terdeteksi");
  }
  if (saklar == 0){
    Serial.println("tidak");
  }
  
}

