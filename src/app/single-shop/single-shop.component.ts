import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import { ProductService } from '../product.service';
import { Product } from '../Models/Product.Model';
import Swal from 'sweetalert2';
import { SharedServiceService } from '../shared-service.service';

@Component({
  selector: 'app-single-shop',
  templateUrl: './single-shop.component.html',
  styleUrls: ['./single-shop.component.css']
})
export class SingleShopComponent implements OnInit {
  cartItemCount: number = 0;
  productAddedTocart:Product[];
  public globalResponse: any;
  allProducts: any;
  prod: Product[];
  pro: any;
  isLoggedIn:boolean=false;
  id:any;
  url="api.sokodakar.com"
  constructor(private route: ActivatedRoute,private productService:ProductService,private router: Router,private sharedService:SharedServiceService) { }

  ngOnInit() {
    var token = localStorage.getItem('token');

    // It should work, but I think it's far less comprehensive
    if(typeof token === 'undefined' || token === null || token === 'undefined'){
      this.isLoggedIn=false; 
    }else{
      this.isLoggedIn=true;
     
    }  
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
    //  console.log(this.prod);

    this.id = this.route.snapshot.params.id;
  //  console.log(this.prod)
    //  console.log(this.id)
    for (var i = 0; i <this.prod.length ; i++) {

      if(this.prod[i].article['Titre']==this.id){
        
   this.pro=this.prod[i]
       }
    }
    console.log(this.pro)
        }
      )
    
  }

  OnAddCart(product:Product)
  {
  //  console.log(product);
    
    this.productAddedTocart=this.productService.getProductFromCart();
   // console.log( product.article_id);
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
      
    } }else{
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
