import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import { SokoService } from './../../soko.service';
import { AppComponent } from './../../app.component';

@Component({
  selector: 'app-detailsart',
  templateUrl: './detailsart.component.html',
  styleUrls: ['./detailsart.component.css']
})
export class DetailsartComponent implements OnInit {

  constructor(private _auth: SokoService,private app:AppComponent,private router: Router,private route: ActivatedRoute) {
    this.id= this.route.snapshot.params.cat;
    var admin = localStorage.getItem('admin');

    // It should work, but I think it's far less comprehensive
    if(typeof admin === 'undefined' || admin === null || admin === 'undefined'){
 
 this.router.navigateByUrl("/")
    }else{
     // console.log("ok")
    } 
   }
   upcommande={id:null,titre:null,prix:null,description:null,taille:null}
   getuser:{}
   alluser:[]
   err:boolean=false
   loginUserData={id:null,prenom:null,nom:null,adresse:null,telephone:null}
   formadmin={prenom:null,nom:null,adresse:null,telephone:null,password:null,c_password:null}
id:number
url:string="api.sokodakar.com"
pro:any;
  ngOnInit() {
    
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
     this._auth.onearticle(this.id).subscribe(
      res => { 
        
  this.pro=res.body
 console.log( this.pro);
 
   }  
      ,err =>{ console.log(err); })
  }
  updatearticle(id){
    this.upcommande.id=id
    this._auth.updatearticle(this.upcommande).subscribe(
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
  logout(){
  

    this.app.LogOut()
    }
}
