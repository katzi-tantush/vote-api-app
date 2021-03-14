import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './components/register/register.component';
import { TopNavComponent } from './components/top-nav/top-nav.component';
import { LayoutComponent } from './components/layout/layout.component';
import { VoteComponent } from './components/vote/vote.component';
import { ErrorComponent } from './components/error/error.component';
import { VoteCastComponent } from './components/vote-cast/vote-cast.component';
import { VoteDontCastComponent } from './components/vote-dont-cast/vote-dont-cast.component';
import { PartyVoterDisplayComponent } from './components/party-voter-display/party-voter-display.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    TopNavComponent,
    LayoutComponent,
    VoteComponent,
    ErrorComponent,
    VoteCastComponent,
    VoteDontCastComponent,
    PartyVoterDisplayComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
