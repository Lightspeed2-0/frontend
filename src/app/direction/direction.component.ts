import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Component, Input, OnChanges, OnInit } from "@angular/core";

declare const L: any;

@Component({
  selector: "app-direction",
  templateUrl: "./direction.component.html",
  styleUrls: ["./direction.component.scss"],
})
export class DirectionComponent implements OnInit {
  @Input() Coordinates: any;

  destination: any;
  origin: any;
  displayDirections = true;
  zoom = 14;
  path: any[] = [];

  private pathUrl = "https://lightning-backend.herokuapp.com/geoLocation";

  constructor(private http: HttpClient) {}

  getPaths(data: any) {
    return this.http.post<any>(this.pathUrl, data);
  }

  ngOnInit(): void {
    this.origin = this.Coordinates.src;
    this.destination = this.Coordinates.des;

    const coordinates: any[] = [];

    let myPromise = new Promise((resolve, reject) => {
      this.getPaths({
        Source: { lat: this.origin.latitude, lng: this.origin.longitude },
        Destination: {
          lat: this.destination.latitude,
          lng: this.destination.longitude,
        },
      }).subscribe(
        (res) => {
          this.path = res["coordinates"];
          resolve("ok");
        },
        (error) => {
          if (error instanceof HttpErrorResponse) {
            console.error(error.error);
            reject("error");
          }
        }
      );
    });

    myPromise.then(
      (value) => {
        let mymap = L.map("map").setView(
          [this.origin.latitude, this.origin.longitude],
          11
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

        let smarker = L.marker([this.origin.latitude, this.origin.longitude], {
          icon: primary,
        }).addTo(mymap);

        let dmarker = L.marker(
          [this.destination.latitude, this.destination.longitude],
          {
            icon: primary,
          }
        ).addTo(mymap);

        smarker.bindPopup("Pickup Place");
        dmarker.bindPopup("Delivery Place");

        coordinates.push([this.origin.latitude, this.origin.longitude]);

        for (let i = 0; i < this.path.length; i++) {
          coordinates.push([this.path[i][1], this.path[i][0]]);
        }

        coordinates.push([
          this.destination.latitude,
          this.destination.longitude,
        ]);

        const polyline = L.polyline(coordinates, { color: "red" }).addTo(mymap);
        mymap.fitBounds(polyline.getBounds());
        mymap.invalidateSize();
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
