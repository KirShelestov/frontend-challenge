import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const Layout: React.FC = () => {
    return (
        <div className="app-shell">
            <header className="top-menu">
                <nav className="top-menu__nav">
                    <NavLink
                        to="/"
                        end
                        className={({ isActive }) =>
                            isActive
                                ? "top-menu__link top-menu__link--active"
                                : "top-menu__link"
                        }
                    >
                        Все котики
                    </NavLink>
                    <NavLink
                        to="/favourites"
                        className={({ isActive }) =>
                            isActive
                                ? "top-menu__link top-menu__link--active"
                                : "top-menu__link"
                        }
                    >
                        Любимые котики
                    </NavLink>
                </nav>
            </header>

            <main className="page-content">
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;
