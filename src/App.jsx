import { BrowserRouter, Link, NavLink, Route, Routes, useParams } from 'react-router-dom'
import './App.css'

const products = [
  {
    id: 'arctic-white',
    name: 'Arctic White',
    price: 35,
    size: '10L',
    finish: 'Matte',
    stock: 'In stock',
    rating: '4.6',
    tag: 'Top Pick',
    colorClass: 'sw1',
    description: 'Bright, premium matte paint made for living rooms and hallways.',
  },
  {
    id: 'coral-clay',
    name: 'Coral Clay',
    price: 22,
    size: '5L',
    finish: 'Satin',
    stock: 'In stock',
    rating: '4.9',
    tag: 'New',
    colorClass: 'sw2',
    description: 'A warm, modern coral tone that adds energy to compact spaces.',
  },
  {
    id: 'coast-blue',
    name: 'Coast Blue',
    price: 39,
    size: '10L',
    finish: 'Weatherproof',
    stock: 'In stock',
    rating: '4.7',
    tag: 'Bestseller',
    colorClass: 'sw4',
    description: 'Durable exterior paint engineered for heat and monsoon climates.',
  },
  {
    id: 'forest-moss',
    name: 'Forest Moss',
    price: 41,
    size: '10L',
    finish: 'Washable',
    stock: 'Low stock',
    rating: '4.5',
    tag: 'Pro Choice',
    colorClass: 'sw3',
    description: 'Deep green with scrubbable protection for family-heavy rooms.',
  },
]

function ProductCard({ product }) {
  return (
    <article className="card">
      <p className="product-badge">{product.tag}</p>
      <div className={`paint-can ${product.colorClass}`} aria-hidden="true"></div>
      <h3>
        {product.name} - {product.size}
      </h3>
      <p>{product.description}</p>
      <p className="meta">
        {product.finish} | {product.size} | {product.stock}
      </p>
      <p className="rating">{`★★★★☆ ${product.rating}`}</p>
      <p className="price">${product.price}</p>
      <div className="card-actions">
        <Link className="btn ghost mini" to={`/shop/${product.id}`}>
          View Details
        </Link>
        <Link className="btn primary mini" to="/cart">
          Add to Cart
        </Link>
      </div>
    </article>
  )
}

