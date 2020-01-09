import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import Swal from 'sweetalert2';

import { Product } from '../Models/Product.Model';
import { SharedServiceService } from '../shared-service.service';
@Component({
  selector: 'app-viewproduct',
  templateUrl: './viewproduct.component.html',
  styleUrls: ['./viewproduct.component.css']
})
export class ViewproductComponent implements OnInit {
  cartItemCount: number = 0;
  productAddedTocart:Product[];
  constructor(private productService:ProductService,private _location: Location,  private sharedService:SharedServiceService) { }

  ngOnInit() {
    this.cartItemCount=this.productAddedTocart.length;
    // this.cartEvent.emit(this.cartItemCount);
    this.sharedService.updateCartCount(this.cartItemCount);
  }
}
