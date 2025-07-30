import React, { useEffect } from 'react';
import '../styles/LandingPage.css';
import logo from '../assets/logos.svg';
import drawer from '../assets/drawer.svg'
import {
  FiClock,
  FiCheckCircle,
  FiExternalLink
} from 'react-icons/fi';
import { 
  LuFilePlus2,
  LuTimer 
} from 'react-icons/lu';
import {
  BsList
} from 'react-icons/bs';
import { 
  CgCalendarTwo 
} from 'react-icons/cg';
import {
  BiCheckSquare  
} from 'react-icons/bi';

import { useNavigate } from 'react-router-dom';
import { putAccessToken } from '../utils/network-data';

export default function LandingPage({ onEnter }) {
  const navigate = useNavigate();
  useEffect(() => {
    const selector = [
      '.lp-about .about-text p',
      '.lp-features h2',
      '.lp-about h2',
      '.lp-howto h2',
    ].join(', ');
    
    const elems = document.querySelectorAll(selector);
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    
    elems.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const onDaftar = () => {
    navigate('/register');
  }

  const onLogin = () => {
    navigate('/register');
  }

  const onMulaiSekarang = () => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/dashboard');
    } else {
      navigate('/register');
    }
  }

  return (
    <div className="lp-container">
      <header className="lp-header">
        <a href="#hero" className="lp-logo">
          Stuff<span>Nudge</span>
        </a>
        <nav className="lp-nav">
          <a href="#features">Fitur</a>
          <a href="#about">Tentang</a>
          <a href="#howto">Cara Pakai</a>        
          <button className="btn-cta" onClick={onDaftar}>
            Daftar
          </button>
        </nav>
      </header>

      <section className="lp-hero" id="hero">
        <img src={logo} alt="Logo StuffNudge" className="lp-logopict" />
        <h1>Selesaikan Aktivitasmu<br/> dengan Mudah!</h1>
        <button className="btn-hero" onClick={onMulaiSekarang}>
          Mulai Sekarang!
        </button>
      </section>

      <section className="lp-about" id="about">
        <div className="about-wrapper">
          <div className="about-text">
            <h2>Apa itu StuffNudge?</h2>
            <p>
              StuffNudge adalah aplikasi perencana aktivitas harian yang membantu kamu
              merencanakan, mengingat, dan menyelesaikan tugas tanpa takut ada yang
              terlewat.
            </p>
          </div>
          <div className="about-image">
            <img src={drawer} alt="Ilustrasi StuffNudge" />
          </div>
        </div>
      </section>

      <section className="lp-features" id="features">
        <h2>Alat dan Fitur StuffNudge</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon"><BiCheckSquare size={32} /></div>
            <h3>Lengkapi Aktivitas</h3>
            <p>Selesaikan dan tandai aktivitas sebagai selesai dengan sekali klik.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon"><CgCalendarTwo size={32} /></div>
            <h3>Histori Aktivitas</h3>
            <p>Lihat kembali catatan aktivitasmu kapan saja di masa lalu.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon"><FiClock size={32} /></div>
            <h3>Pengaturan Timer</h3>
            <p>Atur batas waktu untuk setiap tugas agar lebih fokus dan terukur.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon"><BsList size={32} /></div>
            <h3>Tambah Aktivitas</h3>
            <p>Tambah dan kelola daftar tugasmu dengan mudah kapan saja.</p>
          </div>
        </div>
      </section>

      <section className="lp-howto" id="howto">
        <h2>Cara Pakai StuffNudge</h2>
        <div className="howto-flow">
          <div className="howto-row">
            <div className="howto-step">
              <div className="step-icon"><LuFilePlus2 size={60} /></div>
              <p>Tambah Aktivitas</p>
            </div>
            <div className="connector" />
            <div className="howto-step">
              <div className="step-icon"><FiExternalLink size={60} /></div>
              <p>Tambah Barang Bawaan</p>
            </div>
            <div className="connector" />
            <div className="howto-step">
              <div className="step-icon"><LuTimer size={60} /></div>
              <p>Atur Timer</p>
            </div>
          </div>
          <div className='connector-vertical'></div>
          <div className="howto-row">
            <div className="howto-step">
              <div className="step-icon"><FiCheckCircle size={60} /></div>
              <p>Tandai Selesai</p>
            </div>
            <div className="connector" />
            <div className="howto-step">
              <div className="step-icon"><BiCheckSquare size={60} /></div>
              <p>Lengkapi Aktivitas</p>
            </div>
            <div className="connector" />
            <div className="howto-step">
              <div className="step-icon"><CgCalendarTwo size={60} /></div>
              <p>Histori Aktivitas</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="lp-footer">
        <div className="footer-content">
          <div className="footer-col">
            <h3>Tentang</h3>
            <ul>
              <li><a href="#about">Tentang StuffNudge</a></li>
              <li><a href="https://dicoding.com" target="_blank">Dicoding</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h3>Tech Stack</h3>
            <ul>
              <li><a href="https://nodejs.org/" target="_blank">NodeJs</a></li>
              <li><a href="https://expressjs.com/" target="_blank">ExpressJs</a></li>
              <li><a href="https://react.dev/" target="_blank">ReactJs</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h3>Platform</h3>
            <ul>
              <li><a href="https://github.com/hadijaamrun/stuffnudge-app" target="_blank">Github</a></li>
              <li><a href="https://railway.com/" target="_blank">Railway</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2025 StuffNudge. Powered by our dreams.</p>
        </div>
      </footer>
    </div>
  );
}

