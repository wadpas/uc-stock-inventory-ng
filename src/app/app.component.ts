import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-root',
  template: `
    <div class="app-root">
      <form [formGroup]="form" (ngSubmit)="onSubmit()">

        <stock-branch
          [parent]="form">
        </stock-branch>
        <stock-selector
          [parent]="form">
        </stock-selector>
        <stock-products
          [parent]="form">
        </stock-products>

        <div class="stock-inventory_buttons">
          <button
            type="submit"
            [disabled]="form.invalid">
            Order stock
          </button>
        </div>
        <pre>{{ form.value | json }}</pre>
      </form>
    </div>
  `
})
export class AppComponent {
  form = new FormGroup({
    store: new FormGroup({
      branch: new FormControl('1'),
      code: new FormControl('2')
    }),
    selector: new FormGroup({
      product_id: new FormControl(''),
      quantity: new FormControl(10)
    }),
    stock: new FormArray([])
  })

  onSubmit() {
    console.log('Submite', this.form.value)
  }
}