function HomePage() {
  const featured = products.slice(0, 3)

  return (
    <>
      <section className="hero-split">
        <div className="hero-copy-wrap panel-rise">
          <p className="kicker">PaintNest Storefront</p>
          <h1>Build your perfect room palette in minutes.</h1>
          <p className="hero-copy">
            Shop curated paints by finish, room type, and project size. Compare products,
            check shipping speed, and order with confidence.
          </p>
          <div className="hero-actions">
            <Link className="btn primary" to="/shop">
              Shop All Paints
            </Link>
            <Link className="btn ghost" to="/support">
              Ask an Expert
            </Link>
          </div>
        </div>

        <div className="hero-paint-card panel-rise" aria-hidden="true">
          <p>Daily Deal</p>
          <h3>Urban Calm Collection</h3>
          <div className="swatch-row">
            <span className="swatch sw1"></span>
            <span className="swatch sw2"></span>
            <span className="swatch sw3"></span>
            <span className="swatch sw4"></span>
          </div>
          <small>4 shades • Matte + Satin combo • Save 15%</small>
        </div>
      </section>

      <section className="paint-band">
        <article>
          <p className="chip-label">Interior</p>
          <h3>Bedroom Serenity Pack</h3>
          <p>Low-odor matte set designed for restful tones and soft lighting.</p>
        </article>
        <article>
          <p className="chip-label">Exterior</p>
          <h3>Weather Shield Bundle</h3>
          <p>UV-stable, anti-fade paints built for balconies and outside walls.</p>
        </article>
        <article>
          <p className="chip-label">Pro Tools</p>
          <h3>Starter Roller Kit</h3>
          <p>Everything needed for prep, trim work, and a clean final coat.</p>
        </article>
      </section>

      <section className="section-head">
        <p className="kicker">Featured Products</p>
        <h2>Best-selling picks from this week.</h2>
      </section>

      <section className="product-grid">
        {featured.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>
    </>
  )
}

function ShopPage() {
  return (
    <>
      <section className="page-intro">
        <p className="kicker">Shop</p>
        <h1>All Paint Products</h1>
        <p>
          Filter by finish and room type to find the exact can for your project.
        </p>
      </section>

      <section className="filters" aria-label="Product categories">
        <button type="button" className="filter active">
          All
        </button>
        <button type="button" className="filter">
          Interior
        </button>
        <button type="button" className="filter">
          Exterior
        </button>
        <button type="button" className="filter">
          Waterproof
        </button>
        <button type="button" className="filter">
          Primer
        </button>
      </section>

      <section className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>
    </>
  )
}

function ProductDetailsPage() {
  const { productId } = useParams()
  const product = products.find((entry) => entry.id === productId)

  if (!product) {
    return (
      <section className="detail-layout">
        <div className="detail-copy">
          <p className="kicker">Product Not Found</p>
          <h1>This item does not exist.</h1>
          <p>The product link may be old. Visit the shop page to browse all paints.</p>
          <Link className="btn primary" to="/shop">
            Back to Shop
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="detail-layout">
      <div className="detail-can-wrap">
        <div className={`detail-can ${product.colorClass}`} aria-hidden="true"></div>
      </div>
      <div className="detail-copy">
        <p className="kicker">Product Details</p>
        <h1>
          {product.name} - {product.size}
        </h1>
        <p>{product.description}</p>
        <p className="meta">
          Finish: {product.finish} | Stock: {product.stock}
        </p>
        <p className="price">${product.price}</p>
        <div className="hero-actions">
          <Link className="btn primary" to="/cart">
            Add to Cart
          </Link>
          <Link className="btn ghost" to="/shop">
            Continue Shopping
          </Link>
        </div>
      </div>
    </section>
  )
}

function CartPage() {
  return (
    <section className="cart-layout">
      <div className="cart-items">
        <h1>Your Cart</h1>
        <article className="cart-item">
          <div>
            <h3>Arctic White - 10L</h3>
            <p>Qty: 1</p>
          </div>
          <strong>$35</strong>
        </article>
        <article className="cart-item">
          <div>
            <h3>Coast Blue - 10L</h3>
            <p>Qty: 1</p>
          </div>
          <strong>$39</strong>
        </article>
      </div>

      <aside className="cart-summary">
        <h2>Order Summary</h2>
        <p>
          Subtotal <span>$74</span>
        </p>
        <p>
          Shipping <span>$8</span>
        </p>
        <p className="cart-total">
          Total <span>$82</span>
        </p>
        <button type="button" className="btn primary checkout-btn">
          Proceed to Checkout
        </button>
      </aside>
    </section>
  )
}

function AboutPage() {
  return (
    <section className="info-grid">
      <article>
        <h2>About PaintNest</h2>
        <p>
          PaintNest is a digital-first paint store helping homeowners pick the right
          shade, finish, and quantity without showroom confusion.
        </p>
      </article>
      <article>
        <h2>Why Customers Choose Us</h2>
        <p>24-hour dispatch, real product photos, shade consistency, and project support.</p>
      </article>
      <article>
        <h2>Service Promise</h2>
        <p>
          If the shade does not match your selected tone card, we replace or refund the order.
        </p>
      </article>
    </section>
  )
}

function SupportPage() {
  return (
    <section className="info-grid">
      <article>
        <h2>Support Center</h2>
        <p>Email: support@paintnest.com</p>
        <p>Phone: +1 (800) 555-2048</p>
      </article>
      <article>
        <h2>Delivery Information</h2>
        <p>Metro cities: 1-2 days. Other areas: 3-5 business days.</p>
      </article>
      <article>
        <h2>Need Shade Advice?</h2>
        <p>Upload your room photo and get a free color recommendation within 24 hours.</p>
      </article>
    </section>
  )
}

function NotFoundPage() {
  return (
    <section className="page-intro">
      <p className="kicker">404</p>
      <h1>Page not found</h1>
      <p>The page you requested does not exist.</p>
      <Link className="btn primary" to="/">
        Return Home
      </Link>
    </section>
  )
}

function AppLayout() {
  return (
    <div className="site-shell">
      <header className="topbar">
        <Link className="brand" to="/">
          <span className="brand-dot" aria-hidden="true"></span>
          PaintNest
        </Link>
        <nav aria-label="Main navigation">
          <NavLink to="/" end>
            Home
          </NavLink>
          <NavLink to="/shop">Shop</NavLink>
          <NavLink to="/cart">Cart</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/support">Support</NavLink>
        </nav>
      </header>

      <main>
        <section className="promo-bar" aria-label="Promotions">
          <p>Free delivery above $60 | Weekend combo: Primer + Paint 15% off</p>
        </section>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/shop/:productId" element={<ProductDetailsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/support" element={<SupportPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <footer>
        <p>PaintNest - Real paint products for real projects.</p>
      </footer>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  )
}

export default App
