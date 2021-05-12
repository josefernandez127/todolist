import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './modules/layout/layout.component';

const routes: Routes = [
  {
    path: "app",
    component: LayoutComponent,
    children: [
      {
        path: "list",
        loadChildren: () => import('../app/modules/todo-list/todo-list.module').then(m => m.TodoListModule)
      },
      {
        path: "new",
        loadChildren: () => import('../app/modules/todo-management/todo-management.module').then(m => m.TodoManagementModule)
      }
    ]
  },
  { path: "", redirectTo: "app/list/all", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
