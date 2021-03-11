import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ILoginData } from 'src/app/models/ILoginData';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  voterLoginData: ILoginData = {id:null, idIssueDate:null};
  loginForm: FormGroup;
  errMessage: string;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group(
      {
        id: [this.voterLoginData.id, [Validators.required]],
        idIssueDate:[this.voterLoginData.idIssueDate, [Validators.required]]
      })
  }

  attemptLogin() {
    this.voterLoginData = this.loginForm.value;
    this.userService.login(this.voterLoginData);
  }
}
