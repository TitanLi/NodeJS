String a = "a";
void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600); 
}

void loop() {
  // put your main code here, to run repeatedly:
  if (Serial.available() > 0) {
     // read the incoming byte:
     a = Serial.readString();
  }
  Serial.println(a);
  delay(1000);
}
