import React, { useEffect } from 'react';
import '../styles/LandingPage.css';
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

export default function LandingPage() {
  useEffect(() => {
    const selector = [
      '.step-icon',
      '.lp-about .about-image img',
      '.lp-about .about-text p'
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

  return (
    <div className="lp-container">
      <header className="lp-header">
        <a href="home" className="lp-logo">
          Stuff<span>.Nudge</span>
        </a>
        <nav className="lp-nav">
          <a href="#features">Fitur</a>
          <a href="#about">Tentang</a>
          <a href="#howto">Cara Pakai</a>
          <button className="btn-cta">Daftar</button>
        </nav>
      </header>

      <section className="lp-hero" id="hero">
        <h1>Selesaikan Aktivitasmu<br></br> dengan Mudah!</h1>
        <button className="btn-hero">Mulai Sekarang!</button>
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
            <img src="/src/assets/drawer.svg" alt="Ilustrasi tentang StuffNudge" />
          </div>
        </div>
      </section>

      <section className="lp-features" id="features">
        <h2>Alat dan Fitur StuffNudge</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon"><BiCheckSquare size={32} /></div>
            <h3>Lengkapi Aktivitas</h3>
            <p>Selesaikan dan tandai aktifitas sebagai selesai dengan sekali klik.</p>
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
            <div className="howto-step" id="step-tambah-aktivitas">
              <div className="step-icon"><LuFilePlus2 size={60} /></div>
              <p>Tambah Aktivitas</p>
            </div>
            <div className="connector" />
            <div className="howto-step" id="step-tambah-barang">
             <div className="step-icon"><FiExternalLink size={60} /></div>
              <p>Tambah Barang Bawaan</p>
            </div>
            <div className="connector" />
            <div className="howto-step" id="step-atur-timer">
              <div className="step-icon"><LuTimer size={60} /></div>
              <p>Atur Timer</p>
              <div className="connector-vertical" />
            </div>
          </div>
          <div className="howto-row">
            <div className="howto-step" id="step-tandai-selesai">
              <div className="step-icon"><FiCheckCircle size={60} /></div>
              <p>Tandai Selesai</p>
            </div>
            <div className="connector" />
            <div className="howto-step" id="step-lengkapi-aktivitas">
             <div className="step-icon"><BiCheckSquare size={60} /></div>
              <p>Lengkapi Aktivitas</p>
            </div>
            <div className="connector" />
            <div className="howto-step" id="step-histori-aktivitas">
              <div className="step-icon"><CgCalendarTwo size={60} /></div>
              <p>Histori Aktivitas</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="lp-footer">
        <div className="footer-links">
          <a href="#features">Fitur</a>
          <a href="#about">Tentang</a>
          <a href="#howto">Cara Pakai</a>
          <a href="#documentation">Dokumentasi</a>
        </div>
        <p className="copy-right">&copy; 2025 StuffNudge. All rights reserved.</p>
      </footer>
    </div>
  );
}
