import React from 'react';
import headerLogo from "../images/headerLogo.svg";

// Компонент шапки сайта
function Header() {
    return (
            <header className="header">
                <img
                    className="header__logo"
                    src={headerLogo}
                    alt="логотип сайта"
                />
            </header>
    )
}

export default Header;