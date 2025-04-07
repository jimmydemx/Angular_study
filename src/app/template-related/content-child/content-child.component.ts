import {Component, ContentChild, OnInit, TemplateRef} from '@angular/core';

@Component({
  selector: 'app-content-child',
  template: `
        <div *ngFor="let v of index">
            <ng-template [ngTemplateOutlet]="realContentInParent"  [ngTemplateOutletContext]="{i:v}">
            </ng-template>

        </div>
  `,
  styles: [
  ]
})
export class ContentChildComponent implements OnInit {

  index = [0,1,2,3]


  /**
   *  use content child to project the placeholder in child component(via ngTemplateOutlet) to the parent component(via #placeholderName
   *  <ng-content> can't be used, it can only project ONE content, here with ngFor, it referes to various content.
   */
  @ContentChild("realContentInParent",{static:false})
  realContentInParent!: TemplateRef<any>;

  constructor() { }

  ngOnInit(): void {
  }

}
