import React from "react";
import PhotosSlider from "./PhotosSlider";

import egypt from '../../../../assets/img/egypt.png';
import EditorContentArticle from "../../../common/TextEditor/EditorContentArticle";

function AboutVacationPackage({tourPackageData, tourPackageDescription}){
    console.log(tourPackageDescription)
  if (
    !tourPackageData ||
    typeof tourPackageData !== "object" ||
    !tourPackageData.description
  ) {
    return null;
  }

  let parsedContent;

   try {
        parsedContent = typeof tourPackageDescription === "string" ? JSON.parse(tourPackageDescription) : tourPackageDescription;
    } catch (error) {
        console.error("Ошибка при загрузке статьи:", error);
        parsedContent = { blocks: [] };
    }

  const hasDescription =
    parsedContent.blocks && parsedContent.blocks.length > 0;

    return(
        <>
            <div className="about_vacation_package">
                {parsedContent &&
                    <>
                        <p className="title_text">
                            о подборке
                        </p>
                       <EditorContentArticle content={parsedContent} />
                    </>
                }
                <PhotosSlider images={tourPackageData.images || []}/>
            </div>

        </>
    );
}

export default AboutVacationPackage;