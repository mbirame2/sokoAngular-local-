import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import Swal from 'sweetalert2';
import { SokoService } from './../soko.service';
import {Router,ActivatedRoute} from '@angular/router';
import { Product } from '../Models/Product.Model';
import { All } from '../Models/All.Model';
import { SharedServiceService } from '../shared-service.service';
import { from } from 'rxjs';

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
  tele:number;
  nom:string
  vete=""
  isLoggedIn:boolean=false;
  categories:[]
  sscategories:[]
  url:string="api.sokodakar.com"

  constructor(private productService:ProductService,private route: ActivatedRoute,private router: Router,private _auth: SokoService ,private sharedService:SharedServiceService) {

 
 

   }
  ngOnInit() {
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
    },)
    this._auth.getsscat().subscribe((result) => {
      this.sscategories = result.body;     
     // console.log( this.sscategorie);         
    },
    error => { //This is error part
    },)
    this.productService.getAllFemme()
    .subscribe((result) => {
      this.globalResponse = result.body;              
    },
    error => { //This is error part
      console.log(error.message);
    },
    () => {
   //     console.log("Product fetched sucssesfully.");
        //console.log(this.globalResponse);
     //   this.allProducts=this.globalResponse;
       // this.prod=this.allProducts
 //       console.log(this.prod);
 let id = this.route.snapshot.params.cat;
  
          
 if(id){
  this.allProducts=this.globalResponse;
  this.prod=this.allProducts
  this.allProducts=[]
 for (var i = 0; i <this.prod.length ; i++) {
        
  if(this.prod[i].categorie.name==id){
  //  console.log(this.allProducts[i])
 
this.allProducts.push(this.prod[i])
   }
}

this.vete=id
}else if(!id){
  this.allProducts=this.globalResponse;
  this.prod=this.allProducts
}
        }
      )

   
             

          

 }

 display(prod,id){

    this.proda=prod;
   }

   sscategorie(vete:string){
    //this.prod=this.allProducts
    this.allProducts=[]
  //  console.log( vete);
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
  //  console.log( product.article_id);
    if(this.isLoggedIn){
    if(this.productAddedTocart==null)
    {
     // this.productAddedTocart:Product[];
        this.productAddedTocart = [];
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
      
    }
    //console.log(this.cartItemCount);
    this.cartItemCount=this.productAddedTocart.length;
    // this.cartEvent.emit(this.cartItemCount);
    this.sharedService.updateCartCount(this.cartItemCount);
  }else{
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

}

  tout(){
    window.location.reload();
   }


  
inscrire(){
  this.router.navigate(['/inscrire']);

}
}
