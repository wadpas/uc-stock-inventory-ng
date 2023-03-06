import { Component, Input } from "@angular/core";
import { FormGroup } from "@angular/forms";

@Component({
    selector: 'stock-products',
    styleUrls: ['stock-products.component.scss'],
    template: `
    <div [formGroup]="parent" class="stock-products">
        <div>stock-products</div>
    </div>`
})
export class StockProductsComponent {
    @Input() parent: FormGroup
}   