import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import {ProductService} from '../product.service'
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../environments/environment';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Array<any>;
  headers;
  pageTitle = 'Product List';
  URL;
  image;
  imageWidth = 75;
  imageMargin = 4;
  constructor(private productService: ProductService,private httpClient: HttpClient,private route: ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
   this.init_headers();
   this.getProductDetails();
  }

  init_headers(){
    this.headers = [
      {field: 'Image',header: 'IMAGE'},
      {field: 'Name',header: 'NAME'},
      {field: 'Price',header: 'PRICE'},
      {field: 'Description',header: 'DESCRIPTION'},
      {field: 'Show',header: 'SHOW'},
      {field: 'Edit',header: 'EDIT'},
      {field: 'Destroy',header: 'DESTROY'}
    ]
  }
  getProductDetails(){
     this.productService.productDetails().subscribe(res =>{
      this.products=res["products"];
    });
  }

}
