import { Component, OnInit } from '@angular/core';
import { SokoService } from './../soko.service';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent implements OnInit {

  constructor(private _auth: SokoService ) { }

  ngOnInit() {
    this._auth.pay().subscribe(
      res => { 
        
console.log(res)  
  //console.log(this.user);
   }  
      ,err =>{console.log(err) })
  }

}
