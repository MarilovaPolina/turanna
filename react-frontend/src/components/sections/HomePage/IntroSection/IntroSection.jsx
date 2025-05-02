import React from "react";

import travelsImage from '../../../../assets/img/travels.png';
import airplaneWay from '../../../../assets/img/airplane_way.png';

function IntroSection(){
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
        <div className="intro">
            <div className="container">
                <div className="intro_text">
                    <img className="travels_text_img" src={travelsImage} /><br />
                    <div className="intro_question">
                        <p>готовы к приключениям?</p>
                    </div>
                </div>

            </div>

            <div className="photos_bg" ref={addToRefs}></div>
            <img className="airplane_way" src={airplaneWay} />
        </div>
    );
}

export default IntroSection;