import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SolutionComponent } from './solution.component';
import { UserFormComponent } from './user-form/user-form.component';
import { UserListComponent } from './user-list/user-list.component';

const routes: Routes = [
  {
    path: '', component: SolutionComponent, children:[
      {
        path : '', component: UserListComponent
      },
      {
        path : 'new', component : UserFormComponent
      },
      {
        path : 'update', children : [
          {
            path : ':id', component : UserFormComponent
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SolutionRoutingModule { }
