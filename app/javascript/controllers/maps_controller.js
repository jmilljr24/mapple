import { Controller } from "@hotwired/stimulus";
import { MarkerClusterer } from "@googlemaps/markerclusterer";

// Connects to data-controller="maps"
export default class extends Controller {
  static targets = ["map", "listings", "maple"];
  connect() {
    console.log("Connecting maps");
    if (window.google) {
      this.initGoogle();
    }
  }

  initGoogle() {
    this.map();

    const position = { lat: 38, lng: -75 };
    const map = new google.maps.Map(this.mapTarget, {
      zoom: 4,
      center: position,
      mapId: "DEMO_MAP_ID",
    });
    map.addListener("mapcapabilities_changed", () => {
      const mapCapabilities = map.getMapCapabilities();

      if (!mapCapabilities.isAdvancedMarkersAvailable) {
        // Advanced markers are *not* available, add a fallback.
        console.log("no advanced markers");
      }
    });

    this.addMarkers(map);
  }
  map() {
    if (this._map == undefined) {
      const position = { lat: 38, lng: -75 };
      const map = new google.maps.Map(this.mapTarget, {
        zoom: 6,
        center: position,
      });
    }
    return this._map;
  }

  addMarkers(map) {
    let markers = [];

    Array.from(this.listingsTarget.children).forEach((listing) => {
      markers.push(
        new google.maps.Marker({
          position: {
            lat: parseFloat(listing.dataset.lat),
            lng: parseFloat(listing.dataset.lng),
          },
          map,
          icon: this.mapleTarget.innerHTML,
        })
      );
    });
    let markerCluster = new MarkerClusterer({ map, markers });
  }
}
