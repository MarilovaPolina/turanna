import React from "react";
import TourVariantWrapper from "../TourVariantWrapper/TourVariantWrapper";

function TourVariants({ tourPackageData }) {
  if (!tourPackageData || !tourPackageData.tours || tourPackageData.tours.length === 0) {
    return <p>Варианты туров отсутствуют</p>;
  }

  return (
    <div className="tour_variants">
      <p className="title_text">Варианты туров</p>
      {tourPackageData.tours.map((tour) => (
        <TourVariantWrapper key={tour.id} tour={tour} />
      ))}
    </div>
  );
}

export default TourVariants;
