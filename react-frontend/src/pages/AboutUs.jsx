import React from "react";

import AboutUsIntroSection from "../components/sections/AboutUs/AboutUsIntroSection/AboutUsIntroSection";
import AboutUsArticleSection from "../components/sections/AboutUs/AboutUsArticleSection/AboutUsArticleSection";
import CertificatesSection from "../components/sections/AboutUs/CertificatesSection/CertificatesSection";
import ApplicationFormSection from "../components/common/ApplicationFormSection/ApplicationFormSection";
import OtherQuestionsSection from "../components/common/OtherQuestionsSection/OtherQuestionsSection";
import PartnersTicker from "../components/common/PartnersTicker/PartnersTicker";

function AboutUs(){
    return(
        <>
            <AboutUsIntroSection />
            <AboutUsArticleSection />
            <CertificatesSection />
            <ApplicationFormSection />
            <OtherQuestionsSection/>
            <PartnersTicker />
        </>
    );
}

export default AboutUs;