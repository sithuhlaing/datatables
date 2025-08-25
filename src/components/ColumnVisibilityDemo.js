
import React from 'react';
import DataTable from './DataTable';
import { generateSampleData } from '../utils/sampleDataGenerator';
import './ColumnVisibilityDemo.css';

const ColumnVisibilityDemo = () => {
  const sampleData = generateSampleData();

  return (
    <div className="demo-container">
      <div className="demo-content">
        <header className="demo-header">
          <div className="hero-section">
            <h1 className="hero-title">
              <span className="gradient-text">Modern Data Table</span>
            </h1>
            <p className="hero-subtitle">
              Beautiful, responsive, and feature-rich data table component
            </p>
            <div className="hero-badges">
              <span className="badge">React</span>
              <span className="badge">TypeScript Ready</span>
              <span className="badge">Responsive</span>
              <span className="badge">Accessible</span>
            </div>
          </div>
        </header>

        <section className="features-section">
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">👁️</div>
              <h3>Column Visibility</h3>
              <p>Show/hide columns with beautiful dropdown and checkboxes</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔄</div>
              <h3>Drag & Drop</h3>
              <p>Reorder columns by dragging headers intuitively</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔍</div>
              <h3>Advanced Search</h3>
              <p>Global search and individual column filtering</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Multi-Sort</h3>
              <p>Sort by multiple columns with visual indicators</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📱</div>
              <h3>Responsive</h3>
              <p>Works perfectly on desktop, tablet, and mobile</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Performance</h3>
              <p>Optimized for large datasets with pagination</p>
            </div>
          </div>
        </section>

        <section className="table-section">
          <DataTable data={sampleData} itemsPerPage={8} />
        </section>
      </div>
    </div>
  );
};

export default ColumnVisibilityDemo;
