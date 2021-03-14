import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.css']
})
export class VoteComponent implements OnInit {

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.userService.user$.value == null) {
      alert('You have to be logged in to vote!')
      this.router.navigate(['login']);
    }

    let voted = this.userService.user$.value.voted;
    
    let routeTo: string = voted ? 'vote-dont-cast' : 'vote-cast';
    this.router.navigate([routeTo],{relativeTo: this.route})
  }

}
