import React from 'react';
import header_logo from "../images/header_logo.svg";

// Компонент шапки сайта
function Header() {
    return (
        <div>
            <header className="header">
                <img
                    className="header__logo"
                    src={header_logo}
                    alt="логотип сайта"
                />
            </header>
         </div>
    )
}

export default Header;