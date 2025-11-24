import React from 'react';
import {MapContainer, TileLayer, Marker} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from "leaflet"; // این را در فایل اصلی ایمپورت کنید

const SmallMap = ({location, zoom = 13, link}) => {
    const handleClick = () => {
        window.location.href = `https://www.google.com/maps/place/${location[0]},${location[1]}`
    };
    const customIcon = new L.Icon({
        iconUrl: '/Images/pin-location.svg',
        iconRetinaUrl: '/Images/pin-location.svg',
        iconSize: [25, 40],
        iconAnchor: [17, 55],
    });
    return (
        <MapContainer
            center={location}
            zoom={zoom}
            className="lg:max-w-96 w-full h-64"
            onClick={handleClick} // کلیک روی نقشه به لینک هدایت می‌کند
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={location} icon={customIcon}/>
        </MapContainer>
    );
};
export default SmallMap;