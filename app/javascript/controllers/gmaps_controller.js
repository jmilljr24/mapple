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
    window.onload = (event) => {
      this.markers();
      console.log(this.listingsTarget.lastElementChild);
      let lastPosition = this.listingsTarget.lastElementChild;
      const latLng = new google.maps.LatLng(
        parseFloat(lastPosition.dataset.lat),
        parseFloat(lastPosition.dataset.lng)
      );
      console.log(Object.getOwnPropertyNames(this.map()));
      this.map().panTo(latLng);
      this.map().setZoom(15);
    };
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
        zoom: 4,
        mapTypeId: "terrain",
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
    const latLng = new google.maps.LatLng(lat, lng);
    const mapleIcon = document.createElement("img");
    const infoWindow = new google.maps.InfoWindow();

    mapleIcon.src = this.mapleTarget.innerHTML;
    const marker = new google.maps.marker.AdvancedMarkerElement({
      map: this.map(),
      position: latLng,
      content: mapleIcon,
    });

    marker.addListener("click", ({ domEvent, latLng }) => {
      const { target } = domEvent;

      infoWindow.close();
      infoWindow.setContent("test");
      infoWindow.open(marker.map, marker);
    });

    this._markers.push(marker);
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
