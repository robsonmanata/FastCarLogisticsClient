import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { InventoryStyles } from './inventorystyle';
import TopBar from '../topBar/topbar';
import NavigationBar from '../navigationbar/navigationbar';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import AddIcon from '@mui/icons-material/Add';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { openAddProductModal, setCurrentProductId } from '../actions/ui';
import { updateProduct } from '../actions/products';

const Inventory = () => {
    const styles = new InventoryStyles();
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.products);
    const categories = useSelector((state) => state.categories);
    console.log('Products:', posts);
    console.log('Categories:', categories);

    const handleEdit = (id) => {
        dispatch(setCurrentProductId(id));
        dispatch(openAddProductModal());
    };

    const [restockItem, setRestockItem] = React.useState(null);
    const [restockAmount, setRestockAmount] = React.useState('');

    const handleOpenRestock = (item) => {
        setRestockItem(item);
        setRestockAmount('');
    };

    const handleSubmitRestock = (e) => {
        e.preventDefault();
        if (restockItem && restockAmount) {
            const updatedProduct = { ...restockItem, ProductQuantity: Number(restockItem.ProductQuantity) + Number(restockAmount) };
            dispatch(updateProduct(restockItem._id, updatedProduct));
            setRestockItem(null);
            setRestockAmount('');
        }
    };

    const [utilizeItem, setUtilizeItem] = React.useState(null);
    const [utilizeAmount, setUtilizeAmount] = React.useState('');

    const handleOpenUtilize = (item) => {
        setUtilizeItem(item);
        setUtilizeAmount('');
    };

    const handleSubmitUtilize = (e) => {
        e.preventDefault();
        if (utilizeItem && utilizeAmount) {
            const currentQty = Number(utilizeItem.ProductQuantity);
            const usedAmount = Number(utilizeAmount);

            if (usedAmount > currentQty) {
                alert("Cannot utilize more than available stock!");
                return;
            }

            const updatedProduct = {
                ...utilizeItem,
                ProductQuantity: currentQty - usedAmount,
                ProductQuantityUsed: (Number(utilizeItem.ProductQuantityUsed) || 0) + usedAmount
            };
            dispatch(updateProduct(utilizeItem._id, updatedProduct));
            setUtilizeItem(null);
            setUtilizeAmount('');
        }
    };

    const [searchQuery, setSearchQuery] = React.useState('');
    const [isFilterOpen, setIsFilterOpen] = React.useState(false);
    const [filterCategory, setFilterCategory] = React.useState('');
    const [filterQuantity, setFilterQuantity] = React.useState({ min: '', max: '' });
    const [filterPrice, setFilterPrice] = React.useState({ min: '', max: '' });
    const [filterDate, setFilterDate] = React.useState({ start: '', end: '' });

    const location = useLocation();

    React.useEffect(() => {
        if (location.state?.category) {
            setFilterCategory(location.state.category);
        }
    }, [location.state]);

    const filteredPosts = posts.filter((item) => {
        const matchesSearch = (item.ProductName && item.ProductName.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (item.ProductSKU && item.ProductSKU.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (item.ProductCategory && item.ProductCategory.toLowerCase().includes(searchQuery.toLowerCase()));

        const matchesCategory = filterCategory ? item.ProductCategory === filterCategory : true;

        const quantity = Number(item.ProductQuantity);
        const matchesQuantity = (filterQuantity.min === '' || quantity >= Number(filterQuantity.min)) &&
            (filterQuantity.max === '' || quantity <= Number(filterQuantity.max));

        const price = Number(item.ProductPrice);
        const matchesPrice = (filterPrice.min === '' || price >= Number(filterPrice.min)) &&
            (filterPrice.max === '' || price <= Number(filterPrice.max));

        const date = new Date(item.createdAt);
        const matchesDate = (filterDate.start === '' || date >= new Date(filterDate.start)) &&
            (filterDate.end === '' || date <= new Date(filterDate.end));

        return matchesSearch && matchesCategory && matchesQuantity && matchesPrice && matchesDate;
    });

    return (
        <div style={styles.wrapper}>
            <TopBar />
            <div style={styles.contentWrapper}>
                <NavigationBar />
                <div style={styles.mainContent} className="main-content">
                    <div style={styles.header}>
                        <h1 style={styles.title}>Inventory</h1>
                        <div style={styles.controls}>
                            <div style={styles.searchContainer}>
                                <SearchIcon style={styles.searchIcon} />
                                <input
                                    type="text"
                                    placeholder="Search"
                                    style={styles.searchInput}
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <div style={styles.filterContainer}>
                                <button style={styles.filterButton} onClick={() => setIsFilterOpen(!isFilterOpen)}>
                                    <FilterListIcon /> {filterCategory || 'Filter'}
                                </button>
                                {isFilterOpen && (
                                    <div style={styles.filterDropdown}>
                                        <div style={styles.filterGroup}>
                                            <label style={styles.filterLabel}>Category</label>
                                            <select
                                                value={filterCategory}
                                                onChange={(e) => setFilterCategory(e.target.value)}
                                                style={styles.filterSelect}
                                            >
                                                <option value="" style={styles.filterOption}>All Categories</option>
                                                {categories.map((cat) => (
                                                    <option key={cat._id} value={cat.CategoryName} style={styles.filterOption}>{cat.CategoryName}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <div style={styles.filterGroup}>
                                            <label style={styles.filterLabel}>Quantity</label>
                                            <div style={styles.filterInputGroup}>
                                                <input
                                                    type="number"
                                                    placeholder="Min"
                                                    value={filterQuantity.min}
                                                    onChange={(e) => setFilterQuantity({ ...filterQuantity, min: e.target.value })}
                                                    style={styles.filterInput}
                                                />
                                                <input
                                                    type="number"
                                                    placeholder="Max"
                                                    value={filterQuantity.max}
                                                    onChange={(e) => setFilterQuantity({ ...filterQuantity, max: e.target.value })}
                                                    style={styles.filterInput}
                                                />
                                            </div>
                                        </div>

                                        <div style={styles.filterGroup}>
                                            <label style={styles.filterLabel}>Price</label>
                                            <div style={styles.filterInputGroup}>
                                                <input
                                                    type="number"
                                                    placeholder="Min"
                                                    value={filterPrice.min}
                                                    onChange={(e) => setFilterPrice({ ...filterPrice, min: e.target.value })}
                                                    style={styles.filterInput}
                                                />
                                                <input
                                                    type="number"
                                                    placeholder="Max"
                                                    value={filterPrice.max}
                                                    onChange={(e) => setFilterPrice({ ...filterPrice, max: e.target.value })}
                                                    style={styles.filterInput}
                                                />
                                            </div>
                                        </div>

                                        <div style={styles.filterGroup}>
                                            <label style={styles.filterLabel}>Date Added</label>
                                            <div style={styles.filterDateGroup}>
                                                <input
                                                    type="date"
                                                    value={filterDate.start}
                                                    onChange={(e) => setFilterDate({ ...filterDate, start: e.target.value })}
                                                    style={styles.filterDateInput}
                                                />
                                                <input
                                                    type="date"
                                                    value={filterDate.end}
                                                    onChange={(e) => setFilterDate({ ...filterDate, end: e.target.value })}
                                                    style={styles.filterDateInput}
                                                />
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => {
                                                setFilterCategory('');
                                                setFilterQuantity({ min: '', max: '' });
                                                setFilterPrice({ min: '', max: '' });
                                                setFilterDate({ start: '', end: '' });
                                            }}
                                            style={styles.clearFiltersButton}
                                        >
                                            Clear Filters
                                        </button>
                                    </div>
                                )}
                            </div>
                            <button style={styles.newSkuButton} onClick={() => dispatch(openAddProductModal())}>
                                <AddIcon /> add Product
                            </button>
                        </div>
                    </div>

                    <table style={styles.table}>
                        <thead>
                            <tr>
                                <th style={styles.th}>STOCK ITEM</th>
                                <th style={styles.th}>SKU</th>
                                <th style={styles.th}>UNIT PRICE</th>
                                <th style={styles.th}>CATEGORY</th>
                                <th style={styles.th}>BARCODE</th>
                                <th style={styles.th}>LOW STOCK?</th>
                                <th style={styles.th}>STOCK</th>
                                <th style={styles.th}>RESTOCK</th>
                                <th style={styles.th}>UTILIZE</th>
                                <th style={styles.th}>STOCK ITEMS USED</th>
                                <th style={styles.th}></th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredPosts.map((item) => (
                                <tr key={item._id}>
                                    <td style={styles.td}>
                                        <div style={styles.partCell}>
                                            <div style={styles.partImage}><img style={styles.partImage} src={item.ProductImage} alt=""></img></div>
                                            {item.ProductName}
                                        </div>
                                    </td>
                                    <td style={styles.td}>{item.ProductSKU}</td>
                                    <td style={styles.td}>{item.ProductPrice}</td>
                                    <td style={styles.td}>
                                        <span style={styles.categoryBadge}>{item.ProductCategory}</span>
                                    </td>
                                    <td style={styles.td}>
                                        <div style={styles.barcodeContainer}>
                                            {/* Simple CSS barcode representation */}
                                            <div style={styles.barcodeBars}>
                                                {[...Array(10)].map((_, i) => (
                                                    <div key={i} style={Math.random() > 0.5 ? styles.barcodeLineThick : styles.barcodeLineThin}></div>
                                                ))}
                                            </div>
                                        </div>
                                    </td>
                                    <td style={styles.td}>
                                        {item.ProductQuantity < 10 && <WarningAmberIcon style={styles.warningIcon} />}
                                    </td>
                                    <td style={styles.td}>{item.ProductQuantity} units</td>
                                    <td style={styles.td}>
                                        <button style={styles.addStockButton} onClick={() => handleOpenRestock(item)}>Add Stock</button>
                                    </td>
                                    <td style={styles.td}>
                                        <button style={styles.utilizeStockButton} onClick={() => handleOpenUtilize(item)}>Utilize Stock</button>
                                    </td>
                                    <td style={styles.td}>{item.ProductQuantityUsed || 0}</td>
                                    <td style={styles.td}>
                                        <MoreHorizIcon style={{ ...styles.actionIcon, cursor: 'pointer' }} onClick={() => handleEdit(item._id)} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div >
            {restockItem && (
                <div style={styles.popupOverlay}>
                    <div style={styles.popupContainer}>
                        <h2 style={styles.confirmPopupTitle}>Add Stock</h2>
                        <p style={styles.popupText}>Adding stock for: <strong>{restockItem.ProductName}</strong></p>
                        <form onSubmit={handleSubmitRestock}>
                            <input
                                type="number"
                                placeholder="Enter amount"
                                value={restockAmount}
                                onChange={(e) => setRestockAmount(e.target.value)}
                                style={styles.popupInput}
                                autoFocus
                                required
                                min="1"
                            />
                            <div style={styles.popupActions}>
                                <button type="button" onClick={() => setRestockItem(null)} style={styles.popupCancelButton}>Cancel</button>
                                <button type="submit" style={styles.popupConfirmButton}>Confirm</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {utilizeItem && (
                <div style={styles.popupOverlay}>
                    <div style={styles.popupContainer}>
                        <h2 style={styles.confirmPopupTitle}>Utilize Stock</h2>
                        <p style={styles.popupText}>Utilizing stock for: <strong>{utilizeItem.ProductName}</strong></p>
                        <form onSubmit={handleSubmitUtilize}>
                            <input
                                type="number"
                                placeholder="Enter amount"
                                value={utilizeAmount}
                                onChange={(e) => setUtilizeAmount(e.target.value)}
                                style={styles.popupInput}
                                autoFocus
                                required
                                min="1"
                            />
                            <div style={styles.popupActions}>
                                <button type="button" onClick={() => setUtilizeItem(null)} style={styles.popupCancelButton}>Cancel</button>
                                <button type="submit" style={styles.popupConfirmButtonRed}>Confirm</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div >
    );
};

export default Inventory;
