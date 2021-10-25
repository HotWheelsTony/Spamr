import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-compose',
  templateUrl: './compose.page.html',
  styleUrls: ['./compose.page.scss'],
})
export class ComposePage implements OnInit {

  constructor(private router: Router) {}

  ngOnInit() {
  }

}
