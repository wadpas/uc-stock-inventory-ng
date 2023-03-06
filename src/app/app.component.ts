import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-root',
  template: `
    <div class="app-root">
      <form [formGroup]="form" (ngSubmit)="onSubmit()">
        <div formGroupName="store">
          <input type="text"
            placeholder="Branch ID"
            formControlName="branch">
          <input type="text"
            placeholder="Manager Code"
            formControlName="code">
        </div>
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
    })
  })

  onSubmit() {
    console.log('Submite', this.form.value)
  }
}

