import { Component, NgZone } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { HTTP } from '@ionic-native/http';
import { UserModel } from '../../models/user-model';
import { SignInPage } from '../signin/signin';


@Component({
  selector: 'page-mi',
  templateUrl: 'mi.html'
})
export class MiPage {
  data:any=[];
  header:any= {};
  ID='';
  toaster: any;
  userModel: UserModel;
  correo= '';
  nombre= '';
  cedula= '';
  dataUser:any=[];
  

  constructor(public navCtrl: NavController, public http: HTTP, public zone: NgZone, public navParams: NavParams, private toastCtrl:ToastController  ) {
   
    this.toaster = this.toastCtrl.create({
      duration: 3000,
      position: 'bottom'
    });

    this.userModel = new UserModel();
  }

  ionViewDidLoad(){
    this.ionViewDidEnter();

  }

  

 

  ionViewDidEnter(){
    //this.header['Cache-Control'] = 'no-cache';
    //this.http.clearCookies();
    var idUsuario= localStorage.getItem('storedData');
    this.http.get('http://192.168.0.16:8081/novedades/public/getVacantesUsuarios?user='+idUsuario, {}, this.header)
    .then(res => {
      try{
        var dataLoc= JSON.parse(res.data);
        this.dataUser = JSON.parse(res.data);  
        this.correo= dataLoc[0].PROP_CORREO;
        this.nombre= dataLoc[0].PROP_NOMBRE;
        this.cedula= dataLoc[0].PROP_CEDULA;
        console.log(this.nombre);
        console.log(this.dataUser);
      } catch(e){
        console.error('Err:'+e);
      }
        

    }).catch(e => {
      console.log(e);
    });
  }

  close(){
    this.navCtrl.push(SignInPage);
    

  }


}
