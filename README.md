# Fishing Optimizer

An intelligent application that predicts the optimal times for shore fishing (rod and reel) using meteorological data.
Live on: http://80.225.227.121/

## Features

 - **Meteorological Data Analysis**: Real-time weather data via the Open-Meteo API
 - **Location Selection**: Search by name or pick a location on the map
 - **Smart Scoring**: Multi-factor analysis to estimate fish activity
 - **3-Day Forecast**: Hourly breakdown and recommended time slots
 - **Moon Phase Analysis**: Moon cycle effects on fish behavior
 - **Modern UI**: Responsive and user-friendly interface

## Analysis Factors
  
1. **Temperature**: Optimal range 15–25°C
2. **Pressure**: Preferred range 1010–1020 hPa; falling pressure can be advantageous
3. **Wind**: Light to moderate wind (5–15 km/h) is preferred
4. **Precipitation**: Light rain can be positive; heavy rain is negative
5. **Cloud Cover**: Partial cloudiness (30–70%) is often ideal
6. **Time of Day**: Morning (05:00–08:00) and evening (17:00–20:00) are prime times
7. **Moon Phase**: New moon and full moon periods often increase activity

## Install

```bash
# Install dependencies
npm install

# Start the server
npm start
```

Open your browser and visit `http://localhost:3000`.

## Usage

1. Type a location name in the search box (e.g., "İzmir", "Antalya")
2. Or click the map button and pick a location on the map
3. The app will automatically analyze and display the best fishing times
4. Use the hourly forecast for detailed 3-day planning

## Tech

 - **Backend**: Node.js, Express
 - **API**: Open-Meteo (Weather & Geocoding)
 - **Frontend**: Vanilla JavaScript, Leaflet.js (Map)
 - **Styling**: Modern CSS3

## Licence

MIT

---

**Note**: This tool provides weather-based predictions. Actual fish activity is also affected by local conditions (water temperature, salinity, species, etc.).

