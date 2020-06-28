import { Component, OnInit,Input,OnChanges ,SimpleChanges} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductService} from '../product.service'
import { environment } from 'src/environments/environment';




@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product_id:string
  pageTitle = 'Product Detail';
  product;
  URL;

  constructor(private route:ActivatedRoute,private router:Router,private productService: ProductService){

  }

  ngOnInit(): void {
    this.URL=environment.apiUrl;
    this.route.paramMap.subscribe(params => {
     this.product_id=params.get('id');
     this.getProduct();
     });
  }

 getProduct(){
   this.productService.getting_product(this.product_id).subscribe(res => {
          this.product=res['product']
    })
  }
  onBack(): void {
    this.router.navigate(['/product-list']);
  }

}
