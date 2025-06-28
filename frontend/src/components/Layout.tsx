import React from 'react';
import '../styles/Layout.css';
import Navbar from './Navbar';
import logo from '../assets/logo.png';

interface LayoutProps {
  children: React.ReactNode;
  selectedTab?: string;
  onTabChange?: (tab: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, selectedTab, onTabChange }) => (
  <div className="main-layout">
    <header className="main-header-row">
      <div className="logo-side">
        <img src={logo} alt="Company Logo" className="logo" />
      </div>
      {selectedTab && onTabChange && (
        <Navbar selectedTab={selectedTab} onTabChange={onTabChange} />
      )}
    </header>
    <main className="main-content">
      {children}
    </main>
    <footer className="main-footer">
      <a href="/contact" target="_blank" rel="noopener noreferrer">Contact Us</a>
      <span> | </span>
      <a href="/faq" target="_blank" rel="noopener noreferrer">FAQ</a>
      <span> | </span>
      <a href="/report-bug" target="_blank" rel="noopener noreferrer">Report Bug</a>
    </footer>
  </div>
);

export default Layout; 