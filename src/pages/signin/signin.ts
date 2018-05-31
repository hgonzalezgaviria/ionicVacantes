import { Component, NgZone } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { HTTP } from '@ionic-native/http';
import { UserModel } from '../../models/user-model';

import { SignUpPage } from '../signup/signup';
//import { HomePage } from '../home/home';
import { TabsPage } from '../tabs/tabs';

@Component({
    selector: 'page-signin',
    templateUrl: 'signin.html'
})
export class SignInPage {
    data:any=[];
    header:any= {};
    userModel: UserModel;

    constructor(
        public navCtrl: NavController,
        public loadingCtrl: LoadingController,
        public alertCtrl: AlertController,
        public http: HTTP, public zone: NgZone) {
        this.userModel = new UserModel();
    }

    signIn() {
        let loading = this.loadingCtrl.create({
            content: 'Iniciando sesión. Por favor, espere...'
        });
        //alert(this.userModel.email);
        var mail= this.userModel.email;
        var pass = this.userModel.password;
        this.http.get('http://192.168.0.16:8081/novedades/public/validarUsuario?mail='+mail+'&pass='+pass, {}, this.header)
        .then(res => {
          try{
            console.log(res);
            var dataIns= JSON.parse(res.data);
            if (dataIns.success==2){

                this.alert('Alerta', 'Los datos ingresados no son validos');
                let loading = this.loadingCtrl.create({
                    content: 'Ingrese datos validos'
             
                });
                loading.present();
                loading.dismiss();


            }else{
                let idUsuario = dataIns.PROP_ID;
                localStorage.setItem('storedData', idUsuario);
                loading.dismiss();
                console.log(dataIns);
                this.navCtrl.push(TabsPage);
            }
            loading.dismiss();
                        
            
          } catch(e){
            console.error('Err:'+e);        
            this.alert('Error', 'NOOOOHOME.');
            loading.dismiss();
          }
             
    
        }).catch(e => {
            this.alert('Error', 'siiiiHOME.');
          console.log(e);
          loading.dismiss();
        });

        
        
        
    }

    signUp() {
        this.navCtrl.push(SignUpPage);
    }

    alert(title: string, message: string) {
        let alert = this.alertCtrl.create({
            title: title,
            subTitle: message,
            buttons: ['OK']
        });
        alert.present();
    }
}