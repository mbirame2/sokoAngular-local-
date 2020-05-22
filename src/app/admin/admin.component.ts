import { AppComponent } from './../app.component';
import { SokoService } from './../soko.service';
import { Component,OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import{ Vente } from './../vente';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private _auth: SokoService,private app:AppComponent,private router: Router) {
    
    var admin = localStorage.getItem('admin');

    // It should work, but I think it's far less comprehensive
    if(typeof admin === 'undefined' || admin === null || admin === 'undefined'){
 
 this.router.navigateByUrl("/")
    }else{
     // console.log("ok")
    }
   }
   url:string="api.sokodakar.com"

   user:Vente[];
   achat:Vente[];
   all:Vente[];
   getuser:{}
   alluser:[]
   err:boolean=false
   loginUserData={id:null,prenom:null,nom:null,adresse:null,telephone:null}
   upcommande={id:null,status:null}
     ngOnInit() {
    
   
     this._auth.allventeone().subscribe(
       res => { 
         
   this.user=res.body
   
   //console.log(this.user);
    }  
       ,err =>{ })
   
       this._auth.allachatone().subscribe(
         res => { 
           
     this.achat=res.body
     
    // console.log(this.user);
      }  
         ,err =>{ })
         this._auth.alluser().subscribe(
          res => { 
            
      this.alluser=res.body
      
     // console.log(this.user);
       }  
          ,err =>{ })
   
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
     forall(){
       
     }
     removeuser(id){
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
      this._auth.removeuser(id).subscribe(
        res => { 
   
          
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
            
          })}}
       )
     }
     remove(id){

      let tempProduct=this.user.find(p=>p.article_id==id);
 // if(tempProduct.article['Disponible']=="oui"){
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
  //  }else if(tempProduct.article['Disponible']=="non"){
 //   }
    
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
    window.location.reload();
       }

          ,err =>{//console.log(err)
            if(err.status==200){
              window.location.reload();
            } this.ngOnInit()
         }
   )
}
updatecommande(id){
  this.upcommande.id=id
  this._auth.updatecommande(this.upcommande).subscribe(
    res => { 
   //   if(this._auth.getToken()){
    
       }

          ,err =>{console.log(err)
            if(err.status==200){
              this.ngOnInit()
                        }
         }
   )
}
}
