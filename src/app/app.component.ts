import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Product } from './app.interface';


@Component({
  selector: 'app-root',
  template: `
    <div class="app-root">
      <form [formGroup]="form" (ngSubmit)="onSubmit()">
        <stock-branch
          [parent]="form">
        </stock-branch>
        <stock-selector
          [parent]="form"
          [products]="products">
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

  products: Product[] = [
    { "id": 1, "price": 2800, "name": "MacBook Pro" },
    { "id": 1, "price": 50, "name": "USB-C Adaptor" },
    { "id": 1, "price": 400, "name": "iPod" },
    { "id": 1, "price": 900, "name": "iPhone" },
    { "id": 1, "price": 600, "name": "Apple Watch" }
  ]

  form = new FormGroup({
    store: new FormGroup({
      branch: new FormControl(),
      code: new FormControl()
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

