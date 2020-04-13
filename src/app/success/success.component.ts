import { Component, OnInit } from '@angular/core';
import { SokoService } from './../soko.service';
import {Router,ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent implements OnInit {

  constructor(private route: Router,private _auth: SokoService ) { }
  ngOnInit() {
    var nam = "https://www.sokodakar.com/"+this.route.url
var url=new URL(nam).searchParams.get("token")
console.log(url)
    this._auth.pay(url).subscribe(
      res => { 
        
console.log(res)  
  //console.log(this.user);
   }  
      ,err =>{console.log(err) })
  }

}
