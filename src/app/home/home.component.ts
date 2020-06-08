import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  interval,
  Subscription,
  Observable
} from 'rxjs'
import { map, filter } from 'rxjs/operators'

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
  private secondObsSubscription: Subscription

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

    //Here, we implement the pipe with map and filter to a custom observable that complete.
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

    //To check more operators, please visit https://www.learnrxjs.io/learn-rxjs/operators.
    this.secondObsSubscription = customInternalObservable.pipe(filter(
      //Here, we filter the data received by a bool.
      //We pass the data to the map function if this evaluation is true.
      data => {
        //In this case, the first number will be skipped.
        return data > 0;
      }
    ), map(
      //Here, we map the data of type number received and transformed to a type string.
      (data: number) => {
        return 'Round ' + (data + 1);
      }
    )).subscribe(
      data => {
        console.log('secondObsSubscription - the value is ' + data);
      }, error => {
        console.log('secondObsSubscription - the error message receive was ' + error);
        alert(error.message);
      }, () => {
        console.log('secondObsSubscription - Completed!');
      }
    );
  }

  ngOnDestroy() {
    //Here, we destroy our instantiated subscriptions.
    this.firstObsSubscription.unsubscribe();
    this.errorObsSubscription.unsubscribe();
    this.completeObsSubscription.unsubscribe();
    this.secondObsSubscription.unsubscribe();
  }

}
