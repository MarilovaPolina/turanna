import React from 'react';
import { gsap } from 'gsap';
import MouseFollower from 'mouse-follower';



const MouseFollowerCursor = () => {
    const containerRef = React.useRef();

    React.useEffect(() => {
        // Инициализация mouse follower
        const cursor = new MouseFollower({
            container: containerRef.current,
            speed: 1,
            className: 'mf-cursor',
            innerClassName: 'mf-cursor-inner',
        });

        // Находим элементы, с которыми будет взаимодействовать курсор
        const titleElements = document.querySelectorAll('.title_text');

        titleElements.forEach((el) => {
            el.addEventListener('mouseenter', () => {
                cursor.addState('-title'); // Добавить состояние при наведении
            });

            el.addEventListener('mouseleave', () => {
                cursor.removeState('-title'); // Убрать состояние при уходе
            });
        });

        return () => {
            // Очистка и уничтожение
            cursor.destroy();
            titleElements.forEach((el) => {
                el.removeEventListener('mouseenter', () => cursor.addState('-title'));
                el.removeEventListener('mouseleave', () => cursor.removeState('-title'));
            });
        };
    }, []);

    return <div ref={containerRef} className="mouse-follower-container"> {/* Здесь размещается ваш контейнер или пустой div */}
        <h1 className="title_text">Hover over me!</h1>
    </div>;
};

export default MouseFollowerCursor;

