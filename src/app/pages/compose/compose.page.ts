import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';
import { ComposePageForm } from './compose.page.form';

@Component({
  selector: 'app-compose',
  templateUrl: './compose.page.html',
  styleUrls: ['./compose.page.scss'],
})
export class ComposePage implements OnInit {

  form: FormGroup;

  constructor(private formBuilder: FormBuilder, 
    private router: Router, 
    private firebaseService: FirebaseService) { }

  ngOnInit() {
    this.form = new ComposePageForm(this.formBuilder).createForm();
  }

  submit() {
    const roomname = this.form.get('room').value;
    this.firebaseService.addChatroom(roomname);
    this.router.navigate(['chat', { roomname: roomname }]);
  }

}
