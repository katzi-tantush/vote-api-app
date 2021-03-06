import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {
  constructor(
    private authenticationService:AuthenticationService,
    private router: Router
  ) { };

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    let guardResponse: Observable<boolean | UrlTree> =
      this.authenticationService.isAuthenticated
        .asObservable().pipe(
      map(
        authorized => {
          if (authorized) return true;

          this.authenticationService.authenticationRejectMessage
            .next('You must be logged in to preform that action');
          return this.router.parseUrl('/authenticationReject')
        }
      )
    )
    
    return guardResponse;
  }
}
