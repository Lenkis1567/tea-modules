import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { PopupComponent } from './common/popup/popup.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [    
    HeaderComponent,
    FooterComponent,
    PopupComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
  ],
  
  exports: [
    HeaderComponent,
    FooterComponent,
    PopupComponent
  ]
})
export class SharedModule { }
