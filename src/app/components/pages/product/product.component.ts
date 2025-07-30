import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ProductType } from '../../types/product.type';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})

export class ProductComponent implements OnInit {
  product!: ProductType;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      this.router.navigate(['/']);
      return;
    }

    this.http.get<ProductType[]>('http://testologia.ru/tea').subscribe({
      next: (products) => {
        const found = products.find(p => p.id.toString() === id);
        if (found) {
          this.product = found;
        } else {
          console.error('Product not found');
          this.router.navigate(['/']);
        }
      },
      error: (err) => {
        console.error(err);
        this.router.navigate(['/']);
      }
    });
  }

  goToProducts(): void {
    this.router.navigate(['/products']);
}
addToCart(): void {
  this.router.navigate(['/order'], { state: { productTitle: this.product.title } });
}

}