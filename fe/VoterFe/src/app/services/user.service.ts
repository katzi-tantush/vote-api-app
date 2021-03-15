import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ILoginData } from '../models/ILoginData';
import { ILoginVerification } from '../models/ILoginVerification';
import { IVoter } from '../models/IVoter';
import { AuthenticationService } from './authentication.service';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  loginKey: string = 'loginData';
  user$: BehaviorSubject<IVoter> = new BehaviorSubject(null);

  constructor(
    private http: HttpService,
    private authenticationService:AuthenticationService
  ) { }
  
  getLoginData():string {
    return window.localStorage.getItem(this.loginKey);
  }

  storeLoginData(loginData: ILoginData) {
    window.localStorage.setItem(this.loginKey, loginData.responseToken);
  }

  registerNewVoter(newVoter: IVoter) {
    this.http.post('voters', newVoter).subscribe(
      response =>
      {
        // console.log('register response:',response);
        
        this.login({ id: newVoter.id, idIssueDate: newVoter.idIssueDate });
      })
  }

  login(userLoginVerification: ILoginVerification) {
    if (userLoginVerification) {
      this.http.post('voters/login', userLoginVerification).subscribe(
        response => {
          // console.log('login response:', response);
          this.storeLoginData(response);
          this.user$.next(response.voter);
          this.authenticationService.isAuthenticated.next(true);
        },
        err => {
          console.log(err);
          this.authenticationService.isAuthenticated.next(false);
        }
        );
      }
  }
}
