import React from 'react';
import './Navbar.css';

interface NavbarProps {
  selectedTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
{ label: 'Main Dashboard', value: 'dashboard' },
  { label: 'Create User', value: 'createUser' },
  { label: 'Create New Items', value: 'createItem' },
];

const Navbar: React.FC<NavbarProps> = ({ selectedTab, onTabChange }) => {
  return (
    <nav className="navbar-fun">
      <ul className="navbar-fun-tabs">
        {tabs.map(tab => (
          <li key={tab.value}>
            <button
              className={`navbar-fun-tab${selectedTab === tab.value ? ' active' : ''}`}
              onClick={() => onTabChange(tab.value)}
            >
              {tab.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar; 