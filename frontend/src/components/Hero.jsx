
function Hero() {
  return (
    <section className="hero" id="inicio">
      <div className="hero-content">

        <span className="hero-tag">
          MOVILIDAD Y COMUNIDAD
        </span>

        <h1>
          Construyamos un Cibao
          <span> más conectado.</span>
        </h1>

        <p>
          Reporta incidencias de transporte, comparte información
          y ayuda a mejorar la movilidad de nuestra comunidad.
        </p>

        <div className="hero-buttons">
          <a href="#formulario" className="primary-button">
            Reportar incidencia
          </a>

          <a href="#reportes" className="secondary-button">
            Explorar reportes
          </a>
        </div>

      </div>
    </section>
  );
}

export default Hero;
