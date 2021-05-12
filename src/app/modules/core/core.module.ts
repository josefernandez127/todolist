import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupByPipe } from './group-by.pipe';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [GroupByPipe],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [GroupByPipe]
})
export class CoreModule { }
