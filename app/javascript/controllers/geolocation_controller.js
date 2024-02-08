import { Controller } from "@hotwired/stimulus";

const options = {
  enableHighAccuracy: true,
  maximumAge: 0,
};

// Connects to data-controller="geolocation"
export default class extends Controller {
  static values = {
    url: String,
    lat: Number,
    lon: Number,
  };

  static targets = ["output"];

  search() {
    navigator.geolocation.getCurrentPosition(
      this.success.bind(this),
      this.error,
      options
    );
  }

  success(pos) {
    let output = pos.coords;
    console.log(pos);
    this.outputTarget.textContent = output;
  }

  error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }
}
