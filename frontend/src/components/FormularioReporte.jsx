
import { useState } from 'react';

function FormularioReporte({ onAgregarReporte }) {
  const [categoria, setCategoria] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [coordenadas, setCoordenadas] = useState(null);
  const [mensajeUbicacion, setMensajeUbicacion] = useState('');

  function obtenerUbicacion() {
    if (!navigator.geolocation) {
      setMensajeUbicacion(
        'Tu navegador no soporta la geolocalización.'
      );
      return;
    }

    setMensajeUbicacion('Obteniendo tu ubicación...');

    navigator.geolocation.getCurrentPosition(
      (posicion) => {
        const latitud = posicion.coords.latitude;
        const longitud = posicion.coords.longitude;

        setCoordenadas({
          latitud,
          longitud
        });

        setMensajeUbicacion('¡Ubicación obtenida correctamente!');
      },
      (error) => {
        setMensajeUbicacion(
          'No pudimos obtener tu ubicación. Revisa los permisos del navegador.'
        );
      },
      {
        enableHighAccuracy: true,
        timeout: 10000
      }
    );
  }

  function manejarEnvio(e) {
    e.preventDefault();

    const nuevoReporte = {
      id: Date.now(),
      categoria,
      ubicacion,
      descripcion,
      coordenadas,
      estado: 'Pendiente',
      icono: '📢'
    };

    onAgregarReporte(nuevoReporte);

    setCategoria('');
    setUbicacion('');
    setDescripcion('');
    setCoordenadas(null);
    setMensajeUbicacion('');
  }

  return (
    <section className="formulario-section" id="formulario">
      <div className="section-heading">
        <span className="section-tag">PARTICIPA</span>
        <h2>Reportar una incidencia</h2>
        <p>
          Ayúdanos a mejorar la movilidad de nuestra comunidad.
        </p>
      </div>

      <form className="reporte-form" onSubmit={manejarEnvio}>
        <label htmlFor="categoria">Categoría</label>

        <select
          id="categoria"
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          required
        >
          <option value="">Selecciona una categoría</option>
          <option value="Transporte público">Transporte público</option>
          <option value="Estado de las vías">Estado de las vías</option>
          <option value="Seguridad vial">Seguridad vial</option>
          <option value="Accidentes">Accidentes</option>
          <option value="Otros">Otros</option>
        </select>

        <label htmlFor="ubicacion">Ubicación o lugar de la incidencia</label>

        <input
          id="ubicacion"
          type="text"
          placeholder="Ej. Tamboril, Santiago"
          value={ubicacion}
          onChange={(e) => setUbicacion(e.target.value)}
          required
        />

        <button
          type="button"
          className="location-button"
          onClick={obtenerUbicacion}
        >
          📍 Usar mi ubicación actual
        </button>

        {mensajeUbicacion && (
          <p className="location-message" role="status">
            {mensajeUbicacion}
          </p>
        )}

        {coordenadas && (
          <div className="coordinates">
            <p>Latitud: {coordenadas.latitud}</p>
            <p>Longitud: {coordenadas.longitud}</p>
          </div>
        )}

        <label htmlFor="descripcion">
          Descripción de la incidencia
        </label>

        <textarea
          id="descripcion"
          placeholder="Describe lo que está sucediendo..."
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          rows="4"
          required
        />

        <button type="submit" className="primary-button">
          Publicar reporte
        </button>
      </form>
    </section>
  );
}

export default FormularioReporte;
