import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-use-as-component',
  template: `
    <!--    // 两种使用 directive的方法，* , 但是as好像是用不了-->
    <div *appUseAsDirective="'Admin user' as user; let u; let level=level">
      Logged in as :{{user}}
    </div>


    <ng-template [appUseAsDirective]="'Admin user'" let-a let-level="level">
      {{a}}
      {{level}}
    </ng-template>
  `,
  styles: [
  ]
})
export class UseAsComponentComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}


