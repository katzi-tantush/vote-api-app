import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { IParty } from '../models/IParty';
import { IVote } from '../models/IVote';
import { HttpService } from './http.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class PartyService {
  constructor(
    private http: HttpService,
    private userService: UserService,
    private router:Router
  ) { }
  
  voteSuccess$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  getVoterViewParties(): Observable<IParty[]>{
    return this.http.get('parties/voter-view');
  }

  vote(party: IParty) {
    if (this.userService.user$.value.voted)
      this.router.navigate(['vote/vote-dont-cast']);
      
    else {
      
      let vote: IVote = {
        voterId: this.userService.user$.value.id,
        partyId: party.id
      };
      
      this.http.put('parties/vote', vote).subscribe(
        response => this.voteSuccess$.next(true),
        error => {
          console.log(error);
          this.voteSuccess$.next(false);
        }
      );
    }
  }
}
