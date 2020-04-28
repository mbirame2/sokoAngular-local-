import { SokoService } from './soko.service';
import { Component,OnInit, ViewChild, ElementRef } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
 import {SharedServiceService} from './shared-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('alert') alert: ElementRef;
  title = 'sokoAngular';
  isLoggedIn:boolean=false;
  admin:boolean=false;
  aler:boolean=false;
  name= {name:null};
  loginUserData = {};
  ok:{prenom:string,nom:string,role:string};
  cartItemCount:number=0;
  constructor(private _auth: SokoService , private sharedService: SharedServiceService ,private router:Router){
    var admi = localStorage.getItem('admin');

    // It should work, but I think it's far less comprehensive
    if(typeof admi === 'undefined' || admi === null || admi === 'undefined'){
 
      
    }else{
      this.admin=true;
    }
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
   
 if(this.ok.role=="admin"){
 // console.log(this.ok)
 localStorage.setItem('admin',"admin");
this.admin=true;
this.router.navigateByUrl("/admin")
 }else{
   this.admin=false
 }
     }
     
     )
    }
  }
  closeAlert() {
    this.alert.nativeElement.classList.remove('show');
    this.aler=false;
    this.ngOnInit()
  }
  verification1(){
if(this.isLoggedIn){
  this.router.navigateByUrl("/vendre")
}else{
  Swal.fire(
    'Erreur',
    'Username ou Mot de passe incorrecte',
    'error'
   )

}
  }
  verification2(){
    if(this.isLoggedIn){
      this.router.navigateByUrl("/mon_compte")
    }else{
      Swal.fire(
        'Erreur',
        'Username ou Mot de passe incorrecte',
        'error'
       )
    }
  }
  LogOut()
  {

    localStorage.removeItem("admin")
    this._auth.removeToken();
    this._auth.removeproduct();
    this.isLoggedIn=false;
    this.admin=false;
    window.location.reload();
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
 window.location.reload();

   }   
   ,err =>{console.log(err)
    if(err.status==401 ||   err.error=="Unauthorised"){
    Swal.fire(
      'Erreur',
      'Username ou Mot de passe incorrecte',
      'error'
     )
  }}
   )


}
search(){
  this.router.navigateByUrl('/search/'+this.name['name'])

}
}