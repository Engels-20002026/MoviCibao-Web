
function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-container">

        <a href="#" className="brand">
          <span className="brand-icon">M</span>
          <span>MoviCibao</span>
        </a>

        <nav className="nav-links">
          <a href="#inicio">Inicio</a>
          <a href="#reportes">Reportes</a>
          <a href="#mapa">Mapa</a>
          <a href="#nosotros">Nosotros</a>
        </nav>

        <button className="login-button">
          Iniciar sesión
        </button>

      </div>
    </header>
  );
}

export default Navbar;
