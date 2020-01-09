import { SokoService } from './../soko.service';
import { Component,OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import{ Vente } from './../vente';

@Component({
  selector: 'app-mon-compte',
  templateUrl: './mon-compte.component.html',
  styleUrls: ['./mon-compte.component.css']
})
export class MonCompteComponent implements OnInit {

  constructor(private _auth: SokoService , private router:Router){
  }
user:Vente[];
achat:Vente[];
getuser:{}
  ngOnInit() {
  

  this._auth.venteuser().subscribe(
    res => { 
      
this.user=res.body

//console.log(this.user);
 }  
    ,err =>{console.log(err) })

    this._auth.allachat().subscribe(
      res => { 
        
  this.achat=res.body
  
  console.log(this.user);
   }  
      ,err =>{console.log(err) })

   this._auth.getUser().subscribe(
    res => { 
   //   if(this._auth.getToken()){
      this.getuser=res.body
      console.log(this.getuser);
       }
      //}

          ,err =>{console.log(err)
         }
   )
  }
}
