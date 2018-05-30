import { Component,ElementRef, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
//import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

declare var google;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('map') mapElement: ElementRef;
  
  map: any;
  constructor(public navCtrl: NavController, public http: Http) {
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
    this.http.get('http://localhost:8081/novedades/public/getVacantesUbicacion').map((res)=>res.json()).subscribe(data=>{
    this.addMarkersMap(data);
    });
  }

  addInfoWindow(marker, content) {

    let infoWindow = new google.maps.InfoWindow({
        content: content,
        maxWidth: 200
        
    });

    google.maps.event.addListener(marker, 'click', () => {
        infoWindow.open(this.map, marker);
    });

}

  addMarkersMap(markers){    
    //google.maps.event.addListenerOnce(this.map, 'idle', () =>{
    for(let marker of markers){
      var emp = marker.EMPR_DESCRIPCION;
      var vaId = marker.VACA_PROGRAMA;
      var program = marker.VACA_REQUISITOS;
      var loc = {lat: marker.EMPR_LATITUD, lng: marker.EMPR_LOGITUD };
      console.log(loc);
/*
      var contentString = '<div id="content">' +
      '<div id="siteNotice">' +
      '</div>' +
      '<h1 id="firstHeading" class="firstHeading">'+program+'</h1>' +
      '<div id="bodyContent">' +
      '<p><b>UNIAJC</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
      'sandstone rock formation in the southern part of the ' +
      'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) ' +
      'south west of the nearest large town, Alice Springs; 450&#160;km ' +
      '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major ' +
      'features of the Uluru - Kata Tjuta National Park. Uluru is ' +
      'sacred to the Pitjantjatjara and Yankunytjatjara, the ' +
      'Aboriginal people of the area. It has many springs, waterholes, ' +
      'rock caves and ancient paintings. Uluru is listed as a World ' +
      'Heritage Site.</p>' +
      '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">' +
      'https://en.wikipedia.org/w/index.php?title=Uluru</a> ' +
      '(last visited June 22, 2009).</p>' +
      '</div>' +
      '</div>';
      */
      
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
          '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">' +
          'https://en.wikipedia.org/w/index.php?title=Uluru</a> ' +
          '(last visited June 22, 2009).</p>' +
          '</div>' +
          '</div>';
          
                 

          this.addInfoWindow(marker_custom, content);
        
      }
    //});

    }
  }
/*
  getPosition():any{
    this.geolocation.getCurrentPosition().then(response =>{
      this.loadMap(response);
    })
    .catch(error =>{
      console.log(error);
    })
  }
  loadMap(position: Geoposition){
    let latitude = position.coords.latitude; //obtenemos la latitud.
    let longitude = position.coords.longitude; //obtenemos la longitud.
    console.log(latitude, longitude);
    let mapEle: HTMLElement = document.getElementById('map');
    let myLatLng = {
      lat: latitude,
      lng: longitude
    };
    this.map = new google.maps.Map(mapEle, {
      center: myLatLng,
      zoom: 12
    });
    google.maps.event.addListenerOnce(this.map, 'idle', () =>{
      let marker = new google.maps.Marker({
        position: myLatLng,
        map: this.map,
        title: 'AQUI ESTOY HECTOR!'
      });
      mapEle.classList.add('show-map');
    

      var contentString = '<div id="content">' +
      '<div id="siteNotice">' +
      '</div>' +
      '<h1 id="firstHeading" class="firstHeading">UNIAJC</h1>' +
      '<div id="bodyContent">' +
      '<p><b>UNIAJC</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
      'sandstone rock formation in the southern part of the ' +
      'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) ' +
      'south west of the nearest large town, Alice Springs; 450&#160;km ' +
      '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major ' +
      'features of the Uluru - Kata Tjuta National Park. Uluru is ' +
      'sacred to the Pitjantjatjara and Yankunytjatjara, the ' +
      'Aboriginal people of the area. It has many springs, waterholes, ' +
      'rock caves and ancient paintings. Uluru is listed as a World ' +
      'Heritage Site.</p>' +
      '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">' +
      'https://en.wikipedia.org/w/index.php?title=Uluru</a> ' +
      '(last visited June 22, 2009).</p>' +
      '</div>' +
      '</div>';

      var infowindow = new google.maps.InfoWindow({
        content: contentString
      });

      marker.addListener('click', function () {
        infowindow.open(this.map, marker);
      });
    });
  }
*/
//}
