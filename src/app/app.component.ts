import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { Item, Product } from './app.interface';
import { AppService } from './app.service';


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
export class AppComponent implements OnInit {
  products: Product[] = []

  constructor(
    private fb: FormBuilder,
    private appService: AppService
  ) { }

  ngOnInit() {
    this.appService
      .getProducts()
      .subscribe((products: Product[]) => this.products = products)

    this.appService
      .getCartItems()
      .subscribe((cart: Item[]) => cart.forEach(item => this.addStock(item)))
  }

  form = this.fb.group({
    store: this.fb.group({
      branch: '',
      code: ''
    }),
    selector: this.createStock({ product_id: 0, quantity: 10 }),
    stock: this.fb.array([])
  })

  createStock(stock) {
    return this.fb.group({
      product_id: (parseInt(stock.product_id)),
      quantity: (stock.quantity)
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

