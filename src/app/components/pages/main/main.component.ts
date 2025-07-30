import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, timer } from 'rxjs';

declare var $:any;

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {
  private popupTimerSub?: Subscription;

  constructor(private router: Router) { }
 
  
  ngOnInit(): void {
    $(".accordion-header").click(function (this: HTMLElement) {
      $(this).next(".accordion-content").slideToggle(200);
      $(this).find(".accordion-arrow").toggleClass("open");
      $(".accordion-content").not($(this).next()).slideUp(200);
      $(".accordion-arrow").not($(this).find(".accordion-arrow")).removeClass("open");
    });

      this.popupTimerSub = timer(10000).subscribe(() => {
      $('#promoModal').modal('show');
    });
}
  ngOnDestroy(): void {
   
    if (this.popupTimerSub) {
      this.popupTimerSub.unsubscribe();
    }

    // Hide modal if it's open
    $('#promoModal').modal('hide');

    $('.modal-backdrop').remove();
    $('body').removeClass('modal-open'); 
    $('body').css('padding-right', '');  
  }

    goToCatalog(): void {
    $('#promoModal').modal('hide');
    this.router.navigate(['/products']);
  }
}
