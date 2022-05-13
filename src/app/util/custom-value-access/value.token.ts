import { InjectionToken } from "@angular/core";
import { bridge } from './value.interface';

export const BRIDGE = new InjectionToken<bridge>('bridge');