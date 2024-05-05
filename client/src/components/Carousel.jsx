import { useState } from "react";

export function AdventurePackage() {
  const images = [
    {
      url: "https://highlightstourism.com/wp-content/uploads/2019/10/tilicho-lake.jpg",
      text: "centuries-old culture",
      title: "mustang",
    },
    {
      url: "https://www.globaladventuretrekking.com/uploads/img/Rara-Lake.jpg",
      text: "text for image 2",
      title: "title for image 2",
    },
    {
      url: "https://worldexpeditions.com/croppedImages/Indian-Sub-Continent/Nepal/LachlanGardiner_WestNepal_2019_DSLR01_HIGHRES-9781-988225-500px.jpg",
      text: "text for image 2",
      title: "title for image 2",
    },
    {
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVKgVex__0Ppu9wCvCrxsvEef-d0HcZv5QjZAmHtXZmg&s",
      text: "centuries-old culture",
      title: "mustang",
    },
    {
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1zvpxCjQWgEISatoJ6H8YqbINSiGqFZg4n33OtLL1Zw&s",
      text: "text for image 2",
      title: "title for image 2",
    },
    {
      url: "https://img.traveltriangle.com/blog/wp-content/uploads/2019/04/Paragliding_pokhara_700x467.jpg",
      text: "centuries-old culture",
      title: "mustang",
    },
    {
      url: "https://worldexpeditions.com/croppedImages/Indian-Sub-Continent/Nepal/LachlanGardiner_WestNepal_2019_DSLR01_HIGHRES-9781-988225-500px.jpg",
      text: "text for image 2",
      title: "title for image 2",
    },
  ];

  const initialDisplayCount = 5; // Initial number of images to display
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isSliding, setIsSliding] = useState(false);

  const nextImage = () => {
    if (!isSliding) {
      setIsSliding(true);
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
      setTimeout(() => setIsSliding(false), 90); // Set a timeout to reset sliding after transition duration
    }
  };

  const prevImage = () => {
    if (!isSliding) {
      setIsSliding(true);
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? images.length - 1 : prevIndex - 1
      );
      setTimeout(() => setIsSliding(false), 90); // Set a timeout to reset sliding after transition duration
    }
  };

  const displayImages = images.slice(
    currentImageIndex,
    currentImageIndex + initialDisplayCount
  );

  return (
    <div className="rounded-md shadow-sm">
      <h2 className="text-xl font-roman font-semibold text-center">
        ADVENTURE PACKAGE
      </h2>
      <div className="flex flex-wrap gap-[22px] justify-center pb-12">
        {displayImages.map((image, index) => (
          <div
            key={index}
            className="mt-4 overflow-hidden transition-transform duration-500 ease-in-out"
            style={{
              transform: isSliding ? "translateX(-100%)" : "translateX(0)",
              opacity: isSliding ? 0 : 1,
            }}
          >
            <img
              className="w-[13.5rem] h-[11.4rem] rounded-lg shadow-sm"
              src={image.url}
              alt={`Adventure ${index + 1}`}
            />
            <div className="absolute top-0 left-0 w-full h-full text-center pt-[118px]">
              <p className="font-serif text-sm font-medium text-white">
                {image.text}
              </p>
              <h2 className="mt-[5px] font-serif text-[22px] text-black-950 font-semibold">
                {image.title}
              </h2>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center font-bold text-2xl">
        {currentImageIndex !== 0 && <button onClick={prevImage}>&lt;</button>}
        {currentImageIndex !== images.length - initialDisplayCount && (
          <button onClick={nextImage}>&gt;</button>
        )}
      </div>
    </div>
  );
}
