import { Component, OnInit } from '@angular/core';
declare var Paho: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  client: any;


  constructor() {}


  ngOnInit() {
    var host = 'broker.mqttdashboard.com'; 
    var port = Number(8000);
    var id = 'app';  

    this.client = new Paho.Client(
      host, 
      port, 
      id
    );
    console.log("Created client: " + this.client);

    // set callback handlers
    this.client.onConnectionLost = this.onConnectionLost;
    this.client.onMessageArrived = this.onMessageArrived;
 
    // connect the client
    this.client.connect({ 
      timeout: 10,
      useSSL: false,  
      mqttVersion: 3,
      onSuccess: this.onConnect,
      onFailure: this.onFailure,
    });

  }


  // called when the client connects
  private onConnect = () => { 
    // Once a connection has been made, make a subscription and send a message.
    console.log("Connecting to broker");
    this.client.subscribe("World");
    var message = new Paho.Message("Hello");
    message.destinationName = "World"; 
    this.client.send(message);
  } 


  // called when the client loses its connection
  private onConnectionLost = (responseObject) => {
    if (responseObject.errorCode !== 0) {
      console.log("onConnectionLost:" + responseObject.errorMessage);
    }
  } 


  // called when a message arrives
  private onMessageArrived = (message) => {
    console.log("onMessageArrived:" + message.payloadString);
  }

  private onFailure = () => {
    console.log("Failed to connect to MQTT broker");
  }

}
