import { Component, NgZone } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { HTTP } from '@ionic-native/http';
import { UserModel } from '../../models/user-model';
import { SignInPage } from '../signin/signin';
import { AlertController } from 'ionic-angular';



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
  

  constructor(public navCtrl: NavController, public http: HTTP, public zone: NgZone, public navParams: NavParams, private toastCtrl:ToastController, private alertCtrl: AlertController  ) {
   
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
    this.http.get('http://181.49.221.76:8085/novedades/public/getVacantesUsuarios?user='+idUsuario, {}, this.header)
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

  destacar(id){

    let alert = this.alertCtrl.create({
      title: 'Descartar postulación',
      message: 'Desea cancelar esta postulación?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Aceptar',
          handler: () => {
            console.log('Buy clicked');
            var idUsuario= localStorage.getItem('storedData');
    this.http.get('http://181.49.221.76:8085/novedades/public/delPostulacion?id='+id+'&idUsuario='+idUsuario, {}, this.header)
    .then(res => {
      try{
        var dataLoc= JSON.parse(res.data);      
        this.ionViewDidLoad();
      } catch(e){
        console.error('Err:'+e);
      }
        

    }).catch(e => {
      console.log(e);
    });

          }
        }
      ]
    });
    alert.present();

    
    

  }


}
