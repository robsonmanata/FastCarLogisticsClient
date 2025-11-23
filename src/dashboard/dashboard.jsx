import React from 'react';
import { DashboardStyles } from './dashboardstyles';
import NavigationBar from '../navigationbar/navigationbar';
import Categories from '../assets/OpHguMVjWq1lxU274SeW.webp';
import TopBar from '../topBar/topbar';

import BarGraph from './BarGraph';

const Dashboard = () => {
  const styles = new DashboardStyles();
  const activityCards = [
    { value: '741', label: 'New Items', sub: 'Qty' },
    { value: '123', label: 'New Orders', sub: 'Qty' },
    { value: '12', label: 'Refunds', sub: 'Qty' },
    { value: '1', label: 'Message', sub: 'Qty' },
    { value: '4', label: 'Groups', sub: 'Qty' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: 'white' }}>
      <TopBar />
      <div style={{ display: 'flex', flex: 1, marginTop: '70px' }}>
        <NavigationBar />
        <div style={{ ...styles.mainContent, marginLeft: '250px', width: 'calc(100% - 250px)' }} className="main-content">
          {/* Removed old header since it's now in TopBar */}

          <div>
            <h2 style={styles.sectionTitle}>Recent activity</h2>
            <div style={styles.cardsGrid}>
              {activityCards.map((card, index) => (
                <div key={index} style={styles.card}>
                  <div style={styles.cardValue}>{card.value}</div>
                  <div style={{ fontSize: '0.8rem', color: '#6b7280', marginBottom: '0.5rem' }}>{card.sub}</div>
                  <div style={styles.cardLabel}>{card.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={styles.gridContainer}>
            <div style={styles.contentCard}>
              <h3 style={styles.sectionTitle}>Stock numbers</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={styles.stockRow}>
                  <span style={styles.lowStock}>Low stock items</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={styles.lowStockValue}>12</span>
                    <div style={styles.dot}></div>
                  </div>
                </div>
                <div style={styles.stockRow}>
                  <span style={styles.stockLabel}>Item categories</span>
                  <span style={styles.stockValue}>6</span>
                </div>
                <div style={styles.stockRow}>
                  <span style={styles.stockLabel}>Refunded items</span>
                  <span style={styles.stockValue}>1</span>
                </div>
              </div>
            </div>

            <div style={styles.contentCard}>
              <h3 style={styles.sectionTitle}>Top item categories</h3>
              {/* Placeholder for Categories */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div style={{ backgroundColor: '#f3f4f6', padding: '1rem', borderRadius: '8px', textAlign: 'center' }}><img src={Categories} alt="Categories" style={styles.categoryImage} /></div>
                <div style={{ backgroundColor: '#f3f4f6', padding: '1rem', borderRadius: '8px', textAlign: 'center' }}><img src={Categories} alt="Categories" style={styles.categoryImage} /></div>
                <div style={{ backgroundColor: '#f3f4f6', padding: '1rem', borderRadius: '8px', textAlign: 'center' }}><img src={Categories} alt="Categories" style={styles.categoryImage} /></div>
                <div style={{ backgroundColor: '#f3f4f6', padding: '1rem', borderRadius: '8px', textAlign: 'center' }}><img src={Categories} alt="Categories" style={styles.categoryImage} /></div>
              </div>
            </div>
          </div>

          <BarGraph />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
