import { Component, OnInit, OnDestroy } from '@angular/core';

import { UserService } from './user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  userActivated: boolean;
  userActivatedBySubject: boolean;
  private activatedSub: Subscription;
  private activatedSubBySubject: Subscription;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    this.userActivated = false;
    this.userActivatedBySubject = false;

    this.activatedSub = this.userService.activatedEmitter.subscribe(
      isActivated => {
        this.userActivated = isActivated;
      }
    );

    this.activatedSubBySubject = this.userService.activatedSubject.subscribe(
      isActivated => {
        this.userActivatedBySubject = isActivated;
      }
    );
  }

  ngOnDestroy() {
    this.activatedSub.unsubscribe();
    this.activatedSubBySubject.unsubscribe();
  }
}
