class MapsHandler {
    constructor(map = null, marker = null, latInput = document.getElementById("lat"), lngInput = document.getElementById("lng")) {
        this.map = map;
        this.marker = marker;
        this.latInput = latInput;
        this.lngInput = lngInput;
    }

    initialize() {
        this.latInput.value = 51;
        this.lngInput.value = 17;

        const mapOptions = {
            center: new google.maps.LatLng(this.latInput.value, this.lngInput.value),
            zoom: 4
        };

        this.map = new google.maps.Map(document.getElementById('map'), mapOptions);

        // Hacer el marcador no arrastrable ya que siempre estará en el centro
        this.marker = new google.maps.Marker({
            position: this.map.getCenter(),
            map: this.map,
            draggable: false // Marcador no arrastrable
        });

        // Evento al finalizar arrastre del mapa, para actualizar inputs
        google.maps.event.addListener(this.map, 'center_changed', () => {
            let center = this.map.getCenter();
            this.marker.setPosition(center);
            this.updateInputs(center.lat(), center.lng());
        });

        // Eliminar el listener de evento de arrastre del marcador

        // Evento de clic en el mapa para actualizar solo los inputs, el marcador se actualiza con el evento center_changed
        google.maps.event.addListener(this.map, 'click', (event) => {
            this.map.panTo(event.latLng);
        });

        this.latInput.addEventListener("input", () => this.parseMarkerPosition());
        this.lngInput.addEventListener("input", () => this.parseMarkerPosition());
    }

    updateInputs(lat, lng) {
        this.latInput.value = lat;
        this.lngInput.value = lng;
    }

    parseMarkerPosition() {
        let lat = parseFloat(this.latInput.value);
        let lng = parseFloat(this.lngInput.value);
        let position = new google.maps.LatLng(lat, lng);

        // Ahora esto solo moverá el centro del mapa, el marcador se reposicionará automáticamente.
        this.map.setCenter(position);
    }
}
