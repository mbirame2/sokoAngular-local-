import { SokoService } from './../soko.service';
import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import { ProductService } from '../product.service';
import { Product } from '../Models/Product.Model';
import Swal from 'sweetalert2';
import { SharedServiceService } from '../shared-service.service';
import{ Vente } from './../vente';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private route: ActivatedRoute,private sokok:SokoService,private router: Router,private sharedService:SharedServiceService) { }
  name:string
recherche={name:null}
user:Vente[];
ok:Boolean
url:string="api.sokodakar.com"

  ngOnInit() {
    var nam = this.route.snapshot.params.name; 
this.name=nam
this.sokok.search(this.name) .subscribe(
  res => { 
    
this.user=res.body

console.log(res);
}  
  ,err =>{ 
    console.log(err.error.text);

  })


  }

  

}
