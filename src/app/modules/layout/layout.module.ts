import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { RouterModule } from '@angular/router';
import { ControlsModule } from '../controls/controls.module';



@NgModule({
  declarations: [LayoutComponent],
  imports: [
    CommonModule,
    RouterModule,
    ControlsModule
  ],
  exports: [RouterModule]
})
export class LayoutModule { }
