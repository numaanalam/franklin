export default function decorate(block) {
    const [titleEl, fylTextEl, dylTextEl] = block.children;
    const title = titleEl?.textContent?.trim();
    const fylText = fylTextEl?.textContent?.trim();
    const dylText = dylTextEl?.textContent?.trim();
  
    block.innerHTML = `
            <button class="location-btn">
                Delhi
            </button>
            <div class="geo-location">
                <p class="geo-location__text">${title}</p>
                <div class="detect-location">
                    <p class="find-location__text">${fylText}</p>
                    <p class="separator">or</p>
                    <div class="detect-location__cta">
                    <p class="detect-location__text">
                        ${dylText}
                    </p>
                </div>
            </div>
        `;
    const locationButton = block.querySelector('.location-btn');
    const geoLocationDiv = block.querySelector('.geo-location');
    const detectLocationCTA = block.querySelector('.detect-location__cta');
  
    const citiesObject = {
      Delhi: { latitude: 28.7041, longitude: 77.1025 },
      Mumbai: { latitude: 19.076, longitude: 72.8777 },
      Chennai: { latitude: 13.0827, longitude: 80.2707 },
      Kolkata: { latitude: 22.5726, longitude: 88.3639 },
      Lucknow: { latitude: 26.836992, longitude: 80.9631744 },
      Ajmer: { latitude: 26.410784, longitude: 74.655377 },
      // Add more cities as needed
    };
  
    // Function to calculate distance between two points using Haversine formula
    function calculateDistance(lat1, lon1, lat2, lon2) {
      const R = 6371;
      const dLat = ((lat2 - lat1) * Math.PI) / 180;
      const dLon = ((lon2 - lon1) * Math.PI) / 180;
      const a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
              + Math.cos((lat1 * Math.PI) / 180)
              * Math.cos((lat2 * Math.PI) / 180)
              * Math.sin(dLon / 2)
              * Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distance = R * c; // Distance in kilometers
      return distance;
    }
    // Function to auto-select the nearest city based on user's location
    function autoSelectNearestCity(latitude, longitude) {
      let nearestCity = null;
      let minDistance = Infinity;
  
      // Iterating over all cities and logging latitude and longitude
      Object.keys(citiesObject).forEach((cityName) => {
        const cityLatitude = citiesObject[cityName].latitude;
        const cityLongitude = citiesObject[cityName].longitude;
        const distance = calculateDistance(latitude, longitude, cityLatitude, cityLongitude);
        if (distance < minDistance) {
          minDistance = distance;
          nearestCity = cityName;
        }
      });
      // Update the nearest city in the dropdown
      const location = block.querySelector('.location-btn');
      location.innerHTML = nearestCity;
    }
    function showPosition(position) {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      autoSelectNearestCity(lat, lon);
    }
    function requestLocationPermission() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            showPosition(position);
          },
        );
      }
    }
    locationButton.addEventListener('click', () => {
      if (
        geoLocationDiv.style.display === 'none'
              || geoLocationDiv.style.display === ''
      ) {
        geoLocationDiv.style.display = 'block';
      } else {
        geoLocationDiv.style.display = 'none';
      }
    });
    detectLocationCTA.addEventListener('click', () => {
      geoLocationDiv.style.display="none";
      requestLocationPermission();
    });
  }
   