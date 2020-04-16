import { Component, OnInit } from '@angular/core';
import Swal  from 'sweetalert2';
import { Router } from '@angular/router';

import { SokoService } from './../soko.service';
import { ProductService } from '../product.service';
import { Product } from '../Models/Product.Model';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent implements OnInit {
  cartItemCount: number = 0;
  productAddedTocart:Product[];
  allTotal:number;
  prix:any
  error;
  invoice:any
  loginUserData = {product:[],adresse:null,token:null}
  constructor(private route: Router,private _auth: SokoService ,private productService:ProductService) { }
  ngOnInit() {
    this.productAddedTocart=this.productService.getProductFromCart();
  //  this.loginUserData.product=this.productAddedTocart
  //  console.log(this.productAddedTocart)
   this.productService.removeAllProductFromCart();
   this.productService.addProductToCart(this.productAddedTocart);
   this.calculteAllTotal(this.productAddedTocart); 

   var nam = "https://www.sokodakar.com/"+this.route.url
   var url=new URL(nam).searchParams.get("token")
  // console.log(url)
  this.loginUserData.token=url;
  this.loginUserData.adresse=localStorage.getItem("adresse")
  if(this.loginUserData.product){
       this._auth.pay(this.loginUserData).subscribe(
         res => { 
           
   console.log(res)  
     //console.log(this.user);
  
if(res.body=="failed"){
  
    this.error="failed"
   
}else{
  this._auth.removeproduct();
  localStorage.removeItem("adresse")
  this.invoice=res;
}
      }  
         ,err =>{console.log(err) 
          if(err){
           this.error=err
          }
        })
         
    }
  }
  calculteAllTotal(allItems:Product[])
  {
    let total=0;
    for (let i in allItems) {
      total= total+(allItems[i].article.Prix);
      this.loginUserData.product.push(allItems[i].article_id)
     // console.log(allItems[i].article.Prix)
   }
   this.allTotal=total+1500;
   this.loginUserData['total']=total

  // console.log(this.allTotal)
  }


}
