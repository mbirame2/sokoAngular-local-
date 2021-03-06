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
      this.router.navigateByUrl("admin/user")
    }
  }

  ngOnInit(){
    this.sharedService.currentMessage.subscribe(msg => this.cartItemCount = msg);
    var token = localStorage.getItem('token');
    var admin =localStorage.getItem('admin');
    // It should work, but I think it's far less comprehensive
    if(typeof token === 'undefined' || token === null || token === 'undefined'){
      this.isLoggedIn=false;
    }else{
      this.isLoggedIn=true;
      if(typeof admin === 'undefined' || admin === null || admin === 'undefined'){
        
      }else{
      //  this.router.navigateByUrl("/admin/user")
      }
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
   this._auth.saveToken(res.body[0]);
 

 this.isLoggedIn=true;
 if(res.body[1].role=="admin"){
  console.log(res)
  localStorage.setItem('admin',"admin");
 this.admin=true;
 this.router.navigateByUrl("/admin/user")
  }else{
    this.admin=false
  }  
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