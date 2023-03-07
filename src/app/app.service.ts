import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError } from "rxjs";
import { Item, Product } from "./app.interface";


@Injectable()
export class AppService {
    constructor(private http: HttpClient) { }


    getCartItems() {
        return this.http
            .get<Item[]>('http://localhost:3000/cart')
            .pipe(
                catchError((err: HttpErrorResponse) => {
                    throw `Error details: ${err.message}`
                }),
            )
    }

    getProducts() {
        return this.http
            .get<Product[]>('http://localhost:3000/products')
            .pipe(
                catchError((err: HttpErrorResponse) => {
                    throw `Error details: ${err.message}`
                })
            )
    }
}