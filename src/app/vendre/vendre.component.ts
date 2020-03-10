import Swal  from 'sweetalert2';
import { SokoService } from './../soko.service';
import { Component, OnInit,Input } from '@angular/core';
import * as _ from 'lodash';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vendre',
  templateUrl: './vendre.component.html',
  styleUrls: ['./vendre.component.css']
})
export class VendreComponent implements OnInit {
  imageError: string;
  isImageSaved: boolean;
  cardImageBase64: string;
  loginUserData = {imageName : File = null,imageName1 : File = null,imageName2 : File = null,imageName3 : File = null,titre:null,prix:null,description:null,taille:null,genre:null,categorie:null,sscategorie:null,couleur:null,condition:null};
  imgURL =[];
  categorie:[]
  sscategorie:[]
  allProducts: any;
  pro:number
  urlone = "/../../assets/images/icons8-aperture-100.png";
  urltwo="/../../assets/images/icons8-aperture-100.png";
  urlthree="/../../assets/images/icons8-aperture-100.png";
  urlfour="/../../assets/images/icons8-aperture-100.png";
  url = new Array<string>();
  constructor(private aut:SokoService, private router:Router) { 
    var token = localStorage.getItem('token');

    // It should work, but I think it's far less comprehensive
    if(typeof token === 'undefined' || token === null || token === 'undefined'){
 
 this.router.navigateByUrl("/")
    }else{
     // console.log("ok")
    }
  }

  @Input() depuisHTML:any;



  
  ngOnInit() {
  
    
    this.aut.getcat().subscribe((result) => {
      this.categorie = result.body;     
     // console.log( this.categorie);         
    },
    error => { //This is error part
    //  console.log(error.message);
    },)
    this.aut.getsscat().subscribe((result) => {
      this.sscategorie = result.body;     
     // console.log( this.sscategorie);         
    },
    error => { //This is error part
  //    console.log(error.message);
    },)
    this.pro=0
    
  }
  onSearchChange(searchValue: number) {  
  //  console.log(searchValue);
    this.pro=searchValue*80/100-1000
  }
  detectFiles(event,one) {
    
    
   // if(one==1){
      let reader = new FileReader();
      
        if (event.target.files[0].size < 1000000){
        reader.onload = (e: any) => {
          if(one==1){
          this.loginUserData.imageName=event.target.files[0]
          this.urlone=(e.target.result);
        }else if(one==2){
          this.loginUserData.imageName1=event.target.files[0]
          this.urltwo=(e.target.result);
        }else if(one==3){
          this.loginUserData.imageName2=event.target.files[0]
          this.urlthree=(e.target.result);
        }else if(one==4){
          this.loginUserData.imageName3=event.target.files[0]
          this.urlfour=(e.target.result);
        }

        }
      
        reader.readAsDataURL(event.target.files[0]);
     //   console.log(this.loginUserData)
      }
       else {
        Swal.fire(
          'Erreur',
          'La taille de l\'image ne doit pas dépasser 1MB ',
          'error'
        )
        
       }
   // }


  }
  remove(one){
    if(one==1){
      this.loginUserData.imageName=null
      this.urlone="/../../assets/images/icons8-aperture-100.png";
    }else if(one==2){
      this.loginUserData.imageName1=null
      this.urltwo="/../../assets/images/icons8-aperture-100.png";
    }else if(one==3){
      this.loginUserData.imageName2=null
      this.urlthree="/../../assets/images/icons8-aperture-100.png";
    }else if(one==4){
      this.loginUserData.imageName3=null
      this.urlfour="/../../assets/images/icons8-aperture-100.png";
    }
  }
  vente(){
  //  console.log(this.loginUserData)
    this.aut.vendre(this.loginUserData).subscribe((result) => {
    // result.body;     
 console.log( result);    
  if(result.body=="bien fait"){
        Swal.fire({
          text: " Nous avons bien enregistré votre produit, nous vous recontacterons une fois qu\'il sera en ligne sur le site",
          icon: 'success',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Retourner sur le catalogue'
        }).then((result) => {
          if (result.value) {
    this.router.navigateByUrl("/new")

          }})}else{
            Swal.fire(
              'Erreur',
              'Veillez verifier la saisie de vos champs',
              'error'
            )
          }
     
          },
    error => { //This is error part
      console.log(error);
      Swal.fire(
        'Erreur',
        'Veillez verifier la saisie de vos champs',
        'error'
      )
    },)
  }
}
