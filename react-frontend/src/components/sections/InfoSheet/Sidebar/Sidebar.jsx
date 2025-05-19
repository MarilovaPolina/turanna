import React from "react";

import menuIcon from "../../../../assets/img/icons/menu.png"

function Sidebar({ infoSheets, selectedId, onSelect }) {
    console.log('Sidebar infoSheets:', infoSheets);
    
    if (infoSheets.length === 0) return <>Загрузка...</>
  return (
    <>
      <button className="info_sheet_sidebar_btn">
        <p>Содержание</p>
        <img src={menuIcon} alt="menu" />
      </button>

      <aside className="white_block info_sheet_sidebar">
        <p className="title_text">Справка</p>
        <div className="sidebar_menu">
          <ul className="sidebar_menu_ul">
            {infoSheets.map(sheet => (
              <li key={sheet.id}>
                <button
                  type="button"
                  className={`subtitle_text ${sheet.id === selectedId ? "active" : ""}`}
                  onClick={() => onSelect(sheet)}
                >
                  {sheet.title}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
