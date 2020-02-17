import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import Swal from 'sweetalert2';
import { SokoService } from './../soko.service';
import {Router} from '@angular/router';

import { Product } from '../Models/Product.Model';
import { All } from '../Models/All.Model';
import { SharedServiceService } from '../shared-service.service';

@Component({
  selector: 'app-nouveaute',
  templateUrl: './nouveaute.component.html',
  styleUrls: ['./nouveaute.component.css']
})
export class NouveauteComponent implements OnInit {
  cartItemCount: number = 0;
  productAddedTocart:Product[];
  public globalResponse: any;
  yourByteArray:any;
  tele:number;
  nom:string
  allProducts: any;
  prod: Product[];
  proda:[];
  vete=""
  isLoggedIn:boolean=false;
  categories:[]
  sscategories:[]
  constructor(private _auth: SokoService ,private router: Router,private productService:ProductService,private sharedService:SharedServiceService) { }

  ngOnInit() {
    this.productService.getAllNouveaute()
            .subscribe((result) => {
              this.globalResponse = result.body;              
            },
            error => { //This is error part
        //      console.log(error.message);
            },
            () => {
           //     console.log("Product fetched sucssesfully.");
                //console.log(this.globalResponse);
                this.allProducts=this.globalResponse;
                this.prod=this.allProducts
            //    console.log(this.prod);

                }
              )
              var token = localStorage.getItem('token');

              // It should work, but I think it's far less comprehensive
              if(typeof token === 'undefined' || token === null || token === 'undefined'){
                this.isLoggedIn=false;
              }else{
                this.isLoggedIn=true;
               
              }
              this.vete=""
              this._auth.getcat().subscribe((result) => {
                this.categories = result.body;     
              },
              error => { //This is error part
         //       console.log(error.message);
              },)
              this._auth.getsscat().subscribe((result) => {
                this.sscategories = result.body;     
               // console.log( this.sscategorie);         
              },
              error => { //This is error part
           //     console.log(error.message);
              },)

 }

 display(prod,id){

  this.proda=prod;
 }


 tout(genre:string){
//  console.log(genre)
    this.allProducts=[]
    for (var i = 0; i <this.prod.length ; i++) {
      
      if(this.prod[i].article.Genre==genre){
      //  console.log(this.allProducts[i])
   this.allProducts.push(this.prod[i])
       }
    }
  
  this.vete=genre
  if(!genre){
    window.location.reload();
  }
   }
 //
  
 
 categorie(vete:string){
  //this.prod=this.allProducts
  this.allProducts=[]
 // console.log( vete);
    for (var i = 0; i <this.prod.length ; i++) {
      
      if(this.prod[i].categorie.name==vete){
      //  console.log(this.allProducts[i])
   this.allProducts.push(this.prod[i])
       }
    }
  
  this.vete=vete
if(!vete){
  window.location.reload();
}
}

  sscategorie(vete:string){
    //this.prod=this.allProducts
    this.allProducts=[]
    console.log( vete);
      for (var i = 0; i <this.prod.length ; i++) {
        
        if(this.prod[i].sscategorie.name==vete){
        //  console.log(this.allProducts[i])
     this.allProducts.push(this.prod[i])
         }
      }
    
    this.vete=vete}

 OnAddCart(product:Product)
 {
 //  console.log(product);
   
   this.productAddedTocart=this.productService.getProductFromCart();
   if(this.isLoggedIn){
   if(this.productAddedTocart==null)
   {
    // this.productAddedTocart:Product[];
       this.productAddedTocart = [];
     this.productAddedTocart.push(product);
     this.productService.addProductToCart(this.productAddedTocart);
   
     Swal.fire(
    
       {
      //   position: 'top-end',
         icon: 'success',
         title: 'Produit bien ajouté',
         showConfirmButton: false,
         timer: 1000
       }
      )


   }
   else
   {
     let tempProduct=this.productAddedTocart.find(p=>p.article_id==product.article_id);
     if(tempProduct==null)
     {
       this.productAddedTocart.push(product);
       this.productService.addProductToCart(this.productAddedTocart);
  
        
       Swal.fire(
    
         {
          // position: 'top-end',
          titleText: 'Produit ajouté au panier.',
          icon: 'success',
           showCancelButton: true,
           confirmButtonText: 'Payer ma commande',
           cancelButtonText: 'Continuer mes achats',
         }).then((result) => {
           if (result.value) {
 this.router.navigateByUrl('/mon_panier')
           } 
         }
        )
     }
     else
     {
       Swal.fire(
    
         {
         //  position: 'top-end',
           icon: 'error',
           title: 'Le produit est déja ajouté',
           showConfirmButton: false,
           timer: 1000
         }
        )
     }
     
   }}else{
    Swal.fire({
      title: 'Vous n\'etes pas connectés ',
      text: "Connectez vous d'abord pour passer vos commandes. Pas de compte? Cliquez sur ce bouton pour s'inscrire ",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'S\'inscrire!'
    }).then((result) => {
      if (result.value) {
       this.router.navigateByUrl("/inscription")
      }
    })
  }
   //console.log(this.cartItemCount);
   this.cartItemCount=this.productAddedTocart.length;
   // this.cartEvent.emit(this.cartItemCount);
   this.sharedService.updateCartCount(this.cartItemCount);
 }

}
