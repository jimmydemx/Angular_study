import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab-select',
  template: `
    <div my-tab-select #tabCtrl="tabSelect">
      <button tabOptions="overview">Overview</button>
      <button tabOptions="settings">Settings</button>
    </div>

    <p>You selected: {{ tabCtrl.selected }}</p>

  `,
  styles: [
  ]
})
export class TabSelectComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
