import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription, timer } from 'rxjs';
import { PopupComponent } from '../../shared/common/popup/popup.component';

declare var $:any;

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {
  private popupTimerSub?: Subscription;

  constructor(private router: Router, private modalService: NgbModal) { }



  
  ngOnInit(): void {
    $(".accordion-header").click(function (this: HTMLElement) {
      $(this).next(".accordion-content").slideToggle(200);
      $(this).find(".accordion-arrow").toggleClass("open");
      $(".accordion-content").not($(this).next()).slideUp(200);
      $(".accordion-arrow").not($(this).find(".accordion-arrow")).removeClass("open");
    });

    this.popupTimerSub = timer(10000).subscribe(() => {
      this.openPopup();
    });
}

  openPopup() {
    this.modalService.open(PopupComponent, { centered: true });
  }

  ngOnDestroy(): void {
   
    if (this.popupTimerSub) {
      this.popupTimerSub.unsubscribe();
    }

  }

  //   goToCatalog(): void {
  //   $('#promoModal').modal('hide');
  //   this.router.navigate(['/products']);
  // }
}
