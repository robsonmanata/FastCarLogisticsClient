import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { DashboardStyles } from './dashboardstyles';
import NavigationBar from '../navigationbar/navigationbar';
import Categories from '../assets/OpHguMVjWq1lxU274SeW.webp';
import TopBar from '../topBar/topbar';
import BarGraph from './BarGraph';
import { getDashboardStats } from '../actions/dashboard';

const Dashboard = () => {
  const styles = new DashboardStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const stats = useSelector((state) => state.dashboard);

  // Year selection state
  const [selectedYear, setSelectedYear] = React.useState(''); // Defaults to empty, will be set by stats.year

  useEffect(() => {
    dispatch(getDashboardStats(selectedYear));
  }, [dispatch, selectedYear]);

  // Sync state with backend response effectively
  useEffect(() => {
    if (!selectedYear && stats?.graphData?.year) {
      setSelectedYear(stats.graphData.year);
    }
  }, [stats?.graphData?.year]);

  console.log('Dashboard Stats:', stats);

  const activityCards = [
    { value: stats?.products || 0, label: 'Items', sub: 'Qty', path: '/inventory' },
    { value: stats?.orders || 0, label: 'Orders', sub: 'Qty', path: '/orders' },
    { value: stats?.itemsUsed || 0, label: 'Items Used', sub: 'Qty', path: '/items-used' },
    { value: stats?.notifications || 0, label: 'Notifications', sub: 'Qty', path: '/notifications' },
    { value: stats?.itemsOrdered || 0, label: 'Items ordered', sub: 'Qty', path: '/items-ordered' },
  ];

  return (
    <div style={styles.wrapper}>
      <TopBar />
      <div style={styles.contentWrapper}>
        <NavigationBar />
        <div style={styles.mainContent} className="main-content">
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <h2 style={{ ...styles.sectionTitle, marginBottom: 0 }}>Recent activity</h2>
            </div>

            <div style={styles.cardsGrid}>
              {activityCards.map((card, index) => (
                <div
                  key={index}
                  style={{ ...styles.card, cursor: 'pointer', transition: 'transform 0.2s' }}
                  onClick={() => navigate(card.path)}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                  <div style={styles.cardValue}>{(Number(card.value) || 0).toLocaleString('en-US').replace(/,/g, '\u00A0')}</div>
                  <div style={styles.cardSubLabel}>{card.sub}</div>
                  <div style={styles.cardLabel}>{card.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={styles.gridContainer}>
            <div style={styles.contentCard}>
              <h3 style={styles.sectionTitle}>Stock numbers</h3>
              <div style={styles.stockList}>
                <div
                  style={{ ...styles.stockRow, cursor: 'pointer' }}
                  onClick={() => navigate('/inventory', { state: { filterType: 'lowStock' } })}
                >
                  <span style={styles.lowStock}>Low stock items</span>
                  <div style={styles.stockValueContainer}>
                    <span style={styles.lowStockValue}>{(stats?.lowStock || 0).toLocaleString('en-US').replace(/,/g, '\u00A0')}</span>
                    <div style={styles.dot}></div>
                  </div>
                </div>
                <div
                  style={{ ...styles.stockRow, cursor: 'pointer' }}
                  onClick={() => navigate('/categories')}
                >
                  <span style={styles.stockLabel}>Item categories</span>
                  <span style={styles.stockValue}>{(stats?.categories || 0).toLocaleString('en-US').replace(/,/g, '\u00A0')}</span>
                </div>
                <div
                  style={{ ...styles.stockRow, cursor: 'pointer' }}
                  onClick={() => navigate('/items-used')}
                >
                  <span style={styles.stockLabel}>Items used</span>
                  <span style={styles.stockValue}>{(stats?.itemsUsed || 0).toLocaleString('en-US').replace(/,/g, '\u00A0')}</span>
                </div>
              </div>
            </div>

            <div style={styles.contentCard}>
              <h3 style={{ ...styles.sectionTitle, cursor: 'pointer' }} onClick={() => navigate('/categories')}>Top item categories</h3>
              <div style={styles.categoryGrid}>
                {stats?.topCategories && stats.topCategories.length > 0 ? (
                  stats.topCategories.map((cat, index) => (
                    <div key={index} style={{ ...styles.categoryItem, position: 'relative', overflow: 'hidden', height: '100px', padding: 0 }}>
                      <img src={cat.image || Categories} alt={cat._id} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      <div style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        backgroundColor: 'rgba(0,0,0,0.6)',
                        color: 'white',
                        padding: '0.25rem',
                        fontSize: '0.8rem',
                        textAlign: 'center',
                        fontWeight: 'bold'
                      }}>
                        {cat._id}
                      </div>
                    </div>
                  ))
                ) : (
                  <>
                    <div style={styles.categoryItem}><img src={Categories} alt="Categories" style={styles.categoryImage} /></div>
                    <div style={styles.categoryItem}><img src={Categories} alt="Categories" style={styles.categoryImage} /></div>
                    <div style={styles.categoryItem}><img src={Categories} alt="Categories" style={styles.categoryImage} /></div>
                    <div style={styles.categoryItem}><img src={Categories} alt="Categories" style={styles.categoryImage} /></div>
                  </>
                )}
              </div>
            </div>
          </div>


          {/* Year Selector and Graph */}
          <div style={{ marginTop: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
              {stats?.graphData?.availableYears?.length > 0 && (
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  style={{
                    padding: '0.5rem 1rem',
                    borderRadius: '8px',
                    border: '1px solid #d1d5db',
                    backgroundColor: 'white',
                    color: '#374151',
                    fontSize: '0.875rem',
                    outline: 'none',
                    cursor: 'pointer'
                  }}
                >
                  {stats.graphData.availableYears.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              )}
            </div>
            <BarGraph data={stats?.graphData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
