import React, { useState } from 'react';
import { WarehouseStyles } from './warehousestyle';
import TopBar from '../topBar/topbar';
import NavigationBar from '../navigationbar/navigationbar';
import AddIcon from '@mui/icons-material/Add';
import parts from '../assets/parts.png'; // Reusing the parts image as placeholder

const Warehouse = () => {
    const styles = new WarehouseStyles();
    const [selectedStoreId, setSelectedStoreId] = useState(1);

    const stores = [
        { id: 1, name: 'New York, US', image: parts },
        { id: 2, name: 'London, UK', image: parts },
        { id: 3, name: ' Paris, FR', image: parts },
        { id: 4, name: 'Tokyo, JP', image: parts },
    ];

    const selectedStore = stores.find(s => s.id === selectedStoreId);

    return (
        <div style={styles.wrapper}>
            <TopBar />
            <div style={{ display: 'flex', flex: 1 }}>
                <NavigationBar />
                <div style={styles.mainContent} className="main-content">
                    <div style={styles.header}>
                        <h1 style={styles.title}>Warehouses</h1>
                        <div style={styles.controls}>
                            <input type="text" placeholder="Search" style={styles.searchInput} />
                            <select style={styles.filterSelect}>
                                <option>Filter by</option>
                            </select>
                            <button style={styles.addStoreButton}>
                                <AddIcon /> Add warehouse
                            </button>
                        </div>
                    </div>

                    <div style={styles.contentGrid}>
                        {/* Store List */}
                        <div style={styles.storeList}>
                            {stores.map((store) => (
                                <div
                                    key={store.id}
                                    style={{
                                        ...styles.storeCard,
                                        ...(selectedStoreId === store.id ? styles.storeCardSelected : {})
                                    }}
                                    onClick={() => setSelectedStoreId(store.id)}
                                >
                                    <img src={store.image} alt={store.name} style={styles.storeThumbnail} />
                                    <span style={{
                                        ...styles.storeName,
                                        ...(selectedStoreId === store.id ? styles.storeNameSelected : {})
                                    }}>
                                        {store.name}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* Store Details */}
                        <div style={styles.storeDetails}>
                            <div style={styles.detailHeader}>{selectedStore?.name}</div>

                            <div style={styles.imageRow}>
                                <img src={parts} alt="Store view 1" style={styles.detailImage} />
                                <img src={parts} alt="Store view 2" style={styles.detailImage} />
                                <img src={parts} alt="Store view 3" style={styles.detailImage} />
                            </div>

                            <div style={styles.statsGrid}>
                                <div>
                                    <div style={styles.statRow}>
                                        <span style={styles.statLabel}>Employees:</span>
                                        <span style={styles.statValue}>23</span>
                                    </div>
                                    <div style={styles.statRow}>
                                        <span style={styles.statLabel}>Items:</span>
                                        <span style={styles.statValue}>308</span>
                                    </div>
                                    <div style={styles.statRow}>
                                        <span style={styles.statLabel}>Orders:</span>
                                        <span style={styles.statValue}>2</span>
                                    </div>
                                    <div style={styles.statRow}>
                                        <span style={styles.refundsLabel}>Refunds:</span>
                                        <span style={styles.refundsValue}>1</span>
                                    </div>
                                </div>
                                <div>
                                    <div style={styles.statRow}>
                                        <span style={styles.statLabel}>Most used items:</span>
                                        <span style={styles.statValue}>Filters wheels break fluid</span>
                                    </div>
                                    <div style={styles.statRow}>
                                        <span style={styles.statLabel}>Most popular category:</span>
                                        <span style={styles.statValue}>Vehicle parts & components</span>
                                    </div>
                                    <div style={styles.statRow}>
                                        <span style={styles.statLabel}>Customer satisfaction:</span>
                                        <span style={styles.statValue}>93%</span>
                                    </div>
                                    <div style={styles.statRow}>
                                        <span style={styles.statLabel}>Status:</span>
                                        <span style={styles.statusOpen}>Open</span>
                                    </div>
                                </div>
                            </div>

                            <div style={styles.popularSection}>
                                <div style={styles.popularTitle}>Most popular items</div>
                                <div style={styles.popularItemsRow}>
                                    <div style={styles.popularItemCard}>
                                        <img src={parts} alt="Item 1" style={styles.popularItemImage} />
                                        <span style={styles.popularItemName}>Filters wheels break fluid</span>
                                    </div>
                                    <div style={styles.popularItemCard}>
                                        <img src={parts} alt="Item 2" style={styles.popularItemImage} />
                                        <span style={styles.popularItemName}>Filters wheels break fluid</span>
                                    </div>
                                    <div style={styles.popularItemCard}>
                                        <img src={parts} alt="Item 3" style={styles.popularItemImage} />
                                        <span style={styles.popularItemName}>Filters wheels break fluid</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Warehouse;
