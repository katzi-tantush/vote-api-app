import { Injectable } from '@angular/core';
import { ILoginData } from '../models/ILoginData';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpService) { }
  
  login(userLoginData:ILoginData) {
    this.http.post('voters/login', userLoginData).subscribe(
      response => window.localStorage.setItem('userToken', response['responseToken'])
    );
  }
}
