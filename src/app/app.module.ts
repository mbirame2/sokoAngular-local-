import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {  Routes, RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AcceuilComponent } from './acceuil/acceuil.component';
import { NouveauteComponent } from './nouveaute/nouveaute.component';
import { FemmesComponent } from './femmes/femmes.component';
import { HommesComponent } from './hommes/hommes.component';
import { MarqueComponent } from './marque/marque.component';
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


const appRoutes: Routes=[

  { path: '', component:AcceuilComponent} ,
  { path: 'new', component:NouveauteComponent} ,
  { path: 'hommes', component:HommesComponent} ,
  { path: 'femmes', component:FemmesComponent} ,
  { path: 'marques', component:MarqueComponent} ,
  { path: 'vendre', component:VendreComponent} ,
  { path: 'comment_acheter', component:CoachatComponent} ,
  { path: 'comment_vendre', component:CovendreComponent} ,
  { path: 'faq', component:FaqComponent} ,
  { path: 'cgv', component:CgvComponent} ,
  { path: 'à_propos', component:AproposComponent} ,
  { path: 'mon_panier', component:PanierComponent} ,
  { path: 'finaliser_commande', component:CheckoutComponent} ,
  { path: 'inscription', component:InscriptionComponent} ,
  { path: 'mon_compte', component:MonCompteComponent} ,
  { path: 'success', component:SuccessComponent} ,
  { path: 'retour&remboursement', component:RetourremboComponent} ,
] ;


@NgModule({
  declarations: [
    AppComponent,
    AcceuilComponent,
    NouveauteComponent,
    FemmesComponent,
    HommesComponent,
    MarqueComponent,
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
    SuccessComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes) ,
    HttpClientModule,
    FormsModule,
ReactiveFormsModule
  ],
  providers: [SokoService,SharedServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
