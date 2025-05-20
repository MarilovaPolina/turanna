import React from 'react';
import { gsap } from 'gsap';
import MouseFollower from 'mouse-follower';



const MouseFollowerCursor = () => {
    const containerRef = React.useRef();

    React.useEffect(() => {
        const cursor = new MouseFollower({
            container: containerRef.current,
            speed: 1,
            className: 'mf-cursor',
            innerClassName: 'mf-cursor-inner',
        });

        const titleElements = document.querySelectorAll('.title_text');

        titleElements.forEach((el) => {
            el.addEventListener('mouseenter', () => {
                cursor.addState('-title');
            });

            el.addEventListener('mouseleave', () => {
                cursor.removeState('-title');
            });
        });

        return () => {
            cursor.destroy();
            titleElements.forEach((el) => {
                el.removeEventListener('mouseenter', () => cursor.addState('-title'));
                el.removeEventListener('mouseleave', () => cursor.removeState('-title'));
            });
        };
    }, []);

    return <div ref={containerRef} className="mouse-follower-container"> {/* div */}
        <h1 className="title_text">Hover over me!</h1>
    </div>;
};

export default MouseFollowerCursor;

