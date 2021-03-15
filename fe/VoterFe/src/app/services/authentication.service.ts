import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject(false);
  canVote: BehaviorSubject<boolean> = new BehaviorSubject(false);

  authenticationRejectMessage: BehaviorSubject<string> = new BehaviorSubject('');

  constructor() { }

}
