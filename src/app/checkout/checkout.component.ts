import { Component, OnInit } from '@angular/core';
import Swal  from 'sweetalert2';
import { Router } from '@angular/router';

import { SokoService } from './../soko.service';
import { ProductService } from '../product.service';
import { Product } from '../Models/Product.Model';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  cartItemCount: number = 0;
  productAddedTocart:Product[];
  allTotal:number;
  prix:any
  loginUserData = {product:[],adresse:String}

  constructor(private productService:ProductService,private router:Router,private aut:SokoService) { }

  ngOnInit() {
    this.productAddedTocart=this.productService.getProductFromCart();
  //  this.loginUserData.product=this.productAddedTocart
  //  console.log(this.productAddedTocart)
   this.productService.removeAllProductFromCart();
   this.productService.addProductToCart(this.productAddedTocart);
   this.calculteAllTotal(this.productAddedTocart); 
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
  commande(){

    this.aut.commande(this.loginUserData).subscribe((result) => {
     

         
         
            },
      error => {
        
        var yup:string;
        yup=error.error.text;
        console.log(error);
        if(error.status==200){
       window.location.href =yup;
        //  this.productService.removeAllProductFromCart();
          }else{
        Swal.fire(
          'Erreur',
          'Veillez verifier la saisie de vos champs',
          'error'
        )}
      },)
    }
  

}
