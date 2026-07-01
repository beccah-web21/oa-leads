import './App.css'
import { useState } from 'react'

const CATEGORIES = [
  'Select All',
  'Amazon Devices & Accessories',
  'Amazon Renewed',
  'Appliances',
  'Arts, Crafts & Sewing',
  'Automotive',
  'Baby',
  'Beauty & Personal Care',
  'Books',
  'CDs & Vinyl',
  'Camera & Photo Products',
  'Cell Phones & Accessories',
  'Clothing, Shoes & Jewelry',
  'Collectible Coins',
  'Computers & Accessories',
  'Electronics',
  'Grocery & Gourmet Food',
  'Handmade Products',
  'Health & Household',
  'Home & Kitchen',
  'Industrial & Scientific',
  'Kitchen & Dining',
  'Movies & TV',
  'Musical Instruments',
  'Office Products',
  'Patio, Lawn & Garden',
  'Pet Supplies',
  'Software',
  'Sports & Outdoors',
  'Tools & Home Improvement',
  'Toys & Games',
  'Video Games',
]

const PRODUCTS = [
  { id: 1, category: 'Home & Kitchen', asin: 'B08N5KWB9H', name: 'Stainless Steel Kitchen Utensil Set', retailer: 'Walmart', retailerPrice: 12.99, amazonPrice: 27.99, fbaPrice: 29.99, fbmPrice: 26.49, fee: 6.40, profit: 8.60, roi: 66, rating: 4.5, reviews: 1243, bsr: 4521, monthlySales: 1200, leadScore: 8, buybox: true, amazonSeller: true, thirdParty: 3, privateLabel: false, fulfillment: 'FBA', image: null },
  { id: 2, category: 'Toys & Games', asin: 'B09XYZ1234', name: 'Magnetic Building Blocks 100-Piece', retailer: 'Target', retailerPrice: 8.50, amazonPrice: 22.99, fbaPrice: 24.49, fbmPrice: 21.99, fee: 5.20, profit: 9.29, roi: 109, rating: 4.7, reviews: 892, bsr: 2103, monthlySales: 850, leadScore: 9, buybox: true, amazonSeller: false, thirdParty: 2, privateLabel: true, fulfillment: 'FBA', image: null },
  { id: 3, category: 'Sports & Outdoors', asin: 'B07ABC5678', name: 'Adjustable Camping Hammock', retailer: 'Home Depot', retailerPrice: 18.99, amazonPrice: 34.99, fbaPrice: 36.49, fbmPrice: 33.99, fee: 7.80, profit: 8.20, roi: 43, rating: 4.3, reviews: 567, bsr: 8932, monthlySales: 320, leadScore: 5, buybox: false, amazonSeller: true, thirdParty: 5, privateLabel: false, fulfillment: 'FBM', image: null },
  { id: 4, category: 'Beauty & Personal Care', asin: 'B08DEF9012', name: 'Korean Skincare Sheet Mask Pack', retailer: 'CVS', retailerPrice: 5.99, amazonPrice: 14.99, fbaPrice: 16.49, fbmPrice: 14.99, fee: 3.50, profit: 5.50, roi: 92, rating: 4.6, reviews: 2341, bsr: 1245, monthlySales: 2500, leadScore: 7, buybox: true, amazonSeller: false, thirdParty: 1, privateLabel: true, fulfillment: 'FBA', image: null },
  { id: 5, category: 'Pet Supplies', asin: 'B06GHIJ3456', name: 'Orthopedic Dog Bed Large', retailer: 'Chewy', retailerPrice: 22.49, amazonPrice: 44.99, fbaPrice: 46.99, fbmPrice: 43.99, fee: 9.10, profit: 13.40, roi: 60, rating: 4.8, reviews: 4521, bsr: 987, monthlySales: 1800, leadScore: 10, buybox: true, amazonSeller: true, thirdParty: 4, privateLabel: false, fulfillment: 'FBA', image: null },
  { id: 6, category: 'Electronics', asin: 'B05JKL3456', name: 'Wireless Bluetooth Earbuds Pro', retailer: 'Best Buy', retailerPrice: 39.99, amazonPrice: 69.99, fbaPrice: 72.49, fbmPrice: 68.99, fee: 12.50, profit: 17.50, roi: 44, rating: 4.4, reviews: 1567, bsr: 3421, monthlySales: 4500, leadScore: 6, buybox: false, amazonSeller: false, thirdParty: 6, privateLabel: true, fulfillment: 'FBM', image: null },
  { id: 7, category: 'Home & Kitchen', asin: 'B03MNO7890', name: 'Ceramic Non-Stick Frying Pan 10in', retailer: 'Walmart', retailerPrice: 15.99, amazonPrice: 29.99, fbaPrice: 31.49, fbmPrice: 28.99, fee: 6.80, profit: 7.20, roi: 45, rating: 4.2, reviews: 892, bsr: 5678, monthlySales: 980, leadScore: 7, buybox: true, amazonSeller: true, thirdParty: 2, privateLabel: false, fulfillment: 'FBA', image: null },
  { id: 8, category: 'Health & Household', asin: 'B04PQR1234', name: 'Organic Turmeric Supplement 120 Ct', retailer: 'Target', retailerPrice: 9.99, amazonPrice: 19.99, fbaPrice: 21.49, fbmPrice: 19.49, fee: 4.20, profit: 5.80, roi: 58, rating: 4.5, reviews: 1234, bsr: 2345, monthlySales: 3100, leadScore: 8, buybox: true, amazonSeller: false, thirdParty: 3, privateLabel: true, fulfillment: 'FBA', image: null },
  { id: 9, category: 'Baby', asin: 'B02STU5678', name: 'Convertible Baby Stroller Travel System', retailer: 'Walmart', retailerPrice: 11.49, amazonPrice: 24.99, fbaPrice: 26.49, fbmPrice: 24.49, fee: 5.50, profit: 8.00, roi: 70, rating: 4.6, reviews: 678, bsr: 4567, monthlySales: 560, leadScore: 4, buybox: false, amazonSeller: true, thirdParty: 4, privateLabel: false, fulfillment: 'FBM', image: null },
  { id: 10, category: 'Automotive', asin: 'B01VWX9012', name: 'Car Phone Mount Magnetic Holder', retailer: 'AutoZone', retailerPrice: 19.99, amazonPrice: 39.99, fbaPrice: 41.49, fbmPrice: 38.99, fee: 8.30, profit: 11.70, roi: 58, rating: 4.7, reviews: 2345, bsr: 1234, monthlySales: 2200, leadScore: 9, buybox: true, amazonSeller: false, thirdParty: 2, privateLabel: true, fulfillment: 'FBA', image: null },
]

