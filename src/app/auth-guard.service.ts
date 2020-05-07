import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    private router: Router) { }

canActivate(
route: ActivatedRouteSnapshot,
state: RouterStateSnapshot) {
  var token = localStorage.getItem('token');

  // It should work, but I think it's far less comprehensive
  if(typeof token === 'undefined' || token === null || token === 'undefined'){
    this.router.navigate(['/']);
  }
  else {
  return true;
}
}
}
