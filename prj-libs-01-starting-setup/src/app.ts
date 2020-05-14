const form = document.querySelector('form')!;
const addressInput = document.getElementById('address')! as HTMLInputElement;
import axios from 'axios';
//import { google } from '';

const GOOGLE_API_KEY = 'AIzaSyCeC6VSTSjx5AIQI8MjNSGTYy0zkkg1PXY';

//este tipo lo defino viendo la response de google
//la response de google trae mas atributos, pero yo defino solo los que me interesan
//para TS si el objeto que analice cumpla con los atributos definidos es suficiente asi 
//tenga atributos extra
type GoogleGeocodingResponse = {
    results: {geometry: {location: {lat:number, lng: number}}}[],
    status: 'OK' | 'ZERO_RESULTS' 
};

function searchAddressHandler(event: Event){
    event.preventDefault();
    const enteredAddress = addressInput.value;

    //como el metodo get de axios para TS es generico, defino qué tipo de dato
    //es el que llegará del servicio
    axios.get<GoogleGeocodingResponse>(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(enteredAddress)}&key=${GOOGLE_API_KEY}`)
    .then(response => {
        console.log(response);
        if(response.data.status !== 'OK'){
            throw new Error('Could not fetch location!');
        }
        const coordinates = response.data.results[0].geometry.location;

        //para que TS reconozca los objetos y demas del sdk de google maps (como este objeto "google")
        //hemos instalado el d.ts :  @types/googlemaps
        //este ya genera variables globales, de modo que no es necesario importar nada en este file
        const map = new google.maps.Map(document.getElementById('map')!, {
            center: coordinates,
            zoom: 16
        });
        //ponemos un marcador
        const marker = new google.maps.Marker({
            position: coordinates,
            map: map,
            title: 'Mi jato!'
          });

          marker.setMap(map);

    })
    .catch(error => {
        alert(error.message);
        console.log(error);
    })
}

form.addEventListener('submit',searchAddressHandler);