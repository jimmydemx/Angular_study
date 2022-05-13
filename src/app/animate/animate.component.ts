import { animate, animation, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-animate',
  templateUrl: './animate.component.html',
  styleUrls: ['./animate.component.scss'],
  animations:[
    trigger('square', [state('state1',style({'background-color':'red'})),
    state('state2',style({'background-color':'blue'})),
    transition('state2 => state1',animate(1000))
    ])
  ]
})
export class AnimateComponent implements OnInit {

  public squreState!:any;
  constructor() { }

  ngOnInit(): void {
  }


  onClick(){

    this.squreState = this.squreState== 'state1' ? 'state2': 'state1';

  }

}
