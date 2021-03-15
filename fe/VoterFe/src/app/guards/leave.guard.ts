import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ILeaveBlockable } from '../component-interfaces/IleaveBlockable';

@Injectable({
  providedIn: 'root'
})
export class LeaveGuard implements CanDeactivate<unknown> {
  canDeactivate(
    component: ILeaveBlockable,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return component.canLeave();
  }
  
}
