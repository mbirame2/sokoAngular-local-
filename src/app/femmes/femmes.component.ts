import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import Swal from 'sweetalert2';

import { Product } from '../Models/Product.Model';
import { All } from '../Models/All.Model';
import { SharedServiceService } from '../shared-service.service';

@Component({
  selector: 'app-femmes',
  templateUrl: './femmes.component.html',
  styleUrls: ['./femmes.component.css']
})
export class FemmesComponent implements OnInit {

  cartItemCount: number = 0;
  productAddedTocart:Product[];
  public globalResponse: any;
  yourByteArray:any;
  allProducts: Product[];
  prod: Product[];
  proda:[];
  vete=""
  isLoggedIn:boolean=false;
  constructor(private productService:ProductService,private sharedService:SharedServiceService) { }

  ngOnInit() {
    this.productService.getAllFemme()
            .subscribe((result) => {
              this.globalResponse = result.body;              
            },
            error => { //This is error part
              console.log(error.message);
            },
            () => {
                //  This is Success part
                console.log("Product fetched sucssesfully.");
                //console.log(this.globalResponse);
                this.allProducts=this.globalResponse;
                this.prod=this.allProducts
                console.log(this.allProducts);
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

 display(prod){
this.proda=prod;
 }

 
  OnAddCart(product:Product)
  {
  //  console.log(product);
    
    this.productAddedTocart=this.productService.getProductFromCart();
    console.log( product.article_id);
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

  tout(){
    window.location.reload();
   }
   robe(){
    this.allProducts=[]
      for (var i = 0; i <this.prod.length ; i++) {
        
        if(this.prod[i].sscategorie.name=="Robe"){
        //  console.log(this.allProducts[i])
     this.allProducts.push(this.prod[i])
         }
      }
    
    
    this.vete="Robe"
   }
   escarpin(){
    this.allProducts=[]
      for (var i = 0; i <this.prod.length ; i++) {
        
        if(this.prod[i].sscategorie.name=="Escarpin"){
        //  console.log(this.allProducts[i])
     this.allProducts.push(this.prod[i])
         }
      }
    
    
    this.vete="Escarpin"}
   
   pantalon(){
    this.allProducts=[]
      for (var i = 0; i <this.prod.length ; i++) {
        
        if(this.prod[i].sscategorie.name=="Pantalon"){
        //  console.log(this.allProducts[i])
     this.allProducts.push(this.prod[i])
         }
      }
    
    
    this.vete="Pantalon"}
   
   baskets(){
    this.allProducts=[]
      for (var i = 0; i <this.prod.length ; i++) {
        
        if(this.prod[i].sscategorie.name=="Baskets"){
        //  console.log(this.allProducts[i])
     this.allProducts.push(this.prod[i])
         }
      }
    
    
    this.vete="Baskets"}
   
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
  sscategorieAccessoires(vete){
    //this.prod=this.allProducts
    this.allProducts=[]
    console.log( vete);
      for (var i = 0; i <this.prod.length ; i++) {
        
        if(this.prod[i].categorie.name=="Accessoires"){
        //  console.log(this.allProducts[i])
     this.allProducts.push(this.prod[i])
         }
      }
      this.vete="Accessoires"}
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
  

}
