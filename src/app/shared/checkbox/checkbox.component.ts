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
  elementRef: ElementRef;

  state: boolean;

  onChange = (_: any) => {};
  onTouched = () => {};

  constructor() {}

  writeValue(value: any): void {
    this.state = value;
  }

  registerOnChange(fn: (_: any) => {}): void {
    this.onChange = () => fn(this.elementRef.nativeElement.checked);
  }

  registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {}
}
