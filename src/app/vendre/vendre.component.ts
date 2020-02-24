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
  loginUserData = {imageName : File = null,imageName1 : File = null,imageName2 : File = null,imageName3 : File = null};
  imgURL =[];
  categorie:[]
  sscategorie:[]
  allProducts: any;
  pro:number
  urls = new Array<string>();
  url = new Array<string>();
  constructor(private aut:SokoService, private router:Router) { 
    var token = localStorage.getItem('token');

    // It should work, but I think it's far less comprehensive
    if(typeof token === 'undefined' || token === null || token === 'undefined'){
 
 this.router.navigateByUrl("/")
    }else{
      console.log("ok")
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
    this.pro=searchValue*85/100 
  }
  detectFiles(event) {
    this.imageError = null;
    this.urls = [];
    this.url = [];

    let files = event.target.files;
    if(files.length<5){
    this.loginUserData.imageName=(files[0])
    this.loginUserData.imageName1=(files[1])
    this.loginUserData.imageName2=(files[2])
    this.loginUserData.imageName3=(files[3])
    if (files) {
      for (let file of files) {
        let reader = new FileReader();
        reader.onload = (e: any) => {
          this.urls.push(e.target.result);
         // this.loginUserData.imageName=(file)
        }
      
        reader.readAsDataURL(file);
       
      }
      console.log(this.loginUserData)
    //console.log(this.imgURL.length)
    }
  }else{
    Swal.fire(
      'Trop d\'images',
      'Vous ne pouvez pas depassez 4 images',
      'error'
    )
    
  }

  }
  vente(){
  //  console.log(this.loginUserData)
    this.aut.vendre(this.loginUserData).subscribe((result) => {
    // result.body;     
  //    console.log( result);    
        Swal.fire({
          text: " Nous avons bien enregistré votre produit, nous vous recontacterons une fois qu\'il sera en ligne sur le site",
          icon: 'success',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Retourner sur le catalogue'
        }).then((result) => {
          if (result.value) {
    this.router.navigateByUrl("/new")

          }})
          },
    error => { //This is error part
    //  console.log(error.message);
      Swal.fire(
        'Erreur',
        'Veillez verifier la saisie de vos champs',
        'error'
      )
    },)
  }
}
