'use client';

import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { FaExclamationTriangle } from 'react-icons/fa';

interface TripMapProps {
    location: {
        lat: number;
        lng: number;
    };
}

const mapContainerStyle = {
    width: '100%',
    height: '400px',
};

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';

export default function TripMap({ location }: TripMapProps) {
    if (!GOOGLE_MAPS_API_KEY) {
        return (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-center text-yellow-800 mb-2">
                    <FaExclamationTriangle className="mr-2" />
                    <span className="font-medium">Map not available</span>
                </div>
                <p className="text-yellow-700">
                    Please set the NEXT_PUBLIC_GOOGLE_MAPS_API_KEY environment variable to enable the map.
                </p>
            </div>
        );
    }
    return (
        <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
            <GoogleMap mapContainerStyle={mapContainerStyle} center={location} zoom={12}>
                <Marker position={location} />
            </GoogleMap>
        </LoadScript>
    );

}