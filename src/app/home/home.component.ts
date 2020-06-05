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
   * These are properties subscription to hold our instanciated subscriptions,
   * so we can destroy them when we change of component, and prevent memory leak.
   * Please visit, https://rxjs-dev.firebaseapp.com/guide/observable.
  */
  private firstObsSubscription: Subscription
  private errorObsSubscription: Subscription
  private completeObsSubscription: Subscription

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
    let customInternalObservable: Observable<number> = new Observable(
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
        console.log('firstObsSubscription - the value is ' + data);
      }
    );

    //Here, we implement a custom observable that throws an error.
    customInternalObservable = new Observable(
      observer => {
        //This is a counter for the next execution of the observer.
        let count: number = 0;

        //Here, we are forcing an error, so we can handle the error.
        setInterval(() => {
          if (count > 3) {
            observer.error(new Error('Count is greater than 3!'));
          }
          observer.next(count);
          count++;
        }, 1000);
      }
    );

    this.errorObsSubscription = customInternalObservable.subscribe(
      data => {
        console.log('errorObsSubscription - the value is ' + data);
      }, error => {
        console.log('errorObsSubscription - the error message receive was ' + error);
        alert(error.message);
      }
    );

    //Here, we implement a custom observable that complete.
    customInternalObservable = new Observable(
      observer => {
        //This is a counter for the next execution of the observer.
        let count: number = 0;

        //Here, we are forcing to complete, so we can handle the completion.
        setInterval(() => {
          if (count === 5) {
            observer.complete();
          }
          observer.next(count);
          count++;
        }, 1000);
      }
    );

    this.completeObsSubscription = customInternalObservable.subscribe(
      data => {
        console.log('completeObsSubscription - the value is ' + data);
      }, error => {
        console.log('completeObsSubscription - the error message receive was ' + error);
        alert(error.message);
      }, () => {
        console.log('completeObsSubscription - Completed!');
      }
    );
  }

  ngOnDestroy() {
    //Here, we destroy our instantiated subscriptions.
    this.firstObsSubscription.unsubscribe();
    this.errorObsSubscription.unsubscribe();
    this.completeObsSubscription.unsubscribe();
  }

}
