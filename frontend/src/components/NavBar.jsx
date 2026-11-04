import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  ShoppingBag, User, LogOut, LayoutDashboard, Flame, 
  Utensils, Compass, PhoneCall, Sparkles, Heart 
} from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';

function NavBar() {
  const { user, logout } = useContext(AuthContext);
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalItems = cart.reduce((sum, i) => sum + i.quantity, 0);
  const isActive = (path) => location.pathname === path;

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      padding: scrolled ? '0.75rem 2rem' : '1.15rem 2rem',
      transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
      background: scrolled ? 'rgba(255, 255, 255, 0.88)' : 'rgba(255, 255, 255, 0.65)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.6)',
      boxShadow: scrolled ? '0 12px 36px rgba(255, 71, 19, 0.08)' : 'none'
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {/* Brand with animated flame badge */}
        <Link to="/" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.65rem',
          fontSize: '1.65rem',
          fontWeight: 900,
          fontFamily: 'Outfit, sans-serif',
          color: 'var(--text-primary)'
        }}>
          <div style={{
            width: '44px',
            height: '44px',
            background: 'var(--primary-gradient)',
            borderRadius: '14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            boxShadow: '0 8px 20px var(--primary-glow)',
            transform: 'rotate(-4deg)',
            transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'rotate(12deg) scale(1.1)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'rotate(-4deg) scale(1)'}
          >
            <Flame size={24} />
          </div>
          <span>Food<span style={{ color: 'var(--primary)' }}>Hub</span></span>
          <span style={{
            fontSize: '0.65rem',
            background: 'var(--primary-light)',
            color: 'var(--primary)',
            padding: '0.2rem 0.55rem',
            borderRadius: 'var(--radius-pill)',
            fontWeight: 800,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            alignSelf: 'flex-start',
            marginTop: '0.2rem'
          }}>PRO</span>
        </Link>

        {/* Center Pill Nav Bar with Animated Indicators */}
        <nav style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
          background: 'rgba(255, 255, 255, 0.85)',
          padding: '0.4rem 0.6rem',
          borderRadius: 'var(--radius-pill)',
          border: '1px solid rgba(0,0,0,0.05)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.03)'
        }}>
          <Link to="/" style={{
            padding: '0.55rem 1.2rem',
            borderRadius: 'var(--radius-pill)',
            fontSize: '0.92rem',
            fontWeight: 700,
            background: isActive('/') ? 'var(--primary-gradient)' : 'transparent',
            color: isActive('/') ? '#fff' : 'var(--text-primary)',
            boxShadow: isActive('/') ? '0 6px 18px var(--primary-glow)' : 'none',
            transition: 'all 0.25s ease'
          }}>
            Home
          </Link>

          <Link to="/menu" style={{
            padding: '0.55rem 1.25rem',
            borderRadius: 'var(--radius-pill)',
            fontSize: '0.92rem',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            background: isActive('/menu') ? 'var(--primary-gradient)' : 'transparent',
            color: isActive('/menu') ? '#fff' : 'var(--text-primary)',
            boxShadow: isActive('/menu') ? '0 6px 18px var(--primary-glow)' : 'none',
            transition: 'all 0.25s ease'
          }}>
            <Utensils size={15} /> Menu
          </Link>

          <Link to="/about" style={{
            padding: '0.55rem 1.15rem',
            borderRadius: 'var(--radius-pill)',
            fontSize: '0.92rem',
            fontWeight: 700,
            background: isActive('/about') ? 'var(--primary-gradient)' : 'transparent',
            color: isActive('/about') ? '#fff' : 'var(--text-primary)',
            boxShadow: isActive('/about') ? '0 6px 18px var(--primary-glow)' : 'none',
            transition: 'all 0.25s ease'
          }}>
            About
          </Link>

          <Link to="/contact" style={{
            padding: '0.55rem 1.15rem',
            borderRadius: 'var(--radius-pill)',
            fontSize: '0.92rem',
            fontWeight: 700,
            background: isActive('/contact') ? 'var(--primary-gradient)' : 'transparent',
            color: isActive('/contact') ? '#fff' : 'var(--text-primary)',
            boxShadow: isActive('/contact') ? '0 6px 18px var(--primary-glow)' : 'none',
            transition: 'all 0.25s ease'
          }}>
            Contact
          </Link>
        </nav>

        {/* Right Action Icons & Profile */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          {/* Animated Cart Bag Pill */}
          <Link to="/cart" style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            background: totalItems > 0 ? 'var(--primary-gradient)' : 'rgba(255, 255, 255, 0.9)',
            color: totalItems > 0 ? '#fff' : 'var(--text-primary)',
            padding: '0.6rem 1.25rem',
            borderRadius: 'var(--radius-pill)',
            fontWeight: 800,
            fontSize: '0.92rem',
            border: totalItems > 0 ? 'none' : '1.5px solid rgba(0,0,0,0.06)',
            boxShadow: totalItems > 0 ? '0 10px 24px var(--primary-glow)' : '0 2px 10px rgba(0,0,0,0.03)',
            transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
          }}
          className={totalItems > 0 ? 'anim-pulse' : ''}
          >
            <ShoppingBag size={18} />
            <span>Cart</span>
            {totalItems > 0 && (
              <span style={{
                background: '#fff',
                color: 'var(--primary)',
                borderRadius: '50%',
                width: '24px',
                height: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.78rem',
                fontWeight: 900,
                boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
              }}>{totalItems}</span>
            )}
          </Link>

          {/* User Auth state */}
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
              <Link to="/my-orders" style={{
                fontSize: '0.88rem',
                fontWeight: 700,
                padding: '0.6rem 1.1rem',
                borderRadius: 'var(--radius-pill)',
                background: 'rgba(255, 255, 255, 0.85)',
                border: '1px solid rgba(0,0,0,0.05)',
                color: 'var(--text-primary)'
              }}>
                Orders
              </Link>

              {user.role === 'admin' && (
                <Link to="/admin" title="Admin Portal" style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  fontSize: '0.88rem',
                  fontWeight: 800,
                  padding: '0.6rem 1.15rem',
                  borderRadius: 'var(--radius-pill)',
                  background: 'linear-gradient(135deg, #181c24 0%, #29303d 100%)',
                  color: '#fff',
                  boxShadow: '0 6px 16px rgba(0,0,0,0.15)'
                }}>
                  <LayoutDashboard size={15} /> Admin
                </Link>
              )}

              <Link to="/profile" title="Profile Details" style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                background: 'var(--primary-light)',
                color: 'var(--primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px solid rgba(255, 71, 19, 0.2)'
              }}>
                <User size={19} />
              </Link>

              <button onClick={logout} title="Sign Out" style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                background: 'rgba(239, 68, 68, 0.1)',
                color: '#ef4444',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <LogOut size={17} />
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
              <Link to="/login" style={{
                fontSize: '0.94rem',
                fontWeight: 700,
                padding: '0.6rem 1.1rem',
                color: 'var(--text-primary)'
              }}>
                Sign In
              </Link>
              <Link to="/register" className="btn-pro-primary" style={{ padding: '0.65rem 1.45rem', fontSize: '0.92rem' }}>
                Join Free
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default NavBar;
