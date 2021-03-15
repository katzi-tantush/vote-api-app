import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ILeaveBlockable } from 'src/app/component-interfaces/IleaveBlockable';
import { IParty } from 'src/app/models/IParty';
import { PartyService } from 'src/app/services/party.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'vote-cast',
  templateUrl: './vote-cast.component.html',
  styleUrls: ['./vote-cast.component.css']
})
export class VoteCastComponent implements OnInit, OnDestroy, ILeaveBlockable {
  parties$: Observable<IParty[]>;
  private leave: boolean = false;
  private voteSuccess: boolean;

  constructor(
    private partyService: PartyService,
    private userService: UserService,
  ) { }
  

  ngOnInit(): void {
    this.parties$ = this.partyService.getVoterViewParties();
    this.partyService.voteSuccess$.subscribe(voteCallSuccess=> this.voteSuccess = voteCallSuccess);
  }

  canLeave(): boolean {
    if (!this.leave) {
      this.leave = confirm('sure you wanna leave? You havent voted yet!!!');
    }
    return this.leave;
  }

  selectParty(party:IParty) {
    let sure: boolean = confirm(`you're about to vote for ${party.name} - are you sure?`);
    sure ? this.vote(party) : null;
  }

  vote(party: IParty) {
    this.partyService.vote(party);
    this.leave = this.voteSuccess;

    if (this.voteSuccess) {
      this.userService.user$.value.voted = true;
      alert("Thanks for voting - You're done here")
    }
    else {
      alert("something went wrong...")
    }
  }

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }
}
