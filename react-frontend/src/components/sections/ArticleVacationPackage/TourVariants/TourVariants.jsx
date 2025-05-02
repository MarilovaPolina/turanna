import React from "react";

import TourVariantWrapper from "../TourVariantWrapper/TourVariantWrapper";

function TourVariants(){
    return(
        <>
           <div className="tour_variants">
                <p className="title_text">
                    Варианты туров
                </p>
                <TourVariantWrapper />
            </div>
        </>
    );
}

export default TourVariants;