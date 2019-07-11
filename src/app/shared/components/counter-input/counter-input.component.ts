import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, FormControl } from '@angular/forms';

export function validateCounterRange(c: FormControl) {
  let err = {
    rangeError: {
      given: c.value,
      min: 1
    }
  };
  
  return (c.value < 1) ? err : null;
}

@Component({
  selector: 'app-counter-input',
  templateUrl: './counter-input.component.html',
  styleUrls: ['./counter-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef( () => CounterInputComponent ),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useValue: validateCounterRange,
      multi: true
    }
  ]

})
export class CounterInputComponent implements ControlValueAccessor {
  //https://blog.thoughtram.io/angular/2016/07/27/custom-form-controls-in-angular-2.html

  @Input() _counterValue = 0;

  constructor() { }

  ngOnInit() {
  }

  get counterValue() {
    return this._counterValue;
  }

  set counterValue( val ) {
    this._counterValue = val;
    this.propagateChange( this._counterValue );
  }

  writeValue(obj: any): void {
    if ( obj !== undefined ){
      this.counterValue = obj;
    }
  }

  propagateChange(_: any) {
    console.log('propagate changes...');
    console.log(_);
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }
  registerOnTouched(fn: any): void {
    
  }
  setDisabledState?(isDisabled: boolean): void {
    throw new Error("Method not implemented.");
  }

  increment() {
    this.counterValue++;
  }

  decrement() {
    this.counterValue--;
  }
}
