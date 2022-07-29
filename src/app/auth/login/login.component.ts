import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  loginForm = {} as FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

}
