
import { useState, useEffect } from 'react';

import './App.css';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Reportes from './components/Reportes';
import FormularioReporte from './components/FormularioReporte';
import Mapa from './components/Mapa';

function App() {
  const [reportes, setReportes] = useState(() => {
    const reportesGuardados = localStorage.getItem('movicibao-reportes');

    if (reportesGuardados) {
      return JSON.parse(reportesGuardados);
    }

    return [
      {
        id: 1,
        categoria: 'Transporte público',
        ubicacion: 'Tamboril, Santiago',
        descripcion: 'Retrasos en la salida de los autobuses hacia Santiago.',
        estado: 'Pendiente',
        icono: '🚌'
      },
      {
        id: 2,
        categoria: 'Estado de las vías',
        ubicacion: 'Santiago de los Caballeros',
        descripcion: 'Bache de gran tamaño que dificulta el tránsito.',
        estado: 'En proceso',
        icono: '🚧'
      },
      {
        id: 3,
        categoria: 'Seguridad vial',
        ubicacion: 'Moca, Espaillat',
        descripcion: 'Semáforo fuera de servicio en una intersección.',
        estado: 'Resuelto',
        icono: '🚦'
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem(
      'movicibao-reportes',
      JSON.stringify(reportes)
    );
  }, [reportes]);

  function agregarReporte(nuevoReporte) {
    setReportes((reportesAnteriores) => [
      nuevoReporte,
      ...reportesAnteriores
    ]);
  }

  return (
    <div className="app-container">
      <Navbar />

      <main>
        <Hero />

        <FormularioReporte onAgregarReporte={agregarReporte} />

        <Reportes reportes={reportes} />

        <Mapa reportes={reportes} />
      </main>
    </div>
  );
}

export default App;
