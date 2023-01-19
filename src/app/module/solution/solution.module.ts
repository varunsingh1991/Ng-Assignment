import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SolutionRoutingModule } from './solution-routing.module';
import { SolutionComponent } from './solution.component';
import { UserFormComponent } from './user-form/user-form.component';
import { UserListComponent } from './user-list/user-list.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDropdownModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    SolutionComponent,
    UserFormComponent,
    UserListComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ToastrModule.forRoot(),
    NgbTooltipModule,
    NgbDropdownModule,
    ReactiveFormsModule,
    SolutionRoutingModule
  ],
  entryComponents:[
    UserFormComponent
  ],
  providers : [
    {provide: ToastrService, useClass: ToastrService}
  ]
})
export class SolutionModule { }
