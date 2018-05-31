import { Component,ElementRef, ViewChild, NgZone } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
//import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import {Http} from '@angular/http';
import { HTTP } from '@ionic-native/http';
import 'rxjs/add/operator/map';

declare var google;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('map') mapElement: ElementRef;
  
  map: any;
  contentHtml= '';
  idVacante=0;
  toaster: any;
  header:any= {};
  constructor(public navCtrl: NavController, public http: Http, private toastCtrl:ToastController,public http2: HTTP, public zone: NgZone) {
    this.toaster = this.toastCtrl.create({
      duration: 3000,
      position: 'bottom'
    });
  }

  ionViewDidLoad(){
    this.displayGoogleMap();
    this.getMarkers();
    //this.getPosition();
  }

  
  displayGoogleMap(){
    //let mapEle: HTMLElement = document.getElementById('map');

    let latLng = new google.maps.LatLng(3.4290201, -76.5402327);

console.log(latLng);
let mapOptions ={
  center: latLng,
  zoom:12,
  mapTypeId: google.maps.MapTypeId.ROADMAP
}
this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
  }

  getMarkers(){
    this.http.get('http://192.168.0.16:8081/novedades/public/getVacantesUbicacion').map((res)=>res.json()).subscribe(data=>{
    this.addMarkersMap(data);
    });
  }

  addInfoWindow(marker, content) {
    var infoWindow=null;
     infoWindow = new google.maps.InfoWindow({
        content: content,
        maxWidth: 200
        
    });

    google.maps.event.addListener(marker, 'click', function() {
      infoWindow.close();
      infoWindow.setContent(content);
      infoWindow.open(this.map, this);
      
    });
    setTimeout(function () { infoWindow.close(); }, 5000);
    
    
    google.maps.event.addListenerOnce(infoWindow, 'domready', () => { //caotura evento del boton
      document.getElementById('myid').addEventListener('click', () => {
        var idVaca=document.getElementById('myid').getAttribute('data-vaca');
        this.add(idVaca);
        //console.log(document.getElementById('myid').dataset.vaca);

        
      //alert('SIIIII');
      });
      });

    //setTimeout(function () { infoWindow.close(); }, 5000);
/*
    google.maps.event.addListener(marker, 'click', function() {
      infoWindow.setContent(this.contentHtml);
        infoWindow.open(this.map, this);
    });
*/
}

  addMarkersMap(markers){    
    //google.maps.event.addListenerOnce(this.map, 'idle', () =>{
    for(let marker of markers){
      var emp = marker.EMPR_DESCRIPCION;
      var vaId = marker.VACA_PROGRAMA;
      var program = marker.VACA_REQUISITOS;
     var idVaca= marker.VACA_ID;
     var salario= marker.VACA_SALARIO;
      var loc = {lat: marker.EMPR_LATITUD, lng: marker.EMPR_LOGITUD };
      console.log(loc);
      
     let  marker_custom  = new google.maps.Marker({
      position: loc,
      map: this.map,
      title:emp,
      label: vaId
          });
       
          let content = '<div id="content">' +
          '<div id="siteNotice">' +
          '</div>' +
          '<h3 id="firstHeading" class="firstHeading">'+emp+'</h1>' +
          '<div id="bodyContent">' +
          '<p><b>'+vaId+'</b>, '+program+' .'+
          '.</p>' +
          '<p>Vacante: Compex, <a href="https://www.computrabajo.com.co/ofertas-de-trabajo/oferta-de-trabajo-de-auxiliar-administrativo-medellin-idioma-ingles-y-portugues-avanzado-en-medellin-3A1D6D521A932460">' +
          'https://www.computrabajo.com.co/ofertas-de-trabajo</a> ' +
          '(last visited June 22, 2009).</p>' +
          '<button class="button" id="myid" data-vaca="'+idVaca+'">Postularme</button>'+ 
          '<p><b>Salario:</b>$ '+salario+ '</p>' +         
          '</div>' +
          '</div>';
          
          
          this.contentHtml =content;
          
          //'<button id = "myid">Click me</button>'+          
          //'<button (click)=\"myFunction()\">Click me</button>'+
          //ng-click="angular.element(\'#map\').scope().goToPage()
                 
          this.idVacante=idVaca;
          this.addInfoWindow(marker_custom, content);
        
      }
    //});

    }
    

    add(id){
      this.toaster=this.toastCtrl.create({
        duration: 3000,
        position: 'bottom'
      });
      var idVacante= id;
      var idUsuario= localStorage.getItem('storedData');
      console.log(idUsuario);
      this.http2.get('http://192.168.0.16:8081/novedades/public/addPostulacion?id='+idVacante+'&idUsuario='+idUsuario, {}, this.header)
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
   
    
  }