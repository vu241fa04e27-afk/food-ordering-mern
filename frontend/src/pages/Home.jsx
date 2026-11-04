import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import api from '../services/api';
import confetti from 'canvas-confetti';
import { 
  ArrowRight, Sparkles, Clock, ShieldCheck, Flame, 
  ShoppingBag, ChevronRight, CheckCircle2, Star, 
  Percent, Heart, Award, Zap
} from 'lucide-react';

const CATEGORIES_DATA = [
  { name: 'Pizza', emoji: '🍕', desc: 'Cheesy & Woodfired', color: '#ff4713', bg: '#fff0eb' },
  { name: 'Burgers', emoji: '🍔', desc: 'Double Smash Patty', color: '#ea580c', bg: '#fff4eb' },
  { name: 'Biryani', emoji: '🍚', desc: 'Royal Aromatic Dum', color: '#d97706', bg: '#fef3c7' },
  { name: 'Indian Food', emoji: '🍛', desc: 'Rich Butter Curries', color: '#dc2626', bg: '#fee2e2' },
  { name: 'Chinese Food', emoji: '🥢', desc: 'Wok Sizzling Noodles', color: '#c026d3', bg: '#fae8ff' },
  { name: 'Sandwiches', emoji: '🥪', desc: 'Grilled Crispy Toast', color: '#059669', bg: '#d1fae5' },
  { name: 'Desserts', emoji: '🍰', desc: 'Fudgy Sweet Treats', color: '#db2777', bg: '#fce7f3' },
  { name: 'Beverages', emoji: '🍹', desc: 'Chilled Milkshakes', color: '#2563eb', bg: '#dbeafe' }
];

