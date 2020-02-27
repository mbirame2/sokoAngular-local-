import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../Models/Product.Model';

@Component({
  selector: 'app-acceuil',
  templateUrl: './acceuil.component.html',
  styleUrls: ['./acceuil.component.css']
})
export class AcceuilComponent implements OnInit {
  public globalResponse: any;
  allProducts: any;
  url:string="api.sokodakar.com"
  prod: Product[];
  pro:{}
  constructor(private productService:ProductService) { }

  ngOnInit() {
  //  this.productService.getAllNouveaute()
    //.subscribe((result) => {
      //this.globalResponse = result.body;              
    //},
   // error => { //This is error part
//      console.log(error.message);
    //},
    //() => {
   //     console.log("Product fetched sucssesfully.");
        //console.log(this.globalResponse);
      //  this.allProducts=this.globalResponse;
        //this.prod=this.allProducts
        //console.log(this.prod);

        //}
      //)
      this.productService.getAllNouveaute()
            .subscribe((result) => {
              this.globalResponse = result.body;              
            },
            error => { //This is error part
        //      console.log(error.message);
            },() => {
              //     console.log("Product fetched sucssesfully.");
                   //console.log(this.globalResponse);
                   this.allProducts=this.globalResponse;
                   this.prod=this.allProducts
               //    console.log(this.prod);
   this.pro=this.prod[this.prod.length-1]
                   }
                 )

  }

}
