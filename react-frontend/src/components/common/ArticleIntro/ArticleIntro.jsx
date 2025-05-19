import React from "react";

function ArticleIntro({ tourPackageData }) {

    if (!tourPackageData) return <div>Загрузка...</div>;
    
    const isTourPackage = !!tourPackageData.tours;
    const title = tourPackageData.title;
    const createdAt = new Date(tourPackageData.created_at).toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
    });

    const mainImageUrl = `http://localhost:8000${tourPackageData.main_image}`;

    const minPrice = isTourPackage && tourPackageData.tours.length > 0
        ? Math.min(...tourPackageData.tours.map(t => Number(t.price)))
        : null;

    return (
        <div className="article_intro">
            <div className="container">
                <p className={`large_text${!isTourPackage ? ' simple_article_text' : ''}`}>
                    {title}
                </p>
                <div
                    className="article_intro_image"
                    style={{ backgroundImage: `url(${mainImageUrl})` }}
                >
                    <div className="article_intro_image_panels">
                        <span className="panel">
                            {isTourPackage ? 'Подборка туристических пакетов' : 'Статья'}
                        </span>
                        <span className="panel">
                            {isTourPackage
                                ? (minPrice ? `от ${minPrice.toLocaleString('ru-RU')} ₽` : createdAt)
                                : createdAt}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ArticleIntro;
