import { Component, OnInit } from '@angular/core';
import { ProductType } from '../../../types/product.type';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map, tap } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: ProductType[] = [];
  loading: boolean = false;
  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
  this.loading = true;
      this.http.get<ProductType[]>('https://testologia.ru/tea')
      .pipe(
        tap(()=> {
          this.loading = false
        })
      )
      .subscribe (
        {
          next: (data) => {
            this.products = data
          },
          error: (error) => {
            console.log(error);
            this.router.navigate(['/'])
          }
        }
      )
    }

goToProduct(product: ProductType): void {
  this.router.navigate(['/products', product.id]);
}


}   

