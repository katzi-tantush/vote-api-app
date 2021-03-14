import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ILoginData } from '../models/ILoginData';
import { ILoginVerification } from '../models/ILoginVerification';
import { HttpService } from './http.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationServiceService {
  private isAuthenticated$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private authenticatedUser$: Observable<ILoginData>;
  private loginKey: string = 'loginData';

  constructor(
    private http: HttpService,
    private userService: UserService    
  ) {}
  
  get authenticationState() {
    return this.isAuthenticated$.asObservable();
  }

  login(userLoginVerification: ILoginVerification) {
    if (userLoginVerification) {
      this.http.post('voters/login', userLoginVerification).subscribe(
        response => {
          console.log('login response:',response);
          
          this.storeLoginData(response);
          this.userService.user$.next(response.voter);
          this.isAuthenticated$.next(true);
        },
        err => {
          console.log(err);
          this.isAuthenticated$.next(false);
        });
      }
  }

  logout() {
    this.isAuthenticated$.next(false);
  }

  storeLoginData(loginData: ILoginData) {
    window.localStorage.setItem(this.loginKey, loginData.responseToken);
  }

  getLoginData():string {
    return window.localStorage.getItem(this.loginKey);
  }

}
