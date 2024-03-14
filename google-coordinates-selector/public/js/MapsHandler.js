class MapsHandler {
    constructor(map = null, latInput = document.getElementById("lat"), lngInput = document.getElementById("lng")) {
        this.map = map;
        this.latInput = latInput;
        this.lngInput = lngInput;
        this.marker = null;
    }

    initialize(callback) {
        this.latInput.value = 51.10616722826697;
        this.lngInput.value = 17.07296641485615;

        const mapOptions = {
            center: new google.maps.LatLng(this.latInput.value, this.lngInput.value),
            zoom: 15,
            styles: mapStyle, // Asegúrate de que mapStyle está definido o elimina esta línea si no usas estilos personalizados
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
            this.zoomMap(event);
        });

        this.map.addListener('center_changed', () => {
            let center = this.map.getCenter();
            this.marker.setPosition(center);
            this.updateInputs(center.lat(), center.lng());
        });

        this.map.addListener('click', (event) => {
            this.map.panTo(event.latLng);
        });

        this.latInput.addEventListener("input", () => this.parseMarkerPosition());
        this.lngInput.addEventListener("input", () => this.parseMarkerPosition());

        document.getElementById('copy-coordinates').addEventListener('click', () => this.copyInputs());
    }

    updateInputs(lat, lng) {
        this.latInput.value = lat;
        this.lngInput.value = lng;
    }

    copyInputs() {
        const coordinates = `Latitude: ${this.latInput.value}, Longitude: ${this.lngInput.value}`;
        navigator.clipboard.writeText(coordinates).then(() => {
            alert('Coordinates copied to clipboard!');
        }).catch(err => {
            console.error('Error copying coordinates to clipboard: ', err);
            alert('Error copying coordinates to clipboard.');
        });
    }

    parseMarkerPosition() {
        let lat = parseFloat(this.latInput.value);
        let lng = parseFloat(this.lngInput.value);
        let position = new google.maps.LatLng(lat, lng);

        this.map.setCenter(position);
    }

    zoomMap(event) {
        let zoom = this.map.getZoom();
        zoom += event.deltaY > 0 ? -1 : 1;
        zoom = Math.max(0, zoom);
        this.map.setZoom(zoom);
        this.map.setCenter(this.marker.getPosition());
    }
}

    const mapStyle = [
    {
        "featureType": "all",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#202c3e"
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "gamma": 0.01
            },
            {
                "lightness": 20
            },
            {
                "weight": "1.39"
            },
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "weight": "0.96"
            },
            {
                "saturation": "9"
            },
            {
                "visibility": "on"
            },
            {
                "color": "#000000"
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [
            {
                "lightness": 30
            },
            {
                "saturation": "9"
            },
            {
                "color": "#14294d"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            {
                "saturation": 20
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
            {
                "lightness": 20
            },
            {
                "saturation": -20
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
            {
                "lightness": 10
            },
            {
                "saturation": -30
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#091c3e"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "saturation": 25
            },
            {
                "lightness": 25
            },
            {
                "weight": "0.01"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "lightness": -20
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#000b1d"
            }
        ]
    },
]