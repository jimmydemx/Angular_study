import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BehaviorSubject, concatMap, count, debounceTime, delay, delayWhen, filter, from, fromEvent, interval, merge, mergeMap, Observable, of, pairwise, ReplaySubject, Subject, switchMap, take, tap, timer, withLatestFrom } from 'rxjs';



@Component({
  selector: 'app-redux',
  template: `
    <p>
    {{OBS4$ | async}}
    </p>

    <span>coupling:</span>
    <p>BS_1: HTML {{ BS_1 |async |debugx:false:false:this}}</p>
    <p *ngIf="BS1Toggle">duplicate: {{ BS_1 |async}}</p>
    <p>{{CouplingOb_2$ | async}}</p>

    <a  *ngIf="isTabClicked"  autofocus='true' tabindex=1 href='#jump' class="jump">add jump</a>
    <address>12345678</address>
    
    <!------------------switchMap and concatMap----------------->
    <div> randomDelay : {{randomDelay | async}}  Switched:{{Switched |async}} Interval:{{Interval |async}}</div> 
    <div> randomDelay : {{randomDelay | async}}  Concated:{{Concated |async}} Interval:{{Interval |async}}</div> 
    <div>countSwitched:{{countSwitched |async}}</div>
    <!------------------end: switchMap and concatMap----------------->

    
    <<ng-container *ngIf="keyDownEvent | async"></ng-container>>
  `,
  styles: [
  ]
})
export class ReduxComponent implements OnInit,AfterViewInit {

  public OBS1$!:Observable<any>
  public OBS2$!:Observable<any>
  public OBS3$!:Observable<any>
  public OBS4$!:Observable<any>

  public isTabClicked= false;


  public keyDownEvent = merge((fromEvent(document,"keydown") as Observable<KeyboardEvent>),
  (fromEvent(document,"keyup") as Observable<KeyboardEvent>)
  ).pipe(
    debounceTime(250),
    tap(keyEvent=>{
      console.log("123",keyEvent);
      if(keyEvent.code =="Tab" && keyEvent.type =="keydown"){
        this.isTabClicked = true;
        this.cd.detectChanges();
        document.querySelector<HTMLInputElement>('a.jump')?.focus();
        document.querySelector("address")?.setAttribute("id","jump")
        
      }
      // pairwise(),
      // tap<KeyboardEvent[]>(keyEvents=>{
      //   keyEvents[0].code == "Tab" && keyEvents[1].code == "Space" &&
      //   document.querySelector("address")?.click();
      // })
  })

  )
   

  constructor(private cd:ChangeDetectorRef) {

    //------------------------ withLatestFrom ----------------------// 

    // all interval start with 0 : 0,1,2,3,4......
    this.OBS1$ = interval(3000)
    .pipe(take(1))  //if it only takes 1 value, it will never trigger the following value
    this.OBS2$ =  interval(1000);
    this.OBS3$ = interval(5000);

    // this.OBS1$ second value is 1, so this will trigger everything.
    this.OBS4$= this.OBS1$.pipe(tap(val=>console.log("withLatestfrom",val)),withLatestFrom(this.OBS2$,this.OBS3$)) // 1,5,0 -> 2,8,0, 
    // -------------------end : withLastetFrom--------------------// 
   }

    //----------------replaySubject-----------------//
    
    // ReplySubject will save (2) the values, that is emitted(by ReplySubject$.next(xxx)) BEFORE subscribe
    // if there is a SECOND subscribe, it will also save (2) the values before this SECOND subscription.
    public ReplySubject$ = new ReplaySubject(2);
    

  
    //----------------end: replaySubject-----------------//




   //----------------switchMap and concatMap-----------------//

  public Interval = interval(1000);
  public  randomDelay  = from([10,30]).pipe(delayWhen(val=>timer(val*200)))

  // after randomDelay started(send the first value), this.Interval then started, if randomDelay this.Interval will never started
  // switchMap(val=>this.Interval) has nothing to do with indivisually {{Interval | async}}, it is just another instance
  // the second value emitted by randomDelay will take all the value of this.inteval()<=> Interval will restart again
  // i.e. 10 take->0,1,2,3... 30 will also take->0,1,2,3...
  
