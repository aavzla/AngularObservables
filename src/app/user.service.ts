import {
  Injectable,
  EventEmitter
} from '@angular/core';
import { Subject } from 'rxjs'

@Injectable({ providedIn: 'root' })
export class UserService {
  //This is the case when we use event emitter to communicate cross-component.
  //This is not the right approach to cross-component communication.
  //We should use the event emitter for event binding communication.
  //The nature of the event emitter is unicast.
  activatedEmitter: EventEmitter<boolean>;
  //This is the case when we use subject to communicate cross-platform.
  //This is the right approach to cross-component communication.
  //The nature of the event emitter is multicast.
  activatedSubject: Subject<boolean>;

  constructor() {
    this.activatedEmitter = new EventEmitter<boolean>();
    this.activatedSubject = new Subject<boolean>();
  }
}