function App() {
  const [showDashboard, setShowDashboard] = useState(false)
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)
  const [filterAmazon, setFilterAmazon] = useState(false)
  const [filterPrivateLabel, setFilterPrivateLabel] = useState(false)
  const [filterFBA, setFilterFBA] = useState(false)
  const [filterFBM, setFilterFBM] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('Select All')
  const [searchTerm, setSearchTerm] = useState('')
  const [bsrMin, setBsrMin] = useState('')
  const [bsrMax, setBsrMax] = useState('')
  const [buyBoxMin, setBuyBoxMin] = useState('')
  const [buyBoxMax, setBuyBoxMax] = useState('')
  const [offersMin, setOffersMin] = useState('')
  const [offersMax, setOffersMax] = useState('')
  const [amazonPriceMin, setAmazonPriceMin] = useState('')
  const [amazonPriceMax, setAmazonPriceMax] = useState('')
  const [profitMin, setProfitMin] = useState('')
  const [profitMax, setProfitMax] = useState('')
  const [roiMin, setRoiMin] = useState('')
  const [roiMax, setRoiMax] = useState('')
  const [monthlySalesMin, setMonthlySalesMin] = useState('')
  const [monthlySalesMax, setMonthlySalesMax] = useState('')
  const [leadScore, setLeadScore] = useState('')
  const [fbaPriceMin, setFbaPriceMin] = useState('')
  const [fbaPriceMax, setFbaPriceMax] = useState('')
  const [fbmPriceMin, setFbmPriceMin] = useState('')
  const [fbmPriceMax, setFbmPriceMax] = useState('')
  const [expandedRow, setExpandedRow] = useState(null)
  const [favorites, setFavorites] = useState([])

  const filteredProducts = PRODUCTS.filter(product => {
    const matchesSearch = product.asin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.retailer.toLowerCase().includes(searchTerm.toLowerCase())

    if (!matchesSearch) return false

    if (selectedCategory !== 'Select All' && product.category !== selectedCategory) return false
    if (filterAmazon && !product.amazonSeller) return false
    if (filterPrivateLabel && !product.privateLabel) return false
    if (filterFBA && product.fulfillment !== 'FBA') return false
    if (filterFBM && product.fulfillment !== 'FBM') return false
    if (bsrMin && product.bsr < parseInt(bsrMin)) return false
    if (bsrMax && product.bsr > parseInt(bsrMax)) return false
    if (buyBoxMin && product.retailerPrice < parseFloat(buyBoxMin)) return false
    if (buyBoxMax && product.retailerPrice > parseFloat(buyBoxMax)) return false
    if (offersMin && product.thirdParty < parseInt(offersMin)) return false
    if (offersMax && product.thirdParty > parseInt(offersMax)) return false
    if (amazonPriceMin && product.amazonPrice < parseFloat(amazonPriceMin)) return false
    if (amazonPriceMax && product.amazonPrice > parseFloat(amazonPriceMax)) return false
    if (profitMin && product.profit < parseFloat(profitMin)) return false
    if (profitMax && product.profit > parseFloat(profitMax)) return false
    if (roiMin && product.roi < parseInt(roiMin)) return false
    if (roiMax && product.roi > parseInt(roiMax)) return false
    if (monthlySalesMin && product.monthlySales < parseInt(monthlySalesMin)) return false
    if (monthlySalesMax && product.monthlySales > parseInt(monthlySalesMax)) return false
    if (leadScore && product.leadScore < parseInt(leadScore)) return false
    if (fbaPriceMin && product.fbaPrice < parseFloat(fbaPriceMin)) return false
    if (fbaPriceMax && product.fbaPrice > parseFloat(fbaPriceMax)) return false
    if (fbmPriceMin && product.fbmPrice < parseFloat(fbmPriceMin)) return false
    if (fbmPriceMax && product.fbmPrice > parseFloat(fbmPriceMax)) return false

    return true
  })

  const toggleExpand = (id) => {
    setExpandedRow(expandedRow === id ? null : id)
  }

  const toggleFavorite = (id) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    )
  }

