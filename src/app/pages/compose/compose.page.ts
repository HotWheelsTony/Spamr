import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ComposePageForm } from './compose.page.form';

@Component({
  selector: 'app-compose',
  templateUrl: './compose.page.html',
  styleUrls: ['./compose.page.scss'],
})
export class ComposePage implements OnInit {

  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.form = new ComposePageForm(this.formBuilder).createForm();
  }

  submit() {
    console.log("Submitted message");
    this.router.navigate(['home']);
  }

}
