import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import Swal from 'sweetalert2';
import { SokoService } from './../soko.service';

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
  constructor(private _auth: SokoService ,private productService:ProductService,private sharedService:SharedServiceService) { }

  ngOnInit() {
    this.productService.getAllNouveaute()
            .subscribe((result) => {
              this.globalResponse = result.body;              
            },
            error => { //This is error part
              console.log(error.message);
            },
            () => {
                console.log("Product fetched sucssesfully.");
                //console.log(this.globalResponse);
                this.allProducts=this.globalResponse;
                this.prod=this.allProducts
                console.log(this.prod);

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

 }

 display(prod,id){

this._auth.onevente(id).subscribe(
  res => { 
    
this.tele=res.body.user.telephone
this.nom= res.body.user.prenom+" "+res.body.user.nom

////////////console.log(this.tele);
}  
  ,err =>{console.log(err) })
  this.proda=prod;
 }
 homme(){
  this.allProducts=[]
    for (var i = 0; i <this.prod.length ; i++) {
      
      if(this.prod[i].article.Genre=="Homme"){
      //  console.log(this.allProducts[i])
   this.allProducts.push(this.prod[i])
       }
    }
  
  this.vete="Homme"}
 
 femme(){
  this.allProducts=[]
    for (var i = 0; i <this.prod.length ; i++) {
      
      if(this.prod[i].article.Genre=="Femme"){
      //  console.log(this.allProducts[i])
   this.allProducts.push(this.prod[i])
       }
    }
  
  this.vete="Femme"}
 tout(){
  window.location.reload();
 }
 sscategorieVetements(vete){
//this.prod=this.allProducts
this.allProducts=[]
console.log( vete);
  for (var i = 0; i <this.prod.length ; i++) {
    
    if(this.prod[i].categorie.name=="Vetements"){
    //  console.log(this.allProducts[i])
 this.allProducts.push(this.prod[i])
     }
  }

this.vete="Vetements"}
sscategorieChaussures(){
 // this.prod=this.allProducts
  this.allProducts=[]
    for (var i = 0; i <this.prod.length ; i++) {
      
      if(this.prod[i].categorie.name=="Chaussures"){
      //  console.log(this.allProducts[i])
   this.allProducts.push(this.prod[i])
       }
    }
  
  this.vete="Chaussures"}
  sscategorieSacs(){
  //  this.prod=this.allProducts
    this.allProducts=[]
      for (var i = 0; i <this.prod.length ; i++) {
        
        if(this.prod[i].categorie.name=="Sacs"){
        //  console.log(this.allProducts[i])
     this.allProducts.push(this.prod[i])
         }
      }
    
    this.vete="Sacs"}
 OnAddCart(product:Product)
 {
 //  console.log(product);
   
   this.productAddedTocart=this.productService.getProductFromCart();
   
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
           icon: 'success',
           title: 'Produit bien ajouté',
           showConfirmButton: false,
           timer: 1000
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
     
   }
   //console.log(this.cartItemCount);
   this.cartItemCount=this.productAddedTocart.length;
   // this.cartEvent.emit(this.cartItemCount);
   this.sharedService.updateCartCount(this.cartItemCount);
 }

}
