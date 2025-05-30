import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appValid]'
})
export class ValidDirective {

  @Input() appValid: boolean = false;
  constructor(private _el: ElementRef<any>) { }

  @HostListener('keyup')
  onKeyup() {
    if (this.appValid) {
      this._el.nativeElement.className = "form-control is-valid";
    } else {
      this._el.nativeElement.className = "form-control is-invalid";
    }
  }
}