function Home() {
  const { user } = useContext(AuthContext);
  const { addToCart } = useContext(CartContext);
  const [featuredFoods, setFeaturedFoods] = useState([]);
  const [addedPopup, setAddedPopup] = useState(null);

  useEffect(() => {
    const fetchTopFoods = async () => {
      try {
        const res = await api.get('/foods');
        setFeaturedFoods(res.data.slice(0, 4));
      } catch (err) {
        console.error(err);
      }
    };
    fetchTopFoods();
  }, []);

  const handleQuickAdd = (food, e) => {
    addToCart(food);
    // Trigger celebratory mini-confetti burst
    const rect = e.currentTarget.getBoundingClientRect();
    confetti({
      particleCount: 25,
      spread: 60,
      origin: {
        x: (rect.left + rect.width / 2) / window.innerWidth,
        y: (rect.top + rect.height / 2) / window.innerHeight
      },
      colors: ['#ff4713', '#f59e0b', '#10b981']
    });

    setAddedPopup(food.name);
    setTimeout(() => setAddedPopup(null), 2200);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <NavBar />

      {/* Floating Success Toast notification */}
      {addedPopup && (
        <div style={{
          position: 'fixed',
          bottom: '30px',
          right: '30px',
          zIndex: 9999,
          background: 'linear-gradient(135deg, #181c24 0%, #29303d 100%)',
          color: '#fff',
          padding: '1rem 1.6rem',
          borderRadius: 'var(--radius-pill)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.8rem',
          boxShadow: '0 20px 40px rgba(0,0,0,0.25)',
          animation: 'fadeInUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
        }}>
          <CheckCircle2 color="#22c55e" size={20} />
          <span style={{ fontWeight: 700, fontSize: '0.94rem' }}>Added "{addedPopup}" to your feast!</span>
        </div>
      )}

      {/* Hero Section */}
      <section style={{
        position: 'relative',
        padding: '3.5rem 2rem 5.5rem',
        maxWidth: '1280px',
        margin: '0 auto',
        width: '100%',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
        alignItems: 'center',
        gap: '4rem'
      }}>
        {/* Animated background ambient glow spheres */}
        <div style={{
          position: 'absolute',
          top: '5%',
          left: '10%',
          width: '380px',
          height: '380px',
          background: 'rgba(255, 71, 19, 0.16)',
          borderRadius: '50%',
          filter: 'blur(100px)',
          zIndex: -1
        }} />
        <div style={{
          position: 'absolute',
          top: '35%',
          right: '2%',
          width: '420px',
          height: '420px',
          background: 'rgba(245, 158, 11, 0.14)',
          borderRadius: '50%',
          filter: 'blur(110px)',
          zIndex: -1
        }} />

        {/* Floating food icons for culinary atmosphere */}
        <div className="floating-food-icon anim-float" style={{ top: '10%', right: '48%', fontSize: '2.4rem' }}>🍕</div>
        <div className="floating-food-icon anim-float-rev" style={{ top: '65%', left: '2%', fontSize: '2.6rem' }}>🍔</div>
        <div className="floating-food-icon anim-float" style={{ bottom: '10%', right: '4%', fontSize: '2.2rem' }}>🍚</div>

        {/* Hero Left Content */}
        <div>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.6rem',
            background: 'var(--primary-light)',
            color: 'var(--primary)',
            padding: '0.5rem 1.15rem',
            borderRadius: 'var(--radius-pill)',
            fontSize: '0.88rem',
            fontWeight: 800,
            marginBottom: '1.5rem',
            border: '1px solid rgba(255, 71, 19, 0.2)'
          }}>
            <Sparkles size={16} /> <span>PREMIUM MASTER CHEF SELECTIONS</span>
          </div>

          <h1 style={{
            fontSize: 'clamp(2.7rem, 5.5vw, 4.4rem)',
            fontWeight: 900,
            lineHeight: 1.1,
            marginBottom: '1.5rem',
            color: 'var(--text-primary)'
          }}>
            Delicious Food <br />
            Delivered At <br />
            <span style={{
              background: 'var(--primary-gradient)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              display: 'inline-block'
            }}>
              Lightning Speed.
            </span>
          </h1>

          <p style={{
            fontSize: '1.15rem',
            color: 'var(--text-muted)',
            lineHeight: 1.65,
            marginBottom: '2.4rem',
            maxWidth: '520px'
          }}>
            Indulge in royal biryanis, authentic cheesy wood-fired pizzas, gourmet grilled burgers, and decadent chocolate treats. Cooked fresh, packed hot.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.2rem', alignItems: 'center' }}>
            <Link to="/menu" className="btn-pro-primary" style={{ padding: '1rem 2.4rem', fontSize: '1.08rem' }}>
              <span>Order Food Now</span>
              <ArrowRight size={20} />
            </Link>
            <Link to="/about" className="btn-pro-secondary" style={{ padding: '1rem 2rem', fontSize: '1.05rem' }}>
              <span>Explore Story</span>
            </Link>
          </div>

          {/* Trust Metrics Pill */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '2.5rem',
            marginTop: '3rem',
            paddingTop: '2.2rem',
            borderTop: '1px solid rgba(0,0,0,0.06)'
          }}>
            <div>
              <h3 style={{ fontSize: '1.9rem', fontWeight: 900, color: 'var(--text-primary)' }}>1,200+</h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', fontWeight: 600 }}>Happy Foodies Daily</p>
            </div>
            <div style={{ width: '1px', height: '40px', background: 'rgba(0,0,0,0.08)' }} />
            <div>
              <h3 style={{ fontSize: '1.9rem', fontWeight: 900, color: '#f59e0b' }}>4.92 ★</h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', fontWeight: 600 }}>Over 10k Reviews</p>
            </div>
            <div style={{ width: '1px', height: '40px', background: 'rgba(0,0,0,0.08)' }} />
            <div>
              <h3 style={{ fontSize: '1.9rem', fontWeight: 900, color: '#10b981' }}>25 Min</h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', fontWeight: 600 }}>Avg Doorstep Time</p>
            </div>
          </div>
        </div>

        {/* Hero Right Interactive Composition Card */}
        <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
          <div className="anim-float" style={{
            position: 'relative',
            width: '100%',
            maxWidth: '480px',
            borderRadius: '36px',
            overflow: 'hidden',
            boxShadow: '0 30px 70px -15px rgba(255, 71, 19, 0.35)',
            border: '6px solid #fff'
          }}>
            <img 
              src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800" 
              alt="Gourmet Restaurant Spread"
              style={{ width: '100%', height: '500px', objectFit: 'cover', display: 'block' }}
            />
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              background: 'linear-gradient(to top, rgba(15, 18, 24, 0.95) 0%, rgba(15, 18, 24, 0.6) 60%, transparent 100%)',
              padding: '2.5rem 2rem 1.8rem',
              color: '#fff'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                <span style={{
                  background: 'var(--primary-gradient)',
                  padding: '0.3rem 0.85rem',
                  borderRadius: 'var(--radius-pill)',
                  fontSize: '0.78rem',
                  fontWeight: 800,
                  textTransform: 'uppercase'
                }}>Daily Special</span>
                <span style={{ fontSize: '0.8rem', color: '#fcd34d', fontWeight: 700 }}>🔥 40% OFF CODE: FEAST</span>
              </div>
              <h3 style={{ color: '#fff', fontSize: '1.6rem', fontWeight: 900 }}>Gourmet Sizzling Plate</h3>
              <p style={{ color: '#d1d5db', fontSize: '0.92rem', marginTop: '0.3rem' }}>
                Loaded with fresh farm veggies, slow roasted spices & artisan dips.
              </p>
            </div>
          </div>

          {/* Floating Live Tracking Badge */}
          <div className="anim-float-rev" style={{
            position: 'absolute',
            top: '12%',
            left: '-24px',
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(16px)',
            padding: '1rem 1.4rem',
            borderRadius: '24px',
            boxShadow: '0 20px 45px rgba(0,0,0,0.12)',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            border: '1.5px solid rgba(255, 255, 255, 0.9)',
            zIndex: 10
          }}>
            <div style={{
              background: '#22c55e',
              color: '#fff',
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 18px rgba(34, 197, 94, 0.35)'
            }}>
              <Zap size={22} />
            </div>
            <div>
              <p style={{ fontWeight: 800, fontSize: '0.94rem', margin: 0, color: 'var(--text-primary)' }}>
                Rider Assigned 🛵
              </p>
              <p style={{ fontSize: '0.8rem', color: '#16a34a', margin: 0, fontWeight: 700 }}>
                Arriving in 14 mins
              </p>
            </div>
          </div>

          {/* Floating Rating Pill */}
          <div style={{
            position: 'absolute',
            bottom: '10%',
            right: '-20px',
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(16px)',
            padding: '0.8rem 1.3rem',
            borderRadius: '20px',
            boxShadow: '0 16px 40px rgba(0,0,0,0.12)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            border: '1.5px solid rgba(255, 255, 255, 0.9)',
            zIndex: 10
          }}>
            <Star size={20} fill="#f59e0b" color="#f59e0b" />
            <span style={{ fontWeight: 900, fontSize: '1rem', color: 'var(--text-primary)' }}>4.9</span>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>(500+ reviews)</span>
          </div>
        </div>
      </section>

      {/* Interactive Categories Cards Ribbon */}
      <section style={{
        padding: '3.5rem 2rem 4.5rem',
        maxWidth: '1280px',
        margin: '0 auto',
        width: '100%'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          marginBottom: '2.5rem'
        }}>
          <div>
            <span style={{
              color: 'var(--primary)',
              fontWeight: 800,
              fontSize: '0.88rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase'
            }}>EXPLORE BY FLAVOR</span>
            <h2 style={{ fontSize: '2.3rem', fontWeight: 900, marginTop: '0.3rem' }}>
              Popular Food Categories
            </h2>
          </div>
          <Link to="/menu" style={{
            color: 'var(--primary)',
            fontWeight: 800,
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            fontSize: '1rem'
          }}>
            View Full Menu <ChevronRight size={19} />
          </Link>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: '1.4rem'
        }}>
          {CATEGORIES_DATA.map((cat) => (
            <Link
              key={cat.name}
              to={`/menu?category=${encodeURIComponent(cat.name)}`}
              className="pro-glass"
              style={{
                padding: '1.8rem 1rem 1.4rem',
                textAlign: 'center',
                borderRadius: '24px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                transition: 'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px) scale(1.04)';
                e.currentTarget.style.borderColor = cat.color;
                e.currentTarget.style.boxShadow = `0 20px 40px -10px ${cat.color}35`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.borderColor = 'var(--glass-border)';
                e.currentTarget.style.boxShadow = 'var(--glass-shadow)';
              }}
            >
              <div style={{
                width: '68px',
                height: '68px',
                borderRadius: '22px',
                background: cat.bg,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2.4rem',
                marginBottom: '1rem',
                boxShadow: `0 8px 18px ${cat.color}25`
              }}>
                {cat.emoji}
              </div>
              <h4 style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--text-primary)' }}>
                {cat.name}
              </h4>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                {cat.desc}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Trending Dishes Showcase with Quick-Add Animation */}
      <section style={{
        padding: '3rem 2rem 6rem',
        maxWidth: '1280px',
        margin: '0 auto',
        width: '100%'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          marginBottom: '2.5rem'
        }}>
          <div>
            <span style={{
              color: 'var(--primary)',
              fontWeight: 800,
              fontSize: '0.88rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase'
            }}>TOP RATED FOODS</span>
            <h2 style={{ fontSize: '2.3rem', fontWeight: 900, marginTop: '0.3rem' }}>
              Trending Dishes Today
            </h2>
          </div>
          <Link to="/menu" className="btn-pro-secondary" style={{ padding: '0.7rem 1.6rem' }}>
            <span>Browse All {featuredFoods.length > 0 ? '22+' : ''} Dishes</span>
            <ArrowRight size={17} />
          </Link>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2.2rem'
        }}>
          {featuredFoods.map((food) => (
            <div key={food._id} className="food-card-pro">
              {/* Image Container with Floating Badges */}
              <div style={{ position: 'relative', height: '210px', overflow: 'hidden' }}>
                <img
                  src={food.image}
                  alt={food.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                />
                <span style={{
                  position: 'absolute',
                  top: '14px',
                  left: '14px',
                  background: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(8px)',
                  padding: '0.35rem 0.85rem',
                  borderRadius: 'var(--radius-pill)',
                  fontSize: '0.8rem',
                  fontWeight: 800,
                  color: 'var(--primary)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
                }}>
                  {food.category}
                </span>

                <span style={{
                  position: 'absolute',
                  bottom: '14px',
                  right: '14px',
                  background: 'rgba(15, 18, 24, 0.85)',
                  color: '#fff',
                  backdropFilter: 'blur(8px)',
                  padding: '0.35rem 0.95rem',
                  borderRadius: 'var(--radius-pill)',
                  fontSize: '1rem',
                  fontWeight: 900
                }}>
                  ₹{food.price}
                </span>
              </div>

              {/* Card Body */}
              <div style={{ padding: '1.6rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.45rem' }}>
                  {food.name}
                </h3>
                <p style={{
                  fontSize: '0.9rem',
                  color: 'var(--text-muted)',
                  lineHeight: 1.55,
                  marginBottom: '1.6rem',
                  flexGrow: 1
                }}>
                  {food.description}
                </p>

                {/* Actions */}
                <div style={{ display: 'flex', gap: '0.8rem' }}>
                  <button
                    onClick={(e) => handleQuickAdd(food, e)}
                    className="btn-pro-primary"
                    style={{ flex: 1, padding: '0.75rem 1.2rem', fontSize: '0.92rem' }}
                  >
                    <ShoppingBag size={17} /> Add to Cart
                  </button>
                  <Link
                    to={`/menu/${food._id}`}
                    style={{
                      background: 'rgba(0,0,0,0.05)',
                      padding: '0.75rem 1.1rem',
                      borderRadius: 'var(--radius-pill)',
                      fontWeight: 700,
                      fontSize: '0.88rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--text-primary)'
                    }}
                    title="View details"
                  >
                    Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pro Max Service Highlights */}
      <section style={{
        background: 'linear-gradient(180deg, rgba(255,255,255,0.7) 0%, rgba(255,245,238,0.95) 100%)',
        padding: '5.5rem 2rem',
        borderTop: '1px solid rgba(0,0,0,0.05)',
        borderBottom: '1px solid rgba(0,0,0,0.05)'
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', textAlign: 'center' }}>
          <span style={{
            color: 'var(--primary)',
            fontWeight: 800,
            fontSize: '0.88rem',
            letterSpacing: '0.08em',
            textTransform: 'uppercase'
          }}>THE FOODHUB PROMISE</span>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 900, margin: '0.4rem 0 3.5rem' }}>
            Why Thousands of Foodies Choose Us
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2.2rem'
          }}>
            {[
              { icon: <Clock size={36} color="#ff4713" />, title: 'Lightning Fast 25-Min Delivery', desc: 'Predictive routing and kitchen dispatch ensure your dishes arrive hot and fresh.' },
              { icon: <Flame size={36} color="#ff4713" />, title: 'Master Chef Recipes', desc: '100% authentic spice blends, artisanal cheeses and organic fresh vegetables.' },
              { icon: <ShieldCheck size={36} color="#ff4713" />, title: 'Zero Risk Cash on Delivery', desc: 'Verify your order right at your doorstep before handing over cash or paying via UPI.' },
            ].map((f, i) => (
              <div key={i} className="pro-glass" style={{ padding: '2.8rem 2.2rem', textAlign: 'left', borderRadius: '28px' }}>
                <div style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '20px',
                  background: 'var(--primary-light)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.6rem',
                  boxShadow: '0 8px 20px var(--primary-glow)'
                }}>
                  {f.icon}
                </div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '0.8rem' }}>{f.title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.65 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        background: 'var(--dark)',
        color: '#9ca3af',
        padding: '4.5rem 2rem 2.5rem',
        marginTop: 'auto'
      }}>
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '3rem',
          marginBottom: '3.5rem'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1.2rem' }}>
              <div style={{
                width: '40px',
                height: '40px',
                background: 'var(--primary-gradient)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff'
              }}>
                <Flame size={22} />
              </div>
              <span style={{ fontSize: '1.5rem', fontWeight: 900, color: '#fff' }}>FoodHub PRO</span>
            </div>
            <p style={{ fontSize: '0.92rem', lineHeight: 1.65 }}>
              Crafted with culinary passion. Every bite tells a story of authentic spices, premium ingredients, and lightning-fast doorstep service.
            </p>
          </div>

          <div>
            <h4 style={{ color: '#fff', marginBottom: '1.2rem', fontSize: '1.05rem', fontWeight: 800 }}>Explore Flavors</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.7rem', fontSize: '0.92rem' }}>
              <li><Link to="/menu?category=Pizza">Woodfired Pizzas</Link></li>
              <li><Link to="/menu?category=Biryani">Royal Dum Biryani</Link></li>
              <li><Link to="/menu?category=Burgers">Juicy Burgers</Link></li>
              <li><Link to="/menu?category=Desserts">Decadent Desserts</Link></li>
            </ul>
          </div>

          <div>
            <h4 style={{ color: '#fff', marginBottom: '1.2rem', fontSize: '1.05rem', fontWeight: 800 }}>Account & Help</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.7rem', fontSize: '0.92rem' }}>
              <li><Link to="/my-orders">Track Orders</Link></li>
              <li><Link to="/cart">Active Shopping Cart</Link></li>
              <li><Link to="/profile">Profile Settings</Link></li>
              <li><Link to="/about">Our Story</Link></li>
            </ul>
          </div>

          <div>
            <h4 style={{ color: '#fff', marginBottom: '1.2rem', fontSize: '1.05rem', fontWeight: 800 }}>Payment Method</h4>
            <p style={{ fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1rem' }}>
              💵 100% Cash on Delivery (COD) & UPI verified on delivery.
            </p>
            <span style={{
              background: 'rgba(34, 197, 94, 0.15)',
              color: '#4ade80',
              padding: '0.45rem 0.9rem',
              borderRadius: 'var(--radius-pill)',
              fontSize: '0.82rem',
              fontWeight: 800
            }}>✓ Verified Secure Food Dispatch</span>
          </div>
        </div>

        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          paddingTop: '2.2rem',
          borderTop: '1px solid rgba(255,255,255,0.08)',
          textAlign: 'center',
          fontSize: '0.88rem'
        }}>
          © {new Date().getFullYear()} FoodHub Inc. Modern MERN Stack Creative Food Platform.
        </div>
      </footer>
    </div>
  );
}

export default Home;
