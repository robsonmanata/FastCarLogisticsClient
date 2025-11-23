import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { InventoryStyles } from './inventorystyle';
import TopBar from '../topBar/topbar';
import NavigationBar from '../navigationbar/navigationbar';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import AddIcon from '@mui/icons-material/Add';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { openAddProductModal } from '../actions/ui';

const Inventory = () => {
    const styles = new InventoryStyles();
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.products);
    const categories = useSelector((state) => state.categories);
    console.log('Products:', posts);
    console.log('Categories:', categories);

    const inventoryData = [
        { id: 1, part: 'Battery Pack', sku: 'BAT-125-GEN1', price: '$8,500', category: 'Electrical Components', stock: 90, lowStock: false, sales: '$2,626,500' },
        { id: 2, part: 'Electric Motor', sku: 'MOT-248-GEN2', price: '$3,200', category: 'Electrical Components', stock: 85, lowStock: false, sales: '$617,600' },
        { id: 3, part: 'Inverter', sku: 'INV-359-GEN3', price: '$2,800', category: 'Electrical Components', stock: 8, lowStock: true, sales: '$792,400' },
        { id: 4, part: 'Power Steering System', sku: 'PSS-573-GEN2', price: '$1,100', category: 'Lighting and Safety', stock: 65, lowStock: false, sales: '$330,000' },
        { id: 5, part: 'Regenerative Brakes', sku: 'RBS-684-GEN3', price: '$1,500', category: 'Lighting and Safety', stock: 100, lowStock: false, sales: '$439,500' },
        { id: 6, part: 'Charging Cable', sku: 'CBL-795-GEN1', price: '$450', category: 'Electrical Components', stock: 10, lowStock: true, sales: '$110,700' },
        { id: 7, part: 'Control Module', sku: 'CMD-806-GEN2', price: '$1,100', category: 'Electrical Components', stock: 1, lowStock: true, sales: '$311,300' },
        { id: 8, part: 'Drive Shaft', sku: 'DSH-917-GEN3', price: '$650', category: 'Mechanical Components', stock: 110, lowStock: false, sales: '$203,450' },
    ];

    return (
        <div style={styles.wrapper}>
            <TopBar />
            <div style={{ display: 'flex', flex: 1 }}>
                <NavigationBar />
                <div style={styles.mainContent} className="main-content">
                    <div style={styles.header}>
                        <h1 style={styles.title}>Inventory</h1>
                        <div style={styles.controls}>
                            <div style={styles.searchContainer}>
                                <SearchIcon style={styles.searchIcon} />
                                <input type="text" placeholder="Search" style={styles.searchInput} />
                            </div>
                            <button style={styles.filterButton}>
                                <FilterListIcon /> Filter
                            </button>
                            <button style={styles.newSkuButton} onClick={() => dispatch(openAddProductModal())}>
                                <AddIcon /> add Product
                            </button>
                        </div>
                    </div>

                    <table style={styles.table}>
                        <thead>
                            <tr>
                                <th style={styles.th}>PART</th>
                                <th style={styles.th}>SKU</th>
                                <th style={styles.th}>UNIT PRICE</th>
                                <th style={styles.th}>CATEGORY</th>
                                <th style={styles.th}>BARCODE</th>
                                <th style={styles.th}>LOW STOCK?</th>
                                <th style={styles.th}>STOCK</th>
                                <th style={styles.th}>RESTOCK</th>
                                <th style={styles.th}>SALES VOLUME</th>
                                <th style={styles.th}></th>
                            </tr>
                        </thead>
                        <tbody>
                            {inventoryData.map((item) => (
                                <tr key={item.id}>
                                    <td style={styles.td}>
                                        <div style={styles.partCell}>
                                            <div style={styles.partImage}></div> {/* Placeholder for image */}
                                            {item.part}
                                        </div>
                                    </td>
                                    <td style={styles.td}>{item.sku}</td>
                                    <td style={styles.td}>{item.price}</td>
                                    <td style={styles.td}>
                                        <span style={styles.categoryBadge}>{item.category}</span>
                                    </td>
                                    <td style={styles.td}>
                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                            {/* Simple CSS barcode representation */}
                                            <div style={{ display: 'flex', gap: '2px', height: '20px' }}>
                                                {[...Array(10)].map((_, i) => (
                                                    <div key={i} style={{ width: Math.random() > 0.5 ? '2px' : '1px', backgroundColor: 'black' }}></div>
                                                ))}
                                            </div>
                                        </div>
                                    </td>
                                    <td style={styles.td}>
                                        {item.lowStock && <WarningAmberIcon style={styles.warningIcon} />}
                                    </td>
                                    <td style={styles.td}>{item.stock} units</td>
                                    <td style={styles.td}>
                                        <button style={styles.addStockButton}>Add Stock</button>
                                    </td>
                                    <td style={styles.td}>{item.sales}</td>
                                    <td style={styles.td}>
                                        <MoreHorizIcon style={styles.actionIcon} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Inventory;
