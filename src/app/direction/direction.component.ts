import { mapToMapExpression } from "@angular/compiler/src/render3/util";
import { Component, OnInit } from "@angular/core";
import { ILatLng } from "./map.directive";

declare const L: any;

@Component({
  selector: "app-direction",
  templateUrl: "./direction.component.html",
  styleUrls: ["./direction.component.scss"],
})
export class DirectionComponent implements OnInit {
  origin: ILatLng = {
    latitude: 12.980334,
    longitude: 80.177866,
  };

  destination: ILatLng = {
    latitude: 12.9481,
    longitude: 80.13974,
  };
  displayDirections = true;
  zoom = 14;

  constructor() {}

  ngOnInit(): void {
    let mymap = L.map("map").setView(
      [this.origin.latitude, this.origin.longitude],
      12
    );
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

    let smarker = L.marker([this.origin.latitude, this.origin.longitude]).addTo(
      mymap
    );

    let dmarker = L.marker([
      this.destination.latitude,
      this.destination.longitude,
    ]).addTo(mymap);

    smarker.bindPopup("Meenambakkam");
    dmarker.bindPopup("Chrompet");

    const coordinates = [
      [this.origin.latitude, this.origin.longitude],
      [12.9673484, 80.1526888],
      [this.destination.latitude, this.destination.longitude],
    ];

    const polyline = L.polyline(coordinates, { color: "red" }).addTo(mymap);
    mymap.fitBounds(polyline.getBounds());
    mymap.invalidateSize();
  }
}
