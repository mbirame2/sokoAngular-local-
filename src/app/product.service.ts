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

  public apiURL:string="api.sokodakar.com/";
  private headers= new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token')).append('content-type', 'application/json');

  constructor(private httpClient:HttpClient,private _auth: SokoService ) { }


  getAllNouveaute(){
    return this.httpClient.get<any>(this.apiURL+"api/allnew",{headers:this.headers,observe:'response'})
  }
  
  getAllHomme(){
    return this.httpClient.get<any>(this.apiURL+"api/allhomme",{headers:this.headers,observe:'response'})
  }

  getAllFemme(){
    return this.httpClient.get<any>(this.apiURL+"api/allfemme",{headers:this.headers,observe:'response'})
  }

  addProductToCart(prodcuts: any) {
    localStorage.setItem("product", JSON.stringify(prodcuts));
  }

  getProductFromCart() {
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
