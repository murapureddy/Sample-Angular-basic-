import { Component, OnInit,Input} from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import {ProductService} from '../product.service'
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from '../notification.service';
import { environment } from 'src/environments/environment';




@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  @Input() imageurl: string;
  products: Array<any>;
  headers;
  pageTitle = 'Product List';
  URL;
  searchText;
  parentMessage = "message from parent"
  image;
  selectedProduct;
  imageWidth = 75;
  imageMargin = 4;
  page: number = 1;
  constructor(private productService: ProductService,private httpClient: HttpClient,private route: ActivatedRoute,private router:Router,private notifyService : NotificationService) { }

  ngOnInit(): void {
   this.URL=environment.apiUrl;
   this.init_headers();
   this.getProductDetails();
  }

selectedHero;
onSelect(hero): void {
  this.selectedHero = hero;
  console.log(this.selectedHero);
}
  init_headers(){
    this.headers = [
      {field: 'Image',header: 'IMAGE'},
      {field: 'Name',header: 'NAME'},
      {field: 'Price',header: 'PRICE'},
      {field: 'Description',header: 'DESCRIPTION'},
      {field: 'Edit',header: 'EDIT'},
      {field: 'Destroy',header: 'DESTROY'}
    ]
  }
  getProductDetails(){
     this.productService.productDetails().subscribe(res =>{
      this.products=res["products"];
      /*this.totalRec = this.products.length;*/
    });
  }

  deleteMethod(id) {
  if(confirm("Are you sure to delete")) {
    this.deleteOwner(id)
  }
}

deleteOwner(id){
  this.productService.deleteProduct(id).subscribe(res =>{
      if(res['status']==200){
       this.notifyService.showSuccess("",res["message"]);
       location.href = '/product-list'
      }
    });
}

}
