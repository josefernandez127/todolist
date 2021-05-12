import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { ControlsModule } from '../controls/controls.module';



@NgModule({
  declarations: [ConfirmDialogComponent],
  imports: [
    CommonModule,
    ControlsModule
  ]
})
export class SharedModule { }
