import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { MapPin, Navigation } from "lucide-react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";


// Custom marker icon
const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const LocationSection = () => {
  const position = [23.790958, 90.402753]; // Example: Dhaka coordinates
  const address = "11-108 Road No. 11, Banani, Dhaka, Bangladesh";
  const googleMapLink =
    "https://www.google.com/maps/dir/?api=1&destination=23.790958,90.402753";

  return (
    <section className="bg-gray-100 py-16 px-6 md:px-12 lg:px-24">
      <div className="container mx-auto grid md:grid-cols-2 gap-10 items-center">
        {/* Address Details */}
        <div>
          <h2 className="text-3xl font-bold mb-4 text-purple-700 flex items-center gap-2">
            <MapPin size={28} /> Our Location
          </h2>
          <p className="text-lg text-gray-700 mb-6">
            <strong>Address:</strong> {address}
          </p>
          <a
            href={googleMapLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-5 py-3 rounded-xl shadow-lg transition duration-300"
          >
            <Navigation size={20} />
            Navigate with Google Maps
          </a>
        </div>

        {/* Leaflet Map */}
        <div className="rounded-2xl overflow-hidden shadow-lg">
          <MapContainer center={position} zoom={15} style={{ height: "350px", width: "100%" }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors"
            />
            <Marker position={position} icon={markerIcon}>
              <Popup >
                <strong>Banani Sports Club Manegement System</strong>
                <br /> {address}
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
