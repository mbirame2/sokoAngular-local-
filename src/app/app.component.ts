import { SokoService } from './soko.service';
import { Component,OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
 import {SharedServiceService} from './shared-service.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'sokoAngular';
  isLoggedIn:boolean=false;
  loginUserData = {}
  ok:{prenom:string,nom:string};
  cartItemCount:number=0;
  constructor(private _auth: SokoService , private sharedService: SharedServiceService ,private router:Router){
  }

  ngOnInit(){
    this.sharedService.currentMessage.subscribe(msg => this.cartItemCount = msg);
    var token = localStorage.getItem('token');

    // It should work, but I think it's far less comprehensive
    if(typeof token === 'undefined' || token === null || token === 'undefined'){
      this.isLoggedIn=false;
    }else{
      this.isLoggedIn=true;
      this._auth.getUser().subscribe(
        res => { 
    this.ok=res.body;
    this.isLoggedIn=true;
 
     }
     )
    }
  }
  LogOut()
  {
    this.isLoggedIn=false;
    this._auth.removeToken();
    this._auth.removeproduct();
    this.loginUserData={}

  }
  loginUser(){
    this.isLoggedIn=false;
    this._auth.removeToken();
//console.log(this.loginUserData)
    this._auth.loginUser(this.loginUserData ).subscribe(
      res => { 
   this._auth.saveToken(res.body);
  
 this.ngOnInit()
 this.exact()
 window.location.reload();
   }   
   ,err =>{
    if(err.status==401 ||   err.error.errir=="Unauthorised"){
    Swal.fire(
      'Erreur',
      'Username ou Mot de passe incorrecte',
      'error'
     )
  }}
   )


}
exact(){
  this._auth.getUser().subscribe(
    res => { 
this.ok=res.body;
this.isLoggedIn=true;

Swal.fire(
{
  icon: 'success',
  title: 'Bienvenue '+res.body.prenom+' '+res.body.nom,
  showConfirmButton: false,
  timer: 2000 
}
)
 }
   
 )
}
}