import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorComponent } from './components/error/error.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { VoteCastComponent } from './components/vote-cast/vote-cast.component';
import { VoteDontCastComponent } from './components/vote-dont-cast/vote-dont-cast.component';
import { VoteComponent } from './components/vote/vote.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'vote', component: VoteComponent, children: [
      { path: 'vote-cast', component: VoteCastComponent },
      { path: 'vote-dont-cast', component: VoteDontCastComponent }
  ] },
  { path: '**', component: ErrorComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
