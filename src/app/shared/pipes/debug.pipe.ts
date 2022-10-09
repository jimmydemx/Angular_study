import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'debugx'
})
export class DebugPipe implements PipeTransform {

  transform(value: any, isDebugger = false, skipNullOrUndefined = false,ComponentRef:any=null) {
    if (skipNullOrUndefined && (value === null || value === undefined)) {
      return value;
    }

    console.dir(value);

    if (isDebugger) {
      // tslint:disable-next-line:no-debugger
      debugger;
    }
    if(ComponentRef){
      console.dir(ComponentRef)
    }

    return value;
  }

}