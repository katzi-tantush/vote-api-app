import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IParty } from 'src/app/models/IParty';
import { PartyService } from 'src/app/services/party.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'vote-cast',
  templateUrl: './vote-cast.component.html',
  styleUrls: ['./vote-cast.component.css']
})
export class VoteCastComponent implements OnInit {
  parties$: Observable<IParty[]>;

  constructor(
    private partyService: PartyService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.parties$ = this.partyService.getVoterViewParties();
  }

  selectParty(party:IParty) {
    let sure: boolean = confirm(`you're about to vote for ${party.name} - are you sure?`);
    sure ? this.vote(party) : null;
  }

  vote(party:IParty) {
    this.partyService.vote(party);
    this.userService.user$.value.voted = true;
    this.router.navigate(['vote/vote-dont-cast']);
  }
}
