import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  productTitle: string = '';
  orderForm!: FormGroup;
  errorOnSubmit = false;
  private subscriptionOrder:Subscription | null = null;
  isSubmittedSuccessfully = false;

  constructor(private fb: FormBuilder, private router: Router, private http: HttpClient) {}


ngOnInit(): void {
    const state = window.history.state;
    const productTitle = state?.['productTitle'] || '';

    this.orderForm = this.fb.group({
      product: [{ value: productTitle, disabled: true }, [[Validators.required], Validators.pattern('^[a-zA-Z]+$') ]],
      firstName: ['', [Validators.required, Validators.pattern('^[a-zA-Zа-яА-ЯёЁ\\s-]+$') ]],
      lastName: ['', [Validators.required, Validators.pattern('^[a-zA-Zа-яА-ЯёЁ\\s-]+$')]],
      phone: ['', [Validators.required, Validators.pattern(/^(\+?\d{11}|\d{11})$/)]],
      country: ['', [Validators.required]],
      zip: ['', [Validators.required]],
      address: ['', [Validators.required, Validators.pattern(/^[a-zA-Zа-яА-Я0-9\s\-\/]+$/)]],
      comment: ['']
    });
  }


onSubmit() {
    this.errorOnSubmit = false; //сброс ошибки
   if (this.orderForm.invalid) {
      this.orderForm.markAllAsTouched(); // показать ошибки
      return;
    }

    const formData = {
      ...this.orderForm.getRawValue(), // + disabled поля
      name: this.orderForm.get('firstName')?.value,
      last_name: this.orderForm.get('lastName')?.value,
    };

    this.subscriptionOrder = this.sendOrder(formData).subscribe({
      next: (response) => {
        if (response.success && !response.message) {
          this.isSubmittedSuccessfully = true;
          this.orderForm.reset();
            setTimeout(() => {
            this.isSubmittedSuccessfully = false; // hide the message
          }, 3000);
        } else {
           this.errorOnSubmit = true; 
        }
      },
      error: (err) => {
        this.errorOnSubmit = true;
        console.error(err, "Ошибка!");
      }
    });
  }

  sendOrder(data: {
    name: string, 
    last_name: string, 
    phone: string, 
    country: string, 
    zip: string, 
    product: string, 
    address: string, 
    comment: string|null
  }) {
    return this.http.post<{success: boolean, message?: string}>(' https://testologia.ru/order-tea', data)
  }
}
