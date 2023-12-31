import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
const position = [30.66643, 76.86129];
import { Typography, useTheme } from "@mui/material";
import { useEffect } from "react";
import { useRef } from "react";
import { icon as leafletIcon } from "leaflet";
import MarkerIcon from '../assets/Vector.png'
const MapComponent = () => {
  const theme = useTheme();
  // console.log(theme.palette.mode);
  const markerRef = useRef();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (markerRef.current) {
        markerRef.current.openPopup();
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, []);
  const isDarkMode = theme.palette.mode === "dark";
  const mapContainerStyle = {
    height: "100%",
    width: "100%",
    filter: isDarkMode
      ? "invert(100%) hue-rotate(180deg) brightness(100%) contrast(92%)"
      : "brightness(95%) contrast(95%)",
    borderRadius: "8px", // Adjust the value as per your preference
  };

  const mapOptions = {
    attributionControl: false, // Disable attribution control
    scrollWheelZoom: false, // Disable zooming on scroll
  };

  const customMarkerIcon = leafletIcon({
    iconUrl: MarkerIcon ,
    iconSize: [20, 30], // Adjust the size of the icon
    iconAnchor: [10, 30], // Adjust the position of the icon anchor
    popupAnchor: [0, -32], // Adjust the position of the popup anchor
  });

  return (
    <div style={mapContainerStyle}>
      <MapContainer
        center={position}
        zoom={14}
        scrollWheelZoom={false}
        style={{
          height: "100%",
          width: "100%",
          minHeight: 300,
          borderRadius: "10px",
        }}
        {...mapOptions}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution={false}
        />
        <Marker position={position} icon={customMarkerIcon} ref={markerRef}>
          <Popup
            sx={{
              backgroundColor: theme.palette.primary.main,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                // color: theme.palette.text.primary,
                color: theme.palette.mode === "dark" ? "#070707" : "#212121",
              }}
            >
              Tejas Ravindra Rote
            </Typography>
            <Typography
              variant="body1"
              sx={{
                // color: theme.palette.text.primary,
                color: theme.palette.mode === "dark" ? "#070707" : "#212121",
              }}
            >
              Panchkula, Haryana
            </Typography>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapComponent;
