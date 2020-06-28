import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {Observable, of, config} from 'rxjs';
import { environment } from '../environments/environment';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  public token: string;
  public user;
  url: string;
  constructor(private http: HttpClient) { }
  login(data){
     return this.http.post(environment.apiUrl+'auth_user',data).pipe(map((res: HttpResponse<any>) => {
      localStorage.setItem('currentUser', JSON.stringify({
          user: res['user'],
          token: res['auth_token']
        }));
        this.user=res['user'],
        this.token=res['auth_token']
        return true;
     }))
  }

  public logout() {
    this.token = null;
    this.user = null;
    localStorage.removeItem('currentUser');
    return Observable.create(observer => {
      observer.next(true);
      observer.complete();
    });
  }

  productDetails(){
      return this.http.get(environment.apiUrl+'/products/');
  }

  createProduct(product,image){
    const formData = new FormData();
      formData.append('product[name]', product['name'])
      formData.append('product[price]',product['price'])
      formData.append('product[description]', product['description'])
      formData.append('product[image]',image)
      formData.append('product[features][comment]',product['features']['comment'])
      formData.append('product[features][color]',product['features']['color'])
      formData.append('product[features][rating]',product['features']['rating'])
      return this.http.post(environment.apiUrl+'/products',formData);
  }

  getting_product(id){
      return this.http.get(environment.apiUrl+'/products/'+id)
    }
  updateProduct(product,id){
    
    return this.http.patch(environment.apiUrl+'/products/'+id,product);
  }

  deleteProduct(id){
   return this.http.delete(environment.apiUrl+'/products/'+id);
  }

}
