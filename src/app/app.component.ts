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
          [products]="products"
          (added)="addStock($event)">
        </stock-selector>
        <stock-products
          [parent]="form"
          (removed)="removeStock($event)">
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
    { "id": 2, "price": 50, "name": "USB-C Adaptor" },
    { "id": 3, "price": 400, "name": "iPod" },
    { "id": 4, "price": 900, "name": "iPhone" },
    { "id": 5, "price": 600, "name": "Apple Watch" }
  ]

  form = new FormGroup({
    store: new FormGroup({
      branch: new FormControl(),
      code: new FormControl()
    }),
    selector: this.createStock({ product_id: 0, quantity: 10 }),
    stock: new FormArray([
      this.createStock({ product_id: 2, quantity: 50 }),
      this.createStock({ product_id: 3, quantity: 20 })
    ])
  })

  createStock(stock) {
    return new FormGroup({
      product_id: new FormControl(parseInt(stock.product_id)),
      quantity: new FormControl(stock.quantity)
    })
  }

  addStock(stock) {
    const control = this.form.get('stock') as FormArray
    control.push(this.createStock(stock))
  }

  removeStock(i) {
    const control = this.form.get('stock') as FormArray
    control.removeAt(i)
  }

  onSubmit() {
    console.log('Submite', this.form.value)
  }

}

