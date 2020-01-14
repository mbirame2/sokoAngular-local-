import { Injectable } from '@angular/core';
import { HttpClient,HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError, pipe} from "rxjs"
import { map, filter, catchError, mergeMap } from 'rxjs/operators';
import { Product } from './Models/Product.Model';
import { SokoService } from './soko.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public apiURL:string="http://localhost:50148/api/Products";
  routes='http://5.189.184.223/'
  private headers= new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));

  constructor(private httpClient:HttpClient,private _auth: SokoService ) { }


  getAllNouveaute(){
    return this.httpClient.get<any>(this.routes+"api/allnew",{headers:this.headers,observe:'response'})
  }
  
  getAllHomme(){
    return this.httpClient.get<any>(this.routes+"api/allhomme",{headers:this.headers,observe:'response'})
  }

  getAllFemme(){
    return this.httpClient.get<any>(this.routes+"api/allfemme",{headers:this.headers,observe:'response'})
  
  }
  addProductToCart(prodcuts: any) {
    localStorage.setItem("product", JSON.stringify(prodcuts));
  }
  getProductFromCart() {
    //return localStorage.getItem("product");
    return JSON.parse(localStorage.getItem('product'));
  }
  getToken() {
    //return localStorage.getItem("product");
    return localStorage.getItem('token');
  }
  removeAllProductFromCart() {
    return localStorage.removeItem("product");
  }
  errorHandler(error: Response) {  
    console.log(error);  
    return throwError(error);  
}   
}
