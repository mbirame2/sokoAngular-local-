import Swal  from 'sweetalert2';
import { SokoService } from './../soko.service';
import { Component, OnInit,Input } from '@angular/core';
@Component({
  selector: 'app-vendre',
  templateUrl: './vendre.component.html',
  styleUrls: ['./vendre.component.css']
})
export class VendreComponent implements OnInit {
  loginUserData = {imageName : File = null,imageName1 : File = null,imageName2 : File = null};
  imgURL =[];
  categorie:[]
  sscategorie:[]
  pro:number
  urls = new Array<string>();
  url = new Array<string>();
  constructor(private aut:SokoService) { }

  @Input() depuisHTML:any;

  
  ngOnInit() {
    
    this.aut.getcat().subscribe((result) => {
      this.categorie = result.body;     
      console.log( this.categorie);         
    },
    error => { //This is error part
      console.log(error.message);
    },)
    this.aut.getsscat().subscribe((result) => {
      this.sscategorie = result.body;     
     // console.log( this.sscategorie);         
    },
    error => { //This is error part
      console.log(error.message);
    },)
    this.pro=0
    
  }
  onSearchChange(searchValue: number) {  
  //  console.log(searchValue);
    this.pro=searchValue*85/100
  }
  detectFiles(event) {
    this.urls = [];
    this.url = [];

    let files = event.target.files;
    if (files) {
      for (let file of files) {
        let reader = new FileReader();
        reader.onload = (e: any) => {
          this.urls.push(e.target.result);
          this.loginUserData.imageName=(file)
        }
      
        reader.readAsDataURL(file);
       
      }
      console.log(this.url)
    //console.log(this.imgURL.length)
    }
   
  }
  vente(){
    console.log(this.loginUserData)
    this.aut.vendre(this.loginUserData).subscribe((result) => {
    // result.body;     
      console.log( result);    
    
        Swal.fire(
          'Ok',
          'Enregistrement fait avec succés',
          'success'
        )
          },
    error => { //This is error part
      console.log(error.message);
      Swal.fire(
        'Erreur',
        'Veillez verifier la saisie de vos champs',
        'error'
      )
    },)
  }
}
