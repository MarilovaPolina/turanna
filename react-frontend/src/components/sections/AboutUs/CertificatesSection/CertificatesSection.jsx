import React from "react";
import ogrnImage from '../../../../assets/img/ogrn.png';
import magnifierImage from '../../../../assets/img/icons/magnifier_btn.png';
import PhotoPopup from "../../../common/PhotoPopup/PhotoPopup";

function CertificatesSection() {
    const [isPopupOpen, setIsPopupOpen] = React.useState(false);

    // Фото в превью
    const [pathPreviewImg, setPathPreviewImg] = React.useState("");
    const certificatesArray=[
        {
            "id": "1",
            "img": '/assets/img/ogrn.png',
            "title": "Свидетельство о регистрации в Об...",
        },
        {
            "id": "2",
            "img": '/assets/img/lic.jpeg',
            "title": "Лицензия на турагентсткую д...",
        },
    ]

    // Попап с фото из превью
    const openPopup = (image) => {
        setPathPreviewImg(image);
        setIsPopupOpen(true);
    };

    const closePopup = () => {
        setIsPopupOpen(false);
    };

    // Фото в превью по умолчанию
    React.useEffect(() => {
        if (certificatesArray.length > 0) {
            setPathPreviewImg(certificatesArray[0].img);
        }
    }, []); 
    
    return (
        <>
            <div className="certificates_block">
                <div className="article_container_center">
                    <div className="white_block">
                        <p className="title_text">
                            сертификаты
                        </p>
                        <div className="certificates_content">
                            <div onClick={() => openPopup(pathPreviewImg)} className="certificate_preview_part">
                                <div className="certificate_preview">
                                    <img src={pathPreviewImg} alt="Сертификат" loading="lazy" />
                                </div>
                            </div>
                            <div className="certificates_list_part">
                                <ul className="certificates_list_block">
                                    {certificatesArray.map((certificate)=>(
                                        <li key={certificate.id} onClick={() => setPathPreviewImg(certificate.img)}>
                                            <img src={certificate.img} loading="lazy" />
                                            <p>{certificate.title}</p>
                                            <img src={magnifierImage} alt="Увеличить" loading="lazy" />
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {isPopupOpen && (
                <PhotoPopup 
                    image={pathPreviewImg} 
                    onClose={closePopup} 
                />
            )}
        </>
    );
}

export default CertificatesSection;
