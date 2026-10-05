import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  useEffect(() => {
    function handleEscape(event) {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    }

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);
  function closeMenu() {
    setIsMenuOpen(false);
  }
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <NavLink className="site-header__brand" to="/" onClick={closeMenu}>
          <span className="site-header__mark" aria-hidden="true">
            GT
          </span>
          <span>GitHub Team</span>
        </NavLink>
        <button
          className="site-header__menu-toggle"
          type="button"
          aria-controls="site-navigation"
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>
        <nav
          id="site-navigation"
          className={`site-header__navigation${isMenuOpen ? " is-open" : ""}`}
          aria-label="Navigation principale"
        >
          <NavLink
            className={({ isActive }) =>
              `site-header__link${isActive ? " is-active" : ""}`
            }
            to="/"
            end
            onClick={closeMenu}
          >
            Accueil
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `site-header__link${isActive ? " is-active" : ""}`
            }
            to="/login"
            onClick={closeMenu}
          >
            Connexion
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
export default Header;
