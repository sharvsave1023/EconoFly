import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import MapComponent from './MapComponent';

function App() {
  const [departure, setDeparture] = useState('');
  const [arrival, setArrival] = useState('');
  const [showMap, setShowMap] = useState(false);
  const [carbonEmission, setCarbonEmission] = useState('');

const airports = {
  'ADW': 'Joint Base Andrews',
  'ATL': 'Hartsfield Jackson Atlanta International Airport',
  'AUS': 'Austin Bergstrom International Airport',
  'BNA': 'Nashville International Airport',
  'BOS': 'Logan International Airport',
  'BUF': 'Buffalo Niagara International Airport',
  'BWI': 'Baltimore/Washington International Thurgood Marshall Airport',
  'CLE': 'Cleveland Hopkins International Airport',
  'CLT': 'Charlotte Douglas International Airport',
  'CMA': 'Camarillo International Airport',
  'CMH': 'John Glenn Columbus International Airport',
  'CVG': 'Cincinnati Northern Kentucky International Airport',
  'DCA': 'Ronald Reagan Washington National Airport',
  'DEN': 'Denver International Airport',
  'DFW': 'Dallas Fort Worth International Airport',
  'DTW': 'Detroit Metropolitan Wayne County Airport',
  'EWR': 'Newark Liberty International Airport',
  'FLL': 'Fort Lauderdale Hollywood International Airport',
  'IAD': 'Washington Dulles International Airport',
  'IAH': 'George Bush Intercontinental Houston Airport',
  'IND': 'Indianapolis International Airport',
  'JAX': 'Jacksonville International Airport',
  'JFK': 'John F Kennedy International Airport (New York)',
  'LAS': 'Harry Reid International Airport (Las Vegas)',
  'LAX': 'Los Angeles / Tom Bradley International Airport',
  'LGA': 'La Guardia Airport',
  'MCI': 'Kansas City International Airport',
  'MCO': 'Orlando International Airport',
  'MDW': 'Chicago Midway International Airport',
  'MEM': 'Memphis International Airport',
  'MIA': 'Miami International Airport',
  'MKE': 'General Mitchell International Airport',
  'MSP': 'Minneapolis–Saint Paul International Airport / Wold–Chamberlain Field',
  'MSY': 'Louis Armstrong New Orleans International Airport',
  'OAK': 'Metropolitan Oakland International Airport',
  'OMA': 'Eppley Airfield',
  'ONT': 'Ontario International Airport',
  'ORD': 'Chicago OHare International Airport',
  'PBI': 'Palm Beach International Airport',
  'PDX': 'Portland International Airport',
  'PHL': 'Philadelphia International Airport',
  'PHX': 'Phoenix Sky Harbor International Airport',
  'PIT': 'Pittsburgh International Airport',
  'PVD': 'Theodore Francis Green State Airport',
  'PWM': 'Portland International Jetport',
  'RDU': 'Raleigh Durham International Airport',
  'RIC': 'Richmond International Airport',
  'RNO': 'Reno Tahoe International Airport',
  'RSW': 'Southwest Florida International Airport',
  'SAN': 'San Diego International Airport',
  'SAT': 'San Antonio International Airport',
  'SAV': 'Savannah Hilton Head International Airport',
  'SDF': 'Louis Armstrong New Orleans International Airport',
  'SEA': 'Seattle–Tacoma International Airport',
  'SFB': 'Orlando Sanford International Airport',
  'SFO': 'San Francisco International Airport',
  'SJC': 'Norman Y. Mineta San Jose International Airport',
  'SLC': 'Salt Lake City International Airport',
  'SMF': 'Sacramento International Airport',
  'SNA': 'John Wayne Orange County International Airport',
  'STL': 'St Louis Lambert International Airport',
  'SYR': 'Syracuse Hancock International Airport',
  'TPA': 'Tampa International Airport',
  'TUL': 'Tulsa International Airport',
  // ... continue with other major airports as required
};

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (departure && arrival) {
      setShowMap(false); // Hide the map while loading
      try {
        const response = await axios.post('http://127.0.0.1:5500/', {
          airport_1: departure,
          airport_2: arrival
        });
        setCarbonEmission(response.data);
        setShowMap(true); // Show the map after getting response
      } catch (error) {
        console.error('Error fetching carbon emissions:', error);
      }
    } else {
      alert('Please select both departure and arrival airports.');
    }
  };

  const handleDepartureChange = (event) => {
    setDeparture(event.target.value);
  };

  const handleArrivalChange = (event) => {
    setArrival(event.target.value);
  };

return (
  <div className="App">
    <header className="App-header">
      <h1>Trip Carbon Footprint Calculator</h1>
    </header>
    <form onSubmit={handleSubmit}>
      <label htmlFor="departure-select">Select departure:</label>
      <select id="departure-select" value={departure} onChange={handleDepartureChange}>
        <option value="">--Please choose an airport--</option>
        {Object.entries(airports).map(([code, name]) => (
          <option key={code} value={code}>{name}</option>
        ))}
      </select>

      <label htmlFor="arrival-select">Select landing:</label>
      <select id="arrival-select" value={arrival} onChange={handleArrivalChange}>
        <option value="">--Please choose an airport--</option>
        {Object.entries(airports).map(([code, name]) => (
          <option key={code} value={code}>{name}</option>
        ))}
      </select>

      <button type="submit" className="search-btn">Calculate Carbon Footprint</button>
    </form>
    {showMap && <MapComponent departure={departure} arrival={arrival} />}
    {carbonEmission && <div className="emissions-report">{carbonEmission}</div>}
  </div>
);
}

export default App;