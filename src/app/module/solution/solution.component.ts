import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-solution',
  templateUrl: './solution.component.html',
  styleUrls: ['./solution.component.scss']
})
export class SolutionComponent implements OnInit {

  constructor(private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  showSuccessNotification(heading : string, message:string){
    this.toastr.success(message, heading);
  }

  showWarningNotification(heading : string, message:string){
    this.toastr.warning(message, heading);
  }

  showErrorNotification(heading : string, message:string){
    this.toastr.error(message, heading);
  }

  showInfoNotification(heading : string, message:string){
    this.toastr.info(message, heading);
  }

  showNotification(heading : string, message:string){
    this.toastr.show(message, heading);
  }

}
