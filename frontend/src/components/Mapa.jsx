
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup
} from 'react-leaflet';

import 'leaflet/dist/leaflet.css';

function Mapa({ reportes }) {
  const ubicacionInicial = [19.4517, -70.6970];

  const reportesConUbicacion = reportes.filter(
    (reporte) =>
      reporte.coordenadas &&
      typeof reporte.coordenadas.latitud === 'number' &&
      typeof reporte.coordenadas.longitud === 'number'
  );

  return (
    <section className="mapa-section" id="mapa">

      <div className="section-heading">
        <span className="section-tag">GEOGRAFÍA</span>

        <h2>Mapa de incidencias</h2>

        <p>
          Explora las incidencias reportadas por nuestra comunidad.
        </p>
      </div>

      <div className="mapa-container">
        <MapContainer
          center={ubicacionInicial}
          zoom={11}
          scrollWheelZoom={true}
          className="mapa"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {reportesConUbicacion.map((reporte) => (
            <Marker
              key={reporte.id}
              position={[
                reporte.coordenadas.latitud,
                reporte.coordenadas.longitud
              ]}
            >
              <Popup>
                <strong>{reporte.categoria}</strong>
                <br />
                {reporte.ubicacion}
                <br />
                {reporte.descripcion}
                <br />
                Estado: {reporte.estado}
              </Popup>
            </Marker>
          ))}

        </MapContainer>
      </div>

      <p className="mapa-contador">
        Incidencias con ubicación GPS: {reportesConUbicacion.length}
      </p>

    </section>
  );
}

export default Mapa;
