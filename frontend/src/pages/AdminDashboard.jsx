import React, { useEffect, useState } from 'react';
import api from '../services/api';
import NavBar from '../components/NavBar';
import confetti from 'canvas-confetti';
import { 
  ShoppingBag, Users, UtensilsCrossed, IndianRupee, 
  Trash2, Plus, Tag, CheckCircle2, Flame, Layers 
} from 'lucide-react';

const STATUSES = ['Pending', 'Confirmed', 'Preparing', 'Out for Delivery', 'Delivered', 'Cancelled'];

function AdminDashboard() {
  const [stats, setStats] = useState({ totalOrders: 0, totalCustomers: 0, totalFoods: 0, totalRevenue: 0 });
  const [orders, setOrders] = useState([]);
  const [foods, setFoods] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // New Category Form
  const [newCategory, setNewCategory] = useState({ name: '', description: '' });
  const [catLoading, setCatLoading] = useState(false);

  // New Food Form
  const [newFood, setNewFood] = useState({
    name: '',
    description: '',
    image: '',
    price: '',
    category: ''
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const [ordersRes, usersRes, foodsRes, catsRes] = await Promise.all([
        api.get('/orders'),
        api.get('/users'),
        api.get('/foods'),
        api.get('/categories'),
      ]);
      const allOrders = ordersRes.data;
      const revenue = allOrders.reduce((sum, o) => sum + o.totalAmount, 0);
      setStats({
        totalOrders: allOrders.length,
        totalCustomers: usersRes.data.length,
        totalFoods: foodsRes.data.length,
        totalRevenue: revenue,
      });
      setOrders(allOrders);
      setFoods(foodsRes.data);
      setCategories(catsRes.data);

      if (catsRes.data.length > 0 && !newFood.category) {
        setNewFood(prev => ({ ...prev, category: catsRes.data[0].name }));
      }
    } catch (err) {
      console.error(err);
      alert('Error loading admin analytics. Make sure you are signed in as an Admin.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const updateStatus = async (orderId, status) => {
    try {
      await api.put(`/orders/${orderId}/status`, { status });
      fetchData();
    } catch (err) {
      console.error(err);
      alert('Failed to update order status');
    }
  };

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    if (!newCategory.name.trim()) return;
    setCatLoading(true);
    try {
      await api.post('/categories', newCategory);
      confetti({ particleCount: 30, spread: 60, origin: { y: 0.6 } });
      alert(`Category "${newCategory.name}" created successfully!`);
      setNewCategory({ name: '', description: '' });
      fetchData();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Failed to create category');
    } finally {
      setCatLoading(false);
    }
  };

  const handleDeleteCategory = async (catId, catName) => {
    if (!window.confirm(`Are you sure you want to delete category "${catName}"?`)) return;
    try {
      await api.delete(`/categories/${catId}`);
      alert(`Category "${catName}" deleted!`);
      fetchData();
    } catch (err) {
      console.error(err);
      alert('Failed to delete category');
    }
  };

  const handleAddFood = async (e) => {
    e.preventDefault();
    try {
      await api.post('/foods', {
        ...newFood,
        price: Number(newFood.price),
        available: true
      });
      confetti({ particleCount: 40, spread: 70, origin: { y: 0.6 } });
      alert('Food item added successfully!');
      setNewFood({
        name: '',
        description: '',
        image: '',
        price: '',
        category: categories[0]?.name || 'Pizza'
      });
      fetchData();
    } catch (err) {
      console.error(err);
      alert('Failed to add food item');
    }
  };

  const handleDeleteFood = async (id, name) => {
    if (!window.confirm(`Delete dish "${name}" from live menu?`)) return;
    try {
      await api.delete(`/foods/${id}`);
      fetchData();
    } catch (err) {
      console.error(err);
      alert('Failed to delete item');
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <NavBar />

      <main style={{ maxWidth: '1280px', margin: '0 auto', width: '100%', padding: '2.5rem 2rem 5rem' }}>
        <div style={{ marginBottom: '2.5rem' }}>
          <span style={{
            background: 'linear-gradient(135deg, #181c24 0%, #29303d 100%)',
            color: '#fff',
            padding: '0.35rem 0.95rem',
            borderRadius: 'var(--radius-pill)',
            fontSize: '0.82rem',
            fontWeight: 800,
            textTransform: 'uppercase'
          }}>
            ADMIN COMMAND CENTER
          </span>
          <h1 style={{ fontSize: '2.6rem', fontWeight: 900, marginTop: '0.4rem' }}>
            Store Management & Catalog Control
          </h1>
          <p style={{ color: 'var(--text-muted)' }}>
            Manage food categories, launch new dishes, track orders, and view live revenue metrics.
          </p>
        </div>

        {/* 4 Analytics Stat Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1.6rem',
          marginBottom: '3rem'
        }}>
          {[
            { label: 'Total Revenue', value: `₹${stats.totalRevenue}`, icon: <IndianRupee size={24} color="#ff4713" />, desc: 'All orders' },
            { label: 'Total Orders', value: stats.totalOrders, icon: <ShoppingBag size={24} color="#3b82f6" />, desc: 'Placed orders' },
            { label: 'Total Customers', value: stats.totalCustomers, icon: <Users size={24} color="#10b981" />, desc: 'Registered foodies' },
            { label: 'Menu Dishes', value: stats.totalFoods, icon: <UtensilsCrossed size={24} color="#8b5cf6" />, desc: `${categories.length} Categories` },
          ].map((s) => (
            <div key={s.label} className="pro-glass" style={{ padding: '1.8rem', borderRadius: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <span style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--text-muted)' }}>{s.label}</span>
                <div style={{ background: 'rgba(0,0,0,0.04)', padding: '0.6rem', borderRadius: '14px' }}>
                  {s.icon}
                </div>
              </div>
              <h2 style={{ fontSize: '2.1rem', fontWeight: 900, color: 'var(--text-primary)' }}>{s.value}</h2>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>{s.desc}</p>
            </div>
          ))}
        </div>

        {/* SECTION 1: CREATE NEW CATEGORY & CATEGORY LIST */}
        <div className="pro-glass" style={{ padding: '2.4rem', borderRadius: '28px', marginBottom: '3rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.5rem' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '12px',
              background: 'var(--primary-light)',
              color: 'var(--primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Layers size={20} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.45rem', fontWeight: 900 }}>Food Category Management</h2>
              <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)' }}>Create new categories to expand your restaurant menu.</p>
            </div>
          </div>

          <form onSubmit={handleCreateCategory} style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr)) auto',
            gap: '1.2rem',
            alignItems: 'end',
            marginBottom: '2rem',
            background: 'rgba(255, 255, 255, 0.7)',
            padding: '1.5rem',
            borderRadius: '20px',
            border: '1.5px solid rgba(0,0,0,0.05)'
          }}>
            <div>
              <label style={{ fontSize: '0.86rem', fontWeight: 800 }}>Category Name</label>
              <input
                type="text"
                placeholder="e.g. Seafood, Rolls, Pasta, Drinks..."
                value={newCategory.name}
                onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                required
                style={{ marginTop: '0.35rem' }}
              />
            </div>
            <div>
              <label style={{ fontSize: '0.86rem', fontWeight: 800 }}>Short Description</label>
              <input
                type="text"
                placeholder="e.g. Fresh ocean fish, prawns & crab specialties"
                value={newCategory.description}
                onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                style={{ marginTop: '0.35rem' }}
              />
            </div>
            <button
              type="submit"
              disabled={catLoading}
              className="btn-pro-primary"
              style={{ padding: '0.85rem 1.8rem', height: '48px', fontSize: '0.95rem' }}
            >
              <Plus size={18} />
              <span>{catLoading ? 'Creating...' : 'Create Category'}</span>
            </button>
          </form>

          {/* Active Categories List Badges */}
          <div>
            <h4 style={{ fontSize: '0.92rem', fontWeight: 800, color: 'var(--text-muted)', marginBottom: '0.8rem', textTransform: 'uppercase' }}>
              Active Categories ({categories.length})
            </h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem' }}>
              {categories.map((cat) => (
                <div
                  key={cat._id}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.6rem',
                    background: '#fff',
                    border: '1.5px solid rgba(0,0,0,0.06)',
                    padding: '0.55rem 1.1rem',
                    borderRadius: 'var(--radius-pill)',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
                  }}
                >
                  <Tag size={15} color="var(--primary)" />
                  <span style={{ fontWeight: 800, fontSize: '0.92rem', color: 'var(--text-primary)' }}>{cat.name}</span>
                  <button
                    onClick={() => handleDeleteCategory(cat._id, cat.name)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#ef4444',
                      cursor: 'pointer',
                      padding: '0.1rem',
                      display: 'flex',
                      alignItems: 'center'
                    }}
                    title="Delete category"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SECTION 2: ADD NEW FOOD ITEM TO MENU */}
        <div className="pro-glass" style={{ padding: '2.4rem', borderRadius: '28px', marginBottom: '3rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.5rem' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '12px',
              background: 'var(--primary-light)',
              color: 'var(--primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <UtensilsCrossed size={20} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.45rem', fontWeight: 900 }}>Add New Dish to Menu 🍳</h2>
              <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)' }}>Publish a new food item instantly to the customer website.</p>
            </div>
          </div>

          <form onSubmit={handleAddFood} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.3rem' }}>
            <div>
              <label style={{ fontSize: '0.86rem', fontWeight: 800 }}>Dish Name</label>
              <input
                type="text"
                placeholder="e.g. Royal Prawns Dum Biryani"
                value={newFood.name}
                onChange={(e) => setNewFood({ ...newFood, name: e.target.value })}
                required
              />
            </div>

            <div>
              <label style={{ fontSize: '0.86rem', fontWeight: 800 }}>Category</label>
              <select
                value={newFood.category}
                onChange={(e) => setNewFood({ ...newFood, category: e.target.value })}
                required
              >
                {categories.map((c) => (
                  <option key={c._id} value={c.name}>{c.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ fontSize: '0.86rem', fontWeight: 800 }}>Price (₹)</label>
              <input
                type="number"
                placeholder="399"
                value={newFood.price}
                onChange={(e) => setNewFood({ ...newFood, price: e.target.value })}
                required
              />
            </div>

            <div>
              <label style={{ fontSize: '0.86rem', fontWeight: 800 }}>Image URL</label>
              <input
                type="text"
                placeholder="https://images.unsplash.com/..."
                value={newFood.image}
                onChange={(e) => setNewFood({ ...newFood, image: e.target.value })}
                required
              />
            </div>

            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{ fontSize: '0.86rem', fontWeight: 800 }}>Description</label>
              <textarea
                placeholder="Juicy king prawns cooked with fragrant basmati, fried mint and saffron..."
                value={newFood.description}
                onChange={(e) => setNewFood({ ...newFood, description: e.target.value })}
                rows={2}
                required
              />
            </div>

            <div style={{ gridColumn: '1 / -1' }}>
              <button type="submit" className="btn-pro-primary" style={{ padding: '0.9rem 2.2rem' }}>
                <Plus size={18} />
                <span>Publish Dish to Menu</span>
              </button>
            </div>
          </form>
        </div>

        {/* SECTION 3: LIVE ORDERS DISPATCHER */}
        <div className="pro-glass" style={{ padding: '2.4rem', borderRadius: '28px' }}>
          <h2 style={{ fontSize: '1.45rem', fontWeight: 900, marginBottom: '1.5rem' }}>
            Live Orders Pipeline ({orders.length}) 🛵
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            {orders.map((o) => (
              <div
                key={o._id}
                style={{
                  background: 'rgba(255,255,255,0.95)',
                  border: '1.5px solid rgba(0,0,0,0.06)',
                  borderRadius: '20px',
                  padding: '1.6rem',
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '1.4rem'
                }}
              >
                <div>
                  <span style={{ fontSize: '0.82rem', fontWeight: 900, color: 'var(--primary)' }}>
                    ORDER #{o._id.slice(-6).toUpperCase()}
                  </span>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 900, marginTop: '0.2rem' }}>
                    {o.userId?.name || 'Customer'}
                  </h3>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', margin: '0.2rem 0' }}>
                    📞 {o.phone} | 📍 {o.deliveryAddress}
                  </p>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: 700 }}>
                    Items: {o.items?.map(i => `${i.food?.name || 'Dish'} (x${i.quantity})`).join(', ')}
                  </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1.6rem' }}>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>COD Total</span>
                    <p style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--text-primary)', margin: 0 }}>
                      ₹{o.totalAmount}
                    </p>
                  </div>

                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--text-muted)', display: 'block' }}>
                      Update Status
                    </label>
                    <select
                      value={o.orderStatus}
                      onChange={(e) => updateStatus(o._id, e.target.value)}
                      style={{
                        padding: '0.6rem 1rem',
                        fontWeight: 800,
                        fontSize: '0.9rem',
                        borderRadius: '14px',
                        background: '#fff',
                        border: '2px solid var(--primary)',
                        cursor: 'pointer'
                      }}
                    >
                      {STATUSES.map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;
