import { Component, Input, OnInit } from "@angular/core";
import { ILatLng } from "./map.directive";

declare const L: any;

@Component({
  selector: "app-direction",
  templateUrl: "./direction.component.html",
  styleUrls: ["./direction.component.scss"],
})
export class DirectionComponent implements OnInit {
  @Input() Coordinates: any;

  destination: ILatLng = {
    latitude: 12.9481,
    longitude: 80.13974,
  };
  displayDirections = true;
  zoom = 14;

  constructor() {}

  ngOnInit(): void {
    const origin: ILatLng = this.Coordinates.src;
    const destination: ILatLng = this.Coordinates.des;
    const coordinates: any[] = [];

    let mymap = L.map("map").setView([origin.latitude, origin.longitude], 11);

    L.tileLayer(
      "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoiaml0aWVuZHJhbjA3IiwiYSI6ImNrb3Fyd2R2NjBiMTAyb21tMzRqaGl5OTcifQ.oP1eai0Io9AVpkB_wwjuyg",
      {
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: "mapbox/streets-v11",
        tileSize: 512,
        zoomOffset: -1,
        accessToken: "your.mapbox.access.token",
      }
    ).addTo(mymap);

    const primary = new L.Icon({
      iconUrl:
        "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
      shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });

    const secondary = new L.Icon({
      iconUrl:
        "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png",
      shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });

    let smarker = L.marker([origin.latitude, origin.longitude], {
      icon: primary,
    }).addTo(mymap);

    let dmarker = L.marker([destination.latitude, destination.longitude], {
      icon: primary,
    }).addTo(mymap);

    smarker.bindPopup("Pickup Place");
    dmarker.bindPopup("Delivery Place");

    coordinates.push([origin.latitude, origin.longitude]);
    coordinates.push([destination.latitude, destination.longitude]);

    const polyline = L.polyline(coordinates, { color: "red" }).addTo(mymap);
    mymap.fitBounds(polyline.getBounds());
    mymap.invalidateSize();
  }
}
