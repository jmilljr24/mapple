import { Controller } from "@hotwired/stimulus";
import { Loader } from "@googlemaps/js-api-loader";
import { MarkerClusterer } from "@googlemaps/markerclusterer";

let boundaryPoints;

export default class extends Controller {
  static targets = ["map", "maple", "listings"];
  static values = {
    api: String,
    boundary: Array,
  };

  connect() {
    console.log(this.boundaryValue);
    this.map();
    window.onload = (event) => {
      this.markers();
      document
        .getElementById("add-boundary")
        .addEventListener("click", addBoundary);
      document
        .getElementById("remove-boundary")
        .addEventListener("click", removeBoundary);

      let lastPosition = this.listingsTarget.lastElementChild;
      const latLng = new google.maps.LatLng(
        parseFloat(lastPosition.dataset.lat),
        parseFloat(lastPosition.dataset.lng)
      );

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
  marker(lat, lng, taps, id) {
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
      console.log("infoWindow");
      infoWindow.close();
      infoWindow.setContent(
        "<strong>Taps: " +
          taps +
          "</strong>" +
          "<p>Lat: " +
          lat +
          "<br>" +
          " Lon: " +
          lng +
          "</p> <p> ID: </p>" +
          id +
          "<br>" +
          '<a href="/spatials/' +
          id +
          '/edit">Edit</a>' +
          "<br>" +
          '<button data-action="gmaps#deleteMarkers" data-gmaps-id-param="delete_' +
          id +
          '">Delete</button>'
      );
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
        parseFloat(listing.dataset.lng),
        listing.dataset.taps,
        listing.dataset.id
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
  deleteMarkers({ params }) {
    if (confirm("Are you sure you want to delete this marker?") == true) {
      document.getElementById(params.id).click();
    }
  }
  addBoundary(visable) {
    const boundaryCoords = [
      { lat: this.boundaryValue[0][0], lng: this.boundaryValue[0][1] },
      { lat: this.boundaryValue[1][0], lng: this.boundaryValue[1][1] },
      { lat: this.boundaryValue[2][0], lng: this.boundaryValue[2][1] },
      { lat: this.boundaryValue[3][0], lng: this.boundaryValue[3][1] },
    ];
    // Construct the polygon.
    boundaryPoints = new google.maps.Polygon({
      paths: boundaryCoords,
      strokeColor: "#FF0000",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#FF0000",
      fillOpacity: 0.0,
    });

    boundaryPoints.setMap(this.map());
  }
  removeBoundary() {
    boundaryPoints.setMap(null);
  }

  toggleBoundary() {
    if (this._toggleBoundary == null) {
      this.addBoundary(true);
      return (this._toggleBoundary = true);
    } else {
      console.log(this._boundary);
      this.removeBoundary(false);
      return (this._toggleBoundary = null);
    }
  }
}
