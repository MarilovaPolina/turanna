import React from "react"
import { useOutletContext } from "react-router-dom";

import phoneYellow from '../../../../assets/img/icons/phone_yellow.png'; 
import angleArrowYellow from '../../../../assets/img/icons/yellow_angle_arrow.png'; 
import check from '../../../../assets/img/icons/check.png';
import angleArrowBlue from '../../../../assets/img/icons/blue_angle_arrow.png';

import handCall from '../../../../assets/img/hand_call.png'; 
import handCheckboxes from '../../../../assets/img/hand_checkboxes.png'; 

function VariantsApplicationsSection(){
    const { onOpenPopup } = useOutletContext();
    
    // Параллакс
    const photosBgRefs = React.useRef([]);
    const moveAmount = 18;
    const target = React.useRef({ x: 0, y: 0 });
    const current = React.useRef({ x: 0, y: 0 });
    const ease = 0.2;
    const animationFrameId = React.useRef(null);

    const handleMouseMove = (e) => {
        const xPos = (e.clientX / window.innerWidth - 0.5) * moveAmount;
        const yPos = (e.clientY / window.innerHeight - 0.5) * moveAmount;
        target.current = { x: -xPos, y: -yPos };
    };

    const animate = () => {
        const dx = target.current.x - current.current.x;
        const dy = target.current.y - current.current.y;
        current.current.x += dx * ease;
        current.current.y += dy * ease;

        photosBgRefs.current.forEach(bg => {
            if (bg) {
                bg.style.transform = `translate(calc(-50% + ${current.current.x}px), calc(-50% + ${current.current.y}px)) scale(1.07, 1.05)`;
            }
        });

        animationFrameId.current = requestAnimationFrame(animate);
    };

    React.useEffect(() => {
        animationFrameId.current = requestAnimationFrame(animate);
        
        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId.current);
        };
    }, []);

    const addToRefs = (el) => {
        if (el && !photosBgRefs.current.includes(el)) {
            photosBgRefs.current.push(el);
        }
    };

    return(
        <div className="variants_applications_block">
        <div className="container variants_applications_container">
            <div className="variants_applications_block_text">
                <p className="title_text">Готовы обсудить ваш незабываемый отдых?</p>
                <p className="subtitle_text">Ваш идеальный отпуск начинается здесь! Предлагаем обсудить ваши желания
                    и предпочтения, чтобы создать путешествие, о котором вы мечтаете. Выберите удобный способ
                    связи, и мы обеспечим вам полную поддержку на каждом этапе планирования:</p>
            </div>

            <div className="application_buttons">
                <button onClick={() => onOpenPopup('call')} className="application_button yellow_application_button">
                    <div className="button_icons">
                        <img className="icon" src={phoneYellow} loading="lazy" />
                        <img src={angleArrowYellow} loading="lazy" />
                    </div>

                    <div className="application_button_content">
                        <div className="application_button_text">
                            <p className="small_title_text">
                                Заказать звонок бесплатно
                            </p>
                            <p className="subtitle">
                                Укажите только имя и номер телефона и мы перезвоним в удобное для Вас время,
                                чтобы обсудить Ваши пожелания о поездке.
                            </p>
                        </div>
                        <div className="application_button_img">
                            <img src={handCall} loading="lazy" />
                        </div>
                    </div>

                </button>

                <button onClick={() => onOpenPopup('chat')} className="application_button blue_application_button">
                    <div className="button_icons">
                        <img className="icon" src={check} loading="lazy" />
                        <img src={angleArrowBlue} loading="lazy" />
                    </div>

                    <div className="application_button_content">
                        <div className="application_button_text">
                            <p className="small_title_text">
                                оставить онлайн-заявку бесплатно
                            </p>
                            <p className="subtitle">
                                Укажите Ваши контакты, пожелания и детали поездки, рамки бюджета, и мы свяжемся
                                с Вами удобным для Вас способом, чтобы отправить Вашу персонализированную
                                подборку туров и/или отелей.
                            </p>
                        </div>
                        <div className="application_button_img">
                            <img src={handCheckboxes} loading="lazy" />
                        </div>
                    </div>

                </button>
            </div>
        </div>

        <div className="photos_bg" ref={addToRefs}></div>
    </div>
    )
}

export default VariantsApplicationsSection;