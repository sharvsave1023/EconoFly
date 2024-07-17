import React from 'react';
import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import customMarkerIcon from './Dev marker.png'; // Import your custom marker image


const airportCoords = {
    'ADW': [38.810799, -76.866997], // Joint Base Andrews
    'ATL': [33.6367, -84.428101], // Hartsfield Jackson Atlanta International Airport
    'AUS': [30.197535, -97.662015], // Austin Bergstrom International Airport
    'BNA': [36.1245002746582, -86.6781997680664], // Nashville International Airport
    'BOS': [42.3643, -71.005203], // Logan International Airport
    'BUF': [42.94049835, -78.73220062], // Buffalo Niagara International Airport
    'BWI': [39.1754, -76.668297], // Baltimore/Washington International Thurgood Marshall Airport
    'CLE': [41.4117012024, -81.8498001099], // Cleveland Hopkins International Airport
    'CLT': [35.2140007019043, -80.9430999755859], // Charlotte Douglas International Airport
    'CMA': [34.213699, -119.094002], // Camarillo International Airport
    'CMH': [39.998001, -82.891899], // John Glenn Columbus International Airport
    'CVG': [39.048801, -84.667801], // Cincinnati Northern Kentucky International Airport
    'DCA': [38.8521, -77.037697], // Ronald Reagan Washington National Airport
    'DEN': [39.861698150635, -104.672996521], // Denver International Airport
    'DFW': [32.896801, -97.038002], // Dallas Fort Worth International Airport
    'DTW': [42.2123985290527, -83.353401184082], // Detroit Metropolitan Wayne County Airport
    'EWR': [40.692501, -74.168701], // Newark Liberty International Airport
    'FLL': [26.072599, -80.152702], // Fort Lauderdale Hollywood International Airport
    'IAD': [38.9445, -77.455803], // Washington Dulles International Airport
    'IAH': [29.9843997955322, -95.3414001464844], // George Bush Intercontinental Houston Airport
    'IND': [39.7173, -86.294403], // Indianapolis International Airport
    'JAX': [30.4941005706787, -81.6878967285156], // Jacksonville International Airport
    'JFK': [40.639447, -73.779317], // John F Kennedy International Airport
    'LAS': [36.083361, -115.151817], // Harry Reid International Airport
    'LAX': [33.942501, -118.407997], // Los Angeles / Tom Bradley International Airport
    'LGA': [40.777199, -73.872597], // La Guardia Airport
    'MCI': [39.2976, -94.713898], // Kansas City International Airport
    'MCO': [28.4293994903564, -81.3089981079102], // Orlando International Airport
    'MDW': [41.785999, -87.752403], // Chicago Midway International Airport
    'MEM': [35.0424003601074, -89.9766998291016], // Memphis International Airport
    'MIA': [25.7931995391846, -80.2906036376953], // Miami International Airport
    'MKE': [42.9472007751465, -87.896598815918], // General Mitchell International Airport
    'MSP': [44.882, -93.221802], // Minneapolis–Saint Paul International Airport / Wold–Chamberlain Field
    'MSY': [29.9934005737305, -90.2580032348633], // Louis Armstrong New Orleans International Airport
    'OAK': [37.721298, -122.221001], // Metropolitan Oakland International Airport
    'OMA': [41.3032, -95.894096], // Eppley Airfield
    'ONT': [34.0559997558594, -117.600997924805], // Ontario International Airport
    'ORD': [41.9786, -87.9048], // Chicago O'Hare International Airport
    'PBI': [26.6832008361816, -80.0955963134766], // Palm Beach International Airport
    'PDX': [45.58869934, -122.5979996], // Portland International Airport
    'PHL': [39.871898651123, -75.241096496582], // Philadelphia International Airport
    'PHX': [33.435302, -112.005905], // Phoenix Sky Harbor International Airport
    'PIT': [40.49150085, -80.23290253], // Pittsburgh International Airport
    'PVD': [41.725038, -71.425668], // Theodore Francis Green State Airport
    'PWM': [43.646198, -70.309303], // Portland International Jetport
    'RDU': [35.877602, -78.787498], // Raleigh Durham International Airport
    'RIC': [37.505199432373, -77.3197021484375], // Richmond International Airport
    'RNO': [39.4990997314453, -119.767997741699], // Reno Tahoe International Airport
    'RSW': [26.5361995697021, -81.7552032470703], // Southwest Florida International Airport
    'SAN': [32.7336006165, -117.190002441], // San Diego International Airport
    'SAT': [29.533701, -98.469803], // San Antonio International Airport
    'SAV': [32.12760162, -81.20210266], // Savannah Hilton Head International Airport
    'SDF': [38.1744, -85.736], // Louisville Muhammad Ali International Airport
    'SEA': [47.449162, -122.311134], // Seattle–Tacoma International Airport
    'SFB': [28.7775993347168, -81.2375030517578], // Orlando Sanford International Airport
    'SFO': [37.6189994812012, -122.375], // San Francisco International Airport
    'SJC': [37.362452, -121.929188], // Norman Y. Mineta San Jose International Airport
    'SLC': [40.785749, -111.979746], // Salt Lake City International Airport
    'SMF': [38.6954002380371, -121.591003417969], // Sacramento International Airport
    'SNA': [33.675701, -117.867996], // John Wayne Orange County International Airport
    'STL': [38.748697, -90.370003], // St Louis Lambert International Airport
    'SYR': [43.111198425293, -76.1063003540039], // Syracuse Hancock International Airport
    'TPA': [27.9755001068115, -82.533203125], // Tampa International Airport
    'TUL': [36.1983985900879, -95.8880996704102], // Tulsa International Airport
};

const MapComponent = ({ departure, arrival }) => {
    const departureCoords = airportCoords[departure];
    const arrivalCoords = airportCoords[arrival];
  
    // Define a custom icon for the markers
    const customIcon = new L.Icon({
      iconUrl: customMarkerIcon, // Use your custom marker image
      iconSize: [30, 30], // Adjust the size as needed
    });
  
    return (
      <MapContainer center={departureCoords} zoom={5} style={{ height: '400px', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {departureCoords && (
          <Marker position={departureCoords} icon={customIcon}></Marker>
        )}
        {arrivalCoords && (
          <Marker position={arrivalCoords} icon={customIcon}></Marker>
        )}
        {departureCoords && arrivalCoords && (
          <Polyline positions={[departureCoords, arrivalCoords]} color="blue" />
        )}
      </MapContainer>
    );
  };
  
  export default MapComponent;