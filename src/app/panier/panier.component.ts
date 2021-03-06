import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import {Location} from '@angular/common';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';

import { Product } from '../Models/Product.Model';
import { SharedServiceService } from '../shared-service.service';
@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit {
  dafualtQuantity:number=1;
  cartItemCount: number = 0;
  productAddedTocart:Product[];
  isLoggedIn:boolean;
  allTotal:number;
  rm:Product
  tok:boolean;
  url:string="api.sokodakar.com"

  constructor(private productService:ProductService,private _location: Location,  private sharedService:SharedServiceService,private router: Router,) { 
    var token = localStorage.getItem('token');

    // It should work, but I think it's far less comprehensive
    if(typeof token === 'undefined' || token === null || token === 'undefined'){
 
 this.router.navigateByUrl("/")
    }else{
      console.log("ok")
    }
  }

  ngOnInit() {
      this.productAddedTocart=this.productService.getProductFromCart();
//console.log(this.productAddedTocart)
    if(this.productAddedTocart.length==0){
      this.isLoggedIn=false;
     }else{
      this.isLoggedIn=true;
     }


  this.productService.removeAllProductFromCart();
  this.productService.addProductToCart(this.productAddedTocart);
  this.calculteAllTotal(this.productAddedTocart); 
 

  }

  backClicked() {
    this._location.back();
  }

  onRemoveQuantity(product:Product)
  {
   // console.log(product)

  let tempProduct=this.productAddedTocart.findIndex(p=>p==product);
  if(tempProduct!=null){
 //   console.log(tempProduct)
//    console.log(this.productAddedTocart[tempProduct])
    this.productAddedTocart.splice(tempProduct,1)
  }
    this.productService.removeAllProductFromCart();
    this.productService.addProductToCart(this.productAddedTocart);
    this.calculteAllTotal(this.productAddedTocart);
    this.cartItemCount=this.productAddedTocart.length;
    // this.cartEvent.emit(this.cartItemCount);
    this.sharedService.updateCartCount(this.cartItemCount);
  //  this.deliveryForm.controls['Amount'].setValue(this.allTotal);
  this.ngOnInit()

  }
  calculteAllTotal(allItems:Product[])
  {
    let total=0;
    for (let i in allItems) {
      total= total+(allItems[i].article.Prix);
     // console.log(allItems[i])
   }

   this.allTotal=total;
  }
 


}
