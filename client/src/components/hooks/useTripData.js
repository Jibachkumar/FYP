import { useState, useEffect, useCallback } from "react";

export const useTripData = () => {
  const [tripData, setTripData] = useState([]);
  const [loader, setLoader] = useState(false);

  const fetchTrips = useCallback(async () => {
    setLoader(true);
    try {
      const response = await fetch(
        "http://localhost:7000/api/v1/users/alltrip"
      );
      if (!response.ok) {
        throw new Error(`${response.statusText}`);
      }
      const data = await response.json();
      setTripData(data.data);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoader(false);
    }
  }, []);

  useEffect(() => {
    fetchTrips();
  }, [fetchTrips]);

  return { tripData, loader, refetch: fetchTrips };
};
