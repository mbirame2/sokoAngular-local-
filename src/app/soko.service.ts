import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SokoService {

  private headers= new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
  public apiURL:string="api.sokodakar.com/";
  private token=localStorage.getItem('token');
  
  jwt:string;
  username:string;
  roles:string;
  constructor(private httpClient: HttpClient) { }
  loginUser(user){
 
    return this.httpClient.post<any>(this.apiURL+`api/login`, user,{observe:'response'});
  }
  update(user){
    
    return this.httpClient.post<any>(this.apiURL+`api/update`, user,{headers:this.headers,observe:'response'});
  }
  updateadmin(user){
    
    return this.httpClient.post<any>(this.apiURL+`api/updateadmin`, user,{headers:this.headers,observe:'response'});
  }
  commande(user){
    
    return this.httpClient.post<any>(this.apiURL+`api/commande`, user,{headers:this.headers,observe:'response'});
  }
  search(name){
    const formData: FormData = new FormData();
    formData.append('name',name);
    return this.httpClient.post<any>(this.apiURL+`api/search`, formData,{headers:this.headers,observe:'response'});
  }

  getUser(){
    return this.httpClient.get<any>(this.apiURL+`api/getuser`,{headers:this.headers,observe:'response'});
  }
  getcat(){
    return this.httpClient.get<any>(this.apiURL+`api/allcat`,{headers:this.headers,observe:'response'});
  }
  getsscat(){
    return this.httpClient.get<any>(this.apiURL+`api/allsscat`,{headers:this.headers,observe:'response'});
  }
  venteuser(){
   
   // console.log(this.headers);
    return this.httpClient.get<any>(this.apiURL+`api/allvente`,{headers:this.headers,observe:'response'});
  }
  allvente(){
    return this.httpClient.get<any>(this.apiURL+`api/allvente`,{headers:this.headers,observe:'response'});
  }
  allachat(){
   
    //console.log(this.headers);
    return this.httpClient.get<any>(this.apiURL+`api/allachat`,{headers:this.headers,observe:'response'});
  }
  allventeone(){
    return this.httpClient.get<any>(this.apiURL+`api/allventeone`,{headers:this.headers,observe:'response'});
  }
  allachatone(){
    //console.log(this.headers);
    return this.httpClient.get<any>(this.apiURL+`api/allachatone`,{headers:this.headers,observe:'response'});
  }
  alluser(){
    return this.httpClient.get<any>(this.apiURL+`api/alluser`,{headers:this.headers,observe:'response'});

  }
  pay(token){
   
    return this.httpClient.post<any>(this.apiURL+`api/pay`,token,{headers:this.headers,observe:'response'});
  }
  vendre(user){
    const formData: FormData = new FormData();
    formData.append('imagename',user.imageName);
    formData.append('imagename1',user.imageName1);
    formData.append('imagename2',user.imageName2);
    formData.append('imagename3',user.imageName3);
    formData.append('titre',user.titre);
    formData.append('taille',user.taille);
    formData.append('prix',user.prix);
    formData.append('description',user.description);
    formData.append('couleur',user.couleur);
    formData.append('categorie',user.categorie);
    formData.append('sscategorie',user.sscategorie);
    formData.append('genre',user.genre);
    formData.append('confid',user.confidientialite);
    formData.append('condition',user.condition);
    return this.httpClient.post<any>(this.apiURL+`api/ventearticle`, formData,{headers:this.headers,observe:'response'});
  }
  inscripion(user){
    const formData: FormData = new FormData();
    formData.append('prenom',user.firstName);
    formData.append('nom',user.lastName);
    formData.append('telephone',user.numtel);
    formData.append('adresse',user.adresse);
    formData.append('password',user.password);
    formData.append('c_password',user.confirmPassword);

console.log(formData);
    return this.httpClient.post<any>(this.apiURL+`api/register`,formData,{headers:this.headers,observe:'response'});
  }
  onevente(id){
    return this.httpClient.get<any>(this.apiURL+`api/onevente/`+id,{headers:this.headers,observe:'response'});
  }
  remove(id){
    return this.httpClient.get<any>(this.apiURL+`api/remove/`+id,{headers:this.headers,observe:'response'});
  }
  img(id){
    return this.httpClient.get<any>(this.apiURL+`api/images/`+id,{headers:this.headers,observe:'response'});
  }
  removeToken(){
    localStorage.removeItem('token')
  }
  removeproduct(){
    localStorage.removeItem('product')
  }
  getToken(){
    localStorage.getItem('token')
  }
  saveToken(jwt: string){

    localStorage.setItem('token' ,jwt)
  
    }


    
}
