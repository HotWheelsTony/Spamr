import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'chat-item',
  templateUrl: './chat-item.component.html',
  styleUrls: ['./chat-item.component.scss'],
})
export class ChatItemComponent implements OnInit {

  @Input() name: string;
  @Input() lastMessage: string;
  @Input() lastMessageTime: string;

  constructor() { }

  ngOnInit() {}

}
