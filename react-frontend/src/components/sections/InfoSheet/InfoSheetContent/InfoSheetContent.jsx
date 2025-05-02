import React from "react";

function InfoSheetContent(){
    return(
        <>

            <div className="info_sheet_content">
                <div className="white_block info_sheet_title_block">
                    <p className="title_text">
                        Оплата и возврат
                    </p>
                </div>
                <div className="white_block">
                    <p className="small_title_text">
                        Способы оплаты
                    </p>
                    <p className="ul_title"> Мы предлагаем удобные и безопасные варианты оплаты:</p>
                    <ul className="list">
                        <li>Дешевые авиабилеты</li>
                        <li>Лучшие номера в отелях</li>
                        <li>Бонусы (трансфер, экскурсии, питание)</li>
                    </ul>
                    <br />
                    <br />
                    <p className="small_title_text">
                        Возврат средств
                    </p>
                    <p>
                        Мы соблюдаем Закон «О защите прав потребителей» и гарантируем прозрачность процедуры
                        возврата.
                    </p>
                    <ol className="ol_list">
                        <li>
                            <b>
                                <p className="ul_title">Возврат тура (до начала поездки):</p>
                            </b>
                            <ul className="list">
                                <li>Вы можете отказаться от тура без объяснения причин в течение 7 дней после
                                    бронирования (если поездка еще не началась).</li>
                                <li>
                                    Условия:
                                    <br />– сохранены все документы (договор, чеки)
                                    <br />– тур не имеет индивидуальных особенностей (например, персональные
                                    экскурсии).
                                </li>
                                <li>
                                    Срок возврата денег: до 10 рабочих дней (за вычетом фактических расходов,
                                    например, авиабилетов).
                                </li>
                            </ul>
                        </li>
                        <li>
                            <b>
                                <p className="ul_title">Отказ от услуги (после начала поездки):</p>
                            </b>
                            <ul className="list">
                                <li>Если тур уже начался, возврат рассчитывается пропорционально
                                    неиспользованным услугам.</li>
                                <li>При форс-мажоре (болезнь, ЧП) мы поможем перенести тур или вернем средства
                                    по согласованию с туроператором.</li>
                            </ul>
                        </li>
                        <li>
                            <b>
                                <p className="ul_title">Гарантии:</p>
                            </b>
                            <ul className="list">
                                <li>Если возникли проблемы во время поездки, сообщите нам — решим вопрос в вашу
                                    пользу.</li>
                            </ul>
                        </li>
                    </ol>



                </div>
            </div>

        </>
    );
}

export default InfoSheetContent;