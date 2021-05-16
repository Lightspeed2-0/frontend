import { GoogleMapsAPIWrapper } from "@agm/core";
import {
  Directive,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from "@angular/core";

export interface ILatLng {
  latitude: number;
  longitude: number;
}

declare var google: any;

@Directive({
  selector: "[appMap]",
})
export class MapDirective implements OnInit, OnChanges {
  @Input() origin: ILatLng = { latitude: 0, longitude: 0 };
  @Input() destination: ILatLng = { latitude: 0, longitude: 0 };
  @Input() showDirection: boolean = false;

  private directionsRenderer: any;

  constructor(private gmapsApi: GoogleMapsAPIWrapper) {}

  ngOnInit(): void {
    this.drawDirectionsRoute();
  }

  drawDirectionsRoute() {
    this.gmapsApi.getNativeMap().then((map) => {
      if (!this.directionsRenderer) {
        this.directionsRenderer = new google.maps.DirectionsRenderer({
          suppressMarkers: true,
        });
      }

      const directionsRenderer = this.directionsRenderer;

      if (this.showDirection && this.destination) {
        const directionsService = new google.maps.DirectionsService();
        directionsRenderer.setMap(map);
        directionsService.route(
          {
            origin: { lat: this.origin.latitude, lng: this.origin.longitude },
            destination: {
              lat: this.destination.latitude,
              lng: this.destination.longitude,
            },
            waypoints: [],
            optimizeWaypoints: true,
            travelMode: "DRIVING",
          },
          (response: any, status: any) => {
            if (status === "OK") {
              directionsRenderer.setDirections(response);
            } else {
              console.log("Directions request failed due to " + status);
            }
          }
        );
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.destination || changes.showDirection) {
      if (changes.showDirection && !changes.showDirection.currentValue) {
        if (this.directionsRenderer !== undefined) {
          this.directionsRenderer.setDirections({ routes: [] });
          return;
        }
      } else {
        this.drawDirectionsRoute();
      }
    }
  }
}
