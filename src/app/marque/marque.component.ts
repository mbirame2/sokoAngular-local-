import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import Swal from 'sweetalert2';
import { SokoService } from './../soko.service';
import {Router} from '@angular/router';
import { HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-marque',
  templateUrl: './marque.component.html',
  styleUrls: ['./marque.component.css']
})
export class MarqueComponent implements OnInit {
  options = { fullWidth: false };
  data:any;
  urls = new Array<string>();
  items = ["https://picsum.photos/200/300?image=0", "https://picsum.photos/200/300?image=1", "https://picsum.photos/200/300?image=2", "https://picsum.photos/200/300?image=3", "https://picsum.photos/200/300?image=4"]

  hrefs = ['one', 'two', 'three', 'four', 'five'];
  constructor(private _auth: SokoService, private http: HttpClient ,private router: Router,private productService:ProductService) { 
 
  }
  

  ngOnInit() {
this._auth.img("home.jpg").subscribe((result) => {
 console.log(result)    
 this.data=result

},
error => { //This is error part
  console.log(error.message);
})

  }
 
}
