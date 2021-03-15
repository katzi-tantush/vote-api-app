import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class VoteGuardGuard implements CanActivate {
  constructor(
    private userService: UserService,
    private router: Router,
    private authenticationService:AuthenticationService
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    let guarResponse: Observable<boolean | UrlTree> = this.userService.user$.asObservable().pipe(
      map(
        user => {
          if (!user.voted) return true;

          this.authenticationService.authenticationRejectMessage
            .next("It looks like you've already voted, You'll have to wait for next weeks elections..");
          return this.router.parseUrl('/authenticationReject');
        })
    )
    
    return guarResponse;
  }
  
}
