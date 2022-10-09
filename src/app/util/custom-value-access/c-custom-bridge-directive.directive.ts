import { Directive, Inject } from '@angular/core';
import { bridge } from './value.interface';
import { BRIDGE } from './value.token';

@Directive({
  selector: '[appCCustomBridgeDirective]'
})
export class CCustomBridgeDirectiveDirective {

  constructor(@Inject(BRIDGE) private bridge:bridge) { 

    console.log('directive bridge', this.bridge)
  }

}
