import React from "react";
import { useLocation } from "react-router-dom";

import IntroSection from "../components/sections/HomePage/IntroSection/IntroSection";
import PostsSection from "../components/common/PostsSection/PostsSection";
import VariantsApplicationsSection from "../components/sections/HomePage/VariantsApplicationsSection/VariantsApplicationsSection";
import PopularDestinationsSection from "../components/sections/HomePage/PopularDestinationsSection/PopularDestinationsSection";
import OurTeamSection from "../components/sections/HomePage/OurTeamSection/OurTeamSection";
import HowWeWork from "../components/sections/HomePage/HowWeWork/HowWeWork";
import ReviewsVkSection from "../components/sections/HomePage/ReviewsVkSection/ReviewsVkSection";
import WhyUsSection from "../components/sections/HomePage/WhyUsSection/WhyUsSection";
import WhereToFindSection from "../components/sections/HomePage/WhereToFindSection/WhereToFindSection";
import OtherQuestionsSection from "../components/common/OtherQuestionsSection/OtherQuestionsSection";
import ApplicationFormSection from "../components/common/ApplicationFormSection/ApplicationFormSection";
import PartnersTicker from "../components/common/PartnersTicker/PartnersTicker";
import ApplicationPopup from "../components/common/Popup/ApplicationPopup";
import { ClassNames } from "@emotion/react";


function HomePage(){

    const location = useLocation();

    React.useEffect(() => {
        if (location.hash) {
            const element = document.querySelector(location.hash);
            if (element) {
                setTimeout(() => {
                    element.scrollIntoView({ behavior: "smooth" });
                }, 400);
            }
        }
    }, [location]);

    return(
        <div className="home_page">
            <IntroSection />
            <PostsSection />
            <VariantsApplicationsSection />
            <PopularDestinationsSection />
            <OurTeamSection />
            <HowWeWork />
            <ReviewsVkSection />
            <WhyUsSection />
            <WhereToFindSection/>
            <OtherQuestionsSection />
            <ApplicationFormSection />
            <PartnersTicker /> 
        </div>
    );
}

export default HomePage;