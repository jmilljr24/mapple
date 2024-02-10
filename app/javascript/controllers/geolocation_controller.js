import { Controller } from "@hotwired/stimulus";

const options = {
  enableHighAccuracy: true,
  maximumAge: 0,
};

// Connects to data-controller="geolocation"
export default class extends Controller {
  static values = {
    url: String,
  };

  static targets = ["output", "form", "field", "submit"];
  connect() {}
  search() {
    navigator.geolocation.getCurrentPosition(
      this.success.bind(this),
      this.error,
      options
    );
  }

  success(pos) {
    let x = pos.coords.longitude;
    let y = pos.coords.latitude;
    let z = pos.coords.altitude;
    let location = null;
    if (z !== null) {
      location = "POINT(" + x + " " + y + " " + z + ")";
    } else {
      location = "POINT(" + x + " " + y + ")";
    }

    this.fieldTarget.setAttribute("value", location);
    console.log(this.formTarget);
    // this.formTarget.submit();
    this.outputTarget.innerHTML = "Lat: " + y + ", Lon: " + x;
  }

  error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }
}
