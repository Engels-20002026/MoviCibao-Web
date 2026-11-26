

function Reportes({ reportes }) {
  return (
    <section className="reportes-section" id="reportes">
      <div className="section-heading">
        <span className="section-tag">COMUNIDAD</span>
        <h2>Reportes recientes</h2>
        <p>
          Conoce las incidencias compartidas por nuestra comunidad.
        </p>
      </div>

      <div className="reportes-grid">
        {reportes.map((reporte) => (
          <article className="reporte-card" key={reporte.id}>
            <div className="reporte-top">
              <span className="reporte-icon">{reporte.icono}</span>

              <span className={`estado estado-${reporte.estado
                .toLowerCase()
                .replace(' ', '-')}`}>
                {reporte.estado}
              </span>
            </div>

            <h3>{reporte.categoria}</h3>

            <p className="reporte-ubicacion">
              📍 {reporte.ubicacion}
            </p>

            <p className="reporte-descripcion">
              {reporte.descripcion}
            </p>

            <button className="details-button">
              Ver detalles
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Reportes;
