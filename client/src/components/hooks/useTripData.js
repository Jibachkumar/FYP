import { useState, useEffect } from "react";

export const useTripData = () => {
  const [tripData, setTripData] = useState([]);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await fetch(
          "http://localhost:7000/api/v1/users/alltrip"
        );

        if (!response.ok) {
          throw new Error(`${response.statusText}`);
        }

        const data = await response.json();
        setTripData(data.data);
        // dispatch(tripSlice({ tripData: data }));
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchTrips();
  }, []);

  return tripData;
};
