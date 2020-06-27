import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import {ProductService} from '../product.service'
import {FormBuilder,FormGroup,Validators,FormControl} from '@angular/forms';

@Component({
  selector: 'app-product-new',
  templateUrl: './product-new.component.html',
  styleUrls: ['./product-new.component.css']
})
export class ProductNewComponent implements OnInit {
  productForm;
  image;
  submitted:boolean=false;


  constructor(private route:ActivatedRoute,private router:Router,private productService: ProductService,private formBuilder: FormBuilder) { 
  this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      category: [''],
      price: [''],
      image: [''],
      features: new FormGroup({
      comment: new FormControl(''),
      rating: new FormControl(''),
      color: new FormControl('')
      })   
    })
  
  }

  ngOnInit(): void {
  }

   processFile(image){
    if(image.target.files && image.target.files[0]){
      this.image = image.target.files[0]
    }
  }
  get f() { return this.productForm.controls; }

  createProduct(){
   this.productService.createProduct(this.productForm.value,this.image).subscribe(res =>{
     if(res['status']==200){
       this.router.navigate(['/product-list']);
     }
   })    
  }

}
