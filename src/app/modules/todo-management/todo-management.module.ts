import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoManagementComponent } from './todo-management.component';
import { ControlsModule } from '../controls/controls.module';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', component: TodoManagementComponent }
]

@NgModule({
  declarations: [TodoManagementComponent],
  imports: [
    CommonModule,
    ControlsModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ]
})
export class TodoManagementModule { }
