import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterPageForm } from './register.page.form';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  form: FormGroup;

  constructor(private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() { 
    this.form = new RegisterPageForm(this.formBuilder).createForm();
  }

  register() {
    this.router.navigate(['home']);
  }
}
