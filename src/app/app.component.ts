import { Component } from '@angular/core';
import {ProductService} from '../../src/app/product.service'
import {ActivatedRoute, Router} from '@angular/router';
import { environment } from '../../src/environments/environment';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'shopping-cart';
  constructor(private router: Router,private  productService: ProductService) { }
  user;
  URL;

ngOnInit() {
     this.URL=environment.apiUrl;
     if(localStorage.currentUser !=undefined)
     {
      this.user=JSON.parse(localStorage.currentUser)["user"]
     }
  }
  logout() {
        this.productService.logout();
        this.router.navigate(['/login']);
    }
   

  }
