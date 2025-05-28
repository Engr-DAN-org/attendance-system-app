import axios from "axios";

interface Coordinate {
  latitude: number;
  longitude: number;
}

interface Location extends Coordinate {
  location: string;
}

interface NominatimReverseResponse {
  display_name: string;
  lat: number;
  lon: number;
  address: {
    road?: string;
    city: string;
    country: string;
    country_code: string;
    postcode: number;
    quarter: string;
    region: string;
    state?: string;
  };
}

const getCurrentCoordinates = async (): Promise<Coordinate> => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          reject(error);
        }
      );
    } else {
      reject(new Error("Geolocation is not supported by this browser."));
    }
  });
};

const getLocationWithCoordinates = async (): Promise<Location> => {
  const { latitude, longitude } = await getCurrentCoordinates();
  console.log("getLocationWithCoordinates", latitude, longitude);

  const response = await axios.get(
    `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
  );
  const data: NominatimReverseResponse = response.data;
  console.log("address data", data.address);
  let location: string = "";

  if (data.address.road) location += `${data.address.road} St.`;
  if (data.address.quarter) location += `, ${data.address.quarter}`;
  if (data.address.city) location += `, ${data.address.city}`;
  if (data.address.state) location += `, ${data.address.state}`;

  return {
    latitude: Number(data.lat),
    longitude: Number(data.lon),
    location,
  };
};

export { getCurrentCoordinates, getLocationWithCoordinates };
