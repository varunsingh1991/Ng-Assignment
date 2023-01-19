import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/lib/service/user/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  @Input() public userId !: number;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();

  pageTitle !: string;
  error !: string;
  uploadError !: string;
  imagePath !: any;
  userForm !: FormGroup;

  constructor(public activeModal : NgbActiveModal,  private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    ) { }

  ngOnInit(): void {
    console.log("Caught user id on modal", this.userId)
    if(this.userId){
      this.pageTitle = " Edit User";
      this.getUserById(this.userId);
    }else{
      this.pageTitle = "Create New User"
    }

    this.userForm = this.fb.group({
      id : [''],
      firstName : ['', Validators.required],
      lastName : ['', Validators.required],
      age : ['', Validators.required],
      gender : ['', Validators.required],
      email : ['', Validators.required],
      image : [''],
      company : this.fb.group({
        name : ['', Validators.required]
      }),
      address : this.fb.group({
        address : ['', Validators.required],
        city : ['', Validators.required],
        postalCode : ['', Validators.required],
        state : ['', Validators.required]
      })

    })
  }

  get firstName() { return this.userForm.get('firstName'); }
  get lastName() { return this.userForm.get('lastName'); }
  get age() { return this.userForm.get('age'); }
  get gender() { return this.userForm.get('gender'); }
  get email() { return this.userForm.get('email'); }
  get image() { return this.userForm.get('image'); }


  // get controls(){
  //   return this.userForm.controls;
  // }
  // get addressControls(){
  //   return ((this.userForm.get('address') as FormGroup).controls)
  // }
  onSelectedFile(event:any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log(file)



      this.userForm.get('image')!.setValue(file);

      const reader = new FileReader();
    reader.onload = () => {
      this.imagePath = reader.result as string;
    }
    reader.readAsDataURL(file)
      console.log(file);

      // this.imagePath=file;

    }
  }

  getUserById(id:number){
    this.userService.getById(id).subscribe((user:any) =>{
      console.log("user by id", user)
      this.userForm.patchValue({
        firstName : user['firstName'],
        lastName : user.lastName,
        age : user.age,
        gender : user.gender,
        email : user.email,
        company :{
          name : user.company.name
        },
        address :{
          address : user.address.address,
          city : user.address.city,
          postalCode : user.address.postalCode,
          state : user.address.state
        }
      })
      this.imagePath=user.image;
    });
  }
  passBack(data : any) {
    this.passEntry.emit(""+this.userId+" reverting back");
  }

  onSubmit(){
    if(this.userId){
      console.log("onSubmit", this.userId);
      this.userService.update(this.userId, JSON.stringify(this.userForm.value)).subscribe((result)=>{
        this.activeModal.dismiss('Cross click')
        this.passBack(result);
      },(error)=>{
        console.log("error", error)
      })
    }else{
      this.userService.create(JSON.stringify(this.userForm.value)).subscribe((result)=>{
        this.activeModal.dismiss('Cross click')
        this.passBack(result);
      },(error)=>{
        console.log("error", error)
      })
    }

  }
}
