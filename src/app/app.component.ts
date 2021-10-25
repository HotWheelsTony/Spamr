import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Chats', url: 'pages/home', icon: 'chatbubbles'},
    { title: 'Account', url: 'pages/account', icon: 'settings'},
  ];

  constructor() {}
}
