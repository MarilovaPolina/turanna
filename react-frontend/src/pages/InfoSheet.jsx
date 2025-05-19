import React from "react";
import { useSelector, useDispatch } from "react-redux";

import OtherQuestionsSection from "../components/common/OtherQuestionsSection/OtherQuestionsSection";
import InfoSheetContent from "../components/sections/InfoSheet/InfoSheetContent/InfoSheetContent";
import Sidebar from "../components/sections/InfoSheet/Sidebar/Sidebar";
import { getInfoSheets } from "../store/infoSheetSlice";

function InfoSheet(){
    const dispatch = useDispatch();
    const infoSheets = useSelector(state => state.infoSheet?.infoSheets || []);
    const [selectedSheet, setSelectedSheet] = React.useState(null);

    React.useEffect(() => {
        dispatch(getInfoSheets());
    }, [dispatch]);

    React.useEffect(() => {
        if (infoSheets.length > 0 && !selectedSheet) {
            setSelectedSheet(infoSheets[0]);
        }
    }, [infoSheets, selectedSheet]);
    

    return(
        <>
            <div className="info_sheet_block">
                <div className="info_sheet container">
                    <Sidebar
                        infoSheets={infoSheets}
                        selectedId={selectedSheet?.id}
                        onSelect={setSelectedSheet}
                    />
                    {selectedSheet && (
                        <InfoSheetContent
                            title={selectedSheet.title}
                            content={selectedSheet.content}
                        />
                    )}
                </div>
            </div>

            <OtherQuestionsSection />
        </>
    );
}

export default InfoSheet;