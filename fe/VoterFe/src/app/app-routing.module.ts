import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationRejectComponent } from './components/authentication-reject/authentication-reject.component';
import { ErrorComponent } from './components/error/error.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { VoteCastComponent } from './components/vote-cast/vote-cast.component';
import { LeaveGuard } from './guards/leave.guard';
import { LoginGuardGuard } from './guards/login-guard.guard';
import { VoteGuardGuard } from './guards/vote-guard.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'vote-cast', component: VoteCastComponent, canActivate: [LoginGuardGuard, VoteGuardGuard], canDeactivate:[LeaveGuard] },
  { path: 'authenticationReject', component: AuthenticationRejectComponent },
  { path: '**', component: ErrorComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
