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

  public apiURL:string=" https://api.sokodakar.com/";
  private headers= new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token')).append('content-type', 'application/json');

  constructor(private httpClient:HttpClient,private _auth: SokoService ) { }

  saveProductInfo (product:any)
  {
    var reqHeader = new HttpHeaders({ 'Authorization':'Bearer '+this._auth.getToken()});
        reqHeader.append('Content-Type', 'application/json');
        const formData: FormData = new FormData();
         formData.append('UnitPrice', product['Price']);
         formData.append('Name', product.Name.toString());
         formData.append('SellerId', product.SellerId.toString());
         formData.append('SellerName', product.SellerName.toString());
         formData.append('Category', product.Category.toString());
         formData.append('TC', product['Conditions']);
         formData.append('Quantity', product.Quantity.toString());
         formData.append('Description', product.Description.toString());
         formData.append('Image', product['ImageFile']);
         
        
    return this.httpClient.post(this.apiURL,formData,{ headers: reqHeader })
    .pipe(
      map(res => res),
       catchError( this.errorHandler)
      );
  }

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
