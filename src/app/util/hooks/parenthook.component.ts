import { ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { combineLatest, concatMap, interval, map, mergeMap, observable, of, Subject, switchMap, tap } from 'rxjs';
import { HookDirective } from './direc.directive';

@Component({
  selector: 'app-comp',
  template: `
      <!-- 1. Check that DOM appears after Manually call detectChanges() -->
      <button (click)="OnClick()">Click here</button>
      <div #div *ngIf="showDIV"></div>
      <!-- end: Check that DOM appears after Manually call detectChanges() -->

      <!-- 2. get the directive instance in the component  -->
      <!-- Note:
          in directive decoration, use "exportAs:'hookdirective'",
          in component specify "#xxx = hookdirective "
          then use viewChild to get the directive
      -->
      <app-childhook #hd='hookdirective' appDirec="123"></app-childhook>
      <!-- end: get the directive instance in the component -->


      <!-- <p>{{this.Subject | async}}</p> -->
      <!-- <p>{{combinedObservable |async}}</p>
      <p>{{obs_2 | async}}</p> -->

      <!-- <p>{{AAA | async}}</p> -->



`,
})
export class ParentHookComponent implements OnInit {

  public  toChild!:string;
  @Input() parent!:any;
  public showDIV =false;
  @ViewChild('div') divDOM!:ElementRef;
  public  Subject = new Subject<any>();

  public AAA = this.Subject.asObservable().pipe(tap(val=>console.log("AAA",val)));
  public obs_1= interval(1000);
  public obs_2 = this.obs_1.pipe(mergeMap(val=>{
    console.log('obs_2',val)
    if(val>2){
     this.Subject.next(val)
    }
    return this.AAA


  })
  ,tap(val=>console.log('ffa',val)))

  public combinedObservable = combineLatest([this.AAA,this.obs_1]).pipe(tap(val=>console.log("cobined",val)),map(([a,b])=>a+b))


  @ViewChild('hd') hookDirective!: HookDirective;

  constructor(private ChangeDetectorRef: ChangeDetectorRef) {

    console.log('Parent constructor')

   }

  ngOnChanges(){

    console.log('Parent Onchanges')

  }

  ngOnInit(){
    console.log('Parent Init')
    this.toChild = "12345"

  }

  ngAfterViewInit(){
    console.log('hookdirective',this.hookDirective);
  }


  OnClick(){
    this.showDIV = true;

    //-----1. Check that DOM appears after Manually call detectChanges()-----//

    console.log("divDOM before manually detect changes", this.divDOM?.nativeElement)
    // result : divDOM before manually detect changes undefined

    this.ChangeDetectorRef.detectChanges();
    //  this.Subject.next();

    console.log("divDOM after manually detect changes", this.divDOM?.nativeElement)
    // result: divDOM after manually detect changes <div>​</div>​

    //-----1. Check that DOM appears after Manually call detectChanges()-----//



  }


}
