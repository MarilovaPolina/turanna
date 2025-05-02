import React from "react";

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


function HomePage(){

    return(
        <>
            <IntroSection />
            <PostsSection />
            <VariantsApplicationsSection />
            <PopularDestinationsSection />
            <OurTeamSection />
            <HowWeWork />
            <ReviewsVkSection />
            <WhyUsSection />
            <WhereToFindSection />
            <OtherQuestionsSection />
            <ApplicationFormSection />
            <PartnersTicker /> 
        </>
    );
}

export default HomePage;