const exportToCSV = () => {
     const headers = ['Product', 'Supplier', 'Category', 'BSR', 'ASIN', 'Cost / Buy Box Price', 'AZPrice', 'FBA Price', 'FBM Price', 'Amazon Fees', 'Offers', 'Profit', 'ROI', 'Monthly Sales', 'Lead Score', 'Amazon Seller', 'Private Label', 'Fulfillment']
     const rows = filteredProducts.map(p => [
       p.name,
       p.retailer,
       p.category,
       p.bsr,
       p.asin,
       p.retailerPrice.toFixed(2),
       p.amazonPrice.toFixed(2),
       p.fbaPrice.toFixed(2),
       p.fbmPrice.toFixed(2),
       p.fee.toFixed(2),
       p.thirdParty,
       p.profit.toFixed(2),
       `${p.roi}%`,
       p.monthlySales,
       p.leadScore,
       p.amazonSeller ? 'Yes' : 'No',
       p.privateLabel ? 'Yes' : 'No',
       p.fulfillment
     ])

     let csvContent = 'data:text/csv;charset=utf-8,'
     csvContent += headers.join(',') + '\r\n'
     rows.forEach(row => {
       csvContent += row.join(',') + '\r\n'
     })

     const encodedUri = encodeURI(csvContent)
     const link = document.createElement('a')
     link.setAttribute('href', encodedUri)
     link.setAttribute('download', 'sourcelead_products.csv')
     document.body.appendChild(link)
     link.click()
     document.body.removeChild(link)
   }

   if (showDashboard) {
    return (
      <div className="site dashboard-view">
        <nav className="navbar">
          <div className="nav-inner">
            <div className="logo">Arbi<span>Scout</span></div>
            <ul className="nav-links">
              <li><a href="#" onClick={(e) => { e.preventDefault(); setShowDashboard(false) }}>Home</a></li>
              <li><a href="#features">Features</a></li>
              <li><a href="#pricing">Pricing</a></li>
            </ul>
            <a href="#cta" className="btn btn-nav">Start Free Trial</a>
          </div>
        </nav>

        <section className="dashboard-section">
          <div className="container">
            <div className="dashboard-header">
              <div>
                <h1>Product Sourcing Dashboard</h1>
                <p className="dashboard-subtitle">Find profitable products from hundreds of retailers and suppliers</p>
              </div>
              <div className="dashboard-actions">
                <button className="btn btn-primary" onClick={exportToCSV}>Export CSV</button>
              </div>
            </div>

            <div className="filters-bar">
              <div className="filter-group">
                <label className="filter-label">Search</label>
                <input
                  type="text"
                  className="filter-input"
                  placeholder="Search ASIN, Brand, Category, Supplier..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="filter-group">
                <label className="filter-checkbox">
                  <input
                    type="checkbox"
                    checked={filterAmazon}
                    onChange={(e) => setFilterAmazon(e.target.checked)}
                  />
                  <span>Amazon</span>
                </label>
              </div>
              <div className="filter-group">
                <label className="filter-checkbox">
                  <input
                    type="checkbox"
                    checked={filterPrivateLabel}
                    onChange={(e) => setFilterPrivateLabel(e.target.checked)}
                  />
                  <span>Private Label</span>
                </label>
              </div>
              <div className="filter-group">
                <label className="filter-checkbox">
                  <input
                    type="checkbox"
                    checked={filterFBA}
                    onChange={(e) => setFilterFBA(e.target.checked)}
                  />
                  <span>FBA</span>
                </label>
              </div>
              <div className="filter-group">
                <label className="filter-checkbox">
                  <input
                    type="checkbox"
                    checked={filterFBM}
                    onChange={(e) => setFilterFBM(e.target.checked)}
                  />
                  <span>FBM</span>
                </label>
              </div>
              <div className="filter-group">
                <button className="btn-more-filters" onClick={() => setShowAdvancedFilters(true)}>
                  More Filters
                </button>
              </div>
              <div className="filter-group">
                <span className="results-count">{filteredProducts.length} results</span>
              </div>
              <div className="filter-group-icons">
                <button className="btn-icon" title="Saved Leads">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                  </svg>
                </button>
                <button className="btn-icon" title="History">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                </button>
              </div>
            </div>

            <div className={`filters-drawer ${showAdvancedFilters ? 'open' : ''}`}>
              <div className="filters-drawer-backdrop" onClick={() => setShowAdvancedFilters(false)}></div>
              <div className="filters-drawer-panel">
                <div className="filters-drawer-header">
                  <h3>Advanced Filters</h3>
                  <button className="btn-drawer-close" onClick={() => setShowAdvancedFilters(false)}>✕</button>
                </div>
                <div className="filters-drawer-content">
                  <div className="filter-group-vertical">
                    <label className="filter-label">Category</label>
                    <select
                      className="filter-input"
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                      <option value="Select All">Select All</option>
                      {CATEGORIES.filter(cat => cat !== 'Select All').map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  <div className="filter-group-vertical">
                    <label className="filter-label">Best Sellers Rank</label>
                    <div className="filter-range">
                      <input
                        type="number"
                        className="filter-input filter-range-input"
                        placeholder="Min (#)"
                        value={bsrMin}
                        onChange={(e) => setBsrMin(e.target.value)}
                      />
                      <input
                        type="number"
                        className="filter-input filter-range-input"
                        placeholder="Max (#)"
                        value={bsrMax}
                        onChange={(e) => setBsrMax(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="filter-group-vertical">
                    <label className="filter-label">Amazon Price</label>
                    <div className="filter-range">
                      <input
                        type="number"
                        step="0.01"
                        className="filter-input filter-range-input"
                        placeholder="Min ($)"
                        value={amazonPriceMin}
                        onChange={(e) => setAmazonPriceMin(e.target.value)}
                      />
                      <input
                        type="number"
                        step="0.01"
                        className="filter-input filter-range-input"
                        placeholder="Max ($)"
                        value={amazonPriceMax}
                        onChange={(e) => setAmazonPriceMax(e.target.value)}
                      />
                    </div>
                  </div>
                   <div className="filter-group-vertical">
                     <label className="filter-label">Buy Box Price</label>
                     <div className="filter-range">
                       <input
                         type="number"
                         step="0.01"
                         className="filter-input filter-range-input"
                         placeholder="Min ($)"
                         value={buyBoxMin}
                         onChange={(e) => setBuyBoxMin(e.target.value)}
                       />
                       <input
                         type="number"
                         step="0.01"
                         className="filter-input filter-range-input"
                         placeholder="Max ($)"
                         value={buyBoxMax}
                         onChange={(e) => setBuyBoxMax(e.target.value)}
                       />
                     </div>
                   </div>
                   <div className="filter-group-vertical">
                     <label className="filter-label">FBA Price</label>
                     <div className="filter-range">
                       <input
                         type="number"
                         step="0.01"
                         className="filter-input filter-range-input"
                         placeholder="Min ($)"
                         value={fbaPriceMin}
                         onChange={(e) => setFbaPriceMin(e.target.value)}
                       />
                       <input
                         type="number"
                         step="0.01"
                         className="filter-input filter-range-input"
                         placeholder="Max ($)"
                         value={fbaPriceMax}
                         onChange={(e) => setFbaPriceMax(e.target.value)}
                       />
                     </div>
                   </div>
                   <div className="filter-group-vertical">
                     <label className="filter-label">FBM Price</label>
                     <div className="filter-range">
                       <input
                         type="number"
                         step="0.01"
                         className="filter-input filter-range-input"
                         placeholder="Min ($)"
                         value={fbmPriceMin}
                         onChange={(e) => setFbmPriceMin(e.target.value)}
                       />
                       <input
                         type="number"
                         step="0.01"
                         className="filter-input filter-range-input"
                         placeholder="Max ($)"
                         value={fbmPriceMax}
                         onChange={(e) => setFbmPriceMax(e.target.value)}
                       />
                     </div>
                   </div>
                   <div className="filter-group-vertical">
                     <label className="filter-label">Profit ($)</label>
                    <div className="filter-range">
                      <input
                        type="number"
                        step="0.01"
                        className="filter-input filter-range-input"
                        placeholder="Min"
                        value={profitMin}
                        onChange={(e) => setProfitMin(e.target.value)}
                      />
                      <input
                        type="number"
                        step="0.01"
                        className="filter-input filter-range-input"
                        placeholder="Max"
                        value={profitMax}
                        onChange={(e) => setProfitMax(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="filter-group-vertical">
                    <label className="filter-label">ROI (%)</label>
                    <div className="filter-range">
                      <input
                        type="number"
                        step="1"
                        className="filter-input filter-range-input"
                        placeholder="Min"
                        value={roiMin}
                        onChange={(e) => setRoiMin(e.target.value)}
                      />
                      <input
                        type="number"
                        step="1"
                        className="filter-input filter-range-input"
                        placeholder="Max"
                        value={roiMax}
                        onChange={(e) => setRoiMax(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="filter-group-vertical">
                    <label className="filter-label">Monthly Sales</label>
                    <div className="filter-range">
                      <input
                        type="number"
                        step="1"
                        className="filter-input filter-range-input"
                        placeholder="Min"
                        value={monthlySalesMin}
                        onChange={(e) => setMonthlySalesMin(e.target.value)}
                      />
                      <input
                        type="number"
                        step="1"
                        className="filter-input filter-range-input"
                        placeholder="Max"
                        value={monthlySalesMax}
                        onChange={(e) => setMonthlySalesMax(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="filter-group-vertical">
                    <label className="filter-label">Offer Count</label>
                    <div className="filter-range">
                      <input
                        type="number"
                        className="filter-input filter-range-input"
                        placeholder="Min"
                        value={offersMin}
                        onChange={(e) => setOffersMin(e.target.value)}
                      />
                      <input
                        type="number"
                        className="filter-input filter-range-input"
                        placeholder="Max"
                        value={offersMax}
                        onChange={(e) => setOffersMax(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="filter-group-vertical">
                    <label className="filter-label">Lead Score: {leadScore ? `${leadScore}+` : 'Any'}</label>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={leadScore || 1}
                      onChange={(e) => setLeadScore(e.target.value)}
                      className="lead-score-slider"
                    />
                    <div className="slider-track">
                      <span>1</span>
                      <span>10</span>
                    </div>
                  </div>
                  <div className="filter-drawer-actions">
                    <button className="btn btn-secondary" onClick={() => {
                      setBsrMin('')
                      setBsrMax('')
                      setBuyBoxMin('')
                      setBuyBoxMax('')
                      setOffersMin('')
                      setOffersMax('')
                      setAmazonPriceMin('')
                      setAmazonPriceMax('')
setProfitMin('')
                       setProfitMax('')
                       setRoiMin('')
                       setRoiMax('')
                       setMonthlySalesMin('')
                       setMonthlySalesMax('')
                       setLeadScore('')
                       setFbaPriceMin('')
                      setFbaPriceMax('')
                      setFbmPriceMin('')
                      setFbmPriceMax('')
                      setSelectedCategory('Select All')
                    }}>Clear</button>
                    <button className="btn btn-primary" onClick={() => setShowAdvancedFilters(false)}>Apply</button>
                  </div>
                </div>
              </div>
            </div>

            <div className="products-grid">
              {filteredProducts.map(product => (
                <div key={product.id} className="product-card">
                  <div className="product-card-badges">
                    <span className="badge badge-success">{product.monthlySales.toLocaleString()} sales</span>
                    <span className="badge">{product.thirdParty} offers</span>
                    <span className="badge">{product.fulfillment}</span>
                  </div>
                  <div className="product-card-content">
                    <div className="product-images">
                      <div className="product-image-wrapper">
                        <a href={`https://www.amazon.com/dp/${product.asin}`} target="_blank" rel="noopener noreferrer" className="product-image-label">Amazon</a>
                        <div className="product-image-circle">
                          <img src={product.image || `https://placehold.co/80x80/e2e8f0/cbd5e1?text=${encodeURIComponent('Amazon')}`} alt={product.name} />
                        </div>
                      </div>
                      <div className="product-image-wrapper">
                        <a href={`https://${product.retailer.toLowerCase().replace(/ /g, '')}.com`} target="_blank" rel="noopener noreferrer" className="product-image-label">
                          {product.retailer}
                        </a>
                        <div className="product-image-circle">
                          <img src={product.image || `https://placehold.co/80x80/e2e8f0/cbd5e1?text=${encodeURIComponent(product.retailer)}`} alt={product.retailer} />
                        </div>
                      </div>
                    </div>
                    <div className="product-card-details">
                      <h3 className="product-card-title">
                        <a href={`https://www.amazon.com/dp/${product.asin}`} target="_blank" rel="noopener noreferrer">{product.name}</a>
                      </h3>
                      <div className="product-card-meta">
                        <span className="meta-item">{product.category}</span>
                        <span className="meta-separator">•</span>
                        <span className="meta-item">ASIN: {product.asin}</span>
                        <span className="meta-separator">•</span>
                        <span className="meta-item">⭐ {product.rating} ({product.reviews})</span>
                      </div>
                      <div className="product-card-price">${product.amazonPrice.toFixed(2)}</div>
                      <div className="product-card-kpis">
                        <div className="kpi-card">
                          <div className="kpi-value positive">${product.profit.toFixed(2)}</div>
                          <div className="kpi-label">Profit</div>
                        </div>
                        <div className="kpi-card">
                          <div className="kpi-value">{product.roi}%</div>
                          <div className="kpi-label">ROI</div>
                        </div>
                        <div className="kpi-card">
                          <div className="kpi-value">#{product.bsr.toLocaleString()}</div>
                          <div className="kpi-label">BSR</div>
                        </div>
                        <div className="kpi-card">
                          <div className="kpi-value positive">${product.retailerPrice.toFixed(2)}</div>
                          <div className="kpi-label">Buy Box</div>
                        </div>
                      </div>
                    </div>
                    <div className="product-card-chart">
                      <div className="mini-chart">
                        <div className="chart-bar" style={{height: '60%'}}></div>
                        <div className="chart-bar" style={{height: '80%'}}></div>
                        <div className="chart-bar" style={{height: '40%'}}></div>
                        <div className="chart-bar" style={{height: '90%'}}></div>
                        <div className="chart-bar" style={{height: '70%'}}></div>
                      </div>
                      <div className="smart-alerts">
                        <span className="alert-badge">High Demand</span>
                        <span className="alert-badge">Low Competition</span>
                      </div>
                    </div>
                  </div>
                  <div className="product-card-actions">
                    <button className="btn btn-secondary" onClick={() => toggleExpand(product.id)}>
                      View Details
                    </button>
                    <button 
                      className={`btn-icon ${favorites.includes(product.id) ? 'favorited' : ''}`}
                      onClick={() => toggleFavorite(product.id)}
                      title={favorites.includes(product.id) ? 'Remove from favorites' : 'Add to favorites'}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
              {filteredProducts.length === 0 && (
                <div className="no-results">No products match your filters. Try adjusting your criteria.</div>
              )}
            </div>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="site">
      <nav className="navbar">
        <div className="nav-inner">
          <div className="logo">Arbi<span>Scout</span></div>
          <ul className="nav-links">
            <li><a href="#features">Features</a></li>
            <li><a href="#how-it-works">How It Works</a></li>
            <li><a href="#pricing">Pricing</a></li>
            <li><a href="#faq">FAQ</a></li>
            <li><a href="#" onClick={(e) => { e.preventDefault(); setShowDashboard(true) }} className="nav-active">Find leads</a></li>
          </ul>
          <a href="#cta" className="btn btn-nav">Start Free Trial</a>
        </div>
      </nav>

<section className="hero">
        <div className="hero-inner">
          <div className="hero-badge">Automated Product Sourcing for Amazon</div>
          <h1>Find profitable products <span className="accent">instantly</span></h1>
          <p>Our AI algorithm scans hundreds of retailers, distributors, and wholesale suppliers to identify profitable items to resell on Amazon. Stop wasting hours on manual research.</p>
          <div className="hero-actions">
            <a href="#cta" className="btn btn-primary">Start Free Trial</a>
            <a href="#how-it-works" className="btn btn-secondary">See How It Works</a>
          </div>
<div className="hero-stats">
            <div className="stat">
              <div className="stat-number">500K+</div>
              <div className="stat-label">Products Scanned</div>
            </div>
            <div className="stat">
              <div className="stat-number">200+</div>
              <div className="stat-label">Suppliers</div>
            </div>
            <div className="stat">
              <div className="stat-number">2,000+</div>
              <div className="stat-label">Active Sellers</div>
            </div>
          </div>
        </div>
      </section>

      <section id="cta" className="section cta-section">
        <div className="container">
          <h2>Ready to automate your sourcing?</h2>
          <p>Join thousands of sellers who save time and increase profits with ArbiScout. Start your free 7-day trial today.</p>
          <a href="#" className="btn btn-primary btn-large">Start Free Trial</a>
          <p className="cta-note">No credit card required. Cancel anytime.</p>
        </div>
      </section>

      <section id="faq" className="section">
        <div className="container">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-list">
            <details className="faq-item">
              <summary>What is the difference between ArbiScout and a lead list?</summary>
              <p>Lead lists are manually curated and quickly become saturated. ArbiScout uses an AI algorithm that scans hundreds of suppliers in real time, delivering fresh, profitable products continuously — not a static PDF.</p>
            </details>
            <details className="faq-item">
              <summary>Do I need to be an experienced Amazon seller?</summary>
              <p>No. ArbiScout is designed for both beginners and experienced sellers. We provide tutorials, webinars, and a supportive community to help you succeed.</p>
            </details>
            <details className="faq-item">
              <summary>How does the free trial work?</summary>
              <p>Sign up and get full access to all features for 7 days. No credit card required. After the trial, choose a plan that fits your business.</p>
            </details>
            <details className="faq-item">
              <summary>Which suppliers do you scan?</summary>
              <p>We scan hundreds of retailers including Walmart, Target, Home Depot, Lowe's, Costco, and major distributors and wholesalers. We're constantly adding new suppliers.</p>
            </details>
            <details className="faq-item">
              <summary>Can I hide products from other users?</summary>
              <p>Yes. Our exclusive hide filter lets you hide products from other ArbiScout users, giving you a competitive edge on the sourcing leads.</p>
            </details>
            <details className="faq-item">
              <summary>What if I don't see profit within the trial?</summary>
              <p>We offer a 30-day money-back guarantee. If ArbiScout doesn't pay for itself, we'll refund your first payment. No questions asked.</p>
            </details>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <div className="footer-inner">
            <div className="footer-brand">
              <div className="logo">Arbi<span>Scout</span></div>
              <p>Automated product sourcing for Amazon FBA and arbitrage sellers.</p>
            </div>
            <div className="footer-links">
              <div className="footer-col">
                <h4>Product</h4>
                <a href="#features">Features</a>
                <a href="#pricing">Pricing</a>
                <a href="#how-it-works">How It Works</a>
              </div>
              <div className="footer-col">
                <h4>Support</h4>
                <a href="#faq">FAQ</a>
                <a href="mailto:support@arbiscout.com">Contact</a>
                <a href="#">Community</a>
              </div>
              <div className="footer-col">
                <h4>Legal</h4>
                <a href="#">Terms of Service</a>
                <a href="#">Privacy Policy</a>
                <a href="#">Affiliate Program</a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2026 ArbiScout. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
