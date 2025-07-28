async function geocodeLocation(destinationName) {
  const API_KEY = import.meta.env.VITE_REACT_GEOCODING_API_KEY;

  const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
    destinationName
  )}&key=${API_KEY}`;

  try {
    const response = await fetch(url);

    const data = await response.json();
    // console.log(data);

    if (data.results && data.results.length > 0) {
      return data.results[0].geometry;
    } else {
      console.warn("No geocode results for:", destinationName);
      return { lat: 27.7172, lng: 85.324 }; // or fallback coordinates if desired
    }
  } catch (error) {
    console.error("Geocoding failed:", error);
    return { lat: 27.7172, lng: 85.324 }; // fallback to Kathmandu;
  }
}

export default geocodeLocation;
