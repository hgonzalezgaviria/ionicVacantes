import { Component, NgZone } from '@angular/core';
import { NavController, NavParams, ToastController,App } from 'ionic-angular';
import { HTTP } from '@ionic-native/http';
import { SignInPage } from '../signin/signin';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  data:any=[];
  header:any= {};
  ID='';
  toaster: any;
  

  constructor(public navCtrl: NavController, public http: HTTP, public zone: NgZone, public navParams: NavParams, private toastCtrl:ToastController, public app: App  ) {
   
    this.toaster = this.toastCtrl.create({
      duration: 3000,
      position: 'bottom'
    });

  }

  

 

  ionViewDidEnter(){
    //this.header['Cache-Control'] = 'no-cache';
    //this.http.clearCookies();
    this.http.get('http://181.49.221.76:8085/novedades/public/getVacantes', {}, this.header)
    .then(res => {
      try{
        this.data= JSON.parse(res.data);       
        console.log(this.data);
      } catch(e){
        console.error('Err:'+e);
      }
        

    }).catch(e => {
      console.log(e);
    });
  }

/*
  btnSubmit(){
    var data = null;
    data = this.form.value;
      let cedula = this.form.get('cedula').value;
      console.log(cedula);
      this.http.get('http://181.49.221.76:8085/novedades/public/getVacantes', {}, this.header)
      .then(res => {
        try{
          this.data= JSON.parse(res.data);
          console.log(this.data);
        } catch(e){
          console.error('Err:'+e);
        }
          

      }).catch(e => {
        console.log(e);
      });
      
    }
   */

  add(id){
    this.toaster=this.toastCtrl.create({
      duration: 3000,
      position: 'bottom'
    });
    var idVacante= id;
    var idUsuario= localStorage.getItem('storedData');
    console.log(idUsuario);
    this.http.get('http://181.49.221.76:8085/novedades/public/addPostulacion?id='+idVacante+'&idUsuario='+idUsuario, {}, this.header)
    .then(ress => {
      try{
        console.log(ress);
        var dataIns= JSON.parse(ress.data);
        this.toaster.setMessage(dataIns.success);
        this.toaster.present();        
        this.toaster=null;
        console.log(dataIns);
      } catch(e){
        console.error('Err:'+e);        
        this.toaster=null;
      }
         

    }).catch(e => {
      console.log(e);
      this.toaster=null;
    });
    //this.navCtrl.push("formPage", {ID: id});
    //this.insertarDato();
    

  
  }

  closesession(){
    this.app.getRootNav().setRoot( SignInPage );

  }

}
