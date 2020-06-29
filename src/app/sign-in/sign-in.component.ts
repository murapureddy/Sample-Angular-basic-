import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, FormControl,Validators } from '@angular/forms';
import {ProductService} from '../product.service'
import { NotificationService } from '../notification.service'



@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  loginForm: FormGroup;
  submitted:boolean=false;
  constructor(private route: ActivatedRoute,private fb: FormBuilder,private productService: ProductService, private router: Router,private notifyService : NotificationService) {
  this.loginForm = this.fb.group({
      'email' : ['', [Validators.required, Validators.email]],
      'password' : [null, [Validators.required, Validators.minLength(5)]],
    });
   }

  ngOnInit(): void {
  }

  signIn(data){
    this.productService.login(this.loginForm.value).subscribe(res =>{
      if(res==true){
        this.notifyService.showSuccess("","User Signed in Successfully");
         location.href = '/product-list'
      }
      else{
        this.notifyService.showError("","Invalid Email and Password")
        this.router.navigate(['/login'])
      }
    });
  }
  get f() { return this.loginForm.controls; }

}
