import React from 'react';
import { Link } from 'react-router-dom';
import { 
  SparklesIcon, 
  DevicePhoneMobileIcon, 
  CloudArrowUpIcon, 
  ArrowRightIcon,
  UserIcon,
  BuildingOfficeIcon,
  ArrowPathIcon,
  ShieldCheckIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';

const LandingPage = () => {
  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-logo">
            <SparklesIcon />
          </div>
          <h1 className="hero-title">EcoTrace AI</h1>
          <p className="hero-subtitle">
            Transform E-Waste into Environmental Impact with AI-Powered Recycling
          </p>
          <div className="hero-buttons">
            <Link to="/role-select" className="btn btn-primary btn-large">
              Get Started
              <ArrowRightIcon />
            </Link>
            <Link to="/role-select" className="btn btn-secondary btn-large">
              Explore Roles
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section">
        <div className="section-container">
          <h2 className="section-title">About EcoTrace AI</h2>
          <p className="section-subtitle">
            Solving the global e-waste crisis through intelligent recycling solutions
          </p>
          <div className="about-grid">
            <div className="about-card">
              <div className="about-icon">
                <ChartBarIcon />
              </div>
              <h3>The Problem</h3>
              <p>
                Over 50 million tons of e-waste are generated annually, with only 20% properly recycled. 
                This creates environmental hazards and wastes valuable materials.
              </p>
            </div>
            <div className="about-card">
              <div className="about-icon">
                <SparklesIcon />
              </div>
              <h3>Our Solution</h3>
              <p>
                AI-powered device identification and material analysis to maximize recycling efficiency 
                and connect users with certified recyclers instantly.
              </p>
            </div>
            <div className="about-card">
              <div className="about-icon">
                <CloudArrowUpIcon />
              </div>
              <h3>The Impact</h3>
              <p>
                Reduce carbon footprint, recover precious materials, and create a sustainable circular 
                economy for electronic devices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <div className="section-container">
          <h2 className="section-title">How It Works</h2>
          <p className="section-subtitle">Three simple steps to recycle your e-waste responsibly</p>
          <div className="steps-grid">
            <div className="step-card">
              <div className="step-number">1</div>
              <div className="step-icon">
                <CloudArrowUpIcon />
              </div>
              <h3>Upload Device</h3>
              <p>Take a photo or upload details of your electronic device</p>
            </div>
            <div className="step-card">
              <div className="step-number">2</div>
              <div className="step-icon">
                <SparklesIcon />
              </div>
              <h3>AI Analysis</h3>
              <p>Our AI identifies components and estimates recycling value</p>
            </div>
            <div className="step-card">
              <div className="step-number">3</div>
              <div className="step-icon">
                <ArrowPathIcon />
              </div>
              <h3>Connect to Recycler</h3>
              <p>Get matched with certified recyclers and schedule pickup</p>
            </div>
          </div>
        </div>
      </section>

      {/* Role Overview */}
      <section className="roles-section">
        <div className="section-container">
          <h2 className="section-title">Choose Your Role</h2>
          <p className="section-subtitle">Join the ecosystem that fits your needs</p>
          <div className="roles-grid">
            <div className="role-card">
              <div className="role-icon">
                <UserIcon />
              </div>
              <h3>Individual</h3>
              <p>Recycle personal electronics and track your environmental impact</p>
              <Link to="/role-select" className="role-link">
                Learn More
                <ArrowRightIcon />
              </Link>
            </div>
            <div className="role-card">
              <div className="role-icon">
                <BuildingOfficeIcon />
              </div>
              <h3>Corporate</h3>
              <p>Manage company e-waste programs and compliance reporting</p>
              <Link to="/role-select" className="role-link">
                Learn More
                <ArrowRightIcon />
              </Link>
            </div>
            <div className="role-card">
              <div className="role-icon">
                <ArrowPathIcon />
              </div>
              <h3>Recycler</h3>
              <p>Process e-waste efficiently and grow your recycling business</p>
              <Link to="/role-select" className="role-link">
                Learn More
                <ArrowRightIcon />
              </Link>
            </div>
            <div className="role-card">
              <div className="role-icon">
                <ShieldCheckIcon />
              </div>
              <h3>Admin</h3>
              <p>Oversee platform operations and ensure system integrity</p>
              <Link to="/role-select" className="role-link">
                Learn More
                <ArrowRightIcon />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Statistics */}
      <section className="impact-section">
        <div className="section-container">
          <h2 className="section-title">Our Impact</h2>
          <p className="section-subtitle">Making a difference, one device at a time</p>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">50,000+</div>
              <div className="stat-label">Devices Processed</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">2.5M kg</div>
              <div className="stat-label">CO₂ Saved</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">85%</div>
              <div className="stat-label">Materials Recovered</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">10,000+</div>
              <div className="stat-label">Happy Users</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-content">
            <div className="footer-section">
              <div className="footer-logo">
                <SparklesIcon />
                <span>EcoTrace AI</span>
              </div>
              <p>Transforming e-waste into environmental impact through AI-powered recycling.</p>
            </div>
            <div className="footer-section">
              <h4>Quick Links</h4>
              <ul>
                <li><Link to="/role-select">Get Started</Link></li>
                <li><Link to="/role-select">Choose Role</Link></li>
                <li><a href="#about">About Us</a></li>
                <li><a href="#how-it-works">How It Works</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Legal</h4>
              <ul>
                <li><a href="#privacy">Privacy Policy</a></li>
                <li><a href="#terms">Terms of Service</a></li>
                <li><a href="#compliance">Compliance</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Contact</h4>
              <ul>
                <li><a href="mailto:info@ecotrace.ai">info@ecotrace.ai</a></li>
                <li><a href="#support">Support Center</a></li>
                <li><a href="#partners">Partnerships</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 EcoTrace AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
