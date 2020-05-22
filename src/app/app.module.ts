import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {  Routes, RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AcceuilComponent } from './acceuil/acceuil.component';
import { NouveauteComponent } from './nouveaute/nouveaute.component';
import { FemmesComponent } from './femmes/femmes.component';
import { HommesComponent } from './hommes/hommes.component';
import { VendreComponent } from './vendre/vendre.component';
import { CoachatComponent } from './coachat/coachat.component';
import { CovendreComponent } from './covendre/covendre.component';
import { CgvComponent } from './cgv/cgv.component';
import { FaqComponent } from './faq/faq.component';
import { RetourremboComponent } from './retourrembo/retourrembo.component';
import { AproposComponent } from './apropos/apropos.component';
import { PanierComponent } from './panier/panier.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { MonCompteComponent } from './mon-compte/mon-compte.component'
import { HttpClientModule } from '@angular/common/http';
import { SokoService } from './soko.service';
import { SharedServiceService } from './shared-service.service';
import { SuccessComponent } from './success/success.component';
import { SecureComponent } from './secure/secure.component';
import { SingleShopComponent } from './single-shop/single-shop.component';
import { SearchComponent } from './search/search.component';
import { AdminComponent } from './admin/admin.component';
import { AuthGuardService } from './auth-guard.service';
import { HeaderadminComponent } from './headeradmin/headeradmin.component';
import { GestadminComponent } from './admin/gestadmin/gestadmin.component';
import { DetailsartComponent } from './admin/detailsart/detailsart.component';

const appRoutes: Routes=[

  { path: '', component:AcceuilComponent} ,
  { path: 'single-shop/:id', component:SingleShopComponent} ,
  { path: 'search/:name', component:SearchComponent} ,
  { path: 'admin/user', children:[
    {
      path:'',
      component:AdminComponent,
      canActivate: [AuthGuardService]
    },
    {
      path:'detailsart/:cat',
      component:DetailsartComponent,
      canActivate: [AuthGuardService]
    }
  ]} ,
  { path: 'new', component:NouveauteComponent} ,
  { path: 'hommes', component:HommesComponent} ,
  { path: 'hommes/:cat', component:HommesComponent} ,
  { path: 'femmes/:cat', component:FemmesComponent} ,
  { path: 'femmes', component:FemmesComponent} ,
  { path: 'vendre',canActivate: [AuthGuardService], component:VendreComponent} ,
  { path: 'comment_acheter', component:CoachatComponent} ,
  { path: 'comment_vendre', component:CovendreComponent} ,
  { path: 'faq', component:FaqComponent} ,
  { path: 'cgv', component:CgvComponent} ,
  { path: 'à_propos', component:AproposComponent} ,
  { path: 'mon_panier', component:PanierComponent} ,
  { path: 'finaliser_commande',canActivate: [AuthGuardService], component:CheckoutComponent} ,
  { path: 'inscription', component:InscriptionComponent} ,
  { path: 'mon_compte', canActivate: [AuthGuardService],component:MonCompteComponent} ,
  { path: 'success',canActivate: [AuthGuardService], component:SuccessComponent} ,
  { path: 'secureinfo', component:SecureComponent} ,
  { path: 'admin/admin',canActivate: [AuthGuardService], component:GestadminComponent} ,
  { path: 'retour&remboursement', component:RetourremboComponent} ,

] ;


@NgModule({
  declarations: [
    AppComponent,
    AcceuilComponent,
    NouveauteComponent,
    FemmesComponent,
    HommesComponent,
    VendreComponent,
    CoachatComponent,
    CovendreComponent,
    CgvComponent,
    FaqComponent,
    RetourremboComponent,
    AproposComponent,
    PanierComponent,
    CheckoutComponent,
    InscriptionComponent,
    MonCompteComponent,
    SuccessComponent,
    SecureComponent,
    SingleShopComponent,
    SearchComponent,
    AdminComponent,
    HeaderadminComponent,
    GestadminComponent,
    DetailsartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes) ,
    HttpClientModule,
    FormsModule,
ReactiveFormsModule,

  ],
  providers: [SokoService,SharedServiceService,AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
