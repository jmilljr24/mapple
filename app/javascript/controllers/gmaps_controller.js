import { Controller } from "@hotwired/stimulus";
import { Loader } from "@googlemaps/js-api-loader";
import { MarkerClusterer } from "@googlemaps/markerclusterer";

let markers = [];
export default class extends Controller {
  static targets = ["map", "maple", "listings"];
  static values = {
    api: String,
  };

  connect() {
    this.map();
  }

  map() {
    if (this._map == undefined) {
      const loader = new Loader({
        apiKey: "AIzaSyBeMEgh-eLg7ul9BOXHsy4ZKbC7uM6vru0",
        version: "quarterly",
        libraries: ["maps", "marker"],
      });

      const mapOptions = {
        center: { lat: 40, lng: -75 },
        zoom: 5,
        mapId: "DEMO_MAP_ID",
      };

      loader
        .importLibrary("maps")
        .then(({ Map }) => {
          this._map = new Map(this.mapTarget, mapOptions);
        })
        .catch((e) => {
          console.log(e);
        });
    }

    return this._map;
  }
  marker(lat, lng) {
    var latLng = new google.maps.LatLng(lat, lng);
    this._marker = new google.maps.marker.AdvancedMarkerElement({
      map: this.map(),
      position: latLng,
      // icon: this.mapleTarget.innerHTML,
    });

    console.log(this._marker);
    this._markers.push(this._marker);
  }
  adddbmarkers() {
    Array.from(this.listingsTarget.children).forEach((listing) => {
      if (this._markers == undefined) {
        this._markers = [];
      }
      this.marker(
        parseFloat(listing.dataset.lat),
        parseFloat(listing.dataset.lng)
      );
    });
  }
  markers() {
    this.adddbmarkers();
    const markerCluster = new MarkerClusterer({
      map: this._map,
      markers: this._markers,
    });
  }
}
