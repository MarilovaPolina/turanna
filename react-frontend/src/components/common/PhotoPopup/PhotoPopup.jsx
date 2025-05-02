import React from "react";
import closeImg from '../../../assets/img/icons/close.png';

function PhotoPopup({ image, onClose }) {
    return (
        <>
            <div className="overlay" onClick={onClose}></div>
            <div className="popup_block">
                <div className="certificate_popup">
                    <button className="close_button" onClick={onClose}>
                        <img src={closeImg} alt="Закрыть" />
                    </button>
                    <img src={image} className="certificate_full_img" />
                </div>
            </div>
        </>
    );
}

export default PhotoPopup;
