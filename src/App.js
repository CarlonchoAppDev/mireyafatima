import React, { useState, useEffect, useCallback } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './App.css';
import { loadSlim } from "tsparticles-slim";
import Particles from "react-tsparticles";
import { 
  GiDiamonds, 
  GiQueenCrown, 
  GiPartyPopper, 
  GiSparkles,
  GiDress,
  GiLargeDress,
  GiBowTieRibbon
} from 'react-icons/gi';
import { 
  BsFillHeartPulseFill, 
  BsStars,
  BsSuitHeart
} from 'react-icons/bs';
import { RiDoubleQuotesL, RiDoubleQuotesR, RiUserStarFill } from 'react-icons/ri';
import { IoTimeSharp, IoColorPaletteSharp } from 'react-icons/io5';

function App() {
  const [mostrarInvitacion, setMostrarInvitacion] = useState(false);
  const [tiempoRestante, setTiempoRestante] = useState({
    dias: 0,
    horas: 0,
    minutos: 0,
    segundos: 0
  });
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const fechaEvento = new Date('2025-09-14T17:00:00');
    
    const timer = setInterval(() => {
      const ahora = new Date();
      const diferencia = fechaEvento - ahora;

      const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
      const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
      const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

      setTiempoRestante({ dias, horas, minutos, segundos });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const toggleMusic = () => {
    const audio = document.getElementById('bgMusic');
    if (isMusicPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsMusicPlaying(!isMusicPlaying);
  };

  const handleTimeUpdate = (e) => {
    const audio = e.target;
    setProgress(audio.currentTime);
    setDuration(audio.duration);
  };

  const handleProgressChange = (e) => {
    const audio = document.getElementById('bgMusic');
    const time = parseFloat(e.target.value);
    audio.currentTime = time;
    setProgress(time);
  };

  const particlesInit = useCallback(async engine => {
    await loadSlim(engine);
  }, []);

  const particlesOptions = {
    fpsLimit: 120,
    particles: {
      number: {
        value: 0
      }
    },
    interactivity: {
      detect_on: "window",
      events: {
        onHover: {
          enable: true,
          mode: "trail"
        },
        onClick: {
          enable: true,
          mode: "push"
        },
        resize: true
      },
      modes: {
        trail: {
          delay: 0,
          quantity: 5,
          particles: {
            color: {
              value: ["#FFD700", "#FFC0CB", "#FF69B4"]
            },
            shape: {
              type: "star"
            },
            size: {
              value: 6,
              animation: {
                enable: true,
                speed: 4,
                minimumValue: 2,
                sync: false
              }
            },
            move: {
              enable: true,
              speed: 3,
              direction: "none",
              random: true,
              straight: false,
              outMode: "destroy"
            },
            opacity: {
              value: 0.8,
              animation: {
                enable: true,
                speed: 2,
                minimumValue: 0.1,
                sync: false
              }
            }
          }
        },
        push: {
          quantity: 6,
          particles: {
            color: {
              value: ["#FFD700", "#FFC0CB", "#FF69B4"]
            },
            shape: {
              type: "star"
            },
            opacity: {
              value: 0.8
            },
            size: {
              value: 6
            },
            move: {
              enable: true,
              speed: 3,
              direction: "none",
              random: true
            }
          }
        }
      }
    },
    detectRetina: true,
    fullScreen: {
      enable: false,
      zIndex: 100
    }
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false, // Desactivamos autoplay para mejor control
    cssEase: 'cubic-bezier(0.23, 1, 0.32, 1)', // Efecto más suave
    swipeToSlide: true, // Permite deslizar con el dedo
    touchThreshold: 10, // Hace más sensible el touch
    arrows: true,
    draggable: true,
    swipe: true
  };

  return (
    <div className="app-container">
      <audio 
        id="bgMusic" 
        loop
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleTimeUpdate}
      >
        <source src="/music/background-music.mp3" type="audio/mp3" />
      </audio>
      <div className="invitacion-xv">
        <div 
          className="pantalla-inicial"
          style={{
            backgroundImage: "url('/ingreso.jpg')",
            display: mostrarInvitacion ? 'none' : 'flex'
          }}
        >
          <div className="overlay"></div>
          <div className="contenido-inicial">
            <h1>Mireya Fátima</h1>
            <p>Mis XV Años</p>
            
            <div className="contador">
              <div className="tiempo-item">
                <span className="numero">{tiempoRestante.dias}</span>
                <span className="texto">Días</span>
              </div>
              <div className="tiempo-item">
                <span className="numero">{tiempoRestante.horas}</span>
                <span className="texto">Horas</span>
              </div>
              <div className="tiempo-item">
                <span className="numero">{tiempoRestante.minutos}</span>
                <span className="texto">Minutos</span>
              </div>
              <div className="tiempo-item">
                <span className="numero">{tiempoRestante.segundos}</span>
                <span className="texto">Segundos</span>
              </div>
            </div>

            <button 
              className="btn-principal"
              onClick={() => setMostrarInvitacion(true)}
            >
              Ver invitación
            </button>

            <div className="audio-controls">
              <button 
                className="play-button"
                onClick={toggleMusic}
              >
                <span className="material-icons">
                  {isMusicPlaying ? 'pause' : 'play_arrow'}
                </span>
              </button>
              <div className="progress-container">
                <input
                  type="range"
                  min="0"
                  max={duration || 0}
                  value={progress}
                  onChange={handleProgressChange}
                  className="progress-bar"
                />
              </div>
            </div>
          </div>
        </div>

        {mostrarInvitacion && (
          <div className="modal-container">
            <Particles
              id="tsparticles"
              className="particles"
              init={particlesInit}
              options={particlesOptions}
            />
            <div className="modal-overlay" onClick={() => setMostrarInvitacion(false)}></div>
            <div className="modal-content">
              <div className="hero-image">
                <img src="/quinceanera-foto.png" alt="Mireya Fátima" />
                <div className="hero-text">
                  <h1>Mis XV Años</h1>
                </div>
              </div>

              <div className="invitation-content">
                <div className="name-section">
                  <h2>Mireya Fátima</h2>
                  <p className="elegant-text">Con la bendición de Dios y mis padres:</p>
                </div>

                <div className="parents-section">
                  <div className="parent">
                    <span className="parent-label">Papá</span>
                    <h3>Jimmy Rondal Torrico</h3>
                  </div>
                  <div className="parent">
                    <span className="parent-label">Mamá</span>
                    <h3>Betty Murga Laime</h3>
                  </div>
                </div>

                <div className="invitation-text">
                  <p>Te invito a celebrar</p>
                  <h2>Mis XV Años</h2>
                </div>

                <div className="details-section">
                  <div className="detail-item">
                    <i className="fas fa-calendar"></i>
                    <p>Domingo, 14 de Septiembre 2025</p>
                  </div>
                  <div className="detail-item">
                    <i className="fas fa-clock"></i>
                    <p>17:00 hrs</p>
                  </div>
                  <div className="detail-item">
                    <i className="fas fa-map-marker-alt"></i>
                    <p>Salón de Eventos "Lorena"<br/>
                    Av. Final América Oeste y Calle José María Velasco</p>
                  </div>
                </div>

                <div className="quote-section">
                  <div className="quote-icons-container">
                    <div className="quote-icons quote-icons-left">
                      <RiDoubleQuotesL className="quote-mark" />
                    </div>
                    <p className="quote-text">
                      "Hoy cumplo quince años y mi corazón se llena de alegría al compartir este momento tan especial contigo. 
                      Cada sueño, cada sonrisa y cada paso que doy está lleno de ilusión por este nuevo capítulo en mi vida."
                    </p>
                    <div className="quote-icons quote-icons-right">
                      <RiDoubleQuotesR className="quote-mark" />
                    </div>
                  </div>
                </div>

                <div className="dress-code-section">
                  <div className="section-title">
                    <GiQueenCrown className="animated-icon crown floating-crown" />
                    <h3>Código de Vestimenta</h3>
                    <GiQueenCrown className="animated-icon crown floating-crown-reverse" />
                  </div>
                  <div className="dress-code-content">
                    <div className="dress-code-item">
                      <div className="icon-group">
                        <img src="/ropa-formal.png" alt="Código de vestimenta" className="dress-code-icon" />
                      </div>
                      <p>Damas: Vestido de gala<br/>Caballeros: Traje formal</p>
                    </div>
                  </div>
                </div>

                <div className="gallery-section">
                  <div className="carrusel-container">
                    <Slider {...sliderSettings}>
                      <div className="slide-item">
                        <div className="polaroid">
                          <img src="/princesa.png" alt="Foto 1" />
                        </div>
                      </div>
                      <div className="slide-item">
                        <div className="polaroid">
                          <img src="/anime.png" alt="Foto 2" />
                        </div>
                      </div>
                      <div className="slide-item">
                        <div className="polaroid">
                          <img src="/foto3.png" alt="Foto 3" />
                        </div>
                      </div>
                      <div className="slide-item">
                        <div className="polaroid">
                          <img src="/portada.png" alt="Foto 4" />
                        </div>
                      </div>
                    </Slider>
                  </div>
                </div>

                <div className="location-section">
                  <div className="mapa-container">
                    <iframe
                      title="Ubicación"
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d951.9652392069005!2d-66.18829715166989!3d-17.37042239669241!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x93e3745fb23e0c01%3A0x3453c864bc1f32d4!2sSal%C3%B3n%20de%20Eventos%20%22Lorena%22!5e0!3m2!1ses-419!2sbo!4v1757033085977!5m2!1ses-419!2sbo"
                      style={{ border: 0, borderRadius: '12px' }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                    <a
                      href="https://maps.app.goo.gl/vK5E6ZSH3M4tW3VWA"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-mapa"
                    >
                      Cómo llegar
                    </a>
                  </div>
                </div>

                <div className="footer-text">
                  <p>¡Te espero para compartir este momento tan especial!</p>
                </div>
              </div>

              <button 
                className="btn-cerrar"
                onClick={() => setMostrarInvitacion(false)}
              >
                ×
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
