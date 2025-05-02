import React from "react";

import OtherQuestionsSection from "../components/common/OtherQuestionsSection/OtherQuestionsSection";
import InfoSheetContent from "../components/sections/InfoSheet/InfoSheetContent/InfoSheetContent";
import Sidebar from "../components/sections/InfoSheet/Sidebar/Sidebar";

function InfoSheet(){
    return(
        <>
            <div className="info_sheet_block">
                <div className="info_sheet container">
                    <Sidebar />
                    <InfoSheetContent />
                </div>
            </div>

            <OtherQuestionsSection />
        </>
    );
}

export default InfoSheet;