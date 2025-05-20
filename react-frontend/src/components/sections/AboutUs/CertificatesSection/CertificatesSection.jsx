import React from "react";
import { useDispatch, useSelector } from "react-redux";

import ogrnImage from '../../../../assets/img/ogrn.png';
import magnifierImage from '../../../../assets/img/icons/magnifier_btn.png';
import PhotoPopup from "../../../common/PhotoPopup/PhotoPopup";

import { getCertificates } from "../../../../store/certificatesSlice";

function CertificatesSection() {
    const dispatch = useDispatch();
    const { certificates } = useSelector((state) => state.certificates);
    const [isPopupOpen, setIsPopupOpen] = React.useState(false);
    const [pathPreviewImg, setPathPreviewImg] = React.useState("");

    React.useEffect(() => {
        dispatch(getCertificates());
    }, [dispatch]);

    React.useEffect(() => {
        if (certificates.length > 0) {
            setPathPreviewImg(`http://localhost:8000${certificates[0].image}`);
        }
    }, [certificates]);

    const openPopup = (image) => {
        setPathPreviewImg(image);
        setIsPopupOpen(true);
    };

    const closePopup = () => {
        setIsPopupOpen(false);
    };
    return (
        <>
            <div className="certificates_block">
                <div className="article_container_center">
                    <div className="white_block">
                        <p className="title_text">
                            Сертификаты
                        </p>

                        {!certificates || certificates.length === 0 ? (
                            <p>Загрузка сертификатов...</p>
                        ) : (
                            <>
                                <div className="certificates_content">
                                    <div onClick={() => openPopup(pathPreviewImg)} className="certificate_preview_part">
                                        <div className="certificate_preview">
                                            <img src={pathPreviewImg} alt="Сертификат" loading="lazy" />
                                        </div>
                                    </div>
                                    <div className="certificates_list_part">
                                        <ul className="certificates_list_block">
                                            {certificates.map((certificate)=>(
                                                <li key={certificate.id} onClick={() => setPathPreviewImg(`http://localhost:8000${certificate.image}`)}>
                                                    <div className="certificate_description">
                                                        <img src={`http://localhost:8000${certificate.thumbnail_image}`} loading="lazy" />
                                                        <p className="certificate_title">{certificate.title}</p>
                                                    </div>
                                                    <img src={magnifierImage} alt="Увеличить" loading="lazy" />
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </>
                        )}
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
