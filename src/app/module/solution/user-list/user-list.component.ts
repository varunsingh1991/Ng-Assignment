import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/lib/service/user/user';
import { UserService } from 'src/app/lib/service/user/user.service';
import { SolutionComponent } from '../solution.component';
import { UserFormComponent } from '../user-form/user-form.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  limit : number = 5;
  skip : number = 0;
  total : number = 0;

  users !: any;
  error!: {}

  constructor(private userService : UserService,
    private modalService: NgbModal,
    private solutionComponent: SolutionComponent
    ) { }

  ngOnInit(): void {
    this.getUserList(this.limit, this.skip);
  }

  getUserList(limit:number, skip:number){
    this.userService.getPaginationData(limit, skip).subscribe((data) =>{
      this.users = data.users;
      this.total = data.total;
    }, (error)=>{
      this.error =error;
    })
  }

  callNextUserLot(){
    this.skip += this.limit;
    this.getUserList(this.limit, this.skip);
  }

  callPreviousUserLot(){
    this.skip -= this.limit;
    this.getUserList(this.limit, this.skip);
  }

  delete(id:number){

    this.userService.delete(id).subscribe((data) =>{
      console.log("user deleted", data)
      this.solutionComponent.showSuccessNotification("success", "User deleted successfully")
      this.getUserList(this.limit, this.skip);
    }, (error) =>{
      this.solutionComponent.showErrorNotification("error",error);
    });
  }

  openModal(id : number){
    console.log("Opening modal for", id)
    const modalRef = this.modalService.open(UserFormComponent, {size : 'lg'});
    modalRef.componentInstance.userId = id;
    modalRef.componentInstance.passEntry.subscribe((receivedEntry:any) => {
      this.solutionComponent.showSuccessNotification("success", "User updated successfully")

    });
  }
  openNewModal(){
    const modalRef = this.modalService.open(UserFormComponent, {size : 'lg'});
    modalRef.componentInstance.passEntry.subscribe((receivedEntry:any) => {
      this.solutionComponent.showSuccessNotification("success", "User updated successfully")

    });
  }

  setLimit(event : any){
    this.limit = event.target.value;
  }

  searchInput(event : any){
    // this.searchInput = event.target.value;
    if(event.target.value){
      let searchString = event.target.value;
      console.log(searchString);
      this.userService.getByKeyword(searchString, this.limit, this.skip).subscribe((data:any) =>{
        console.log("result",data);
        this.users = data.users;
        this.total = data.total;
      }, (err:any) =>{
        console.log("error",err);
      })
    }else{
      this.getUserList(this.limit, this.skip);
    }

  }
}
