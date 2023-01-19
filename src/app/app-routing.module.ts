import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssignmentComponent } from './assignment/assignment.component';

const routes: Routes = [
  {
    path : '', children : [
      {
        path :'assignment', component:AssignmentComponent
      },

      {
        path: 'solution', loadChildren: () => import('./module/solution/solution.module').then(m => m.SolutionModule)
      }

    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
