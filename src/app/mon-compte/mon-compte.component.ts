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
  url:string="api.sokodakar.com"

  constructor(private _auth: SokoService , private router:Router){
    var token = localStorage.getItem('token');

    // It should work, but I think it's far less comprehensive
    if(typeof token === 'undefined' || token === null || token === 'undefined'){
 
 this.router.navigateByUrl("/")
    }else{
      console.log("ok")
    }
  }
user:Vente[];
achat:Vente[];
all:Vente[];
getuser:{}
err:boolean=false
loginUserData={}
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
  
 // console.log(this.user);
   }  
      ,err =>{console.log(err) })

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
update(){
  //console.log(this.loginUserData)
 if(this.loginUserData['password'] && this.loginUserData['newpassword']!=this.loginUserData['cpassword']){
    this.err=true
 }else{
    
  Swal.fire({
    title: 'Avertissement',
    text: "Voulez vous vraiment modifier vos infos personnelles ? ",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    confirmButtonText: 'Oui'
  }).then((result) => {
    if (result.value) {
     
  
    this._auth.update(this.loginUserData).subscribe(
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
  })
  }
}
  remove(id){

    let tempProduct=this.user.find(p=>p.article_id==id);
if(tempProduct.article['Disponible']=="oui"){
    Swal.fire({
      title: 'Avertissement',
      text: "Voulez vous vraiment supprimer cet article de vos listes des ventes ? ",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui ,Supprimer le'
    }).then((result) => {
      if (result.value) {
        this._auth.remove(id).subscribe(
          res => { 
         //   if(this._auth.getToken()){
           
      //      console.log(res);
            
             }
            //}
      
                ,err =>{console.log(err)
                  if(err.status==200){
                  Swal.fire(
                    'Succés',
                    'Supprimé avec succés',
                    'success'
                   )
               }
              this.ngOnInit()
              }
         )
      }
    })
  }else if(tempProduct.article['Disponible']=="non"){
    Swal.fire(
      'Erreur',
      'Ce produit a deja été commandé. Impossible de le supprimer',
      'error'
     )
  }
  
}


}
