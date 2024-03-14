
class MapsHandler {
    constructor(map = null, latInput = document.getElementById("lat"), lngInput = document.getElementById("lng")) {
        this.map = map;
        this.latInput = latInput;
        this.lngInput = lngInput;
        this.marker = null;
    }

    initialize(callback) {
        const initialCoordinates = new Coordinates();

        this.latInput.value = initialCoordinates.lat;
        this.lngInput.value = initialCoordinates.lng;

        const mapOptions = {
            center: new google.maps.LatLng(initialCoordinates.lat, initialCoordinates.lng),
            zoom: 15,
            // Asegúrate de que mapStyle esté definido o disponible en tu proyecto
            styles: mapStyle,
            disableDefaultUI: true,
            scrollwheel: false,
            zoomControl: true,
        };

        this.map = new google.maps.Map(document.getElementById('map'), mapOptions);

        this.marker = new google.maps.Marker({
            position: this.map.getCenter(),
            map: this.map,
            draggable: false
        });

        this.map.addListener('wheel', (event) => {
            event.preventDefault();
        });

        this.map.addListener('center_changed', () => {
            let center = this.map.getCenter();
            this.marker.setPosition(center);
            this.updateInputs(new Coordinates(center.lat(), center.lng()));
        });

        this.map.addListener('click', (event) => {
            this.map.panTo(event.latLng);
        });

        this.latInput.addEventListener("input", () => this.parseMarkerPosition());
        this.lngInput.addEventListener("input", () => this.parseMarkerPosition());

        document.getElementById('copy-coordinates').addEventListener('click', () => this.copyToClipboard());
    }

    updateInputs(coordinates) {
        this.latInput.value = coordinates.lat;
        this.lngInput.value = coordinates.lng;
    }

    copyToClipboard() {
        const coordinates = new Coordinates(parseFloat(this.latInput.value), parseFloat(this.lngInput.value));
        const coordinatesString = `{\n lat: ${coordinates.lat},\n lng: ${coordinates.lng} \n}`;

        navigator.clipboard.writeText(coordinatesString).then(() => {
            console.log('Coordinates copied to clipboard!');
        }).catch(err => {
            console.error('Error copying coordinates to clipboard: ', err);
        });
    }

    parseMarkerPosition() {
        const coordinates = new Coordinates(parseFloat(this.latInput.value), parseFloat(this.lngInput.value));
        let position = new google.maps.LatLng(coordinates.lat, coordinates.lng);

        this.map.setCenter(position);
        this.marker.setPosition(position);
    }
}
