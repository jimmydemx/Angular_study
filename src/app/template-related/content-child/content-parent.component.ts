import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-content-parent',
  template: `
        <app-content-child>
          <!--   Note: use placeholder name #realContentInParent of the child component       -->
          <ng-template #realContentInParent let-i=i>
            <p>this is the index: {{i}}</p>
          </ng-template>
        </app-content-child>
  `,
  styles: [
  ]
})
export class ContentParentComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
