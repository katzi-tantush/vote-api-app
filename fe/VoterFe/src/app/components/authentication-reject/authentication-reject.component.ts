import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'authentication-reject',
  templateUrl: './authentication-reject.component.html',
  styleUrls: ['./authentication-reject.component.css']
})
export class AuthenticationRejectComponent implements OnInit {
  rejectMessage: Observable<string>;

  constructor(private authenticationService:AuthenticationService) { }

  ngOnInit(): void {
    this.rejectMessage = this.authenticationService.authenticationRejectMessage
      .asObservable();
  }

}
