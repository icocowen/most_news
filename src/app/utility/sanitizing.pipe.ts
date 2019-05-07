import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'sanitizing'
})
export class SanitizingPipe implements PipeTransform {
  constructor(private dom: DomSanitizer
    ){

  }
  transform(value: any): any {
    return this.dom.bypassSecurityTrustHtml(value);
  }

}