  public Switched  = this.randomDelay.pipe(switchMap(val=>this.Interval))
  // if Interval doesnt end, Concated will not receive the value: randomDelay->30, almost be aware the inside observale have a end if use concatMap
  public Concated  = this.randomDelay.pipe(concatMap(val=>this.Interval.pipe(take(10))))

    //----------------end:switchMap and concatMap-----------------//




    //-------------------------count--------------------------//
     
    // both insdie and outside Observable shall complete(Interval and Switched/Concated) then count can emited a value
    //if one doesn't stop, a value will never emitted,Switched will not stop ,so the count() will never execute
    public countSwitched = this.Switched.pipe(count())
    public countConcated = this.Concated.pipe(count())
    //-----------------------end:count--------------------------//



  // all the async pipe/subscribe will be set before ngAfterViewInit(except those add after like using ngif);
  ngAfterViewInit(): void {
    console.log('rxjs AfterViewInit')
    this.ReplySubject$.subscribe(val=>console.log("ReplySubject$",val))
    this.ReplySubject$.next(4);
  }

  ngOnInit(): void {
    console.log("rxjs ngOnInit")
    this.ReplySubject$.next(1);
    this.ReplySubject$.next(2);
    this.ReplySubject$.next(3);

    this.BS_1_next_in_ngOnInit();
    setTimeout(() => {
      this.BS_2.next(3)
      //  this.CouplingOb_2$.next(3)
    }, 4000); 

    // setInterval(()=>{
    //   this.BS_1.next(6)
    // },2000)
  }


 
  //--------- BehaviorSubject and Async pipe inital value changes-------------//
  private a:Array<any>=[]
  public BS_1 =new BehaviorSubject<any>(this.a[0]);
  
  private BS_1_next_in_ngOnInit(){
  // case 1: here we give a a new value, however,(without this.BS_1.next(another value)), BS_1 |async will be null,
    this.a=[1,2]
  // case 2: WITH this.BS_1.next(another value)then the orignal this.a[0]=null, will be replaced by this.a, BS_1 |async will be [1,2]
    this.BS_1.next(this.a);
  // case 3: with more than one this.BS_1.next(value) and within ONE ChangeDetection(), it will only show the last value, thus this.a will be ignored,"abc" will be shown
    this.BS_1.next("abc");
  // case 4: set TImeout means another ChangeDetection(),BS1Toggle=true it will show the last value emited that is 'abc'
  setTimeout(() => {
    this.BS1Toggle =true;
  // case 5: within one ChangeDetection(), if there is another  this.BS_1.next(8), 'abc' will not be shown, only the last value 8 will be shown
    // this.BS_1.next(8)
  }, 2000);  
  }
  public BS1Toggle =false;
  //----------end: BehaviorSubject and Async pipe inital value changes---------------// 


  //----------------- Observable Coupling -------------------//
  public BS_2 = new Subject<any>();

  // if MergeMap still have CouplingOb_2$, it will create coupling, and {{CouplingOb_2| async}} can't return any value
  public CouplingOb_2$:any= this.BS_2.pipe(tap(val=>console.log("BS_2_before",val)),
                                          mergeMap(_=> this.CouplingOb_2$),
                                        tap(val=>console.log("BS_2_after",val)));
 

                                        

  //----------------- end: Observable Coupling -------------------//  
  
  
  // manually call subject.complete(), it can stop a subject forever, it will not response to furture subject.next()

  //------------------manually created Observable -----------------//

  // it pass a callback function inside, like (subscriber)=>{subscriber.next(1)}; so subscriber can be anything that can be passed inside
  // subscriber call be a class, and it has next, complete, and error methods
  public subscriber = new Observable((subscriber)=>{
    subscriber.next(1)
  })

  // meanwhile, subscriber= new Observable() has subscribe method
  public aaa=this.subscriber.subscribe(val=>{
    console.log(val)
  })

  //------------------end: manually created Observable -----------------//

}
