import { AppComponent } from './../../app.component';
import { SokoService } from './../../soko.service';
import { Component,OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import{ Vente } from './../../vente';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-gestadmin',
  templateUrl: './gestadmin.component.html',
  styleUrls: ['./gestadmin.component.css']
})
export class GestadminComponent implements OnInit {

  constructor(private _auth: SokoService,private app:AppComponent,private formBuilder: FormBuilder,private router: Router) {
    
    var admin = localStorage.getItem('admin');

    // It should work, but I think it's far less comprehensive
    if(typeof admin === 'undefined' || admin === null || admin === 'undefined'){
 
 this.router.navigateByUrl("/")
    }else{
     // console.log("ok")
    }
   }
   url:string="api.sokodakar.com"

   user:[];
   achat:Vente[];
   all:Vente[];
   getuser:{}
   alluser:[]
   err:boolean=false
   loginUserData={id:null,prenom:null,nom:null,adresse:null,telephone:null}
   formadmin={prenom:null,nom:null,adresse:null,telephone:null,password:null,c_password:null}
   registerForm: FormGroup;

  ngOnInit() {

    this._auth.liste().subscribe(
      res => { 
        
  this.user=res.body
  
  console.log(res);
   }  
      ,err =>{ console.log(err); })
  
  
     this._auth.getUser().subscribe(
      res => { 
     //   if(this._auth.getToken()){
        this.getuser=res.body
       // console.log(this.getuser);
         }
        //}
  
            ,err =>{console.log(err)
           }
     )
  
  }

  inscrire(){
    console.log(this.formadmin)
    this._auth.inscripionadmin(this.formadmin).subscribe(
      res => {console.log(res);
        Swal.fire(
      
          {
           // position: 'top-end',
            icon: 'success',
            title: 'Votre inscription a bien été enregistrée',
            showConfirmButton: true,
  
          }
         )
        this.ngOnInit()}
     ,err=>{
      if(err.status==500){
        Swal.fire(
      
          {
           // position: 'top-end',
            icon: 'warning',
            title: 'Ce numero de téléphone existe déjà',
            text: '',
            showConfirmButton: false,
    
          }
         )
      }else{
      Swal.fire(
      
        {
         // position: 'top-end',
          icon: 'error',
          title: 'Echec inscription',
          text: 'Veillez verifier à nouveau les champs saisies',
          showConfirmButton: false,
  
        }
       )} 
  
    })
  
  }
  logout(){
  

    this.app.LogOut()
    }
  update(id){
    this.loginUserData.id=id
    console.log(this.loginUserData)
    this._auth.updateadmin(this.loginUserData).subscribe(
      res => { 
     //   if(this._auth.getToken()){
      
         }
  
            ,err =>{//console.log(err)
              if(err.status==200){
                window.location.reload();
       
              }
           }
     )
  }

}
