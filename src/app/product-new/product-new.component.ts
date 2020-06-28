import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import {ProductService} from '../product.service'
import {FormBuilder,FormGroup,Validators,FormControl} from '@angular/forms';
import { NotificationService } from '../notification.service'



@Component({
  selector: 'app-product-new',
  templateUrl: './product-new.component.html',
  styleUrls: ['./product-new.component.css']
})
export class ProductNewComponent implements OnInit {
  productForm;
  image;
  submitted:boolean=false;
  product_id:string;
  isNew;

  constructor(private route:ActivatedRoute,private router:Router,private productService: ProductService,private formBuilder: FormBuilder,private notifyService : NotificationService) { 
  this.productForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      description: ['', [Validators.required, Validators.minLength(25)]],
      price: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      image: [''],
      features: new FormGroup({
      comment: new FormControl(''),
      rating: new FormControl(''),
      color: new FormControl('')
      })   
    })
  
  }

  ngOnInit(): void {
   if(this.router.url.includes("/product-form")){
         this.isNew=true;
    }
    else{
     this.route.paramMap.subscribe(params => {
     this.product_id=params.get('id');
     this.isNew=false;
     this.getProduct();
     });
  }
  }

   processFile(image){
    if(image.target.files && image.target.files[0]){
      this.image = image.target.files[0]
    }
  }
  get f() { return this.productForm.controls; }

  createProduct(){
  if(this.product_id==undefined){
   this.productService.createProduct(this.productForm.value,this.image).subscribe(res =>{
     if(res['status']==200){
       this.notifyService.showSuccess("",res["message"]);
       this.router.navigate(['/product-list']);
      }
   })    
   }
   else{
     this.productService.updateProduct(this.productForm.value,this.product_id).subscribe(res =>{
     if(res['status']==200){
       this.notifyService.showSuccess("",res["message"])
       this.router.navigate(['/product-list']);
      }
   })
   }
  }
  getProduct(){
   this.productService.getting_product(this.product_id).subscribe(res => {
          this.productForm.patchValue(res["product"])
    })
  }

  

}
