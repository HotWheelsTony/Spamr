import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { AppState } from 'src/store/appState';
declare var Paho: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  client: any;


  constructor(private router: Router, private store: Store<AppState>) {}


  ngOnInit() {
      
    this.store.select

    this.client = new Paho.Client(
      environment.mqttConfig.host,
      environment.mqttConfig.port,
      environment.mqttConfig.id,
    );
    console.log("Created client: " + this.client);

    // set callback handlers
    this.client.onConnectionLost = this.onConnectionLost;
    this.client.onMessageArrived = this.onMessageArrived;
 
    // connect the client
    this.client.connect({ 
      timeout: 10,
      useSSL: false,  
      onSuccess: this.onConnect,
      onFailure: this.onFailure,
    });

  }

  chat() {
    this.router.navigate(['chat']);
  }

  compose() {
    this.router.navigate(['compose']);
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
