import { Component, NgZone } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HTTP } from '@ionic-native/http';


@Component({
    selector: 'page-signup',
    templateUrl: 'signup.html'
})
export class SignUpPage {

  data:any=[];
  header:any= {};
//  private form : FormGroup;

    constructor(public navCtrl: NavController, public http: HTTP, public zone: NgZone) {
   
    }

    signUp() {
    }

    btnSubmit(){
      //var data = null;     
        //let user = this.form.get('user').value;
        //let pass = this.form.get('pass').value;
        
        alert('hola');
      }
    
}