import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-popup',
  template: ` 
<div class="modal-body text-center">
  <h5 class="modal-title mb-3">Посмотрите наши чайные коллекции</h5>
  <button class="btn btn-primary" (click)="goToCatalog()">Смотреть</button>
</div>`
 
})

export class PopupComponent {
  constructor(public activeModal: NgbActiveModal, private router: Router) {}

  goToCatalog():void {
    this.router.navigate(['/products']);
    this.activeModal.close();
  }
}
