import React, { useEffect, useState } from "react";

function Intersection(targetRef) {
  const [isVisible, setIsVisible] = useState(false);
  const [isVisible2, setIsVisible2] = useState(false);

  useEffect(() => {
    const obsCallback = (entries) => {
      entries.forEach((entry) => {
        console.log(entry);
        if (entry.isIntersecting && entry.intersectionRatio >= 0.01) {
          if (entry.target === targetRef.current) {
            setTimeout(() => setIsVisible(true), 300);
          }
          if (entry.target === targetRefOne.current) {
            setIsVisible2(true);
          }
        }
      });
    };

    const obsOptions = {
      root: null,
      threshold: 0.01,
      // rootMargin: "400px",
    };

    const observer = new IntersectionObserver(obsCallback, obsOptions);

    if (targetRef.current) {
      observer.observe(targetRef.current);
    } else {
      observer.unobserve(targetRef.current);
    }

    if (targetRefOne.current) {
      observer.observe(targetRefOne.current);
    } else {
      observer.unobserve(targetRefOne.current);
    }
  }, []);
  return <div>Intersection</div>;
}

export default Intersection;
