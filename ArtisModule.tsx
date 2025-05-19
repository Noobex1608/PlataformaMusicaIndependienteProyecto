import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
} from 'chart.js';

// Registrar los elementos necesarios para el gráfico de líneas
ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend);

interface ArtistStats {
  followers: number;
  weeklyGrowth: string;
  playsThisWeek: number;
  likesThisWeek: number;
  newFollowersDaily: number;
  historicalFollowers: number[];
  historicalLabels: string[];
}

interface PortfolioItem {
  type: string;
  name: string;
}

interface Demo {
  title: string;
  status: string;
}

interface LiveEvent {
  title: string;
  time: string;
}

interface Collaboration {
  artist: string;
  amount: number;
}

const ArtistModule: React.FC = () => {
  const [stats, setStats] = useState<ArtistStats>({
    followers: 1200,
    weeklyGrowth: '20%',
    playsThisWeek: 15000,
    likesThisWeek: 500,
    newFollowersDaily: 30,
    historicalFollowers: [1150, 1160, 1170, 1180, 1190, 1195, 1200],
    historicalLabels: ['Día 1', 'Día 2', 'Día 3', 'Día 4', 'Día 5', 'Día 6', 'Día 7'],
  });
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
  const [demos, setDemos] = useState<Demo[]>([{ title: 'Próximo Single', status: 'En revisión' }]);
  const [liveEvents, setLiveEvents] = useState<LiveEvent[]>([{ title: 'Live Q&A', time: 'Hoy a las 8PM' }]);
  const [collaborations, setCollaborations] = useState<Collaboration[]>([{ artist: 'Artista X', amount: 500 }]);

  const handleUpdateStats = () => {
    const newFollowers = stats.followers + 50;
    const newHistoricalFollowers = [...stats.historicalFollowers.slice(1), newFollowers];
    setStats({
      followers: newFollowers,
      weeklyGrowth: `${Math.floor(Math.random() * 10 + 10)}%`,
      playsThisWeek: stats.playsThisWeek + Math.floor(Math.random() * 1000 + 500),
      likesThisWeek: stats.likesThisWeek + Math.floor(Math.random() * 50 + 20),
      newFollowersDaily: Math.floor(Math.random() * 10 + 20),
      historicalFollowers: newHistoricalFollowers,
      historicalLabels: stats.historicalLabels,
    });
  };

  const handleAddPortfolio = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newItems = Array.from(files).map(file => ({
        type: file.type.includes('audio') ? 'música' : file.type.includes('video') ? 'video' : 'letra',
        name: file.name,
      }));
      setPortfolio([...portfolio, ...newItems]);
    }
  };

  const handleAddDemo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setDemos([...demos, { title: file.name, status: 'En revisión' }]);
    }
  };

  const handleScheduleLive = () => {
    const newTime = new Date();
    newTime.setHours(newTime.getHours() + 1);
    setLiveEvents([...liveEvents, { title: `Live ${liveEvents.length + 1}`, time: newTime.toLocaleTimeString() }]);
  };

  const handleUpdateCrowdfunding = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAmount = parseInt(e.target.value) || 0;
    setCollaborations([{ ...collaborations[0], amount: newAmount }]);
  };

  // Configuración del gráfico de líneas
  const chartData = {
    labels: stats.historicalLabels,
    datasets: [
      {
        label: 'Seguidores',
        data: stats.historicalFollowers,
        borderColor: '#6BD4CD',
        backgroundColor: 'rgba(107, 212, 205, 0.3)',
        fill: true,
        tension: 0.3,
        pointBackgroundColor: '#6BD4CD',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#6BD4CD',
        pointHoverBorderColor: '#fff',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: false,
        ticks: {
          color: '#A9B1B6', // Color claro para los números del eje Y
        },
        grid: {
          color: 'rgba(107, 212, 205, 0.1)',
        },
      },
      x: {
        ticks: {
          color: '#A9B1B6', // Color claro para los números del eje X
        },
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: '#6BD4CD',
        },
      },
      tooltip: {
        backgroundColor: 'rgba(20, 20, 20, 0.9)',
        titleColor: '#6BD4CD',
        bodyColor: 'var(--text-secondary)',
      },
    },
  };

  return (
    <section className="artist-module" style={{ padding: '4rem 1.5rem', background: 'linear-gradient(to bottom right, var(--lighter), var(--light))', position: 'relative', overflow: 'hidden'}}> 
      <div style={{ position: 'absolute', top: '-50%', left: '-20%', width: '80%', height: '200%', background: 'radial-gradient(circle, rgba(107,212,205,0.1) 0%, transparent 70%)', zIndex: 0 }}></div>
      <div style={{ position: 'relative', zIndex: 10, maxWidth: '1140px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '2.25rem', fontWeight: '700', color: 'var(--white)', marginBottom: '3rem', textAlign: 'center' }}>
          Módulo <span className="highlight">Artista</span>
        </h2>

        {/* Sección Perfil */}
        <div className="section-container">
          <h3 className="section-title">Perfil</h3>
          <div className="feature-grid">
            <div className="feature-card">
              <div className="icon" style={{ fontSize: '2rem', marginBottom: '1rem' }}>📊</div>
              <h4 style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--white)', marginBottom: '0.5rem' }}>Estadísticas en Tiempo Real</h4>
              <div className="stats-grid">
                <div className="stat-card">
                  <span className="stat-icon">👥</span>
                  <div className="stat-info">
                    <p className="stat-label">Seguidores Totales</p>
                    <p className="stat-value">{stats.followers}</p>
                  </div>
                </div>
                <div className="stat-card">
                  <span className="stat-icon">📈</span>
                  <div className="stat-info">
                    <p className="stat-label">Crecimiento Semanal</p>
                    <p className="stat-value">{stats.weeklyGrowth}</p>
                  </div>
                </div>
                <div className="stat-card">
                  <span className="stat-icon">▶️</span>
                  <div className="stat-info">
                    <p className="stat-label">Reproducciones Semanales</p>
                    <p className="stat-value">{stats.playsThisWeek}</p>
                  </div>
                </div>
                <div className="stat-card">
                  <span className="stat-icon">❤️</span>
                  <div className="stat-info">
                    <p className="stat-label">Likes Semanales</p>
                    <p className="stat-value">{stats.likesThisWeek}</p>
                  </div>
                </div>
                <div className="stat-card">
                  <span className="stat-icon">🆕</span>
                  <div className="stat-info">
                    <p className="stat-label">Nuevos Seguidores Diarios</p>
                    <p className="stat-value">{stats.newFollowersDaily}</p>
                  </div>
                </div>
              </div>
              {/* Gráfico de Crecimiento de Seguidores */}
              <div className="chart-container">
                <h5 style={{ fontSize: '1rem', fontWeight: '500', color: 'var(--white)', marginBottom: '0.5rem' }}>Crecimiento de Seguidores (Últimos 7 Días)</h5>
                <div style={{ height: '200px' }}>
                  <Line data={chartData} options={chartOptions} />
                </div>
              </div>
              <button onClick={handleUpdateStats} className="custom-button" style={{ marginTop: '1rem' }}>Actualizar Estadísticas</button>
            </div>
            <div className="feature-card">
              <div className="icon" style={{ fontSize: '2rem', marginBottom: '1rem' }}>🎵</div>
              <h4 style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--white)', marginBottom: '0.5rem' }}>Portafolio Interactivo</h4>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>Sube música, letras y videos.</p>
              <input type="file" multiple onChange={handleAddPortfolio} className="custom-file-input" />
              {portfolio.length > 0 && (
                <ul className="portfolio-list">
                  {portfolio.map((item, index) => (
                    <li key={index}>{item.name} ({item.type})</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>

        {/* Sección Contenido */}
        <div className="section-container">
          <h3 className="section-title">Contenido</h3>
          <div className="feature-grid">
            <div className="feature-card">
              <div className="icon" style={{ fontSize: '2rem', marginBottom: '1rem' }}>📤</div>
              <h4 style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--white)', marginBottom: '0.5rem' }}>Subida de Demos/Tracks</h4>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>Programa el drop de tu próximo single.</p>
              <input type="file" onChange={handleAddDemo} className="custom-file-input" />
              {demos.map((demo, index) => (
                <p key={index} style={{ marginTop: '0.5rem', color: 'var(--text-secondary)' }}>{demo.title} ({demo.status})</p>
              ))}
            </div>
            <div className="feature-card">
              <div className="icon" style={{ fontSize: '2rem', marginBottom: '1rem' }}>📅</div>
              <h4 style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--white)', marginBottom: '0.5rem' }}>Calendarización de Lanzamientos</h4>
              <p style={{ color: 'var(--text-secondary)' }}>Planifica tus próximos releases.</p>
            </div>
          </div>
        </div>

        {/* Sección Interacción */}
        <div className="section-container">
          <h3 className="section-title">Interacción</h3>
          <div className="feature-grid">
            <div className="feature-card">
              <div className="icon" style={{ fontSize: '2rem', marginBottom: '1rem' }}>📡</div>
              <h4 style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--white)', marginBottom: '0.5rem' }}>Lives Exclusivos</h4>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>{liveEvents[0].title}: {liveEvents[0].time}.</p>
              <button onClick={handleScheduleLive} className="custom-button">Programar Nuevo Live</button>
            </div>
            <div className="feature-card">
              <div className="icon" style={{ fontSize: '2rem', marginBottom: '1rem' }}>💬</div>
              <h4 style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--white)', marginBottom: '0.5rem' }}>Q&A Semanales</h4>
              <p style={{ color: 'var(--text-secondary)' }}>Responde preguntas de tus fans.</p>
            </div>
          </div>
        </div>

        {/* Sección Colaboraciones */}
        <div className="section-container">
          <h3 className="section-title">Colaboraciones</h3>
          <div className="feature-grid">
            <div className="feature-card">
              <div className="icon" style={{ fontSize: '2rem', marginBottom: '1rem' }}>🔍</div>
              <h4 style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--white)', marginBottom: '0.5rem' }}>Buscar Features</h4>
              <p style={{ color: 'var(--text-secondary)' }}>Encuentra artistas para colaborar.</p>
            </div>
            <div className="feature-card">
              <div className="icon" style={{ fontSize: '2rem', marginBottom: '1rem' }}>💸</div>
              <h4 style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--white)', marginBottom: '0.5rem' }}>Crowdfunding de Proyectos</h4>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>Junta ${collaborations[0].amount} para colaborar con {collaborations[0].artist}.</p>
              <input type="number" onChange={handleUpdateCrowdfunding} placeholder="Nuevo monto" className="custom-number-input" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArtistModule;