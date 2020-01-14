import { Component, forwardRef, ElementRef, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true
    }
  ]
})
export class CheckboxComponent implements ControlValueAccessor {
  @ViewChild('checkbox')
  _elementRef: ElementRef;

  _state: boolean;

  onChange = (_: any) => {};
  onTouched = () => {};

  constructor() {}

  writeValue(value: any): void {
    this._state = value;
  }

  registerOnChange(fn: (_: any) => {}): void {
    console.log(this._elementRef);
    this.onChange = () => fn(this._elementRef.nativeElement.value);
  }

  registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {}
}
