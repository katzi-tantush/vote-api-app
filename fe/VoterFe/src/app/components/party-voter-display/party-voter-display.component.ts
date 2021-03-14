import { Component, Input, OnInit } from '@angular/core';
import { IParty } from 'src/app/models/IParty';

@Component({
  selector: 'party-voter-display',
  templateUrl: './party-voter-display.component.html',
  styleUrls: ['./party-voter-display.component.css']
})
export class PartyVoterDisplayComponent implements OnInit {
  @Input() party: IParty;

  constructor() { }

  ngOnInit(): void {
  }
  
}
