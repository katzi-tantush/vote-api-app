import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IVoter } from 'src/app/models/IVoter';
import { UserService } from 'src/app/services/user.service';
import { charCountValidator } from 'src/app/validators/charCountValidator';
import { nubmberValidator } from 'src/app/validators/numberValidator';
import { dateValidator } from 'src/app/validators/dateValidator';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  newVoter: IVoter = {
    id: null,
    idIssueDate: null,
    fName: null,
    lName: null,
    gender:null,
    phoneNum: null,
    email: null,
    city: null,
    voted: null,
    role: null
  };

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    // TODO: complete validation  -there was a wierd error to do with id which went away 
    // when all other fields were valid
    this.registerForm = this.formBuilder.group({
      id: [this.newVoter.id, [Validators.required, charCountValidator(9), nubmberValidator()]],
      idIssueDate: [this.newVoter.idIssueDate, [dateValidator()]],
      fName: [this.newVoter.fName, [Validators.required]],
      lName: [this.newVoter.lName, [Validators.required]],
      gender: [this.newVoter.gender, [Validators.required]],
      phoneNum: [this.newVoter.phoneNum, [Validators.required]],
      email: [this.newVoter.email, [Validators.required]],
      city: [this.newVoter.city, [Validators.required]]
    })
  }

  register() {
    this.newVoter = this.registerForm.value;
    this.newVoter.voted = false;
    this.newVoter.role = 'Voter';
    this.userService.registerNewVoter(this.newVoter);
  }
}
