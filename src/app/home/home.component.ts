import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  interval,
  Subscription,
  Observable
} from 'rxjs'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  /*
   * This is a property subscription to hold our instanciated subscription,
   * so we can destroy it when we change of component, and prevent memory leak.
   * Please visit, https://rxjs-dev.firebaseapp.com/guide/observable.
  */
  private firstObsSubscription: Subscription

  constructor() { }

  ngOnInit() {
    /*
     * Here, we use the interval function of rxjs to work with a built-in subscription.
     * The purpose is to understand how the subscription works.
    */

    //This implementation of subscription will continue to work even if we change of component or route.
    //Here, we have a potential memory leak if we do not manage well this.
    /*
    interval(1000).subscribe(
      count => {
        console.log(count);
      }
    );
    */

    //Here, we hold the interval created in this property Subscription.
    /*
    this.firstObsSubscription = interval(1000).subscribe(
      count => {
        console.log(count);
      }
    );
    */

    //Here, we implement a custom observable

    //The Observable.create() method is deprecated now.
    //Here is the implementation with the current approach.
    const customInternalObservable: Observable<number> = new Observable(
      observer => {
        //This is a counter for the next execution of the observer.
        let count: number = 0;

        setInterval(() => {
          observer.next(count);
          count++;
        }, 1000);
      }
    );

    this.firstObsSubscription = customInternalObservable.subscribe(
      data => {
        console.log(data);
      }
    );
  }

  ngOnDestroy() {
    //Here, we destroy our instanciated component
    this.firstObsSubscription.unsubscribe();
  }

}
