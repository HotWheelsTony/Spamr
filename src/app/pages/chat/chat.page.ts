import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ChatPageForm } from './chat.page.form';
import * as firebase from 'firebase';
declare var Paho: any;

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  topic: any;
  client: any;
  form: FormGroup;
  sub: Subscription;
  messages: any = [];
  

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getParam();
    this.form = new ChatPageForm(this.formBuilder).createForm();
    this.client = new Paho.Client(
      environment.mqttConfig.host,
      environment.mqttConfig.port,
      environment.mqttConfig.id,
    );

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


  getParam() {
    this.sub = this.route.params.subscribe(params => {
      this.topic = params['topic'];
    });
  }


  // called when the client connects
  private onConnect = () => {
    // Once a connection has been made, make a subscription and send a message.
    console.log("Connecting to broker");
    //subscribe to the topic
    this.client.subscribe(this.topic);
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
    this.messages.push(message);
  }

  private onFailure = () => {
    console.log("Failed to connect to MQTT broker");
  }

  //sends a message using the paho mqtt client to the given topic
  public sendMessage(topic: string, content: string) {
    var message = new Paho.Message(firebase.default.auth()
    .currentUser.displayName + ": " + content);
    message.destinationName = topic;
    this.client.send(message);
  }

  private submit() {
    const content = this.form.get("content").value;
    this.sendMessage(this.topic, content);
  }


}
